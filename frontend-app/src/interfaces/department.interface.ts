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