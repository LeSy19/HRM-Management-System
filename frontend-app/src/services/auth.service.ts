import apiClient from '../api/api-clients';

// 1. Định nghĩa kiểu dữ liệu Input & Output
export interface LoginFormValues {
    username: string;
    password?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    userId: number;
    username: string;
    email: string;
    roleName: string;
}

// 2. Định nghĩa AuthService
export const authService = {
    login: async (values: LoginFormValues): Promise<LoginResponse> => {
        // Gọi API
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            username: values.username,
            password: values.password,
        });

        const data = response.data;

        // Tự động lưu Token và thông tin User vào localStorage
        if (data?.accessToken) {
            localStorage.setItem('access_token', data.accessToken);

            if (data.refreshToken) {
                localStorage.setItem('refresh_token', data.refreshToken);
            }

            localStorage.setItem(
                'user_info',
                JSON.stringify({
                    userId: data.userId,
                    username: data.username,
                    email: data.email,
                    roleName: data.roleName,
                })
            );
        }

        return data;
    },

    // Hàm tiện ích đăng xuất
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
    },
};