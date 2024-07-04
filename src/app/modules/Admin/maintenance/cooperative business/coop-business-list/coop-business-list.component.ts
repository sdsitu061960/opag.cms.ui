import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoopBusinessService } from '../service/coop-business.service';
import { ICoopBusiness, ICoopBusinessInput } from '../model/cooperative-business.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CoopAssetSizeService } from '../../cooperative asset size/service/coop-asset-size.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coop-business-list',
  templateUrl: './coop-business-list.component.html',
  styleUrls: ['./coop-business-list.component.css']
})
export class CoopBusinessListComponent implements OnInit, OnDestroy {
  coopBusinessList: ICoopBusiness[] = [];
  inputs: ICoopBusinessInput = { businessActivities: '' };
  coopBusiness: ICoopBusiness | any;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  //subscription
  private coopBusinessSucription?: Subscription;
  private AddcoopBusinessSubcription?: Subscription;
  private FetchcoopBusinessByIdSubcription?: Subscription;
  private UpdatecoopBusinessSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private coopBusinessService: CoopBusinessService) { }

  ngOnInit(): void {
    this.fetchcoopBusiness();
  }

  private fetchcoopBusiness() {
    this.coopBusinessSucription = this.coopBusinessService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.coopBusinessList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddcoopBusiness(): void {
    this.AddcoopBusinessSubcription = this.coopBusinessService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Business Activity Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchcoopBusiness();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Business Activity.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchcoopBusinessById(coopBusinessId: string): void {
    this.FetchcoopBusinessByIdSubcription = this.coopBusinessService.getById(coopBusinessId).subscribe((data: ICoopBusiness) => {
      this.coopBusiness = data;
    });
  }

  updatecoopBusinessOnSubmit(): void {
    this.UpdatecoopBusinessSubcription = this.coopBusinessService.update(this.coopBusiness).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Updated Successfully!',
        });
        // reset form
        this.form.resetForm();
        // close modal
        this.closeModals.nativeElement.click();
        this.fetchcoopBusiness();
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

  onDelete(coopBusinessId: string): void {
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
        this.onDeleteSubcription = this.coopBusinessService.delete(coopBusinessId)
          .subscribe({
            next: (response) => {
              this.fetchcoopBusiness();
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
    this.fetchcoopBusiness();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchcoopBusiness();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchcoopBusiness();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchcoopBusiness();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchcoopBusiness();
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
    this.coopBusinessSucription?.unsubscribe();
    this.AddcoopBusinessSubcription?.unsubscribe();
    this.FetchcoopBusinessByIdSubcription?.unsubscribe();
    this.UpdatecoopBusinessSubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
