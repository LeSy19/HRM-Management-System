'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../api/api-clients';

export default function TestConnectionPage() {
    const [status, setStatus] = useState<string>('Đang kết nối...');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        // Gọi thử một endpoint public hoặc endpoint lấy thông tin (ví dụ: /employees hoặc /health)
        apiClient
            .get('/departments') // Thay đổi endpoint nếu cần
            .then((res) => {
                setStatus(`✅ Kết nối thành công! Server trả về ${Array.isArray(res.data) ? res.data.length : 'dữ liệu'}`);
            })
            .catch((err) => {
                setStatus('❌ Kết nối thất bại!');
                setErrorMsg(err.message || 'Không thể kết nối đến Backend');
            });
    }, []);

    return (
        <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
            <h1>Kiểm tra kết nối Frontend & Backend</h1>
            <p style={{ fontSize: 18 }}><strong>Trạng thái:</strong> {status}</p>
            {errorMsg && (
                <div style={{ color: 'red', marginTop: 10 }}>
                    <strong>Chi tiết lỗi:</strong> {errorMsg}
                </div>
            )}
        </div>
    );
}