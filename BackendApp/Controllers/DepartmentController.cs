namespace BackendApp.Controllers;

using BackendApp.DTOs;
using BackendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DepartmentsController : ControllerBase
{
    private readonly DepartmentService _service;

    public DepartmentsController(DepartmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllDepartmentsAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var res = await _service.GetDepartmentByIdAsync(id);
        return res == null ? NotFound(new { message = "Không tìm thấy phòng ban." }) : Ok(res);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,HRManager")]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        var res = await _service.CreateAsync(dto);
        if (res == null) return BadRequest(new { message = "Mã phòng ban đã tồn tại." });
        return CreatedAtAction(nameof(GetById), new { id = res.Id }, res);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin,HRManager")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        try
        {
            var res = await _service.UpdateAsync(id, dto);
            return res == null ? NotFound(new { message = "Không tìm thấy phòng ban." }) : Ok(res);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, message) = await _service.DeleteAsync(id);
        return success ? Ok(new { message }) : BadRequest(new { message });
    }
}