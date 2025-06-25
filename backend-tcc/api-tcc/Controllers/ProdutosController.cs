using api_tcc.Models;
using api_tcc.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api_tcc.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly DbRepository _repository;

    public ProdutosController(DbRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetProdutos()
    {
        List<Produto> produtos = await _repository.GetProdutos();
        return Ok(produtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduto(int id)
    {
        Produto? produto = await _repository.GetProduto(id);
        
        if (produto == null) return NotFound();
        return Ok(produto);
    }

    [HttpPost]
    public async Task<IActionResult> AddProduto(Produto produto)
    {
        int novoId = await _repository.AddProduto(produto);
        
        return CreatedAtAction(nameof(GetProduto), new { id = novoId }, produto);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProduto(Produto produto)
    {
        if (await _repository.UpdateProduto(produto)) return Ok(produto);
        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        if (await _repository.DeleteProduto(id)) return Ok();
        else return NotFound();
    }
}