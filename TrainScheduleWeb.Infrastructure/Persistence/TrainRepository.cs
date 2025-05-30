using Microsoft.EntityFrameworkCore;
using TrainScheduleWeb.Domain.Entities;
using TrainScheduleWeb.Domain.Exceptions;
using TrainScheduleWeb.Domain.Repositories;

namespace TrainScheduleWeb.Infrastructure.Persistence;

public class TrainRepository : ITrainRepository
{
    private readonly MyDbContext _context;

    public TrainRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<List<Train>> GetAllTrains()
    {
        return await _context.Trains.ToListAsync();
    }

    public async Task<Train?> GetTrainById(Guid trainId)
    {
        return await _context.Trains.FindAsync(trainId);
    }

    public async Task<Train?> GetTrainByArrivalTime(TimeSpan time)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.ArrivalTime.TimeOfDay == time);

        if (train is null)
            throw new NoSuchTrainException($"No train found with arrival time: {time}");

        return train;
    }
    public async Task<Train?> GetTrainByDepartureTime(TimeSpan time)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t =>
                t.DepartureTime.Hour == time.Hours &&
                t.DepartureTime.Minute == time.Minutes);

        if (train is null)
            throw new NoSuchTrainException($"No train found with departure time: {time}");

        return train;
    }


    public async Task<Train?> GetTrainByArrivalStation(string arrivalStation)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.ArrivalStation.Equals(arrivalStation));

        if (train is null)
            throw new NoSuchTrainException($"No train found arriving to station: {arrivalStation}");

        return train;
    }

    public async Task<Train?> GetTrainByDepartureStation(string departureStation)
    {
        var train = await _context.Trains
            .FirstOrDefaultAsync(t => t.DepartureStation.Equals(departureStation));

        if (train is null)
            throw new NoSuchTrainException($"No train found departing from station: {departureStation}");

        return train;
    }

    public async Task CreateNewTrain(Train train)
    {
        await _context.Trains.AddAsync(train);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTrainById(Guid id)
    {
        var train = await _context.Trains.FindAsync(id);

        if (train is null)
            throw new NoSuchTrainException($"No trains with id {id}");

        _context.Trains.Remove(train);
        await _context.SaveChangesAsync();
    }
}
