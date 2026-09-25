import { PaginatedResult, PaginationParams } from '@/interfaces/pagination.interface';
import {
    DepartmentResponseDto,
    CreateDepartmentDto,
    UpdateDepartmentDto,
    DepartmentFilterRequestDTO,
} from '../interfaces/department.interface';
import apiClient from "@/api/api-clients";
import { EndPoint } from '@/api/endpoint';

export const departmentService = {
    // Lấy danh sách phòng ban phân trang (Trả về toàn bộ đối tượng PaginatedResult)
    getAllDepartments: async (params?: DepartmentFilterRequestDTO): Promise<PaginatedResult<DepartmentResponseDto>> => {
        const response = await apiClient.get<PaginatedResult<DepartmentResponseDto>>(EndPoint.Departments.GetAllDepartments, {
            params,
        });
        return response.data;
    },


    // Lấy chi tiết 1 phòng ban
    getDepartmentById: async (id: number): Promise<DepartmentResponseDto> => {
        const response = await apiClient.get<DepartmentResponseDto>(EndPoint.Departments.GetDepartmentById(id));
        return response.data;
    },

    // Tạo phòng ban mới
    createDepartment: async (data: CreateDepartmentDto): Promise<DepartmentResponseDto> => {
        const response = await apiClient.post<DepartmentResponseDto>(EndPoint.Departments.createDepartment, data);
        return response.data;
    },

    // Cập nhật phòng ban
    updateDepartment: async (
        id: number,
        data: UpdateDepartmentDto
    ): Promise<DepartmentResponseDto> => {
        const response = await apiClient.put<DepartmentResponseDto>(
            EndPoint.Departments.updateDepartment(id),
            data
        );
        return response.data;
    },

    // Xóa phòng ban
    deleteDepartment: async (id: number): Promise<void> => {
        await apiClient.delete(EndPoint.Departments.deleteDepartment(id));
    },
};

