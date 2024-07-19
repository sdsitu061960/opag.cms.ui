import { ICooperativeType } from "../../maintenance/cooperative type/module/cooperative-type.model";
import { IMunicipality } from "../../maintenance/municipality/model/municipality";
import { ICoopBusiness } from '../../maintenance/cooperative business/model/cooperative-business.model';

export interface ISdsCooperative {
    sdsCooperativeId: string;
    coopName: string;
    municipality: IMunicipality;
    municipalityId: string;
    // coopCatName: coopName;
    // coopCatNameId: string;
    streetAddress: string;
    number: string;
    date: string;
    categoryName: string;
    cooperatuveType: ICooperativeType;
    cooperativeTypeId: string;
    contactPerson: string;
    position: string;
    contactNumber: string;
    emailAddress: string;
    cooperativeAssetSizeId: string;
    coopBusinessActivities: ICoopBusiness[];
    certificateTaxExemption: string;

}

export interface IISdsCooperativeInput {
    municipalities: string;
}



