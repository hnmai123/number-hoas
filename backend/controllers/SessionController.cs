using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/games/{gameId}/sessions")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly GameContext _context;
    public SessionController(GameContext context)
    {
        _context = context;
    }

    // GET: api/games/{gameId}/sessions
    [HttpGet]
    public async Task<ActionResult<List<Session>>> GetSessions(Guid gameId)
    {
        return await _context.GameSessions.Where(s => s.gameId == gameId).ToListAsync();
    }

    // GET: api/games/{gameId}/sessions/{sessionId}
    [HttpGet("{sessionId}")]
    public async Task<ActionResult<Session>> GetSession(Guid gameId,Guid sessionId)
    {
        var session = await _context.GameSessions.FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (session == null) return NotFound();
        return session;
    }

    // POST: api/games/{gameId}/sessions
    [HttpPost]
    public async Task<ActionResult<Session>> CreateSession(Guid gameId, Session session)
    {
        session.gameId = gameId;
        _context.GameSessions.Add(session);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSession), new { gameId = gameId, sessionId = session.sessionId }, session);
    }

    // PUT: api/games/{gameId}/sessions/{sessionId}
    [HttpPut("{sessionId}")]
    public async Task<IActionResult> UpdateSession(Guid gameId, Guid sessionId, Session session)
    {
        if (sessionId != session.sessionId || gameId != session.gameId) return BadRequest();
        var existingSession = await _context.GameSessions.FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();
        _context.Entry(session).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/games/{gameId}/sessions/{sessionId}
    [HttpDelete("{sessionId}")]
    public async Task<IActionResult> DeleteSession(Guid gameId, Guid sessionId)
    {
        var session = await _context.GameSessions.FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (session == null) return NotFound();
        _context.GameSessions.Remove(session);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}