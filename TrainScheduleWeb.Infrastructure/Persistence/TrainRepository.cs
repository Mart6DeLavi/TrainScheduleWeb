using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Domain.Entities;
using TrainScheduleWeb.Domain.Exceptions;
using TrainScheduleWeb.Domain.Repositories;

namespace TrainScheduleWeb.Infrastructure.Persistence;

public class TrainRepository : ITrainRepository
{
    private readonly DbContext _context;

    public TrainRepository(DbContext context)
    {
        _context = context;
    }

    public async  Task<Train?> GetTrainById(Guid trainId)
    {
        return await _context.Trains.FindAsync(trainId);
    }

    public async Task<Train?> GetTrainByArrivalTime(DateTime arrivalTime)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.ArrivalTime.Equals(arrivalTime));

        if (train is null)
        {
            throw new NoSuchTrainException($"No train found with arrival time: {arrivalTime}");
        }

        return train;
    }

    public async Task<Train?> GetTrainByDepartureTime(DateTime departureTime)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.DepartureTime.Equals(departureTime));

        if (train is null)
        {
            throw new NoSuchTrainException($"No train found with departure time: {departureTime}");
        }

        return train;
    }

    public async Task<Train?> GetTrainByArrivalStatin(string arrivalStation)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.ArrivalStation.Equals(arrivalStation));

        if (train is null)
        {
            throw new NoSuchTrainException($"No train found with arrival station: {arrivalStation}");
        }

        return train;
    }

    public async Task<Train?> GetTrainByDepartureStation(string departureStation)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.DepartureStation.Equals(departureStation));

        if (train is null)
        {
            throw new NoSuchTrainException($"No train found with departure station: {departureStation}");
        }

        return train;
    }
}