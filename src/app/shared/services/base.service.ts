import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IBarangay, PaginatedResponse } from 'src/app/modules/Admin/maintenance/barangay/model/barangay.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

export class BaseService<TModel, TModelInput> {

  //base url
  protected apiBaseUrl: string;

  constructor(protected http: HttpClient, apiBaseUrl: string,
    private cookieService: CookieService,
    private authService: AuthService) {
    this.apiBaseUrl = `${environment.apiBaseUrl}/api/${apiBaseUrl}`;
  }

  //Get All 
  // getAll(pageNumber: number, pageSize: number): Observable<TModel[]> {
  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString());
  //   return this.http.get<TModel[]>(`${this.apiBaseUrl}/allPaging`, { params });
  // }

  getAll(pageNumber: number, pageSize: number, searchTerm?: string): Observable<PaginatedResponse<TModel[]>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<PaginatedResponse<TModel[]>>(`${this.apiBaseUrl}/all/?addAuth=true`, { params });
  }

  //Create
  create(data: TModelInput): Observable<TModelInput> {
    const user = this.authService.getUser();
    if (user) {
      // Assuming data has a CreatedBy property. Adjust as needed.
      (data as any).CreatedBy = user.email; // Use type assertion to set CreatedBy
    }
    return this.http.post<TModelInput>(`${this.apiBaseUrl}/?addAuth=true`, data);
  }

  //Get by Id
  getById(id: string): Observable<TModel> {
    return this.http.get<TModel>(`${this.apiBaseUrl}/${id}`);
  }

  //Update
  update(data: TModelInput): Observable<TModel> {
    const user = this.authService.getUser();
    if (user) {
      // Assuming data has a LastModifiedBy property. Adjust as needed.
      (data as any).LastModifiedBy = user.email; // Use type assertion to set LastModifiedBy
    }
    return this.http.put<TModel>(`${this.apiBaseUrl}/?addAuth=true`, data
    );
  }

  //Delete
  delete(id: string): Observable<TModel> {
    return this.http.delete<TModel>(`${this.apiBaseUrl}/${id}/?addAuth=true`);
  }
}


// ,
//       {
//         headers: {
//           'Authorization': this.cookieService.get('Authorization')
//         }
//       }
