'use client';

import { useEffect, useState } from 'react';
import { Modal, Drawer, Form, Input, Select } from 'antd';
import { DepartmentResponseDto, CreateDepartmentDto } from '../../../interfaces/department.interface';
import { employeeService } from '@/services/employee.service';

interface DepartmentModalProps {
    isOpen: boolean;
    editingDepartment: DepartmentResponseDto | null;
    onClose: () => void;
    onSubmit: (values: CreateDepartmentDto) => void;
}

interface EmployeeOption {
    id: number;
    fullName: string;
    employeeCode: string;
}

export default function DepartmentModal({ isOpen, editingDepartment, onClose, onSubmit }: DepartmentModalProps) {
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState<EmployeeOption[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Lấy danh sách nhân viên cho Dropdown
    useEffect(() => {
        if (isOpen) {
            const fetchEmployees = async () => {
                try {
                    setLoadingEmployees(true);
                    const res = await employeeService.getAllEmployees({ pageIndex: 1, pageSize: 100 });

                    // Lọc những nhân viên đang ACTIVE
                    const activeEmployees = res.items
                        .filter((e) => e.status === 'ACTIVE')
                        .map((e) => ({
                            id: e.id,
                            fullName: e.fullName,
                            employeeCode: e.employeeCode,
                        }));

                    setEmployees(activeEmployees);
                } catch (error) {
                    console.error('Lỗi khi tải danh sách nhân viên:', error);
                } finally {
                    setLoadingEmployees(false);
                }
            };

            fetchEmployees();

            if (editingDepartment) {
                form.setFieldsValue(editingDepartment);
            } else {
                form.resetFields();
            }
        }
    }, [isOpen, editingDepartment, form]);

    const handleFormSubmit = async (values: CreateDepartmentDto) => {
        try {
            setSubmitting(true);
            await onSubmit(values);
        } finally {
            setSubmitting(false);
        }
    };

    // Nội dung Form dùng chung cho cả Modal và Drawer
    const renderFormContent = () => (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
        >
            {/* MÃ PHÒNG BAN */}
            <Form.Item
                name="code"
                label="Mã phòng ban"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã phòng ban!',
                    },
                    {
                        whitespace: true,
                        message: 'Mã phòng ban không được để trống!',
                    },
                ]}
            >
                <Input
                    placeholder="VD: HR, IT, FIN, MKT, SALES"
                    disabled={!!editingDepartment} // Khóa mã phòng ban khi cập nhật
                    maxLength={20}
                />
            </Form.Item>

            {/* TÊN PHÒNG BAN */}
            <Form.Item
                name="name"
                label="Tên phòng ban"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên phòng ban!',
                    },
                    {
                        whitespace: true,
                        message: 'Tên phòng ban không được để trống!',
                    },
                ]}
            >
                <Input
                    placeholder="VD: Phòng Nhân sự"
                    maxLength={100}
                />
            </Form.Item>

            {/* TRƯỞNG PHÒNG (SELECT DROPDOWN) */}
            <Form.Item
                name="managerId"
                label="Trưởng phòng"
                tooltip="Chọn nhân viên sẽ làm trưởng phòng. Có thể bỏ trống nếu chưa phân công."
            >
                <Select
                    placeholder="-- Chọn Trưởng phòng --"
                    loading={loadingEmployees}
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    options={employees.map((e) => ({
                        value: e.id,
                        label: `${e.fullName} (${e.employeeCode})`,
                    }))}
                    listHeight={200}
                />
            </Form.Item>

            {/* Buttons Thao tác ở góc dưới của Form */}
            <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {submitting ? 'Đang xử lý...' : editingDepartment ? 'Cập nhật' : 'Tạo mới'}
                </button>
            </div>
        </Form>
    );

    if (!isOpen) return null;

    // TRƯỜNG HỢP 1: Cập nhật phòng ban -> Dùng Drawer trượt từ bên phải sang
    if (editingDepartment) {
        return (
            <Drawer
                title={<span className="font-bold text-lg">Cập nhật phòng ban</span>}
                placement="right"
                width={440}
                onClose={onClose}
                open={isOpen}
            >
                {renderFormContent()}
            </Drawer>
        );
    }

    // TRƯỜNG HỢP 2: Thêm mới phòng ban -> Dùng Modal Popup đè giữa màn hình
    return (
        <Modal
            title="Thêm mới phòng ban"
            open={isOpen}
            onCancel={onClose}
            footer={null} // Tắt footer mặc định của Modal vì đã dùng nút custom bên trong renderFormContent
        >
            {renderFormContent()}
        </Modal>
    );
}