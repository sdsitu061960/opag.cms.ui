import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IRuralOrganizationMember, IRuralOrganizationMemberInput } from '../model/rbo-directory.model';
import { RboDirectoryService } from '../service/rbo-directory.service';
import { MunicipalityService } from '../../maintenance/municipality/service/municipality.service';
import { BarangayService } from '../../maintenance/barangay/service/barangay-service.service';
import { RboCategoryService } from '../../maintenance/rbo category/service/rbo-category.service';
import { CoopReceivedService } from '../../maintenance/intervention recieved/service/coop-received.service';
import { Subscription } from 'rxjs';
import { IMunicipality } from '../../maintenance/municipality/model/municipality';
import { IBarangay } from '../../maintenance/barangay/model/barangay.model';
import { IRboCateory } from '../../maintenance/rbo category/model/rbo-category.model';
import { ICoopReceived } from '../../maintenance/intervention recieved/model/coo-received.model';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommodityService } from '../../maintenance/commodity/service/commodity.service';
import { ICommodity } from '../../maintenance/commodity/model/commodity.model';

@Component({
  selector: 'app-list-rbo',
  templateUrl: './list-rbo.component.html',
  styleUrls: ['./list-rbo.component.css']
})
export class ListRboComponent implements OnInit, OnDestroy {
  RboDirectoryList: IRuralOrganizationMember[] = [];
  municipalityList: IMunicipality[] = [];
  barangayList: IBarangay[] = [];
  rboCategoryList: IRboCateory[] = [];
  interventionReceivedList: ICoopReceived[] = [];
  editrboDirectoryList: IRuralOrganizationMember | any;
  commodityList: ICommodity[] = [];

  @Input() rboDirectoryInput?: IRuralOrganizationMember;

  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';
  selectedCommodityName?: string[];
  selectedCommodityDetail?: string[];

  rboDirectoryForm: FormGroup;

  //Subcription
  private MunicipalitySubscription?: Subscription;
  private rboDirectorySubcription?: Subscription;
  private BarangaySubscription?: Subscription;
  private RboCategorySubscription?: Subscription;
  private fetchRboDirectoryByIdSubcription?: Subscription;
  private InterventionReceivedSubscription?: Subscription;
  private UpdateRboDirectorySubcription?: Subscription;
  private onDeleteSubcription?: Subscription;
  private getCommoditySubscription?: Subscription;

  constructor(private ruralBaseOrganizationService: RboDirectoryService,
    private municipalityService: MunicipalityService,
    private barangayService: BarangayService,
    private rboCategoryService: RboCategoryService,
    private interventionRecievedService: CoopReceivedService,
    private formBuilder: FormBuilder,
    private commodityService: CommodityService,
  ) {
    this.rboDirectoryForm = this.formBuilder.group({
      commodities: this.formBuilder.array([]),  // Initialize form array for commodities
    });
  }

  ngOnInit(): void {
    this.fetchRboDirectory();
    this.fetchMunicipality();
    this.fetchBarangay();
    this.fetchrboCategory();
    this.fetchInterventionReceived();
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

  private fetchMunicipality() {
    this.MunicipalitySubscription = this.municipalityService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.municipalityList = response.items;
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


  private fetchInterventionReceived() {
    this.InterventionReceivedSubscription = this.interventionRecievedService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
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

  private fetchrboCategory() {
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

  fetchRboDirectory() {
    this.rboDirectorySubcription = this.ruralBaseOrganizationService.getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.RboDirectoryList = response.items;
          console.log(this.RboDirectoryList);
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  // fetchRboDirectoryById(rboDirectoryId: string): void {
  //   this.fetchRboDirectoryByIdSubcription = this.ruralBaseOrganizationService.getById(rboDirectoryId).subscribe((data: IRuralOrganizationMember) => {
  //     this.rboDirectoryInput = data;
  //     console.log(data);
  //     //this.selectedBusinessAsset = data.cooperativeBusinessActivities.map(x => x.cooperativeBusinessActivityId);
  //   });
  // }
  fetchRboDirectoryById(rboDirectoryId: string): void {
    this.fetchRboDirectoryByIdSubcription = this.ruralBaseOrganizationService.getById(rboDirectoryId).subscribe((data: IRuralOrganizationMember) => {
      this.rboDirectoryInput = data;
      console.log(data);

      // Populate commodities when editing
      this.populateCommodities(data.commodity);

      // Populate other form fields as necessary
    });
  }

  // Method to populate the commodities form array
  populateCommodities(commodities: any[]): void {
    const commoditiesArray = this.commodities();
    commodities.forEach(commodity => {
      commoditiesArray.push(this.formBuilder.group({
        commodityId: [commodity.commodityId],  // Set the commodity ID
        commodityDetails: [commodity.commodityDetails],  // Set the commodity details
      }));
    });
  }

  commodities(): FormArray {
    return this.rboDirectoryForm.get("commodities") as FormArray;
  }

  newCommodity(): FormGroup {
    return this.formBuilder.group({
      commodityId: '',  // Select list for commodity 
      commodityDetails: '',  // Text input for commodity details
    });
  }

  addCommodity(): void {
    this.commodities().push(this.newCommodity());
  }

  removeCommodity(i: number): void {
    this.commodities().removeAt(i);
  }

  onUpdateRboDirectory(): void {

    const updatedCommodities = this.commodities().value;
    //Define Default Value for sds Cooperative
    let updateRboDirectory: IRuralOrganizationMemberInput = {
      ruralOrganizationMemberId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      region: '',
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
      dateApproved: new Date(),
      district: '',
      province: '',
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
      commodityId: updatedCommodities.map((commodity: any) => commodity.commodityId),
      commodityDetails: updatedCommodities.map((commodity: any) => commodity.commodityDetails)
      // commodityId: [],
      // commodityDetails: []
    };

    if (this.rboDirectoryInput && this.rboDirectoryInput.ruralOrganizationMemberId) {
      updateRboDirectory = {
        ruralOrganizationMemberId: this.rboDirectoryInput.ruralOrganizationMemberId,
        firstName: this.rboDirectoryInput.firstName,
        middleName: this.rboDirectoryInput.middleName,
        lastName: this.rboDirectoryInput.lastName,
        suffix: this.rboDirectoryInput.suffix,
        region: this.rboDirectoryInput.region,
        gender: this.rboDirectoryInput.gender,
        civilStatus: this.rboDirectoryInput.civilStatus,
        dateOfBirth: this.rboDirectoryInput.dateOfBirth,
        age: this.rboDirectoryInput.age,
        educationalAttainment: this.rboDirectoryInput.educationalAttainment,
        degree: this.rboDirectoryInput.degree,
        contactNumber: this.rboDirectoryInput.contactNumber,
        association: this.rboDirectoryInput.association,
        landSize: this.rboDirectoryInput.landSize,
        registeredWith: this.rboDirectoryInput.registeredWith,
        registeredNo: this.rboDirectoryInput.registeredNo,
        tin: this.rboDirectoryInput.tin,
        femaleMembers: this.rboDirectoryInput.femaleMembers,
        maleMembers: this.rboDirectoryInput.maleMembers,
        dateApproved: this.rboDirectoryInput.dateApproved,
        district: this.rboDirectoryInput.district,
        province: this.rboDirectoryInput.province,
        municipalityId: this.rboDirectoryInput.municipalityId,
        cityMunicipalityClass: this.rboDirectoryInput.cityMunicipalityClass,
        zipCode: this.rboDirectoryInput.zipCode,
        barangayId: this.rboDirectoryInput.barangayId,
        position: this.rboDirectoryInput.position,
        emailAddress: this.rboDirectoryInput.emailAddress,
        officeOrganizationAddress: this.rboDirectoryInput.officeOrganizationAddress,
        rboCategoryId: this.rboDirectoryInput.rboCategoryId,
        interventionReceivedId: this.rboDirectoryInput.interventionReceivedId,
        interventionDetails: this.rboDirectoryInput.interventionDetails,
        others: this.rboDirectoryInput.others,
        trainingAttended: this.rboDirectoryInput.trainingAttended,
        commodityId: this.selectedCommodityName ?? [],
        commodityDetails: this.selectedCommodityDetail ?? []
      }
    }

    this.UpdateRboDirectorySubcription = this.ruralBaseOrganizationService.update(updateRboDirectory).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Updated Successfully!',
        });
        // this.fetchSdsCoop();

        // reset form
        this.editrboDirectoryList = {
          ruralOrganizationMemberId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
          region: '',
          gender: '',
          civilStatus: '',
          dateOfBirth: '',
          age: '',
          educationalAttainment: '',
          degree: '',
          association: '',
          landSize: '',
          registeredWith: '',
          registeredNo: '',
          tin: '',
          femaleMembers: '',
          maleMembers: '',
          dateApproved: '',
          district: '',
          province: '',
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
          commodityId: [],
          commodityDetails: []
        }



        //this.form.resetForm();
        // close modal
        this.closeModals.nativeElement.click();

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

  onDelete(rboDirectoryId: string): void {
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
        this.onDeleteSubcription = this.ruralBaseOrganizationService.delete(rboDirectoryId)
          .subscribe({
            next: (response) => {
              this.fetchRboDirectory();
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
    this.fetchRboDirectory();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchRboDirectory();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchRboDirectory();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchRboDirectory();

  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchRboDirectory();
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
    this.MunicipalitySubscription?.unsubscribe();
    this.rboDirectorySubcription?.unsubscribe();
    this.BarangaySubscription?.unsubscribe();
    this.RboCategorySubscription?.unsubscribe();
    this.fetchRboDirectoryByIdSubcription?.unsubscribe();
    this.InterventionReceivedSubscription?.unsubscribe();
    this.UpdateRboDirectorySubcription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
  }

}
