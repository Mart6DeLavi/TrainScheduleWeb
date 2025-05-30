using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Domain.Repositories;

public interface ITrainRepository
{
    Task<List<Train>> GetAllTrains();
    Task<Train?> GetTrainById(Guid trainId);
    Task<Train?> GetTrainByArrivalTime(TimeSpan arrivalTime);
    Task<Train?> GetTrainByDepartureTime(TimeSpan departureTime);
    Task<Train?> GetTrainByArrivalStation(string arrivalStation);
    Task<Train?> GetTrainByDepartureStation(string departureStation);
    Task CreateNewTrain(Train train);
    Task DeleteTrainById(Guid id);
}
