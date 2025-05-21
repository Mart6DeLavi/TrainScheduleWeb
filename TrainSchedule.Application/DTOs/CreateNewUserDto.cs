using System.ComponentModel.DataAnnotations;
using TrainScheduleWeb.Domain.ValueObjects;

namespace TrainSchedule.Application.DTOs;

public record CreateNewUserDto(
    [Required, MaxLength(100)] string FirstName,
    [Required, MaxLength(100)] string LastName,
    [Required, MaxLength(100)] Username Username,
    [Required, EmailAddress] Email Email,
    [Required] string Password);