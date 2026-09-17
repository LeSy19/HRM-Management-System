using Microsoft.AspNetCore.Mvc;
using BackendApp.DTOs;
using BackendApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace BackendApp.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobTitlesController : ControllerBase
{
    private readonly JobTitleService _service;

    public JobTitlesController(JobTitleService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllJobTitles() => Ok(await _service.GetAllJobTitlesAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetJobTitleById(int id)
    {
        var res = await _service.GetJobTitleByIdAsync(id);
        return res == null ? NotFound(new { message = "Không tìm thấy chức danh." }) : Ok(res);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,HRManager")]
    public async Task<IActionResult> CreateJobTitle([FromBody] CreateJobTitleDto dto)
    {
        var res = await _service.CreateJobTitleAsync(dto);
        return CreatedAtAction(nameof(GetJobTitleById), new { id = res.Id }, res);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin,HRManager")]
    public async Task<IActionResult> UpdateJobTitle(int id, [FromBody] UpdateJobTitleDto dto)
    {
        var res = await _service.UpdateJobTitleAsync(id, dto);
        return res == null ? NotFound(new { message = "Không tìm thấy chức danh." }) : Ok(res);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, message) = await _service.DeleteJobTitleAsync(id);
        return success ? Ok(new { message }) : BadRequest(new { message });
    }
}