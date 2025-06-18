namespace app_tcc.Models;

public class Movimentacao
{
    public int Id { get; set; }
    public int IdProduto { get; set; }
    public int? IdVenda { get; set; }
    public int Quantidade { get; set; }
    public char Tipo { get; set; }
}