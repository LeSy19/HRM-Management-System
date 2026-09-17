namespace BackendApp.DTOs;

public record DepartmentResponseDto(
    int Id,
    string Code,
    string Name,
    int? ManagerId,
    string? ManagerName,
    int TotalEmployees,
    DateTime CreatedAt
);

public record CreateDepartmentDto(
    string Code,
    string Name,
    int? ManagerId
);

public record UpdateDepartmentDto(
    string Code,
    string Name,
    int? ManagerId
);
