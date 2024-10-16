import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopAssetSize, ICoopAssetSizeInput } from '../model/Coop-assetSize.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/public/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoopAssetSizeService extends BaseService<ICoopAssetSize, ICoopAssetSizeInput> {

  constructor(http: HttpClient, cookieService: CookieService, authService: AuthService) {
    super(http, 'CooperativeAssetSize', cookieService, authService);
  }

  //Get All Coop Asset
  getAllCoopAssetSize(): Observable<ICoopAssetSize[]> {
    return this.http.get<ICoopAssetSize[]>(`${environment.apiBaseUrl}/api/CooperativeAssetSize/all`)
  }
}
