namespace TrainScheduleWeb.Domain.Exceptions;

public class NoSuchTrainException : Exception
{
    public NoSuchTrainException(string? message) : base(message) { }
}