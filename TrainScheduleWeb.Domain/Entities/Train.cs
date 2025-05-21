using System.ComponentModel.DataAnnotations;

namespace TrainScheduleWeb.Domain.Entities;

public class Train
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required, MaxLength(100)]
    public string DepartureStation { get; set; }

    [Required, MaxLength(100)]
    public string ArrivalStation { get; set; }

    [Required]
    public DateTime DepartureTime { get; set; }

    [Required]
    public DateTime ArrivalTime { get; set; }

    public Train(Guid id, string name, string departureStation, string arrivalStation, DateTime departureTime, DateTime arrivalTime)
    {
        Id = id;
        Name = name;
        DepartureStation = departureStation;
        ArrivalStation = arrivalStation;
        DepartureTime = departureTime;
        ArrivalTime = arrivalTime;
    }
}