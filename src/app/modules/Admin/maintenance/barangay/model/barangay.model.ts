export interface IBarangay {
    barangayId: string,
    barangays: string;

}

export interface IBarangayInput {
    barangays: string;
}

export interface PaginatedResponse<T> {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: T[];
}
