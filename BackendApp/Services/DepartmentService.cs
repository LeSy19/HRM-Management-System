using BackendApp.Data;
using BackendApp.DTOs;
using BackendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Services;


public class DepartmentService
{
    private readonly AppDbContext _dbContext;

    public DepartmentService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    // Lấy danh sách tất cả phòng ban
    public async Task<List<DepartmentResponseDto>> GetAllDepartmentsAsync()
    {
        return await _dbContext.Departments
            .Select(d => new DepartmentResponseDto(
                d.Id,
                d.Code,
                d.Name,
                d.ManagerId,
                d.Manager != null ? d.Manager.FullName : null,
                d.Employees.Count,
                d.CreatedAt
            ))
            .ToListAsync();
    }

    public async Task<DepartmentResponseDto?> GetDepartmentByIdAsync(int id)
    {
        var department = await _dbContext.Departments
            .Include(d => d.Manager)
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (department == null) return null;

        return MapToDepartmentDTO(department);
    }

    public async Task<DepartmentResponseDto?> CreateDepartmentAsync(CreateDepartmentDto dto)
    {

        if (await _dbContext.Departments.AnyAsync(d => d.Code == dto.Code))
            return null; // Mã phòng ban đã tồn tại

        var dept = new Department
        {
            Code = dto.Code.ToUpper(),
            Name = dto.Name,
            ManagerId = dto.ManagerId
        };

        _dbContext.Departments.Add(dept);
        await _dbContext.SaveChangesAsync();

        if (dept.ManagerId.HasValue)
            await _dbContext.Entry(dept).Reference(d => d.Manager).LoadAsync();

        return MapToDepartmentDTO(dept);
    }


    public async Task<DepartmentResponseDto?> UpdateDepartmentAsync(int id, UpdateDepartmentDto dto)
    {
        var dept = await _dbContext.Departments
            .Include(d => d.Manager)
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (dept == null) return null;

        // Check mã trùng với phòng ban khác
        if (await _dbContext.Departments.AnyAsync(d => d.Code == dto.Code && d.Id != id))
            throw new ArgumentException("Mã phòng ban đã được sử dụng.");

        dept.Code = dto.Code.ToUpper();
        dept.Name = dto.Name;
        dept.ManagerId = dto.ManagerId;

        await _dbContext.SaveChangesAsync();

        return MapToDepartmentDTO(dept);
    }

    public async Task<(bool Success, string Message)> DeleteDepartmentAsync(int id)
    {
        var dept = await _dbContext.Departments
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (dept == null)
            return (false, "Không tìm thấy phòng ban.");

        // BUSINESS RULE: Không cho phép xóa nếu vẫn còn nhân viên
        if (dept.Employees.Any())
            return (false, $"Không thể xóa phòng ban '{dept.Name}' vì đang có {dept.Employees.Count} nhân viên thuộc phòng này.");

        _dbContext.Departments.Remove(dept);
        await _dbContext.SaveChangesAsync();
        return (true, "Xóa phòng ban thành công.");
    }
    public static DepartmentResponseDto MapToDepartmentDTO(Department d)
    {
        return new DepartmentResponseDto(
            d.Id,
            d.Code,
            d.Name,
            d.ManagerId,
            d.Manager != null ? d.Manager.FullName : null,
            d.Employees.Count,
            d.CreatedAt
        );
    }

}