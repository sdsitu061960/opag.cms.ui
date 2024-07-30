import { ICooperativeType } from "../../maintenance/cooperative type/module/cooperative-type.model";
import { IMunicipality } from "../../maintenance/municipality/model/municipality";
import { ICoopBusiness } from '../../maintenance/cooperative business/model/cooperative-business.model';
import { ICategoryName } from "../../maintenance/cooperative Name/model/categoryName.model";

export interface ISdsCooperative {
    sdsCooperativeId: string;
    coopName: string;
    municipalityId: string;
    municipality: IMunicipality;
    cooperativeCategoryName: ICategoryName;
    cooperativeCategoryNameId: string;
    streetAddress: string;
    number: string;
    date: string;
    cooperativeType: ICooperativeType;
    cooperativeTypeId: string;
    contactPerson: string;
    position: string;
    contactNumber: string;
    emailAddress: string;
    cooperativeAssetSizeId: string;
    cooperativeBusinessActivities: ICoopBusiness[];
    certificateTaxExemption: boolean;

}

export interface ISdsCooperativeInput {
    coopName: string;
    municipalityId: string;
    cooperativeCategoryNameId: string;
    streetAddress: string;
    number: string;
    date: string;
    categoryName: string;
    cooperativeTypeId: string;
    contactPerson: string;
    position: string;
    contactNumber: string;
    emailAddress: string;
    cooperativeAssetSizeId: string;
    cooperativeBusinessActivityIds: string[];
    certificateTaxExemption: boolean;
}

export interface ISdsCooperativeUpdate {
    sdsCooperativeId: string,
    coopName: string;
    municipalityId: string;
    cooperativeCategoryNameId: string;
    streetAddress: string;
    number: string;
    date: string;
    categoryName: string;
    cooperativeTypeId: string;
    contactPerson: string;
    position: string;
    contactNumber: string;
    emailAddress: string;
    cooperativeAssetSizeId: string;
    cooperativeBusinessActivityIds: string[];
    certificateTaxExemption: boolean;
}



