using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Infrastructure.Persistence;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    private readonly IConfiguration _configuration;

    protected DbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<Train> Trains => Set<Train>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("PostgresTrainScheduleWeb"));
    }
}