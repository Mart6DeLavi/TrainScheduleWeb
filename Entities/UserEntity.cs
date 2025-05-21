using System.ComponentModel.DataAnnotations;
using TrainScheduleWeb.ValueObjects;

namespace TrainScheduleWeb.Entities;

public class UserEntity
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public string FirstName { get; set; }

    [Required, MaxLength(100)]
    public string LastName { get; set; }

    [Required, MaxLength(100)]
    public Username Username { get; set; }

    [Required, EmailAddress]
    public Email Email { get; set; }

    [Required]
    public string Password { get; set; }

    public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public UserEntity(Guid id, string firstName, string lastName, Username username, Email email, string password)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Username = username;
        Email = email;
        Password = password;
    }
}