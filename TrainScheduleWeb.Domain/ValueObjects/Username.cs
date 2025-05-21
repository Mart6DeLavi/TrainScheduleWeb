namespace TrainScheduleWeb.Domain.ValueObjects;

public record Username
{
    private string Value { get; }

    public Username(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Username cannot be empty", nameof(value));
        }

        Value = value;
    }

    public override string ToString() => Value;

    public static implicit operator string(Username username) => username.Value;
    public static implicit operator Username(string value) => new(value);
}