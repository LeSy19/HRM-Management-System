'use client';

import { Button, Space, Typography } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface DepartmentHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onOpenCreateModal: () => void;
}

export default function DepartmentHeader({ searchTerm, onSearchChange, onOpenCreateModal }: DepartmentHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Phòng ban</h1>
                <p className="text-sm text-gray-500">Danh sách và thông tin phòng ban trong hệ thống</p>
            </div>

            <div className="flex items-center gap-3">
                {/* Ô Tìm kiếm */}
                <input
                    type="text"
                    placeholder="Tìm tên phòng ban, mã phòng ban"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Nút Thêm mới */}
                <button
                    onClick={onOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    + Thêm phòng ban
                </button>
            </div>
        </div>
    );
}