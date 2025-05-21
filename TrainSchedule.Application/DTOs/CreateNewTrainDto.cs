using System.ComponentModel.DataAnnotations;

namespace TrainSchedule.Application.DTOs;

public record CreateNewTrainDto(
    [Required, MaxLength(100)] string Name,
    [Required, MaxLength(100)] string DepartureStation,
    [Required, MaxLength(100)] string ArrivalStation,
    [Required] DateTime DepartureTime,
    [Required] DateTime ArrivalTime);