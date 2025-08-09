using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/feedbacks")]
[ApiController]
public class FeedbackController : ControllerBase
{
    private readonly GameContext _context;
    public FeedbackController(GameContext context)
    {
        _context = context;
    }

    // GET: api/feedbacks
    [HttpGet]
    public async Task<ActionResult<List<Feedback>>> GetFeedbacks()
    {
        return await _context.Feedbacks.ToListAsync();
    }

    // GET: api/feedbacks/{feedbackId}
    [HttpGet("{feedbackId}")]
    public async Task<ActionResult<Feedback>> GetFeedback(Guid feedbackId)
    {
        var feedback = await _context.Feedbacks.FindAsync(feedbackId);
        if (feedback == null) return NotFound();
        return feedback;
    }

    // POST: api/feedbacks
    [HttpPost]
    public async Task<ActionResult<Feedback>> CreateFeedback(Feedback feedback)
    {
        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFeedback), new { feedbackId = feedback.feedbackId }, feedback);
    }

    // PUT: api/feedbacks/{feedbackId}
    [HttpPut("{feedbackId}")]
    public async Task<IActionResult> UpdateFeedback(Guid feedbackId, Feedback feedback)
    {
        if (feedbackId != feedback.feedbackId) return BadRequest();
        _context.Entry(feedback).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/feedbacks/{feedbackId}
    [HttpDelete("{feedbackId}")]
    public async Task<IActionResult> DeleteFeedback(Guid feedbackId)
    {
        var feedback = await _context.Feedbacks.FindAsync(feedbackId);
        if (feedback == null) return NotFound();
        _context.Feedbacks.Remove(feedback);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}