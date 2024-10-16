import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IRegisteredWith, IRegisteredWithInput } from '../model/registered-with.model';
import { NgForm } from '@angular/forms';
import { RegisteredWithService } from '../service/registered-with.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registered-with-list',
  templateUrl: './registered-with-list.component.html',
  styleUrls: ['./registered-with-list.component.css']
})
export class RegisteredWithListComponent implements OnInit, OnDestroy {
  registeredWithList: IRegisteredWith[] = [];
  inputs: IRegisteredWithInput = { shortName: '', fullForm: '' };
  registeredWith: IRegisteredWith | any;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  //Subcription
  private coopCategoryNameSucription?: Subscription;
  private AddRegisteredToSubcription?: Subscription;
  private fetchRegisteredToByIdSubcription?: Subscription;
  private UpdateRegisteredToSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private registeredWithService: RegisteredWithService) {

  }

  ngOnInit(): void {
    this.fetchRegisteredTo();
  }

  private fetchRegisteredTo() {
    this.coopCategoryNameSucription = this.registeredWithService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.registeredWithList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddcoopCategoryName(): void {
    this.AddRegisteredToSubcription = this.registeredWithService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Category Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchRegisteredTo();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Category.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchoopCategoryNameById(RegisteredWithId: string): void {
    this.fetchRegisteredToByIdSubcription = this.registeredWithService.getById(RegisteredWithId).subscribe((data: IRegisteredWith) => {
      this.registeredWith = data;
    });
  }

  updateoopCategoryNameOnSubmit(): void {
    this.UpdateRegisteredToSubcription = this.registeredWithService.update(this.registeredWith).subscribe(
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
        this.fetchRegisteredTo();
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

  onDelete(RegisteredWithId: string): void {
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
        this.onDeleteSubcription = this.registeredWithService.delete(RegisteredWithId)
          .subscribe({
            next: (response) => {
              this.fetchRegisteredTo();
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
    this.fetchRegisteredTo();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchRegisteredTo();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchRegisteredTo();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchRegisteredTo();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchRegisteredTo();
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
    this.coopCategoryNameSucription?.unsubscribe;
    this.AddRegisteredToSubcription?.unsubscribe;
    this.fetchRegisteredToByIdSubcription?.unsubscribe;
    this.UpdateRegisteredToSubcription?.unsubscribe;
    this.onDeleteSubcription?.unsubscribe;
  }

}
