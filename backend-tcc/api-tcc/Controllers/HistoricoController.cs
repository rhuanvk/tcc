using api_tcc.Data;
using api_tcc.Models;
using api_tcc.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api_tcc.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HistoricoController : ControllerBase
{
    private readonly DbRepository _repository;

    public HistoricoController(DbRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetHistorico()
    {
        List<Historico> historico = await _repository.GetHistorico();
        return Ok(historico);
    }
}