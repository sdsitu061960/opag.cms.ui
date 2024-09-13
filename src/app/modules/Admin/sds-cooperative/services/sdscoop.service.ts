import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ISdsCooperative, ISdsCooperativeInput } from '../models/sdscooparative.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';
import { ICoopBusiness, ICoopBusinessResponse } from '../../maintenance/cooperative business/model/cooperative-business.model';
import { PaginatedResponse } from '../../maintenance/barangay/model/barangay.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SdscoopService extends BaseService<ISdsCooperative, ISdsCooperativeInput> {
  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'SdsCooperative', cookieService);
  }

  getAllSdsCooperative(
    pageNumber: number,
    pageSize: number,
    searchTerm?: string,
    filterOnCoopName?: string,
    filterOnMunicipality?: string,
    filterOnCategoryName?: string,
    filterOnCoopType?: string,
    filterOnCoopAssetSizeCatName?: string): Observable<PaginatedResponse<ISdsCooperative[]>> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filterOnCoopName', filterOnCoopName || '')
      .set('filterOnMunicipality', filterOnMunicipality || '')
      .set('filterOnCategoryName', filterOnCategoryName || '')
      .set('filterOnCoopType', filterOnCoopType || '')
      .set('filterOnCoopAssetSizeCatName', filterOnCoopAssetSizeCatName || '');

    return this.http.get<PaginatedResponse<ISdsCooperative[]>>(`${environment.apiBaseUrl}/api/SdsCooperative/all`, { params });
  }

  getAllCoopBusinessAsset(): Observable<ICoopBusiness[]> {
    return this.http.get<ICoopBusinessResponse>(`${environment.apiBaseUrl}/api/CooperativeBusinessActivity/all`).pipe(
      map(response => response.items)
    );
  }

  countMunicipality(): Observable<ISdsCooperative[]> {
    return this.http.get<ISdsCooperative[]>(`${this.apiBaseUrl}/CountMunicipality`);
  }


}
