namespace app_tcc.Models;

public class Venda
{
    public int Id { get; set; }
    public string? NomeCliente { get; set; }
    public double ValorTotal { get; set; }
    public DateTime DataVenda { get; set; }
}