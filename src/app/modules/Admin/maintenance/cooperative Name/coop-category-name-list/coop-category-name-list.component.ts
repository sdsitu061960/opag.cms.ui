import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICategoryName, ICategoryNameinput } from '../model/categoryName.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CooperativeNameService } from '../cooperative-name.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coop-category-name-list',
  templateUrl: './coop-category-name-list.component.html',
  styleUrls: ['./coop-category-name-list.component.css']
})
export class CoopCategoryNameListComponent implements OnInit, OnDestroy {
  coopCategoryNameList: ICategoryName[] = [];
  inputs: ICategoryNameinput = { categoryName: '' };
  coopCategoryName: ICategoryName | any;

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
  private coopCategoryNameSucription?: Subscription;
  private AddcoopCategoryNameSubcription?: Subscription;
  private FetchcoopCategoryNameByIdSubcription?: Subscription;
  private UpdatecoopCategoryNameSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private cooperativeNameService: CooperativeNameService) { }

  ngOnInit(): void {
    this.fetchcoopCategoryName();
  }

  private fetchcoopCategoryName() {
    this.coopCategoryNameSucription = this.cooperativeNameService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.coopCategoryNameList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddcoopCategoryName(): void {
    this.AddcoopCategoryNameSubcription = this.cooperativeNameService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Category Name Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchcoopCategoryName();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Category Name.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchoopCategoryNameById(coopTypeId: string): void {
    this.FetchcoopCategoryNameByIdSubcription = this.cooperativeNameService.getById(coopTypeId).subscribe((data: ICategoryName) => {
      this.coopCategoryName = data;
    });
  }

  updateoopCategoryNameOnSubmit(): void {
    this.UpdatecoopCategoryNameSubcription = this.cooperativeNameService.update(this.coopCategoryName).subscribe(
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
        this.fetchcoopCategoryName();
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

  onDelete(coopTypeId: string): void {
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
        this.onDeleteSubcription = this.cooperativeNameService.delete(coopTypeId)
          .subscribe({
            next: (response) => {
              this.fetchcoopCategoryName();
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
    this.fetchcoopCategoryName();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchcoopCategoryName();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchcoopCategoryName();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchcoopCategoryName();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchcoopCategoryName();
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
    this.coopCategoryNameSucription?.unsubscribe();
    this.AddcoopCategoryNameSubcription?.unsubscribe();
    this.FetchcoopCategoryNameByIdSubcription?.unsubscribe();
    this.UpdatecoopCategoryNameSubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
