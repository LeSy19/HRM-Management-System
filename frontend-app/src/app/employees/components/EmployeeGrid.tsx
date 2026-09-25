'use client';

import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    themeQuartz,
    ModuleRegistry,
    PaginationModule,
    RowSelectionModule,
    AllCommunityModule,
} from 'ag-grid-community';

import { Button, Space, Popconfirm, Tag } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { formatDateVN } from '@/utils/day.util';
import type { EmployeeResponseDTO } from '@/interfaces/employee.interface';

ModuleRegistry.registerModules([
    PaginationModule,
    RowSelectionModule,
    AllCommunityModule,
]);

interface EmployeeGridProps {
    employees: EmployeeResponseDTO[];
    loading: boolean;
    onEditEmployee: (employee: EmployeeResponseDTO) => void;
    onDeleteEmployee: (id: number) => void;
}

export default function EmployeeGrid({
    employees,
    loading,
    onEditEmployee,
    onDeleteEmployee,
}: EmployeeGridProps) {

    const columnDefs = useMemo<ColDef<EmployeeResponseDTO>[]>(
        () => [
            {
                headerName: 'STT',
                valueGetter: (params) =>
                    params.node?.rowIndex != null
                        ? params.node.rowIndex + 1
                        : '',
                width: 80,
                pinned: 'left',
                sortable: false,
                filter: false,
            },

            {
                field: 'employeeCode',
                headerName: 'Mã nhân viên',
                filter: true,
                sortable: true,
                width: 150,
            },

            {
                field: 'fullName',
                headerName: 'Họ và tên',
                filter: true,
                sortable: true,
                flex: 1.2,
                minWidth: 180,
            },

            {
                field: 'username',
                headerName: 'Username',
                filter: true,
                sortable: true,
                flex: 1,
                minWidth: 160,
            },

            {
                field: 'email',
                headerName: 'Email',
                filter: true,
                sortable: true,
                flex: 1.5,
                minWidth: 220,
            },

            {
                field: 'phone',
                headerName: 'Số điện thoại',
                filter: true,
                sortable: true,
                width: 160,
                valueFormatter: (params) =>
                    params.value || '-',
            },

            {
                field: 'roleName',
                headerName: 'Vai trò',
                filter: true,
                sortable: true,
                width: 150,
            },

            {
                field: 'departmentName',
                headerName: 'Phòng ban',
                filter: true,
                sortable: true,
                flex: 1,
                minWidth: 170,
                valueFormatter: (params) =>
                    params.value || '-',
            },

            {
                field: 'jobTitleName',
                headerName: 'Chức vụ',
                filter: true,
                sortable: true,
                flex: 1,
                minWidth: 170,
                valueFormatter: (params) =>
                    params.value || '-',
            },

            {
                field: 'managerName',
                headerName: 'Quản lý trực tiếp',
                filter: true,
                sortable: true,
                flex: 1,
                minWidth: 180,
                valueFormatter: (params) =>
                    params.value || '-',
            },

            {
                field: 'hireDate',
                headerName: 'Ngày vào làm',
                width: 170,
                sortable: true,
                valueFormatter: (params) =>
                    params.value
                        ? formatDateVN(params.value)
                        : '',
            },

            {
                field: 'endDate',
                headerName: 'Ngày kết thúc',
                width: 170,
                sortable: true,
                valueFormatter: (params) =>
                    params.value
                        ? formatDateVN(params.value)
                        : '',
            },

            {
                field: 'status',
                headerName: 'Trạng thái',
                width: 150,
                sortable: true,
                filter: true,

                cellRenderer: (params: any) => {
                    const status = params.value;

                    if (!status) {
                        return '-';
                    }

                    switch (status) {
                        case 'ACTIVE':
                            return (
                                <Tag color="green">
                                    ACTIVE
                                </Tag>
                            );

                        case 'PROBATION':
                            return (
                                <Tag color="gold">
                                    PROBATION
                                </Tag>
                            );

                        case 'ON_LEAVE':
                            return (
                                <Tag color="blue">
                                    ON LEAVE
                                </Tag>
                            );

                        case 'TERMINATED':
                            return (
                                <Tag color="red">
                                    TERMINATED
                                </Tag>
                            );

                        default:
                            return (
                                <Tag>
                                    {status}
                                </Tag>
                            );
                    }
                },
            },

            {
                headerName: 'Thao tác',
                width: 140,
                pinned: 'right',
                sortable: false,
                filter: false,

                cellRenderer: (params: any) => {
                    const record =
                        params.data as EmployeeResponseDTO;

                    if (!record) {
                        return null;
                    }

                    return (
                        <Space size="small">
                            {/* EDIT */}
                            <Button
                                type="text"
                                icon={
                                    <EditOutlined
                                        style={{
                                            color: '#1677ff',
                                        }}
                                    />
                                }
                                onClick={() =>
                                    onEditEmployee(record)
                                }
                            />

                            {/* DELETE */}
                            <Popconfirm
                                title="Xác nhận xóa"
                                description="Bạn có chắc chắn muốn xóa nhân viên này?"
                                onConfirm={() =>
                                    onDeleteEmployee(record.id)
                                }
                                okText="Xóa"
                                cancelText="Hủy"
                                okButtonProps={{
                                    danger: true,
                                }}
                            >
                                <Button
                                    type="text"
                                    danger
                                    icon={
                                        <DeleteOutlined />
                                    }
                                />
                            </Popconfirm>
                        </Space>
                    );
                },
            },
        ],
        [onEditEmployee, onDeleteEmployee]
    );

    return (
        <div
            style={{
                width: '100%',
                height: 500,
            }}
        >
            <AgGridReact<EmployeeResponseDTO>
                rowData={employees}
                columnDefs={columnDefs}

                /* AG Grid Theme */
                theme={themeQuartz}

                /* Pagination */
                pagination={false}


                /* Loading */
                loading={loading}

                /* Animation */
                animateRows={true}

                /* Selection */
                rowSelection={{
                    mode: 'singleRow',
                }}

                /* Default column */
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    filter: true,
                }}
            />
        </div>
    );
}