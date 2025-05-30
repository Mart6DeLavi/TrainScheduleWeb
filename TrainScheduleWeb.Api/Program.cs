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

// Dependency Injection
builder.Services.AddScoped<ITrainRepository, TrainRepository>();
builder.Services.AddScoped<TrainService>();

// CORS (добавлять ДО builder.Build())
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Swagger & Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ----------------------------------------------------
// BUILD PIPELINE
// ----------------------------------------------------
var app = builder.Build();

// Apply migrations or ensure database exists
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    await db.Database.EnsureCreatedAsync();
}

// ----------------------------------------------------
// MIDDLEWARE
// ----------------------------------------------------
app.UseCors("AllowNextJS");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.MapControllers();

app.Run();