export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    roleName: string;
}

export const getCurrentUser = (): UserInfo | null => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem('user_info');
    if (!storedUser) return null;
    try {
        return JSON.parse(storedUser) as UserInfo;
    } catch (e) {
        return null;
    }
};

// Kiểm tra Role có nằm trong danh sách được phép không
export const hasRole = (allowedRoles: string[]): boolean => {
    const user = getCurrentUser();
    if (!user || !user.roleName) return false;
    return allowedRoles.some(
        (role) => role.toUpperCase() === user.roleName.toUpperCase()
    );
};