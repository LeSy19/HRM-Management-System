'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Card, Row, Col, Statistic, Avatar, Typography, Button, Dropdown, Space, Spin } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    ApartmentOutlined,
    CalendarOutlined,
    LogoutOutlined,
    DashboardOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { formatDateVN } from '../../utils/day.util';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

interface UserInfo {
    username: string;
    email: string;
    roleName: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Kiểm tra xác thực (Authentication Check)
        const token = localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user_info');

        if (!token) {
            router.push('/login');
            return;
        }

        if (storedUser) {
            try {
                setUserInfo(JSON.parse(storedUser));
            } catch (e) {
                console.error('Lỗi parse user_info', e);
            }
        }

        setLoading(false);
    }, [router]);

    // Xử lý Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        router.push('/login');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" description="Đang tải dữ liệu Dashboard..." />
            </div>
        );
    }

    // Menu items cho Avatar Dropdown
    const userMenuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Thanh Sidebar bên trái */}
            <Sider breakpoint="lg" collapsedWidth="0">
                <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001529' }}>
                    <Title level={4} style={{ color: '#fff', margin: 0 }}>
                        HRM Dashboard
                    </Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={[
                        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Tổng quan' },
                        { key: 'employees', icon: <TeamOutlined />, label: 'Nhân sự' },
                        { key: 'departments', icon: <ApartmentOutlined />, label: 'Phòng ban' },
                        { key: 'leaves', icon: <CalendarOutlined />, label: 'Quản lý phép' },
                    ]}
                />
            </Sider>

            <Layout>
                {/* Header ở trên */}
                <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
                    <Text strong style={{ fontSize: 16 }}>
                        Xin chào, {userInfo?.username || 'Admin'} 👋
                    </Text>

                    <Space size={20}>
                        <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                    <Text strong>{userInfo?.username}</Text>

                                </div>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                {/* Nội dung Dashboard */}
                <Content style={{ margin: '24px 16px', padding: 24, background: '#f5f5f5', borderRadius: 8 }}>
                    {/* Thẻ Thống kê tổng quan */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card style={{ borderRadius: 8 }}>
                                <Statistic title="Tổng nhân sự" value={128} prefix={<TeamOutlined style={{ color: '#1677ff' }} />} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card style={{ borderRadius: 8 }}>
                                <Statistic title="Phòng ban" value={8} prefix={<ApartmentOutlined style={{ color: '#52c41a' }} />} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card style={{ borderRadius: 8 }}>
                                <Statistic title="Đơn phép chờ duyệt" value={5} prefix={<CalendarOutlined style={{ color: '#faad14' }} />} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card style={{ borderRadius: 8 }}>
                                <Statistic title="Múi giờ hệ thống" value="UTC+7 (VN)" />
                            </Card>
                        </Col>
                    </Row>

                    {/* Khối Thông tin chi tiết */}
                    <Card title="Thông tin phiên đăng nhập hiện tại" style={{ marginTop: 24, borderRadius: 8 }}>
                        <p><strong>Tài khoản:</strong> {userInfo?.username}</p>
                        <p><strong>Email:</strong> {userInfo?.email}</p>
                        <p><strong>Vai trò (Role):</strong> {userInfo?.roleName}</p>
                        <p><strong>Thời gian truy cập:</strong> {formatDateVN(new Date())}</p>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
}