using System.ComponentModel.DataAnnotations;

namespace TrainScheduleWeb.Domain.ValueObjects;

public record Email
{
    private string Value { get; }

    private Email(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Email address cannot be blank", nameof(value));
        }

        if (!IsValidEmail(value))
        {
            throw new ArgumentException("Your email is not in a valid form.", nameof(value));
        }

        Value = value;
    }

    public override string ToString() => Value;

    public static implicit operator string(Email email) => email.Value;
    public static implicit operator Email(string value) => new(value);

    private static bool IsValidEmail(string email)
    {
        var attribute = new EmailAddressAttribute();
        return attribute.IsValid(email);
    }
}