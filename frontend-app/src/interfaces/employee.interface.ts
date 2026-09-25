

export interface EmployeeFilterRequestDTO {
    pageIndex?: number;
    pageSize?: number;
    searchTerm?: string;
    departmentId?: number;
}

export interface EmployeeResponseDTO {
    id: number;
    employeeCode: string;
    username: string;
    email: string;
    fullName: string;
    phone?: string | null;
    hireDate: string;
    endDate: string,
    status: string;

    roleId: number;
    roleName: string;

    departmentId?: number | null;
    departmentName?: string | null;

    jobTitleId?: number | null;
    jobTitleName?: string | null;

    managerId?: number | null;
    managerName?: string | null;

    createdAt: string;
}


// Create Employee

export interface CreateEmployeeDTO {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string | null;
    hireDate: string;
    endDate: string,

    // PROBATION, ACTIVE, ON_LEAVE, TERMINATED
    status?: string;

    // Mặc định Employee = RoleId 3
    roleId?: number;

    departmentId?: number | null;
    jobTitleId?: number | null;
    managerId?: number | null;
}



export interface UpdateEmployeeDTO {
    email: string;
    fullName: string;
    phone?: string | null;
    hireDate: string;
    endDate: string,
    status: string;
    roleId: number;

    departmentId?: number | null;
    jobTitleId?: number | null;
    managerId?: number | null;
}

