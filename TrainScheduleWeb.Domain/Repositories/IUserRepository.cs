using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Domain.Interfaces;

public interface IUserRepository
{
    Task<UserEntity?> GetUserByUserId(Guid userId);
    Task DeleteUserByUserId(Guid userId);
}