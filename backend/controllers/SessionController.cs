using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly GameContext _context;
    public SessionController(GameContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Session>>> GetSessions()
    {
        return await _context.GameSessions.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Session>> GetSession(Guid id)
    {
        var session = await _context.GameSessions.FindAsync(id);
        if (session == null) return NotFound();
        return session;
    }

    [HttpPost]
    public async Task<ActionResult<Session>> CreateSession(Session session)
    {
        _context.GameSessions.Add(session);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSession), new { id = session.sessionId }, session);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSession(Guid id, Session session)
    {
        if (id != session.sessionId) return BadRequest();
        _context.Entry(session).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSession(Guid id)
    {
        var session = await _context.GameSessions.FindAsync(id);
        if (session == null) return NotFound();
        _context.GameSessions.Remove(session);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}