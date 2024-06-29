import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarangayService } from '../service/barangay-service.service';
import { IBarangay, IBarangayInput } from '../model/barangay.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-barangay-list',
  templateUrl: './barangay-list.component.html',
  styleUrls: ['./barangay-list.component.css']
})
export class BarangayListComponent implements OnInit {
  barangayList: IBarangay[] = [];
  inputs: IBarangayInput = { barangays: '' };
  barangay: IBarangay | any;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef

  constructor(private barangayService: BarangayService) { }

  ngOnInit(): void {
    this.fetchBarangay();
  }

  private fetchBarangay() {
    this.barangayService.getAll()
      .subscribe({
        next: (response) => {
          this.barangayList = response;
        }, error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  AddBarangay(): void {
    console.log('submited');
    this.barangayService.create(this.inputs)
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
    this.barangayService.getById(barangayId).subscribe((data: IBarangay) => {
      this.barangay = data;
    });
  }

  updateBarangayOnSubmit(): void {
    console.log('Meow');
    this.barangayService.update(this.barangay).subscribe(
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
        this.barangayService.delete(barangayId)
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
}
