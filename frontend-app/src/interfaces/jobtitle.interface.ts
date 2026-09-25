
export interface JobTitleFilterRequestDTO {
    pageIndex?: number;
    pageSize?: number;
    searchTerm?: string;
}

export interface JobTitleResponseDto {
    id: number;
    titleName: string;
    level: string;
    totalEmployees: number;
    isActive: boolean;
}

export interface CreateJobTitleDto {
    titleName: string;
    level: string;
}

export interface UpdateJobTitleDto {
    titleName: string;
    level: string;
    isActive: boolean;
}