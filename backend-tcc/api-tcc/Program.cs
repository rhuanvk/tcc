using api_tcc.Data;
using api_tcc.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<DbRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PgContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Postgres")
    )
);
builder.Services.AddCors(options =>
    options.AddPolicy("AllowFrontEndRequests",
        b => b.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
    )
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontEndRequests");
app.MapControllers();
app.Run();