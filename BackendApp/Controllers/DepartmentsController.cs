
using BackendApp.DTOs;
using BackendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BackendApp.Configurations;

namespace BackendApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly DepartmentService _service;

    public DepartmentsController(DepartmentService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Policy = RolePolicySetup.Policies.Management)] // Admin/Manager xem danh sách
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllDepartmentsAsync());

    [HttpGet("{id:int}")]
    [Authorize(Policy = RolePolicySetup.Policies.Management)] // Chỉ Admin hoặc Manager được tạo
    public async Task<IActionResult> GetById(int id)
    {
        var res = await _service.GetDepartmentByIdAsync(id);
        return res == null ? NotFound(new { message = "Không tìm thấy phòng ban." }) : Ok(res);
    }

    [HttpPost]
    [Authorize(Policy = RolePolicySetup.Policies.Management)]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        var res = await _service.CreateDepartmentAsync(dto);
        if (res == null) return BadRequest(new { message = "Mã phòng ban đã tồn tại." });
        return CreatedAtAction(nameof(GetById), new { id = res.Id }, res);
    }

    [HttpPut("{id:int}")]
    [Authorize(Policy = RolePolicySetup.Policies.Management)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        try
        {
            var res = await _service.UpdateDepartmentAsync(id, dto);
            return res == null ? NotFound(new { message = "Không tìm thấy phòng ban." }) : Ok(res);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize(Policy = RolePolicySetup.Policies.AdminOnly)]
    public async Task<IActionResult> Delete(int id)
    {
        var (success, message) = await _service.DeleteDepartmentAsync(id);
        return success ? Ok(new { message }) : BadRequest(new { message });
    }
}