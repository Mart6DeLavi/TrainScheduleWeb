using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Domain.Repositories;

public interface ITrainRepository
{
    Task<Train?> GetTrainById(Guid trainId);
    Task<Train?> GetTrainByArrivalTime(DateTime arrivalTime);
    Task<Train?> GetTrainByDepartureTime(DateTime departureTime);
    Task<Train?> GetTrainByArrivalStatin(string arrivalStation);
    Task<Train?> GetTrainByDepartureStation(string departureStation);
}