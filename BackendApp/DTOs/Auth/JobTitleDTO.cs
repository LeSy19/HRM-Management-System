namespace BackendApp.DTOs;

public record JobTitleResponseDto(
    int Id,
    string TitleName,
    string Level,
    int TotalEmployees
);

public record CreateJobTitleDto(
    string TitleName,
    string Level
);

public record UpdateJobTitleDto(
    string TitleName,
    string Level
);