'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    Form,
    Input,
    Button,
    Alert,
    Typography,
    Layout,
    Divider,
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    ArrowRightOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import apiClient from '../../../api/api-clients';

const { Title, Text } = Typography;

interface LoginFormValues {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();

    const onFinish = async (values: LoginFormValues) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            // Gọi API Login tới Backend .NET
            const res = await apiClient.post('/auth/login', {
                username: values.username,
                password: values.password,
            });

            // Lưu Access Token
            if (res.data?.accessToken) {
                localStorage.setItem(
                    'access_token',
                    res.data.accessToken
                );

                // Lưu Refresh Token
                if (res.data.refreshToken) {
                    localStorage.setItem(
                        'refresh_token',
                        res.data.refreshToken
                    );
                }

                // Lưu thông tin user
                localStorage.setItem(
                    'user_info',
                    JSON.stringify({
                        userId: res.data.userId,
                        username: res.data.username,
                        email: res.data.email,
                        roleName: res.data.roleName,
                    })
                );

                // Chuyển tới Dashboard
                router.push('/dashboard');
            }
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.title ||
                'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!';

            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background: '#f5f7fb',
            }}
        >
            {/* Background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(135deg, #0f172a 0%, #172554 45%, #1d4ed8 100%)',
                }}
            />

            {/* Decorative circles */}
            <div
                style={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)',
                    top: -200,
                    right: -150,
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    width: 450,
                    height: 450,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 70%)',
                    bottom: -200,
                    left: -150,
                }}
            />

            {/* Main content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px 20px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: 1050,
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                    }}
                >
                    {/* LEFT - Branding */}
                    <div
                        style={{
                            flex: 1,
                            maxWidth: 520,
                            color: '#fff',
                            padding: '50px 60px 50px 30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Logo */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                marginBottom: 35,
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    background:
                                        'rgba(255,255,255,0.12)',
                                    border:
                                        '1px solid rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <TeamOutlined
                                    style={{
                                        fontSize: 27,
                                        color: '#60a5fa',
                                    }}
                                />
                            </div>

                            <div>
                                <div
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 700,
                                        letterSpacing: '-0.5px',
                                    }}
                                >
                                    HRM SYSTEM
                                </div>

                                <div
                                    style={{
                                        fontSize: 12,
                                        color: 'rgba(255,255,255,0.65)',
                                        letterSpacing: 1,
                                    }}
                                >
                                    HUMAN RESOURCE MANAGEMENT
                                </div>
                            </div>
                        </div>

                        <Title
                            style={{
                                color: '#fff',
                                fontSize: 42,
                                lineHeight: 1.15,
                                fontWeight: 700,
                                margin: '0 0 20px',
                                letterSpacing: '-1px',
                            }}
                        >
                            Quản lý nhân sự
                            <br />
                            <span
                                style={{
                                    color: '#60a5fa',
                                }}
                            >
                                đơn giản & hiệu quả
                            </span>
                        </Title>

                        <Text
                            style={{
                                color: 'rgba(255,255,255,0.72)',
                                fontSize: 16,
                                lineHeight: 1.8,
                                maxWidth: 450,
                            }}
                        >
                            Hệ thống quản trị nhân sự toàn diện,
                            giúp doanh nghiệp quản lý nhân viên,
                            phòng ban, nghỉ phép và các hoạt động
                            nhân sự một cách hiệu quả.
                        </Text>

                        {/* Feature list */}
                        <div
                            style={{
                                marginTop: 38,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                            }}
                        >
                            {[
                                'Quản lý nhân viên tập trung',
                                'Quản lý phòng ban & chức vụ',
                                'Quản lý nghỉ phép & ngày phép',
                            ].map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: 14,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background:
                                                'rgba(59,130,246,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#60a5fa',
                                        }}
                                    >
                                        ✓
                                    </div>

                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT - Login */}
                    <Card
                        variant={"borderless"}
                        style={{
                            width: 420,
                            flexShrink: 0,
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow:
                                '0 25px 60px rgba(0,0,0,0.28)',
                            background: 'rgba(255,255,255,0.98)',
                        }}
                        styles={{
                            body: {
                                padding: '42px 38px 38px',
                            },
                        }}
                    >
                        {/* Login header */}
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: 32,
                            }}
                        >
                            <div
                                style={{
                                    width: 68,
                                    height: 68,
                                    margin: '0 auto 18px',
                                    borderRadius: 18,
                                    background:
                                        'linear-gradient(135deg, #eff6ff, #dbeafe)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow:
                                        '0 8px 20px rgba(37,99,235,0.12)',
                                }}
                            >
                                <SafetyCertificateOutlined
                                    style={{
                                        fontSize: 32,
                                        color: '#2563eb',
                                    }}
                                />
                            </div>

                            <Title
                                level={2}
                                style={{
                                    margin: '0 0 8px',
                                    fontSize: 27,
                                    fontWeight: 700,
                                    color: '#111827',
                                }}
                            >
                                Chào mừng trở lại
                            </Title>

                            <Text
                                style={{
                                    color: '#6b7280',
                                    fontSize: 14,
                                }}
                            >
                                Đăng nhập để tiếp tục vào hệ thống
                            </Text>
                        </div>

                        {/* Error */}
                        {errorMessage && (
                            <Alert
                                message={errorMessage}
                                type="error"
                                showIcon
                                closable
                                onClose={() =>
                                    setErrorMessage(null)
                                }
                                style={{
                                    marginBottom: 22,
                                    borderRadius: 10,
                                }}
                            />
                        )}

                        {/* Login form */}
                        <Form<LoginFormValues>
                            name="login_form"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            size="large"
                        >
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: '#374151',
                                        }}
                                    >
                                        Tài khoản
                                    </span>
                                }
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{
                                                color: '#9ca3af',
                                            }}
                                        />
                                    }
                                    placeholder="Nhập tên tài khoản"
                                    style={{
                                        height: 48,
                                        borderRadius: 10,
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: '#374151',
                                        }}
                                    >
                                        Mật khẩu
                                    </span>
                                }
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined
                                            style={{
                                                color: '#9ca3af',
                                            }}
                                        />
                                    }
                                    placeholder="Nhập mật khẩu"
                                    style={{
                                        height: 48,
                                        borderRadius: 10,
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginTop: 28,
                                    marginBottom: 0,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    icon={
                                        !loading && (
                                            <ArrowRightOutlined />
                                        )
                                    }
                                    iconPlacement="start"
                                    style={{
                                        height: 50,
                                        borderRadius: 10,
                                        fontSize: 15,
                                        fontWeight: 600,
                                        background:
                                            'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                        border: 'none',
                                        boxShadow:
                                            '0 8px 18px rgba(37,99,235,0.25)',
                                    }}
                                >
                                    {loading
                                        ? 'Đang đăng nhập...'
                                        : 'Đăng nhập'}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Divider
                            style={{
                                margin: '28px 0 20px',
                            }}
                        />

                        {/* Footer */}
                        <div
                            style={{
                                textAlign: 'center',
                                color: '#9ca3af',
                                fontSize: 12,
                            }}
                        >
                            <div>
                                🔒 Kết nối được bảo mật
                            </div>

                            <div
                                style={{
                                    marginTop: 7,
                                }}
                            >
                                © 2026 HRM System. All rights reserved.
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
