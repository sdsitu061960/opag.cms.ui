import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICooperativeType, ICooperativeTypeInput } from '../module/cooperative-type.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CooperativeTypeService extends BaseService<ICooperativeType, ICooperativeTypeInput> {

  constructor(http: HttpClient) {
    super(http, 'CooperativeType');
  }

  //Get All Coop Type 
  getAllCoopType(): Observable<ICooperativeType[]> {
    return this.http.get<ICooperativeType[]>(`${environment.apiBaseUrl}/api/CooperativeType/all`)
  }
}
