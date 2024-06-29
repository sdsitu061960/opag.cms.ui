import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

export class BaseService<TModel, TModelInput> {

  //base url
  protected apiBaseUrl: string;

  constructor(protected http: HttpClient, apiBaseUrl: string) {
    this.apiBaseUrl = `${environment.apiBaseUrl}/api/${apiBaseUrl}`;
  }

  //Get All 
  getAll(): Observable<TModel[]> {
    return this.http.get<TModel[]>(`${this.apiBaseUrl}/all`);
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