using TrainSchedule.Application.DTOs;
using TrainScheduleWeb.Domain.Entities;

namespace TrainSchedule.Application.Mappers;

public static class UserEntityMapper
{
    public static UserEntity MapToUser(CreateNewUserDto dto)
    {
        return new UserEntity(
            id: Guid.NewGuid(),
            firstName: dto.FirstName,
            lastName: dto.LastName,
            username: dto.Username,
            email: dto.Email,
            password: dto.Password
        );
    }
}