using System.ComponentModel.DataAnnotations;

namespace TrainScheduleWeb.Api.DTOs;

public record CreateNewTrainDto(
    [Required, MaxLength(100)] string Name,
    [Required, MaxLength(100)] string DepartureStation,
    [Required, MaxLength(100)] string ArrivalStation,
    [Required] DateTime DepartureTime,
    [Required] DateTime ArrivalTime);