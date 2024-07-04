import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICooperativeType, ICooperativeTypeInput } from '../module/cooperative-type.model';

@Injectable({
  providedIn: 'root'
})
export class CooperativeTypeService extends BaseService<ICooperativeType, ICooperativeTypeInput> {

  constructor(http: HttpClient) {
    super(http, 'CooperativeType');
  }
}
