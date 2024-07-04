import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IBarangay, PaginatedResponse } from 'src/app/modules/Admin/maintenance/barangay/model/barangay.model';

export class BaseService<TModel, TModelInput> {

  //base url
  protected apiBaseUrl: string;

  constructor(protected http: HttpClient, apiBaseUrl: string) {
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

    return this.http.get<PaginatedResponse<TModel[]>>(`${this.apiBaseUrl}/all`, { params });
  }

  //Create
  create(data: TModelInput): Observable<TModelInput> {
    return this.http.post<TModelInput>(`${this.apiBaseUrl}`, data);
  }

  //Get by Id
  getById(id: string): Observable<TModel> {
    return this.http.get<TModel>(`${this.apiBaseUrl}/${id}`);
  }

  //Update
  update(data: TModelInput): Observable<TModel> {
    return this.http.put<TModel>(`${this.apiBaseUrl}`, data);
  }

  //Delete
  delete(id: string): Observable<TModel> {
    return this.http.delete<TModel>(`${this.apiBaseUrl}/${id}`);
  }
}
