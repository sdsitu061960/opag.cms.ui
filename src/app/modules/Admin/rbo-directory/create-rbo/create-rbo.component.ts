import { Component, OnDestroy, OnInit } from '@angular/core';
import { RboDirectoryService } from '../service/rbo-directory.service';
import { IMunicipality } from '../../maintenance/municipality/model/municipality';
import { IBarangay } from '../../maintenance/barangay/model/barangay.model';
import { IRboCateory } from '../../maintenance/rbo category/model/rbo-category.model';
import { ICoopReceived } from '../../maintenance/intervention recieved/model/coo-received.model';
import { MunicipalityService } from '../../maintenance/municipality/service/municipality.service';
import { BarangayService } from '../../maintenance/barangay/service/barangay-service.service';
import { RboCategoryService } from '../../maintenance/rbo category/service/rbo-category.service';
import { CoopReceivedService } from '../../maintenance/intervention recieved/service/coop-received.service';
import { Subscription } from 'rxjs';
import { IRuralOrganizationMemberInput } from '../model/rbo-directory.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-rbo',
  templateUrl: './create-rbo.component.html',
  styleUrls: ['./create-rbo.component.css']
})
export class CreateRboComponent implements OnInit, OnDestroy {
  municipalityList: IMunicipality[] = [];
  barangayList: IBarangay[] = [];
  rboCategoryList: IRboCateory[] = [];
  interventionReceivedList: ICoopReceived[] = [];

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  inputs: IRuralOrganizationMemberInput = {
    ruralOrganizationMemberId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    region: 'Region XIII',
    gender: '',
    civilStatus: '',
    dateOfBirth: new Date(),
    age: 0,
    educationalAttainment: '',
    degree: '',
    contactNumber: '',
    association: '',
    landSize: 0,
    registeredWith: '',
    registeredNo: '',
    tin: '',
    femaleMembers: 0,
    maleMembers: 0,
    dateApproved: new Date(),  // Adjust as needed
    district: '',
    province: 'Surigao Del Sur',
    municipalityId: '',
    cityMunicipalityClass: '',
    zipCode: '',
    barangayId: '',
    position: '',
    emailAddress: '',
    officeOrganizationAddress: '',
    rboCategoryId: '',
    interventionReceivedId: '',
    interventionDetails: '',
    others: '',
    trainingAttended: '',
  };

  private MunicipalitySubscription?: Subscription;
  private BarangaySubscription?: Subscription;
  private RboCategorySubscription?: Subscription;
  private InterventionReceivedSubscription?: Subscription;

  rboDirectoryForm: FormGroup;
  commodityNames = ['Wheat', 'Rice', 'Corn', 'Barley'];

  constructor(private rboDirectoryService: RboDirectoryService,
    private municipalityService: MunicipalityService,
    private barangayService: BarangayService,
    private rboCategoryService: RboCategoryService,
    private coopReceivedService: CoopReceivedService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.rboDirectoryForm = formBuilder.group({
      //name: '',
      commodities: this.formBuilder.array([]),
    });
  }

  commodities(): FormArray {
    return this.rboDirectoryForm.get("commodities") as FormArray
  }

  newCommodity(): FormGroup {
    return this.formBuilder.group({
      commodityName: '',  // Select list for commodity names
      commodityDetails: '',  // Text input for commodity details
    })
  }

  addCommodity() {
    this.commodities().push(this.newCommodity());
  }

  removeCommodity(i: number) {
    this.commodities().removeAt(i);
  }

  onSubmit() {
    console.log(this.rboDirectoryForm.value);
  }

  ngOnInit(): void {
    this.fetchMunicipality();
    this.fetchBarangay();
    this.fetchRboCategory();
    this.fetchInterventionReceived();
  }

  //----------------------------------

  //----------------------------------

  private fetchMunicipality() {
    this.MunicipalitySubscription = this.municipalityService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.municipalityList = response.items;
          console.log(this.municipalityList);
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  private fetchBarangay() {
    this.BarangaySubscription = this.barangayService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.barangayList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  private fetchRboCategory() {
    this.RboCategorySubscription = this.rboCategoryService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
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

  private fetchInterventionReceived() {
    this.InterventionReceivedSubscription = this.coopReceivedService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
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

  AddRboDirectory(): void {
    //console.log(this.inputs);
    this.rboDirectoryService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form 
          //this.form.resetForm();
          Swal.fire({
            icon: 'success',
            text: "Rbo Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.router.navigateByUrl('admin/rbo-directory');

        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Rbo.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  ngOnDestroy(): void {

  }

}
