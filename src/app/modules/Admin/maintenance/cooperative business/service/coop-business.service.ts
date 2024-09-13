import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopBusiness, ICoopBusinessInput } from '../model/cooperative-business.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICoopBusinessResponse } from '../model/cooperative-business.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CoopBusinessService extends BaseService<ICoopBusiness, ICoopBusinessInput> {

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, 'CooperativeBusinessActivity', cookieService);
  }

  //Get All Coop Business Asset
  getAllCoopBusinessAsset(pageNumber: number, pageSize: number): Observable<ICoopBusiness[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ICoopBusinessResponse>(`${environment.apiBaseUrl}/api/CooperativeBusinessActivity/all`, { params }).pipe(
      map(response => response.items)
    );
  }

}
