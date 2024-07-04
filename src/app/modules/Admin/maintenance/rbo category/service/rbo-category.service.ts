import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRboCateory, IRboCateoryInput } from '../model/rbo-category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RboCategoryService extends BaseService<IRboCateory, IRboCateoryInput> {

  constructor(http: HttpClient) {
    super(http, 'RboCategory');
  }
}
