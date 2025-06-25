using System.ComponentModel.DataAnnotations.Schema;

namespace api_tcc.Models;

public class Produto
{
    [Column("id")]
    public int? Id { get; set; }
    
    [Column("descricao")]
    public required string Descricao { get; set; }
    
    [Column("valor")]
    public required double Valor { get; set; }
    
    [Column("quantidade_estoque")]
    public required int QuantidadeEstoque { get; set; }
}