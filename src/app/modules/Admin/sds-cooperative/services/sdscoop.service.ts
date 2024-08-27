import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ISdsCooperative, ISdsCooperativeInput } from '../models/sdscooparative.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';
import { ICoopBusiness, ICoopBusinessResponse } from '../../maintenance/cooperative business/model/cooperative-business.model';
import { PaginatedResponse } from '../../maintenance/barangay/model/barangay.model';

@Injectable({
  providedIn: 'root'
})
export class SdscoopService extends BaseService<ISdsCooperative, ISdsCooperativeInput> {
  constructor(http: HttpClient) {
    super(http, 'SdsCooperative');
  }

  // getAll(pageNumber: number, pageSize: number, searchTerm?: string): Observable<PaginatedResponse<TModel[]>> {
  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString());

  //   if (searchTerm) {
  //     params = params.set('searchTerm', searchTerm);
  //   }

  //   return this.http.get<PaginatedResponse<TModel[]>>(`${this.apiBaseUrl}/all`, { params });
  // }

  getAllSdsCooperative(
    pageNumber: number,
    pageSize: number,
    searchTerm?: string,
    filterOnCoopName?: string,
    filterOnMunicipalitiesId?: string,
    filterOnCooperativeCategoryNameId?: string,
    filterOnCoopTypeId?: string,
    filterOnCoopAssetSizeCatNameId?: string): Observable<PaginatedResponse<ISdsCooperative[]>> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filterOnCoopName', filterOnCoopName || '')
      .set('filterOnMunicipalitiesId', filterOnMunicipalitiesId || '')
      .set('filterOnCooperativeCategoryNameId', filterOnCooperativeCategoryNameId || '')
      .set('filterOnCoopTypeId', filterOnCoopTypeId || '')
      .set('filterOnCoopAssetSizeCatNameId', filterOnCoopAssetSizeCatNameId || '');

    // if (searchTerm) {
    //   params = params.set('searchTerm', searchTerm);
    // }
    // if (filterOnMunicipalitiesId) {
    //   params = params.set('filterOnMunicipality', filterOnMunicipalitiesId);
    // }
    // if (filterOnCooperativeCategoryNameId) {
    //   params = params.set('filterOnCooperativeCategoryNameId', filterOnCooperativeCategoryNameId);
    // }
    // if (filterOnCoopTypeId) {
    //   params = params.set('filterOnCoopType', filterOnCoopTypeId);
    // }
    // if (filterOnCoopAssetSizeCatNameId) {
    //   params = params.set('filterOnCoopAssetSizeCatName', filterOnCoopAssetSizeCatNameId);
    // }

    return this.http.get<PaginatedResponse<ISdsCooperative[]>>(`${environment.apiBaseUrl}/api/SdsCooperative/all`, { params });
  }

  //Get All Coop Business Asset
  // getAllCoopBusinessAsset(): Observable<ICoopBusiness[]> {
  //   return this.http.get<ICoopBusiness[]>(`${environment.apiBaseUrl}/api/cooperativeBusinessActivity`);
  // }
  getAllCoopBusinessAsset(): Observable<ICoopBusiness[]> {
    return this.http.get<ICoopBusinessResponse>(`${environment.apiBaseUrl}/api/CooperativeBusinessActivity/all`).pipe(
      map(response => response.items)
    );
  }


}
