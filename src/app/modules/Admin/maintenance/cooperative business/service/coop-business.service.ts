import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopBusiness, ICoopBusinessInput } from '../model/cooperative-business.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoopBusinessService extends BaseService<ICoopBusiness, ICoopBusinessInput> {

  constructor(http: HttpClient) {
    super(http, 'CooperativeBusinessActivity');
  }

}
