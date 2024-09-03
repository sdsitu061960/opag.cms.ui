import { IBarangay } from "../../maintenance/barangay/model/barangay.model";
import { IMunicipality } from "../../maintenance/municipality/model/municipality";
import { IRboCateory } from "../../maintenance/rbo category/model/rbo-category.model";
import { ICoopReceived } from "../../maintenance/intervention recieved/model/coo-received.model";
import { ICommodity } from "../../maintenance/commodity/model/commodity.model";
import { IRegisteredWith } from "../../maintenance/RegisteredWith/model/registered-with.model";

export interface IRuralOrganizationMember {
    ruralOrganizationMemberId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    region: string;
    gender: string;
    civilStatus: string;
    dateOfBirth: Date;
    age: number;
    educationalAttainment: string;
    degree: string;
    contactNumber: string;
    association: string;
    landSize: number;
    registeredWithId: string;
    registeredNo: string;
    tin: string;
    femaleMembers: number;
    maleMembers: number;
    dateApproved: Date;
    district: string;
    province: string;
    municipalityId: string;
    cityMunicipalityClass: string;
    zipCode: string;
    barangayId: string;
    position: string;
    emailAddress?: string;
    officeOrganizationAddress?: string;
    rboCategoryId: string;
    interventionReceived: string;
    interventionDetails: string;
    others: string;
    trainingAttended: string;

    municipality: IMunicipality;
    barangay: IBarangay;
    rboCategory: IRboCateory;
    registeredWith: IRegisteredWith;

    commodity: ICommodity[];
}

export interface IRuralOrganizationMemberInput {
    ruralOrganizationMemberId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    region: string;
    gender: string;
    civilStatus: string;
    dateOfBirth: Date;
    age: number;
    educationalAttainment: string;
    degree: string;
    contactNumber: string;
    association: string;
    landSize: number;
    registeredWithId: string;
    registeredNo: string;
    tin: string;
    femaleMembers: number;
    maleMembers: number;
    dateApproved: Date;
    district: string;
    province: string;
    municipalityId: string;
    cityMunicipalityClass: string;
    zipCode: string;
    barangayId: string;
    position: string;
    emailAddress?: string;
    officeOrganizationAddress?: string;
    rboCategoryId: string;
    interventionReceived: string;
    interventionDetails: string;
    others: string;
    trainingAttended: string;

    commodityId: string[];
    commodityDetails: string[];
}