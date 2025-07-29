
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;
namespace NumberHoas.Controllers;

[Route("api/games")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly GameContext _context;
    public GameController(GameContext context)
    {
        _context = context;
    }

    // GET: api/games
    [HttpGet]
    public async Task<ActionResult<List<Game>>> GetGames()
    {
        return await _context.Games.ToListAsync();
    }

    // GET: api/games/{gameId}
    [HttpGet("{gameId}")]
    public async Task<ActionResult<Game>> GetGame(Guid gameId)
    {
        var game = await _context.Games.FindAsync(gameId);
        if (game == null) return NotFound();
        return game;
    }

    // POST: api/games
    [HttpPost]
    public async Task<ActionResult<Game>> CreateGame(Game game)
    {
        _context.Games.Add(game);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetGame), new { gameId = game.gameId }, game);
    }

    // PUT: api/games/{gameId}
    [HttpPut("{gameId}")]
    public async Task<IActionResult> UpdateGame(Guid gameId, Game game)
    {
        if (gameId != game.gameId) return BadRequest();
        _context.Entry(game).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/games/{gameId}
    [HttpDelete("{gameId}")]
    public async Task<IActionResult> DeleteGame(Guid gameId)
    {
        var game = await _context.Games.FindAsync(gameId);
        if (game == null) return NotFound();
        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}