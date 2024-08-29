import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISdsCooperative, ISdsCooperativeInput, ISdsCooperativeUpdate } from '../models/sdscooparative.model';
import { SdscoopService } from '../services/sdscoop.service';
import { CoopBusinessListComponent } from '../../maintenance/cooperative business/coop-business-list/coop-business-list.component';
import { CoopBusinessService } from '../../maintenance/cooperative business/service/coop-business.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ICoopBusiness } from '../../maintenance/cooperative business/model/cooperative-business.model';
import Swal from 'sweetalert2';
import { MunicipalityService } from '../../maintenance/municipality/service/municipality.service';
import { CooperativeNameService } from '../../maintenance/cooperative Name/cooperative-name.service';
import { CooperativeTypeService } from '../../maintenance/cooperative type/service/cooperative-type.service';
import { CoopAssetSizeService } from '../../maintenance/cooperative asset size/service/coop-asset-size.service';
import { IMunicipality } from '../../maintenance/municipality/model/municipality';
import { ICategoryName } from '../../maintenance/cooperative Name/model/categoryName.model';
import { ICooperativeType } from '../../maintenance/cooperative type/module/cooperative-type.model';
import { ICoopAssetSize } from '../../maintenance/cooperative asset size/model/Coop-assetSize.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sdscooplist',
  templateUrl: './sdscooplist.component.html',
  styleUrls: ['./sdscooplist.component.css']
})
export class SdscooplistComponent implements OnInit, OnDestroy {
  sdsCoopList: ISdsCooperative[] = [];
  editsdsCoopList: ISdsCooperative | any;

  municipalityList: IMunicipality[] = [];
  coopCategoryNameList: ICategoryName[] = [];
  coopTypeList: ICooperativeType[] = [];
  coopAssetSizeList: ICoopAssetSize[] = [];

  //Store nan value as Array[]
  selectedBusinessAsset?: string[];

  @Input() sdsCoopModel?: ISdsCooperative;
  private subscriptions: Subscription[] = [];

  //Multi selected
  CoopBusinessAsset$?: Observable<ICoopBusiness[]>;

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  pageSizeAll = 500;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';
  filterOnCoopName: string = '';
  filterOnMunicipality: string = '';
  filterOnCategoryName: string = '';
  filterOnCoopType: string = '';
  filterOnCoopAssetSizeCatName: string = '';

  //Subcription
  private AddSdsCoopSubcription?: Subscription;
  private MunicipalitySubscription?: Subscription;
  private cooperativeNameSubcription?: Subscription;
  private cooperativeTypeSucription?: Subscription;
  private coopAssetSizeSucription?: Subscription;
  private onDeleteSubcription?: Subscription;
  private FetchSdsCoopIdSubcription?: Subscription;
  private UpdateSdsCoopSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;


  constructor(private sdscoopService: SdscoopService,
    private coopBusinessAssetService: CoopBusinessService,
    private municipalityService: MunicipalityService,
    private cooperativeNameService: CooperativeNameService,
    private cooperativeTypeService: CooperativeTypeService,
    private coopAssetSizeService: CoopAssetSizeService
  ) { }

  ngOnInit(): void {
    this.fetchSdsCoop();
    this.fetchMunicipality();
    this.fetchcoopCategoryName();
    this.fetchcoopType();
    this.fetchCoopAssetSize();
    this.CoopBusinessAsset$ = this.coopBusinessAssetService.getAllCoopBusinessAsset(this.pageNumber, this.pageSizeAll);
  }

  private fetchMunicipality() {
    this.MunicipalitySubscription = this.municipalityService.getAll(this.pageNumber, this.pageSizeAll, this.searchTerm)
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

  private fetchcoopCategoryName() {
    this.cooperativeNameSubcription = this.cooperativeNameService.getAll(this.pageNumber, this.pageSizeAll, this.searchTerm)
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

  private fetchcoopType() {
    this.cooperativeTypeSucription = this.cooperativeTypeService.getAll(this.pageNumber, this.pageSizeAll, this.searchTerm)
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

  private fetchCoopAssetSize() {
    this.coopAssetSizeSucription = this.coopAssetSizeService.getAll(this.pageNumber, this.pageSizeAll, this.searchTerm)
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


  fetchSdsCoop() {
    this.sdscoopService.getAllSdsCooperative(
      this.pageNumber,
      this.pageSize,
      this.searchTerm,
      this.filterOnCoopName,
      this.filterOnMunicipality,
      this.filterOnCategoryName,
      this.filterOnCoopType,
      this.filterOnCoopAssetSizeCatName)
      .subscribe({
        next: (response: any) => {
          this.sdsCoopList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
          // this.onFilters();
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  fetchSdsCoopById(sdsCoopId: string): void {
    this.FetchSdsCoopIdSubcription = this.sdscoopService.getById(sdsCoopId).subscribe((data: ISdsCooperative) => {
      this.sdsCoopModel = data;
      this.selectedBusinessAsset = data.cooperativeBusinessActivities.map(x => x.cooperativeBusinessActivityId);
    });
  }

  updateSdsCoopOnSubmit(): void {
    // Define Default Value for sds Cooperative
    let updateSdsCoop: ISdsCooperativeUpdate = {
      sdsCooperativeId: '',
      coopName: '',
      municipalityId: '',
      cooperativeCategoryNameId: '',
      streetAddress: '',
      number: '',
      date: '',
      categoryName: '',
      cooperativeTypeId: '',
      contactPerson: '',
      position: '',
      contactNumber: '',
      emailAddress: '',
      cooperativeAssetSizeId: '',
      cooperativeBusinessActivityIds: [],
      certificateTaxExemption: false,
      femaleMembers: 0,
      maleMembers: 0
    };

    if (this.sdsCoopModel && this.sdsCoopModel.sdsCooperativeId) {
      updateSdsCoop = {
        sdsCooperativeId: this.sdsCoopModel.sdsCooperativeId,
        coopName: this.sdsCoopModel.coopName,
        municipalityId: this.sdsCoopModel.municipalityId,
        cooperativeCategoryNameId: this.sdsCoopModel.cooperativeCategoryNameId,
        streetAddress: this.sdsCoopModel.streetAddress,
        number: this.sdsCoopModel.number,
        date: this.sdsCoopModel.date,
        categoryName: this.sdsCoopModel.cooperativeCategoryNameId,
        cooperativeTypeId: this.sdsCoopModel.cooperativeTypeId,
        contactPerson: this.sdsCoopModel.contactPerson,
        position: this.sdsCoopModel.position,
        contactNumber: this.sdsCoopModel.contactNumber,
        emailAddress: this.sdsCoopModel.emailAddress,
        cooperativeAssetSizeId: this.sdsCoopModel.cooperativeAssetSizeId,
        cooperativeBusinessActivityIds: this.selectedBusinessAsset ?? [],
        certificateTaxExemption: this.sdsCoopModel.certificateTaxExemption,
        femaleMembers: this.sdsCoopModel.femaleMembers,
        maleMembers: this.sdsCoopModel.maleMembers,
      }
    }

    this.UpdateSdsCoopSubcription = this.sdscoopService.update(updateSdsCoop).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Updated Successfully!',
        });
        this.fetchSdsCoop();

        // reset form
        this.editsdsCoopList = {
          coopName: '',
          municipalityId: '',
          cooperativeCategoryNameId: '',
          streetAddress: '',
          number: '',
          date: '',
          categoryName: '',
          cooperativeTypeId: '',
          contactPerson: '',
          position: '',
          contactNumber: '',
          emailAddress: '',
          cooperativeAssetSizeId: '',
          cooperativeBusinessActivityIds: [],
          certificateTaxExemption: false,
          femaleMembers: 0,
          maleMembers: 0
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

  onDelete(sdsCooperativeId: string): void {
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
        this.onDeleteSubcription = this.sdscoopService.delete(sdsCooperativeId)
          .subscribe({
            next: (response) => {
              this.fetchSdsCoop();
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

  onFilters(): void {
    this.sdsCoopList = this.sdsCoopList.filter(coop =>
      coop.coopName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterOnMunicipality ? coop.municipality.municipalityId === this.filterOnMunicipality : true) &&
      (this.filterOnCategoryName ? coop.cooperativeCategoryName.cooperativeCategoryNameId === this.filterOnCategoryName : true) &&
      (this.filterOnCoopType ? coop.cooperativeType.cooperativeTypeId === this.filterOnCoopType : true) &&
      (this.filterOnCoopAssetSizeCatName ? coop.cooperativeAssetSizeId === this.filterOnCoopAssetSizeCatName : true)
    );
  }

  onFilter(): void {
    this.pageNumber = 1;
    //this.onFilters();
    this.fetchSdsCoop();
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page whenever a search is performed
    this.fetchSdsCoop();
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchSdsCoop();
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchSdsCoop();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
    this.fetchSdsCoop();

  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.fetchSdsCoop();
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
    this.AddSdsCoopSubcription?.unsubscribe();
    this.MunicipalitySubscription?.unsubscribe();
    this.cooperativeNameSubcription?.unsubscribe();
    this.cooperativeTypeSucription?.unsubscribe();
    this.coopAssetSizeSucription?.unsubscribe();
    this.onDeleteSubcription?.unsubscribe();
    this.FetchSdsCoopIdSubcription?.unsubscribe();
    this.UpdateSdsCoopSubcription?.unsubscribe();
  }

}
