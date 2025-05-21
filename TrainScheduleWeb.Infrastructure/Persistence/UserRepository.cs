using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Domain.Entities;
using TrainScheduleWeb.Domain.Interfaces;

namespace TrainScheduleWeb.Infrastructure.Persistence;

public class UserRepository : IUserRepository
{

    private readonly DbContext _context;

    public UserRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<UserEntity?> GetUserByUserId(Guid userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(userId));
    }

    public async Task DeleteUserByUserId(Guid userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user is not null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}