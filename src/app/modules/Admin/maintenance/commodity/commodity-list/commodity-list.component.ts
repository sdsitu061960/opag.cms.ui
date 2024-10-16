import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICommodity, ICommodityinput } from '../model/commodity.model';
import { NgForm } from '@angular/forms';
import { CommodityService } from '../service/commodity.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.css']
})
export class CommodityListComponent implements OnInit, OnDestroy {
  commodityList: ICommodity[] = [];
  inputs: ICommodityinput = { commodityName: '', commodityDescription: '' };
  commodity: ICommodity | any;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  private getCommoditySubscription?: Subscription;
  private AddCommoditySubscription?: Subscription;
  private fetchCommodityByIdSubcription?: Subscription;
  private UpdatecommoditySubscription?: Subscription;
  private onDeleteSubcription?: Subscription;

  constructor(private commodityService: CommodityService) { }

  ngOnInit(): void {
    this.fetchcommodity();
  }

  private fetchcommodity() {
    this.getCommoditySubscription = this.commodityService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.commodityList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddcoopCategoryName(): void {
    this.AddCommoditySubscription = this.commodityService.create(this.inputs)
      .subscribe({
        next: (response) => {
          // reset form
          this.form.resetForm();
          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Commodity Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchcommodity();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Commodity.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchCommodityById(commodityId: string): void {
    this.fetchCommodityByIdSubcription = this.commodityService.getById(commodityId).subscribe((data: ICommodityinput) => {
      this.commodity = data;
    });
  }

  updatecommodityOnSubmit(): void {
    this.UpdatecommoditySubscription = this.commodityService.update(this.commodity).subscribe(
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
        this.fetchcommodity();
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

  onDelete(commodityId: string): void {
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
        this.onDeleteSubcription = this.commodityService.delete(commodityId)
          .subscribe({
            next: (response) => {
              this.fetchcommodity();
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
    this.fetchcommodity();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchcommodity();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchcommodity();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchcommodity();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchcommodity();
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
    this.getCommoditySubscription?.unsubscribe();
    this.AddCommoditySubscription?.unsubscribe();
    this.fetchCommodityByIdSubcription?.unsubscribe();
    this.UpdatecommoditySubscription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }
}
