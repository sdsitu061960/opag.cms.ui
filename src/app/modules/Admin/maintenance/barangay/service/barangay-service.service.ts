import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { IBarangay, IBarangayInput } from '../model/barangay.model';

@Injectable({
  providedIn: 'root'
})
export class BarangayService extends BaseService<IBarangay, IBarangayInput> {

  constructor(http: HttpClient) {
    super(http, 'barangay');
  }

  //Custom Service below

}
