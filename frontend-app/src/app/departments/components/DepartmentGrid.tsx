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

import { Button, Space, Popconfirm } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { formatDateVN } from '@/utils/day.util';
import type { DepartmentResponseDto } from '@/interfaces/department.interface';

ModuleRegistry.registerModules([
    PaginationModule,
    RowSelectionModule,
    AllCommunityModule,
]);

interface DepartmentGridProps {
    departments: DepartmentResponseDto[];
    loading: boolean;
    onEditDepartment: (record: DepartmentResponseDto) => void;
    onDeleteDepartment: (id: number) => void;
}

export default function DepartmentGrid({
    departments,
    loading,
    onEditDepartment,
    onDeleteDepartment,
}: DepartmentGridProps) {

    const columnDefs = useMemo<ColDef<DepartmentResponseDto>[]>(
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
                field: 'code',
                headerName: 'Mã phòng ban',
                filter: true,
                sortable: true,
                width: 160,
            },

            {
                field: 'name',
                headerName: 'Tên phòng ban',
                filter: true,
                sortable: true,
                flex: 1,
                minWidth: 180,
            },

            {
                field: 'managerId',
                headerName: 'Mã Trưởng phòng',
                filter: true,
                sortable: true,
                flex: 1.5,
                minWidth: 200,
            },
            {
                field: 'managerName',
                headerName: 'Tên Trưởng phòng',
                filter: true,
                sortable: true,
                flex: 1.5,
                minWidth: 200,
            },
            {
                field: 'totalEmployees',
                headerName: 'Số lượng nhân viên',
                filter: true,
                sortable: true,
                flex: 1.5,
                minWidth: 200,
            },

            {
                field: 'createdAt',
                headerName: 'Ngày tạo',
                width: 180,
                sortable: true,
                valueFormatter: (params) =>
                    params.value
                        ? formatDateVN(params.value)
                        : '',
            },

            {
                headerName: 'Thao tác',
                width: 140,
                pinned: 'right',
                sortable: false,
                filter: false,

                cellRenderer: (params: any) => {
                    const record =
                        params.data as DepartmentResponseDto;

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
                                onClick={() => onEditDepartment(record)}
                            />

                            {/* DELETE */}
                            <Popconfirm
                                title="Xác nhận xóa"
                                description="Bạn có chắc chắn muốn xóa phòng ban này?"
                                onConfirm={() =>
                                    onDeleteDepartment(record.id)
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
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        </Space>
                    );
                },
            },
        ],
        [onEditDepartment, onDeleteDepartment]
    );

    return (
        <div
            style={{
                width: '100%',
                height: 500,
            }}
        >
            <AgGridReact<DepartmentResponseDto>
                rowData={departments}
                columnDefs={columnDefs}

                /* AG Grid 36 Theme API */
                theme={themeQuartz}

                //* Tắt phân trang của AG Grid vì Backend đã cắt dữ liệu */
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
