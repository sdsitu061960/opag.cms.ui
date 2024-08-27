import { Component, OnDestroy, OnInit } from '@angular/core';
import { SdscoopService } from '../../sds-cooperative/services/sdscoop.service';
import { ISdsCooperative } from '../../sds-cooperative/models/sdscooparative.model';
import { RboDirectoryService } from '../../rbo-directory/service/rbo-directory.service';
import { IRuralOrganizationMember } from '../../rbo-directory/model/rbo-directory.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sdsCoopList: ISdsCooperative[] = [];
  RboDirectoryList: IRuralOrganizationMember[] = [];
  rboDirectory?: IRuralOrganizationMember[];

  //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  pageSizeAll = 500;
  totalPages: number = 0;
  totalRecords: number = 0;
  totalRboRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';
  filterOnCoopName: string = '';
  filterOnMunicipalitiesId: string = '';
  filterOnCooperativeCategoryNameId: string = '';
  filterOnCoopTypeId: string = '';
  filterOnCoopAssetSizeCatNameId: string = '';
  todaysDate: string = new Date().toDateString();
  rboProfileCounter: any[] = [];
  rboProfileLength: number = 0;

  private rboDirectorySubcription?: Subscription;

  constructor(private sdsCoopservice: SdscoopService,
    private rboDirectoryService: RboDirectoryService
  ) { }

  ngOnInit(): void {
    this.fetchSdsCoop();
    this.getAllRboCategory();
  }

  fetchSdsCoop() {
    this.sdsCoopservice.getAllSdsCooperative(
      this.pageNumber,
      this.pageSize,
      this.searchTerm,
      '',
      '',
      '',
      '',
      '')
      .subscribe({
        next: (response: any) => {
          this.sdsCoopList = response.items;
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  private getAllRboCategory() {
    this.rboDirectoryService.getAllData()
      .subscribe({
        next: (response) => {
          this.rboProfileCounter = response;
          this.rboProfileLength = this.rboProfileCounter.length;
        }
      });
  }

  ngOnDestroy(): void {

  }
}
