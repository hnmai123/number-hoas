using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionController : ControllerBase
{
    private readonly GameContext _context;
    public QuestionController(GameContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Question>>> GetQuestions()
    {
        return await _context.SessionQuestions.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetQuestion(Guid id)
    {
        var question = await _context.SessionQuestions.FindAsync(id);
        if (question == null) return NotFound();
        return question;
    }

    [HttpPost]
    public async Task<ActionResult<Question>> CreateQuestion(Question question)
    {
        _context.SessionQuestions.Add(question);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetQuestion), new { id = question.questionId }, question);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestion(Guid id, Question question)
    {
        if (id != question.questionId) return BadRequest();
        _context.Entry(question).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestion(Guid id)
    {
        var question = await _context.SessionQuestions.FindAsync(id);
        if (question == null) return NotFound();
        _context.SessionQuestions.Remove(question);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}