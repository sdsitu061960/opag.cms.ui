import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IMunicipality, IMunicipalityInput } from '../model/municipality';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService extends BaseService<IMunicipality, IMunicipalityInput> {

  constructor(http: HttpClient) {
    super(http, 'municipality');
  }

  //get all muni
  getAllMunicipalities(): Observable<IMunicipality[]> {
    return this.http.get<IMunicipality[]>(`${environment.apiBaseUrl}/api/Municipality/all`);
  }
}
