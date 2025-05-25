using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Api.Services;
using TrainScheduleWeb.Domain.Repositories;
using TrainScheduleWeb.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------
var configuration = builder.Configuration;

// PostgreSQL
var connectionString = configuration.GetConnectionString("PostgresDatabase");
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddScoped<ITrainRepository, TrainRepository>();
builder.Services.AddScoped<TrainService>();


// ----------------------------------------------------
// SERVICES & CONTROLLERS
// ----------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ----------------------------------------------------
// APP PIPELINE
// ----------------------------------------------------
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    await db.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.MapControllers();
app.Run();
