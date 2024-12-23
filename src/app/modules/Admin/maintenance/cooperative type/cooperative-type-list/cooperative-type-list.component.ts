import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICooperativeType, ICooperativeTypeInput } from '../module/cooperative-type.model';
import { CooperativeTypeService } from '../service/cooperative-type.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cooperative-type-list',
  templateUrl: './cooperative-type-list.component.html',
  styleUrls: ['./cooperative-type-list.component.css']
})
export class CooperativeTypeListComponent implements OnInit, OnDestroy {
  coopTypeList: ICooperativeType[] = [];
  inputs: ICooperativeTypeInput = { cooperativeTypes: '' };
  coopType: ICooperativeType | any;

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
  private coopTypeSucription?: Subscription;
  private AddcoopTypeSubcription?: Subscription;
  private FetchcoopTypeByIdSubcription?: Subscription;
  private UpdatecoopTypeSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private coopTypeService: CooperativeTypeService) { }


  ngOnInit(): void {
    this.fetchcoopType();
  }

  private fetchcoopType() {
    this.coopTypeSucription = this.coopTypeService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.coopTypeList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddrboCategory(): void {
    this.AddcoopTypeSubcription = this.coopTypeService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Cooperative Type Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchcoopType();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Cooperative Type.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchcoopTypeById(coopTypeId: string): void {
    this.FetchcoopTypeByIdSubcription = this.coopTypeService.getById(coopTypeId).subscribe((data: ICooperativeType) => {
      this.coopType = data;
    });
  }

  updatecoopTypeOnSubmit(): void {
    this.UpdatecoopTypeSubcription = this.coopTypeService.update(this.coopType).subscribe(
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
        this.fetchcoopType();
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
        this.onDeleteSubcription = this.coopTypeService.delete(coopTypeId)
          .subscribe({
            next: (response) => {
              this.fetchcoopType();
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
    this.fetchcoopType();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchcoopType();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchcoopType();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchcoopType();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchcoopType();
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
    this.coopTypeSucription?.unsubscribe();
    this.AddcoopTypeSubcription?.unsubscribe();
    this.FetchcoopTypeByIdSubcription?.unsubscribe();
    this.UpdatecoopTypeSubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }


}
