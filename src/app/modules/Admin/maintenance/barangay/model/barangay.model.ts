import { IMunicipality } from "../../municipality/model/municipality";

export interface IBarangay {
    barangayId: string,
    barangays: string;
    municipalityId: string;
    municipality: IMunicipality;
}

export interface IBarangayInput {
    barangays: string;
    municipalityId: string;
}

export interface PaginatedResponse<T> {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: T[];
}
