using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/games/{gameId}/sessions/{sessionId}/questions")]
[ApiController]
public class QuestionController : ControllerBase
{
    private readonly GameContext _context;
    public QuestionController(GameContext context)
    {
        _context = context;
    }

    // GET: api/games/{gameId}/sessions/{sessionId}/questions
    [HttpGet]
    public async Task<ActionResult<List<Question>>> GetQuestions(Guid gameId, Guid sessionId)
    {
        var existingSession = await _context.GameSessions
            .FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();
        return await _context.SessionQuestions
            .Where(q => q.sessionId == sessionId)
            .ToListAsync();
    }

    // GET: api/games/{gameId}/sessions/{sessionId}/questions/{id}
    [HttpGet("{questionId}")]
    public async Task<ActionResult<Question>> GetQuestion(Guid gameId, Guid sessionId, Guid questionId)
    {
        var existingSession = await _context.GameSessions
            .FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();

        var question = await _context.SessionQuestions
            .FirstOrDefaultAsync(q => q.questionId == questionId && q.sessionId == sessionId);
        if (question == null) return NotFound();
        return question;
    }

    // POST: api/games/{gameId}/sessions/{sessionId}/questions
    [HttpPost]
    public async Task<ActionResult<Question>> CreateQuestion(Guid gameId, Guid sessionId, Question question)
    {
        var existingSession = await _context.GameSessions
            .FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();

        question.sessionId = sessionId;
        _context.SessionQuestions.Add(question);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetQuestion), new { gameId = gameId, sessionId = sessionId, questionId = question.questionId }, question);
    }

    // PUT: api/games/{gameId}/sessions/{sessionId}/questions/{id}
    [HttpPut("{questionId}")]
    public async Task<IActionResult> UpdateQuestion(Guid gameId, Guid sessionId, Guid questionId, Question question)
    {
        if (questionId != question.questionId) return BadRequest();

        var existingSession = await _context.GameSessions
            .FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();

        _context.Entry(question).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/games/{gameId}/sessions/{sessionId}/questions/{id}
    [HttpDelete("{questionId}")]
    public async Task<IActionResult> DeleteQuestion(Guid gameId, Guid sessionId, Guid questionId)
    {
        var existingSession = await _context.GameSessions
            .FirstOrDefaultAsync(s => s.sessionId == sessionId && s.gameId == gameId);
        if (existingSession == null) return NotFound();

        var question = await _context.SessionQuestions
            .FirstOrDefaultAsync(q => q.questionId == questionId && q.sessionId == sessionId);
        if (question == null) return NotFound();
        _context.SessionQuestions.Remove(question);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}