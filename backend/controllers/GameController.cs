
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;
namespace NumberHoas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly GameContext _context;
    public GameController(GameContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Game>>> GetGames()
    {
        return await _context.Games.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> GetGame(Guid id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null) return NotFound();
        return game;
    }

    [HttpPost]
    public async Task<ActionResult<Game>> CreateGame(Game game)
    {
        _context.Games.Add(game);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetGame), new { id = game.gameId }, game);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGame(Guid id, Game game)
    {
        if (id != game.gameId) return BadRequest();
        _context.Entry(game).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(Guid id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null) return NotFound();
        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}