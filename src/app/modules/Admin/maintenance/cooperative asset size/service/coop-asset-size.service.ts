import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { ICoopAssetSize, ICoopAssetSizeInput } from '../model/Coop-assetSize.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoopAssetSizeService extends BaseService<ICoopAssetSize, ICoopAssetSizeInput> {

  constructor(http: HttpClient) {
    super(http, 'CooperativeAssetSize');
  }
}
