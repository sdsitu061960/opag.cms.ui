import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRuralOrganizationMember, IRuralOrganizationMemberInput } from '../model/rbo-directory.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../maintenance/barangay/model/barangay.model';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RboDirectoryService extends BaseService<IRuralOrganizationMember, IRuralOrganizationMemberInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'RuralBaseOrganization', cookieService, authService);
  }

  getAllData(): Observable<IRuralOrganizationMember[]> {
    return this.http.get<IRuralOrganizationMember[]>(`${this.apiBaseUrl}/allData/?addAuth=true`);
  }

  getAllRboDirectory(
    pageNumber: number,
    pageSize: number,
    searchTerm?: string,
    filterOnMunicipality?: string,
    filterOnBarangay?: string,
    filterOnRegisteredWith?: string,
    filterOnCommodity?: string
  ): Observable<PaginatedResponse<IRuralOrganizationMember[]>> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm || '')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filterOnMunicipality', filterOnMunicipality || '')
      .set('filterOnBarangay', filterOnBarangay || '')
      .set('filterOnRegisteredWith', filterOnRegisteredWith || '')
      .set('filterOnCommodity', filterOnCommodity || '');

    return this.http.get<PaginatedResponse<IRuralOrganizationMember[]>>(`${environment.apiBaseUrl}/api/RuralBaseOrganization/all/?addAuth=true`, { params });
  }
}
