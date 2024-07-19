import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICategoryName, ICategoryNameinput } from './model/categoryName.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CooperativeNameService extends BaseService<ICategoryName, ICategoryNameinput> {

  constructor(http: HttpClient) {
    super(http, 'CooperativeCategoryName');
  }

}
