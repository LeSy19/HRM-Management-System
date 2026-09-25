
export interface DepartmentFilterRequestDTO {
    pageIndex?: number;
    pageSize?: number;
    searchTerm?: string;
}

export interface DepartmentResponseDto {
    id: number;
    code: string;
    name: string;
    managerId: number | null;
    managerName: string | null;
    totalEmployees: number;
    createdAt: string;
}

export interface CreateDepartmentDto {
    code: string;
    name: string;
    managerId: number | null;
}

export interface UpdateDepartmentDto {
    code: string;
    name: string;
    managerId: number | null;
}