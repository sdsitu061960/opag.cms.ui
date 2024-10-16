import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BarangayService } from '../service/barangay-service.service';
import { IBarangay, IBarangayInput } from '../model/barangay.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MunicipalityService } from '../../municipality/service/municipality.service';
import { IMunicipality } from '../../municipality/model/municipality';

@Component({
  selector: 'app-barangay-list',
  templateUrl: './barangay-list.component.html',
  styleUrls: ['./barangay-list.component.css']
})
export class BarangayListComponent implements OnInit, OnDestroy {
  barangayList: IBarangay[] = [];
  municipalityList: IMunicipality[] = [];
  inputs: IBarangayInput = { barangays: '', municipalityId: '' };
  barangay: IBarangay | any;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  LargepageSize = 1000;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  //subscription
  private BarangaySucription?: Subscription;
  private AddBarangaySubcription?: Subscription;
  private FetchBarangayByIdSubscription?: Subscription;
  private UpdateBarangaySubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef;
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private barangayService: BarangayService,
    private municipalityService: MunicipalityService) { }

  ngOnInit(): void {
    this.fetchBarangay();
    this.fetchMunicipality();
  }

  private fetchBarangay() {
    this.BarangaySucription = this.barangayService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.barangayList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  private fetchMunicipality() {
    this.municipalityService.getAll(this.pageNumber, this.LargepageSize, this.searchTerm)
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

  AddBarangay(): void {
    this.AddBarangaySubcription = this.barangayService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Barangay Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchBarangay();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating barangay.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchBarangayById(barangayId: string): void {
    this.FetchBarangayByIdSubscription = this.barangayService.getById(barangayId).subscribe((data: IBarangay) => {
      this.barangay = data;
    });
  }

  updateBarangayOnSubmit(): void {
    this.UpdateBarangaySubcription = this.barangayService.update(this.barangay).subscribe(
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
        this.fetchBarangay();
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

  onDelete(barangayId: string): void {
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
        this.onDeleteSubcription = this.barangayService.delete(barangayId)
          .subscribe({
            next: (response) => {
              this.fetchBarangay();
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
    this.fetchBarangay();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchBarangay();
    }
  }

  onNext(): void {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchBarangay();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchBarangay();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchBarangay();
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
    this.BarangaySucription?.unsubscribe();
    this.AddBarangaySubcription?.unsubscribe();
    this.FetchBarangayByIdSubscription?.unsubscribe();
    this.UpdateBarangaySubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
