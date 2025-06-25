using api_tcc.Models;
using Microsoft.EntityFrameworkCore;

namespace api_tcc.Data;

public class PgContext : DbContext
{
    public PgContext(DbContextOptions<PgContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Historico> Historico { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produto>().ToTable("produtos");
        modelBuilder.Entity<Historico>().ToTable("historico");
    }
}