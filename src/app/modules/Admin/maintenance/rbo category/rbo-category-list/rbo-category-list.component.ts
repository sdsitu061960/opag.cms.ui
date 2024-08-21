import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IRboCateory, IRboCateoryInput } from '../model/rbo-category.model';
import { RboCategoryService } from '../service/rbo-category.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rbo-category-list',
  templateUrl: './rbo-category-list.component.html',
  styleUrls: ['./rbo-category-list.component.css']
})
export class RboCategoryListComponent implements OnInit, OnDestroy {
  rboCategoryList: IRboCateory[] = [];
  inputs: IRboCateoryInput = { categoryName: '', shortName: '' };
  rboCategory: IRboCateory | any;

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
  private RboCategorySucription?: Subscription;
  private AddRboCategorySubcription?: Subscription;
  private FetchRboCategoryByIdSubcription?: Subscription;
  private UpdateRboCateogrySubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private rboCategoryService: RboCategoryService) { }

  ngOnInit(): void {
    this.fetchrbo();
  }

  private fetchrbo() {
    this.RboCategorySucription = this.rboCategoryService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.rboCategoryList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddrboCategory(): void {
    console.log('submited');
    this.AddRboCategorySubcription = this.rboCategoryService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Rbo category Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchrbo();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Rbo category.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchRboCategoryById(rbocategoryId: string): void {
    this.FetchRboCategoryByIdSubcription = this.rboCategoryService.getById(rbocategoryId).subscribe((data: IRboCateory) => {
      this.rboCategory = data;
    });
  }

  updateRboCategoryOnSubmit(): void {
    this.UpdateRboCateogrySubcription = this.rboCategoryService.update(this.rboCategory).subscribe(
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
        this.fetchrbo();
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

  onDelete(rbocategoryId: string): void {
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
        this.onDeleteSubcription = this.rboCategoryService.delete(rbocategoryId)
          .subscribe({
            next: (response) => {
              this.fetchrbo();
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
    this.pageNumber = 1;
    this.fetchrbo();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchrbo();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchrbo();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchrbo();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchrbo();
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
    this.RboCategorySucription?.unsubscribe();
    this.AddRboCategorySubcription?.unsubscribe();
    this.FetchRboCategoryByIdSubcription?.unsubscribe();
    this.UpdateRboCateogrySubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
