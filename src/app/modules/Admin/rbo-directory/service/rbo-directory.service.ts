import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRuralOrganizationMember, IRuralOrganizationMemberInput } from '../model/rbo-directory.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RboDirectoryService extends BaseService<IRuralOrganizationMember, IRuralOrganizationMemberInput> {

  constructor(http: HttpClient) {
    super(http, 'RuralBaseOrganization');
  }

  getAllData(): Observable<IRuralOrganizationMember[]> {
    return this.http.get<IRuralOrganizationMember[]>(`${this.apiBaseUrl}/allData`);
  }
}
