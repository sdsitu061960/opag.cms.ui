export interface ICoopBusiness {
    cooperativeBusinessActivityId: string,
    businessActivities: string;
}

export interface ICoopBusinessInput {
    businessActivities: string;
}

export interface ICoopBusinessResponse {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: ICoopBusiness[];
}