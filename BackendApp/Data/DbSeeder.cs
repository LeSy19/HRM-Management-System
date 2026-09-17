using BackendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Data;

public static class DbSeeder
{
    public static async Task SeedRolesAsync(AppDbContext context)
    {
        if (!await context.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new Role { Name = "Admin", Description = "Quản trị viên hệ thống" },
                new Role { Name = "HRManager", Description = "Quản lý nhân sự" },
                new Role { Name = "Employee", Description = "Nhân viên" }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        // 2. Seed tài khoản Admin mặc định nếu chưa có Employee nào
        if (!await context.Employees.AnyAsync())
        {
            var adminEmployee = new Employee
            {
                EmployeeCode = "EMP-001",
                Username = "admin",
                Email = "admin@company.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"), // Mật khẩu mặc định: Admin@123
                FullName = "System Administrator",
                Status = "ACTIVE",
                HireDate = DateTime.UtcNow,
                RoleId = 1 // Gán Role Admin (Id = 1)
            };

            await context.Employees.AddAsync(adminEmployee);
            await context.SaveChangesAsync();
        }

    }


}