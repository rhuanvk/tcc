using System.ComponentModel.DataAnnotations.Schema;

namespace api_tcc.Models;

public class Historico
{
    [Column("id")]
    public int? Id { get; set; }
    
    [Column("id_produto")]
    public int IdProduto { get; set; }
    
    [Column("descricao_produto")]
    public required string DescricaoProduto { get; set; }
    
    [Column("quantidade")]
    public required int Quantidade { get; set; }
    
    [Column("tipo")]
    public required char Tipo { get; set; }
    
    [Column("data_hora")]
    public required DateTime DataHora { get; set; }
}