"use client";

import { useState, useEffect, useCallback } from "react";
import { EmployeeResponseDTO, CreateEmployeeDTO, UpdateEmployeeDTO } from "@/interfaces/employee.interface";
import { PaginatedResult } from "@/interfaces/pagination.interface";
import { employeeService } from "@/services/employee.service";
import EmployeeHeader from "./components/EmployeeHeader";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeModal from "./components/EmployeeModal";
import { Pagination } from "antd";

export default function EmployeesPage() {
    const [data, setData] = useState<PaginatedResult<EmployeeResponseDTO> | null>(null);
    const [loading, setLoading] = useState(true);

    // States bộ lọc
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponseDTO | null>(null);

    // Load Data
    const loadEmployees = useCallback(async () => {
        try {
            setLoading(true);
            const result = await employeeService.getAllEmployees({
                pageIndex,
                pageSize,
                searchTerm,
            });
            setData(result);
        } catch (error) {
            console.error("Lỗi tải danh sách:", error);
        } finally {
            setLoading(false);
        }
    }, [pageIndex, pageSize, searchTerm]);

    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);

    // Handle Xóa
    const handleDelete = async (id: number) => {
        if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
            await employeeService.deleteEmployee(id);
            loadEmployees();
        }
    };

    // Handle Thêm / Sửa Modal Submit
    const handleSubmitModal = async (formData: CreateEmployeeDTO | UpdateEmployeeDTO) => {
        if (selectedEmployee) {
            await employeeService.updateEmployee(selectedEmployee.id, formData as UpdateEmployeeDTO);
        } else {
            await employeeService.createEmployee(formData as CreateEmployeeDTO);
        }
        loadEmployees();
    };

    return (
        <div className="p-4 max-w-345 mx-auto">
            <EmployeeHeader
                searchTerm={searchTerm}
                onSearchChange={(val) => {
                    setSearchTerm(val);
                    setPageIndex(1);
                }}
                onOpenCreateModal={() => {
                    setSelectedEmployee(null);
                    setIsModalOpen(true);
                }}
            />

            <EmployeeGrid
                employees={data?.items || []}
                loading={loading}
                onEditEmployee={(emp) => {
                    setSelectedEmployee(emp);
                    setIsModalOpen(true);
                }}
                onDeleteEmployee={handleDelete}
            />

            {data && (
                <div
                    style={{
                        width: "100%",
                        marginTop: 15,
                        paddingTop: 16,
                        borderTop: "1px solid #f0f0f0",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    {/* Page Size */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 14,
                        }}
                    >
                        <span>Page Size:</span>

                        <select
                            value={pageSize}
                            onChange={(e) => {
                                const newSize = Number(e.target.value);
                                setPageSize(newSize);
                                setPageIndex(1);
                            }}
                            style={{
                                height: 34,
                                minWidth: 70,
                                padding: "0 8px",
                                border: "1px solid #d9d9d9",
                                borderRadius: 6,
                                background: "#fff",
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    {/* 1 to 10 of 25 */}
                    <span style={{ fontSize: 14 }}>
                        {data.totalCount === 0
                            ? "0 to 0 of 0"
                            : `${(pageIndex - 1) * pageSize + 1} to ${Math.min(
                                pageIndex * pageSize,
                                data.totalCount
                            )} of ${data.totalCount}`}
                    </span>

                    {/* Page 1 of 3 */}
                    <span style={{ fontSize: 14 }}>
                        Page <strong>{pageIndex}</strong> of{" "}
                        <strong>{Math.ceil(data.totalCount / pageSize)}</strong>
                    </span>

                    {/* Pagination */}
                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={data.totalCount}
                        onChange={(page) => setPageIndex(page)}
                        showSizeChanger={false}
                        showLessItems
                    />
                </div>
            )}

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitModal}
                employee={selectedEmployee}
            />
        </div>
    );
}