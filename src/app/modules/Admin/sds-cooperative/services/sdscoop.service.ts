import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ISdsCooperative, ISdsCooperativeInput } from '../models/sdscooparative.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';
import { ICoopBusiness, ICoopBusinessResponse } from '../../maintenance/cooperative business/model/cooperative-business.model';

@Injectable({
  providedIn: 'root'
})
export class SdscoopService extends BaseService<ISdsCooperative, ISdsCooperativeInput> {
  constructor(http: HttpClient) {
    super(http, 'SdsCooperative');
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
