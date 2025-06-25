using api_tcc.Data;
using api_tcc.Interfaces;
using api_tcc.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api_tcc.Repository;

public class DbRepository : IDbRepository
{
    private readonly PgContext _context;

    public DbRepository(PgContext context)
    {
        _context = context;
    }
    
    public async Task<List<Produto>> GetProdutos()
    {
        List<Produto> prod = await _context.Produtos.OrderBy(p => p.Id).ToListAsync();
        return prod;
    }

    public async Task<Produto?> GetProduto(int id)
    {
        Produto? prod = await _context.Produtos.FindAsync(id);
        return prod;
    }
    
    public async Task<int> AddProduto(Produto produto)
    {
        await _context.Produtos.AddAsync(produto);
        await _context.SaveChangesAsync();
        await AddRegistroHistorico(produto, 'C');
        
        return produto.Id ?? 0;
    }
    
    public async Task<bool> UpdateProduto(Produto produto)
    {
        ArgumentNullException.ThrowIfNull(nameof(produto));
        
        var prod = await _context.Produtos.FindAsync(produto.Id);
        if (prod == null) return false;
        
        prod.Descricao = produto.Descricao;
        prod.Valor = produto.Valor;
        prod.QuantidadeEstoque = produto.QuantidadeEstoque;
        
        bool registrosAtualizados = await _context.SaveChangesAsync() > 0;
        await AddRegistroHistorico(produto, 'A');
        
        // se alterar um produto retorna true
        return registrosAtualizados;
    }
    
    public async Task<bool> DeleteProduto(int id)
    {
        Console.WriteLine("----------------------");
        Console.WriteLine(id);
        ArgumentNullException.ThrowIfNull(nameof(Produto));
        
        var prod = await _context.Produtos.FindAsync(id);
        if (prod == null) return false;
        
        _context.Produtos.Remove(prod);
        
        bool registrosDeletados = await _context.SaveChangesAsync() > 0;
        await AddRegistroHistorico(prod, 'E');
        
        // se deletar um produto retorna true
        return registrosDeletados;
    }
    
    public async Task<List<Historico>> GetHistorico()
    {
        return await _context.Historico.OrderBy(h => h.Id).ToListAsync();
    }

    public async Task<bool> AddRegistroHistorico(Produto produto, char tipo)
    {
        if (produto.Id == null) return false;

        Historico registro = new Historico
        { 
            IdProduto = produto.Id ?? 0,
            DescricaoProduto = produto.Descricao,
            Quantidade = produto.QuantidadeEstoque,
            Tipo = tipo,
            DataHora = DateTime.Now
        };

        Console.WriteLine(DateTime.Now);
        
        await _context.Historico.AddAsync(registro);
        
        // se add um registro retorna true
        return await _context.SaveChangesAsync() > 0;
    }
}