import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoopReceivedService } from '../service/coop-received.service';
import { ICoopReceived, ICoopReceivedInput } from '../model/coo-received.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coop-received-list',
  templateUrl: './coop-received-list.component.html',
  styleUrls: ['./coop-received-list.component.css']
})
export class CoopReceivedListComponent implements OnInit, OnDestroy {
  interventionReceivedList: ICoopReceived[] = [];
  inputs: ICoopReceivedInput = { receivedFrom: '' };
  interventionReceived: ICoopReceived | any;

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
  private interventionReceivedSucription?: Subscription;
  private AddinterventionReceivedSubcription?: Subscription;
  private FetchinterventionReceivedByIdSubcription?: Subscription;
  private UpdateinterventionReceivedSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private coopReceivedService: CoopReceivedService) { }

  ngOnInit(): void {
    this.fetchinterventionReceived();
  }

  private fetchinterventionReceived() {
    this.interventionReceivedSucription = this.coopReceivedService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.interventionReceivedList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddinterventionReceived(): void {
    this.AddinterventionReceivedSubcription = this.coopReceivedService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();

          // close modal
          this.closeModal.nativeElement.click();

          Swal.fire({
            icon: 'success',
            text: "Intervention Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.fetchinterventionReceived();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Intervention.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  fetchinterventionReceivedById(interventionId: string): void {
    this.FetchinterventionReceivedByIdSubcription = this.coopReceivedService.getById(interventionId).subscribe((data: ICoopReceived) => {
      this.interventionReceived = data;
    });
  }

  updateinterventionReceivedOnSubmit(): void {
    this.UpdateinterventionReceivedSubcription = this.coopReceivedService.update(this.interventionReceived).subscribe(
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
        this.fetchinterventionReceived();
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

  onDelete(interventionId: string): void {
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
        this.onDeleteSubcription = this.coopReceivedService.delete(interventionId)
          .subscribe({
            next: (response) => {
              this.fetchinterventionReceived();
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
    this.fetchinterventionReceived();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchinterventionReceived();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchinterventionReceived();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchinterventionReceived();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchinterventionReceived();
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
    this.interventionReceivedSucription?.unsubscribe();
    this.AddinterventionReceivedSubcription?.unsubscribe();
    this.FetchinterventionReceivedByIdSubcription?.unsubscribe();
    this.UpdateinterventionReceivedSubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}