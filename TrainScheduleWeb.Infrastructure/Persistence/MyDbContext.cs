using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Infrastructure.Persistence;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    public DbSet<Train> Trains => Set<Train>();
}