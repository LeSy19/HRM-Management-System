// Interface chuẩn khớp 100% với Response từ Backend .NET
export interface PaginatedResult<T> {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

// Params truyền vào khi gọi API phân trang
export interface PaginationParams {
    pageIndex?: number;
    pageSize?: number;
}