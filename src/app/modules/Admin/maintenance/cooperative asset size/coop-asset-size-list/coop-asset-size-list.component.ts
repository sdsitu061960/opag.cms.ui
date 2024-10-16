import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoopAssetSizeService } from '../service/coop-asset-size.service';
import { ICoopAssetSize, ICoopAssetSizeInput } from '../model/Coop-assetSize.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coop-asset-size-list',
  templateUrl: './coop-asset-size-list.component.html',
  styleUrls: ['./coop-asset-size-list.component.css']
})
export class CoopAssetSizeListComponent implements OnInit, OnDestroy {
  coopAssetSizeList: ICoopAssetSize[] = [];
  inputs: ICoopAssetSizeInput = { assetSizeCategory: '' };
  coopAssetSize: ICoopAssetSize | any;

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
  private coopAssetSizeSucription?: Subscription;
  private AddcoopAssetSizeSubcription?: Subscription;
  private FetchcoopAssetSizeByIdSubcription?: Subscription;
  private UpdatecoopAssetSizeSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private coopAssetSizeService: CoopAssetSizeService) { }

  ngOnInit(): void {
    this.fetchCoopAssetSize();
  }

  private fetchCoopAssetSize() {
    this.coopAssetSizeSucription = this.coopAssetSizeService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.coopAssetSizeList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddCoopAssetSize(): void {
    console.log('submited');
    this.AddcoopAssetSizeSubcription = this.coopAssetSizeService.create(this.inputs)
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

          this.fetchCoopAssetSize();
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

  fetchCoopAssetSizeById(coopAssetSizeId: string): void {
    this.FetchcoopAssetSizeByIdSubcription = this.coopAssetSizeService.getById(coopAssetSizeId).subscribe((data: ICoopAssetSize) => {
      this.coopAssetSize = data;
    });
  }

  updateAssetSizeOnSubmit(): void {
    this.UpdatecoopAssetSizeSubcription = this.coopAssetSizeService.update(this.coopAssetSize).subscribe(
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
        this.fetchCoopAssetSize();
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
        this.onDeleteSubcription = this.coopAssetSizeService.delete(barangayId)
          .subscribe({
            next: (response) => {
              this.fetchCoopAssetSize();
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
    this.fetchCoopAssetSize();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchCoopAssetSize();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchCoopAssetSize();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchCoopAssetSize();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchCoopAssetSize();
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
    this.coopAssetSizeSucription?.unsubscribe();
    this.AddcoopAssetSizeSubcription?.unsubscribe();
    this.FetchcoopAssetSizeByIdSubcription?.unsubscribe();
    this.UpdatecoopAssetSizeSubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
