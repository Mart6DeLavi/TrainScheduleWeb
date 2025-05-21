using TrainScheduleWeb.Domain.Entities;
using TrainScheduleWeb.Domain.Interfaces;

namespace TrainSchedule.Application.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserEntity?> GetUserByUserId(Guid userId)
    {
        return await _userRepository.GetUserByUserId(userId);
    }

    public async Task DeleteUserByUserId(Guid userId)
    {
        await _userRepository.DeleteUserByUserId(userId);
    }
}