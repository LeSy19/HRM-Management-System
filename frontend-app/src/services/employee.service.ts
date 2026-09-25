import apiClient from "@/api/api-clients";
import { EndPoint } from "@/api/endpoint";
import {
    EmployeeFilterRequestDTO,
    EmployeeResponseDTO,
    CreateEmployeeDTO,
    UpdateEmployeeDTO,
} from "@/interfaces/employee.interface";
import { PaginatedResult } from "@/interfaces/pagination.interface";

export const employeeService = {
    // Lấy danh sách phân trang + lọc
    async getAllEmployees(params: EmployeeFilterRequestDTO): Promise<PaginatedResult<EmployeeResponseDTO>> {
        const response = await apiClient.get<PaginatedResult<EmployeeResponseDTO>>(EndPoint.Employees.GetAllEmployees, {
            params,
        });
        return response.data;
    },

    // Lấy chi tiết nhân viên theo ID
    async getEmployeeById(id: number): Promise<EmployeeResponseDTO> {
        const response = await apiClient.get<EmployeeResponseDTO>(EndPoint.Employees.GetEmployeeById(id));
        return response.data;
    },

    // Tạo nhân viên mới
    async createEmployee(data: CreateEmployeeDTO): Promise<EmployeeResponseDTO> {
        const response = await apiClient.post<EmployeeResponseDTO>(EndPoint.Employees.CreateEmployee, data);
        return response.data;
    },

    // Cập nhật thông tin nhân viên
    async updateEmployee(id: number, data: UpdateEmployeeDTO): Promise<EmployeeResponseDTO> {
        const response = await apiClient.put<EmployeeResponseDTO>(EndPoint.Employees.UpdateEmployee(id), data);
        return response.data;
    },

    // Xóa nhân viên
    async deleteEmployee(id: number): Promise<boolean> {
        const response = await apiClient.delete(EndPoint.Employees.DeleteEmployee(id));
        return response.status === 200 || response.status === 204;
    },
};