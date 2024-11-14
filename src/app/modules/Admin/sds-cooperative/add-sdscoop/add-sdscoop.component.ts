import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SdscoopService } from '../services/sdscoop.service';
import Swal from 'sweetalert2';
import { ISdsCooperativeInput } from '../models/sdscooparative.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MunicipalityService } from '../../maintenance/municipality/service/municipality.service';
import { CooperativeNameService } from '../../maintenance/cooperative Name/cooperative-name.service';
import { CooperativeTypeService } from '../../maintenance/cooperative type/service/cooperative-type.service';
import { CoopAssetSizeService } from '../../maintenance/cooperative asset size/service/coop-asset-size.service';
import { CoopBusinessService } from '../../maintenance/cooperative business/service/coop-business.service';
import { IMunicipality } from '../../maintenance/municipality/model/municipality';
import { ICategoryName } from '../../maintenance/cooperative Name/model/categoryName.model';
import { ICooperativeType } from '../../maintenance/cooperative type/module/cooperative-type.model';
import { Observable, Subscription } from 'rxjs';
import { ICoopBusiness } from '../../maintenance/cooperative business/model/cooperative-business.model';
import { ICoopAssetSize } from '../../maintenance/cooperative asset size/model/Coop-assetSize.model';

@Component({
  selector: 'app-add-sdscoop',
  templateUrl: './add-sdscoop.component.html',
  styleUrls: ['./add-sdscoop.component.css']
})
export class AddSdscoopComponent implements OnInit, OnDestroy {
  municipalityList: IMunicipality[] = [];
  coopCategoryNameList: ICategoryName[] = [];
  coopTypeList: ICooperativeType[] = [];
  coopAssetSizeList: ICoopAssetSize[] = [];

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

  //Multi selected
  CoopBusinessAsset$?: Observable<ICoopBusiness[]>;

  inputs: ISdsCooperativeInput = {
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
    statOfCOC: '',
    cooperativeAssetSizeId: '',
    cooperativeBusinessActivityIds: [],
    certificateTaxExemption: false,
    femaleMembers: 0,
    maleMembers: 0
  };



  //Subcription
  private AddSdsCoopSubcription?: Subscription;
  private MunicipalitySubscription?: Subscription;
  private cooperativeNameSubcription?: Subscription;
  private cooperativeTypeSucription?: Subscription;
  private coopAssetSizeSucription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;

  constructor(private municipalityService: MunicipalityService,
    private cooperativeNameService: CooperativeNameService,
    private cooperativeTypeService: CooperativeTypeService,
    private coopAssetSizeService: CoopAssetSizeService,
    private coopBusinessAssetService: CoopBusinessService,
    private sdscoopService: SdscoopService,
    private router: Router) { }


  ngOnInit(): void {
    this.fetchMunicipality();
    this.fetchcoopCategoryName();
    this.fetchcoopType();
    this.fetchCoopAssetSize();
    this.CoopBusinessAsset$ = this.coopBusinessAssetService.getAllCoopBusinessAsset(this.pageNumber, this.pageSizeAll);
    // console.log(data);
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
    this.cooperativeTypeSucription = this.cooperativeTypeService.getAll(this.pageNumber, 100, this.searchTerm)
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



  AddSdsCoop(): void {
    this.sdscoopService.create(this.inputs)
      .subscribe({

        next: (response) => {

          // reset form
          this.form.resetForm();
          Swal.fire({
            icon: 'success',
            text: "Sds Cooperative Created!",
            showConfirmButton: false,
            timer: 1000,
          });

          this.router.navigateByUrl('admin/sds-cooperative');

        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: "Error Creating Sds Cooperative.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }

  onSearch(): void {
    this.pageNumber = 1; // Reset to first page whenever a search is performed
  }

  onPrev(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
  }

  onNext(): void {
    console.log('Total Record:', this.totalRecords);
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = +target.value;
    this.pageNumber = 1; // Reset to first page whenever page size changes
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
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

  }

}
