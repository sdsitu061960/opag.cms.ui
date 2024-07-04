export interface PaginatedResponse<T> {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: T[];
}