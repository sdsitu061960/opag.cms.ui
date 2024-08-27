import { Component, OnDestroy, OnInit } from '@angular/core';
import { SdscoopService } from '../../sds-cooperative/services/sdscoop.service';
import { ISdsCooperative, MunicipalityCountDto } from '../../sds-cooperative/models/sdscooparative.model';
import { RboDirectoryService } from '../../rbo-directory/service/rbo-directory.service';
import { IRuralOrganizationMember } from '../../rbo-directory/model/rbo-directory.model';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts/highstock';
import { MunicipalityService } from '../../maintenance/municipality/service/municipality.service';
import { IMunicipality } from '../../maintenance/municipality/model/municipality';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sdsCoopList: ISdsCooperative[] = [];
  RboDirectoryList: IRuralOrganizationMember[] = [];
  rboDirectory?: IRuralOrganizationMember[];
  municipalityList: IMunicipality[] = [];

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

  MunicipalityCounter: any[] = [];


  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;

  private rboDirectorySubcription?: Subscription;

  constructor(private sdsCoopservice: SdscoopService,
    private rboDirectoryService: RboDirectoryService,
    private municipalityService: MunicipalityService
  ) { }

  ngOnInit(): void {
    this.fetchSdsCoop();
    this.getAllRboCategory();
    this.fetchMunicipality();
    this.barChart();
    this.coutMunicpalities();
  }

  chartData: number[] = []; // Store corresponding data

  // Method to fetch municipalities and their data
  private fetchMunicipality() {
    this.municipalityService.getAll(this.pageNumber, this.pageSizeAll, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.municipalityList = response.items;

          // Fetch municipality counts
          this.sdsCoopservice.countMunicipality()
            .subscribe({
              next: (countResponse) => {
                this.MunicipalityCounter = countResponse;

                // Prepare chart data with counts
                this.prepareChartData();
                this.barChart();
              },
              error: (error) => {
                console.error('Error fetching municipality counts:', error);
              }
            });
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }

  private prepareChartData() {
    this.chartData = this.municipalityList.map(municipality => {
      const countDto = this.MunicipalityCounter.find(mc => mc.municipalityId === municipality.municipalityId);
      return countDto ? countDto.count : 0; // Default to 0 if no count found
    });
  }

  // Function to render the chart
  barChart() {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Total number of Cooperatives per Municipality'
      },
      subtitle: {
        text: 'Source: RSRBO Database'
      },
      xAxis: {
        categories: this.municipalityList.map(m => m.municipalities) // Map municipality names to xAxis categories
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        },
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: 'Total',
          data: this.chartData // Use the corresponding chart data
        }
      ]
    };

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

  private coutMunicpalities() {
    this.sdsCoopservice.countMunicipality()
      .subscribe({
        next: (response) => {
          console.log(this.MunicipalityCounter = response);

        }
      });
  }

  ngOnDestroy(): void {

  }
}
