using TrainScheduleWeb.Api.DTOs;
using TrainScheduleWeb.Api.Mappers;
using TrainScheduleWeb.Domain.Entities;
using TrainScheduleWeb.Domain.Repositories;

namespace TrainScheduleWeb.Api.Services;

public class TrainService
{
    private readonly ITrainRepository _trainRepository;

    public TrainService(ITrainRepository trainRepository)
    {
        _trainRepository = trainRepository;
    }

    public async Task<Train?> GetTrainById(Guid trainId)
    {
        return await _trainRepository.GetTrainById(trainId);
    }

    public async Task<Train?> GetTrainByArrivalClockTime(TimeSpan time)
    {
        return await _trainRepository.GetTrainByArrivalTime(time);
    }

    public async Task<Train?> GetTrainByDepartureClockTime(TimeSpan time)
    {
        return await _trainRepository.GetTrainByDepartureTime(time);
    }

    public async Task<Train?> GetTrainByArrivalStation(string arrivalStation)
    {
        return await _trainRepository.GetTrainByArrivalStation(arrivalStation);
    }

    public async Task<Train?> GetTrainByDepartureStation(string departureStation)
    {
        return await _trainRepository.GetTrainByDepartureStation(departureStation);
    }

    public async Task CreateTrain(CreateNewTrainDto dto)
    {
        var train = TrainEntityMapper.MapToTrain(dto);
        await _trainRepository.CreateNewTrain(train);
    }

    public async Task DeleteTrainById(Guid id)
    {
        await _trainRepository.DeleteTrainById(id);
    }
}
