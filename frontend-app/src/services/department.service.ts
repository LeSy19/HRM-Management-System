import apiClient from '../api/api-clients';
import {
    DepartmentResponseDto,
    CreateDepartmentDto,
    UpdateDepartmentDto,
} from '../interfaces/department.interface';

export const departmentService = {
    // Lấy danh sách phòng ban
    getAll: async (): Promise<DepartmentResponseDto[]> => {
        const response = await apiClient.get<DepartmentResponseDto[]>('/departments');
        return response.data;
    },

    // Lấy chi tiết 1 phòng ban
    getById: async (id: string): Promise<DepartmentResponseDto> => {
        const response = await apiClient.get<DepartmentResponseDto>(
            `/departments/${id}`
        );
        return response.data;
    },

    // Tạo phòng ban mới
    create: async (
        data: CreateDepartmentDto
    ): Promise<DepartmentResponseDto> => {
        const response = await apiClient.post<DepartmentResponseDto>(
            '/departments',
            data
        );
        return response.data;
    },

    // Cập nhật phòng ban
    update: async (
        id: string,
        data: UpdateDepartmentDto
    ): Promise<DepartmentResponseDto> => {
        const response = await apiClient.put<DepartmentResponseDto>(
            `/departments/${id}`,
            data
        );
        return response.data;
    },

    // Xóa phòng ban
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/departments/${id}`);
    },
};

