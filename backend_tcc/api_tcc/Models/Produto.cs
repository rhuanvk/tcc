namespace app_tcc.Models;

public class Produto
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public double Valor { get; set; }
    public int QuantidadeEstoque { get; set; }
}