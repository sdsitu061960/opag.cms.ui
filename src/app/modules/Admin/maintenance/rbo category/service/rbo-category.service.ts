import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IRboCateory, IRboCateoryInput } from '../model/rbo-category.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RboCategoryService extends BaseService<IRboCateory, IRboCateoryInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'RboCategory', cookieService, authService);
  }
}
