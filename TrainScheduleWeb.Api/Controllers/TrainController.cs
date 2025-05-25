using Microsoft.AspNetCore.Mvc;
using TrainScheduleWeb.Api.DTOs;
using TrainScheduleWeb.Api.Services;
using TrainScheduleWeb.Domain.Entities;

namespace TrainScheduleWeb.Api.Controllers;

[ApiController]
[Route("api/v1/trains")]
public class TrainController : ControllerBase
{
    private readonly TrainService _trainService;

    public TrainController(TrainService trainService)
    {
        _trainService = trainService;
    }

    // GET /api/v1/trains/get/{trainId}
    [HttpGet("get/{trainId:guid}")]
    public async Task<ActionResult<Train>> GetTrainById(Guid trainId)
    {
        var train = await _trainService.GetTrainById(trainId);
        return train is null
            ? NotFound($"Train with ID {trainId} not found.")
            : Ok(train);
    }

    // GET /api/v1/trains/arrival-time?time=...
    [HttpGet("arrival-time")]
    public async Task<ActionResult<Train>> GetTrainByArrivalClockTime([FromQuery] string time)
    {
        if (!TimeSpan.TryParse(time, out var parsedTime))
            return BadRequest("Invalid time format. Use HH:mm (e.g., 08:05)");

        var train = await _trainService.GetTrainByArrivalClockTime(parsedTime);
        return Ok(train);
    }

    // GET /api/v1/trains/departure-time?time=...
    [HttpGet("departure-time")]
    public async Task<ActionResult<Train>> GetTrainByDepartureClockTime([FromQuery] string time)
    {
        if (!TimeSpan.TryParse(time, out var parsedTime))
            return BadRequest("Invalid time format. Use HH:mm (e.g., 08:05)");

        var train = await _trainService.GetTrainByDepartureClockTime(parsedTime);
        return Ok(train);
    }

    // GET /api/v1/trains/arrival-station?station=...
    [HttpGet("arrival-station")]
    public async Task<ActionResult<Train>> GetTrainByArrivalStation([FromQuery] string station)
    {
        var train = await _trainService.GetTrainByArrivalStation(station);
        return train is null
            ? NotFound($"No train found arriving to station {station}")
            : Ok(train);
    }

    // GET /api/v1/trains/departure-station?station=...
    [HttpGet("departure-station")]
    public async Task<ActionResult<Train>> GetTrainByDepartureStation([FromQuery] string station)
    {
        var train = await _trainService.GetTrainByDepartureStation(station);
        return train is null
            ? NotFound($"No train found departing from station {station}")
            : Ok(train);
    }

    // POST /api/v1/trains/create?username=...
    [HttpPost("create")]
    public async Task<IActionResult> CreateTrain([FromBody] CreateNewTrainDto dto)
    {
        try
        {
            await _trainService.CreateTrain(dto);
            return Ok("Train created successfully.");
        }
        catch (UnauthorizedAccessException e)
        {
            return Forbid(e.Message);
        }
    }

    // DELETE /api/v1/trains/delete/{id}?username=...
    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> DeleteTrainById(Guid id)
    {
        try
        {
            await _trainService.DeleteTrainById(id);
            return Ok($"Train with ID {id} deleted successfully.");
        }
        catch (UnauthorizedAccessException e)
        {
            return Forbid(e.Message);
        }
    }
}