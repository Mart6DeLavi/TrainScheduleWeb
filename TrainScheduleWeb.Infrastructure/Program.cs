using TrainScheduleWeb.Domain.Interfaces;
using TrainScheduleWeb.Domain.Repositories;
using TrainScheduleWeb.Infrastructure.Persistence;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<DbContext>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITrainRepository, TrainRepository>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<DbContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();