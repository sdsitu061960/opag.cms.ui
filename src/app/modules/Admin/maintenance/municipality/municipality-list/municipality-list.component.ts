import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IMunicipality, IMunicipalityInput } from '../model/municipality';
import { NgForm } from '@angular/forms';
import { MunicipalityService } from '../service/municipality.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipality-list',
  templateUrl: './municipality-list.component.html',
  styleUrls: ['./municipality-list.component.css']
})
export class MunicipalityListComponent implements OnInit, OnDestroy {
  municipalityList: IMunicipality[] = [];
  inputs: IMunicipalityInput = { municipalities: '' };
  municipality: IMunicipality | any;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  searchTerm: string = '';
  visiblePageCount = 5;

  //subscription
  private MunicipalitySucription?: Subscription;
  private AddMunicipalitySubcription?: Subscription;
  private FetchMunicipalityByIdSubcription?: Subscription;
  private UpdateMunicipalitySubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef;
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef

  constructor(private municipalityService: MunicipalityService) { }

  ngOnInit(): void {
    this.fetchMunicpality();

  }

  private fetchMunicpality() {
    this.MunicipalitySucription = this.municipalityService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.municipalityList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddMunicipality(): void {
    this.AddMunicipalitySubcription = this.municipalityService.create(this.inputs)
      .subscribe({

        next: () => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Municipality Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchMunicpality();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating municipality.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchMunicipalityById(municipalityId: string): void {
    this.FetchMunicipalityByIdSubcription = this.municipalityService.getById(municipalityId).subscribe((data: IMunicipality) => {
      this.municipality = data;
    });
  }

  updateMunicipalityOnSubmit(): void {
    this.UpdateMunicipalitySubcription = this.municipalityService.update(this.municipality).subscribe(
      response => {
        Swal.fire({
          icon: 'success',  
          timer: 1500,
          text: 'Updated Successfully!',
          showConfirmButton: false
        });
        // reset form
        this.form.resetForm();
        // close modal
        this.closeModals.nativeElement.click();
        this.fetchMunicpality();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'Error!',
        });
      }
    )
  }

  onDelete(municipalityId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteSubcription = this.municipalityService.delete(municipalityId)
          .subscribe({
            next: (response) => {
              this.fetchMunicpality();
            },
            error: (error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
      } else {
        console.log('Error Occured while Deleting ...');
      }
    });
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page whenever a search is performed
    this.fetchMunicpality();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchMunicpality();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchMunicpality();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchMunicpality();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchMunicpality();
    }
  }

  get totalPagesArray(): number[] {
    const currentPage = this.pageNumber;
    const totalPages = this.totalPages;
    const halfVisible = Math.floor(this.visiblePageCount / 2);

    let startPage = currentPage - halfVisible;
    startPage = Math.max(1, startPage); // Ensure startPage is at least 1

    let endPage = startPage + this.visiblePageCount - 1;
    endPage = Math.min(totalPages, endPage); // Ensure endPage does not exceed totalPages

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnDestroy(): void {
    this.MunicipalitySucription?.unsubscribe();
    this.AddMunicipalitySubcription?.unsubscribe();
    this.FetchMunicipalityByIdSubcription?.unsubscribe();
    this.UpdateMunicipalitySubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }


}
