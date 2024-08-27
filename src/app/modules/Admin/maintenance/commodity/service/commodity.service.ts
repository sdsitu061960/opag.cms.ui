import { Injectable } from '@angular/core';
import { ICommodity, ICommodityinput } from '../model/commodity.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommodityService extends BaseService<ICommodity, ICommodityinput> {

  constructor(http: HttpClient) {
    super(http, 'Commodity');
  }
}
