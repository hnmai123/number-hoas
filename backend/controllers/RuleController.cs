using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/games/{gameId}/rules")]
[ApiController]
public class RuleController : ControllerBase
{
    private readonly GameContext _context;
    public RuleController(GameContext context)
    {
        _context = context;
    }

    // GET: api/games/{gameId}/rules
    [HttpGet]
    public async Task<ActionResult<List<Rule>>> GetRules(Guid gameId)
    {
        return await _context.GameRules.Where(r => r.gameId == gameId).ToListAsync();
    }

    // GET: api/games/{gameId}/rules/{ruleId}
    [HttpGet("{ruleId}")]
    public async Task<ActionResult<Rule>> GetRule(Guid gameId, Guid ruleId)
    {
        var rule = await _context.GameRules.FirstOrDefaultAsync(r => r.ruleId == ruleId && r.gameId == gameId);
        if (rule == null) return NotFound();
        return rule;
    }

    // POST: api/games/{gameId}/rules
    [HttpPost]
    public async Task<ActionResult<Rule>> CreateRule(Guid gameId, Rule rule)
    {
        rule.gameId = gameId;
        _context.GameRules.Add(rule);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRule), new { gameId = gameId, ruleId = rule.ruleId }, rule);
    }

    // PUT: api/games/{gameId}/rules/{ruleId}
    [HttpPut("{ruleId}")]
    public async Task<IActionResult> UpdateRule(Guid gameId, Guid ruleId, Rule rule)
    {
        if (rule.gameId != gameId || ruleId != rule.ruleId) return BadRequest();
        var existingRule = await _context.GameRules.FirstOrDefaultAsync(r => r.ruleId == ruleId && r.gameId == gameId);
        if (existingRule == null) return NotFound();
        _context.Entry(rule).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/games/{gameId}/rules/{ruleId}
    [HttpDelete("{ruleId}")]
    public async Task<IActionResult> DeleteRule(Guid gameId, Guid ruleId)
    {
        var rule = await _context.GameRules.FirstOrDefaultAsync(r => r.ruleId == ruleId && r.gameId == gameId);
        if (rule == null) return NotFound();
        _context.GameRules.Remove(rule);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}