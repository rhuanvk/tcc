using api_tcc.Models;

namespace api_tcc.Interfaces;

public interface IDbRepository
{
    public Task<List<Produto>> GetProdutos();
    public Task<Produto?> GetProduto(int id);
    public Task<int> AddProduto(Produto produto);
    public Task<bool> UpdateProduto(Produto produto);
    public Task<bool> DeleteProduto(int id);
    public Task<List<Historico>> GetHistorico();
    public Task<bool> AddRegistroHistorico(Produto produto, char tipo);
}