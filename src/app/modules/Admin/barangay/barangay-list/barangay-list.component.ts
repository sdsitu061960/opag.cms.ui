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
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;

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
}
