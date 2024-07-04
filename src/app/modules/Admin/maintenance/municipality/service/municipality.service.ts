import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IMunicipality, IMunicipalityInput } from '../model/municipality';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService extends BaseService<IMunicipality, IMunicipalityInput> {

  constructor(http: HttpClient) {
    super(http, 'municipality');
  }
}
