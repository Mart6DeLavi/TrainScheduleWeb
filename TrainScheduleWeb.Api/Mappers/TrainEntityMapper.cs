using TrainScheduleWeb.Api.DTOs;
using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Api.Mappers;

public class TrainEntityMapper
{
    public static Train MapToTrain(CreateNewTrainDto dto)
    {
        return new Train(
            id: Guid.NewGuid(),
            name: dto.Name,
            departureStation: dto.DepartureStation,
            arrivalStation: dto.ArrivalStation,
            departureTime: dto.DepartureTime,
            arrivalTime: dto.ArrivalTime
        );
    }
}