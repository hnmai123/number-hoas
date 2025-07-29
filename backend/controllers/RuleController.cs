using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NumberHoas.Data;
using NumberHoas.Models;

namespace NumberHoas.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RuleController : ControllerBase
{
    private readonly GameContext _context;
    public RuleController(GameContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Rule>>> GetRules()
    {
        return await _context.GameRules.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Rule>> GetRule(Guid id)
    {
        var rule = await _context.GameRules.FindAsync(id);
        if (rule == null) return NotFound();
        return rule;
    }

    [HttpPost]
    public async Task<ActionResult<Rule>> CreateRule(Rule rule)
    {
        _context.GameRules.Add(rule);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRule), new { id = rule.ruleId }, rule);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRule(Guid id, Rule rule)
    {
        if (id != rule.ruleId) return BadRequest();
        _context.Entry(rule).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRule(Guid id)
    {
        var rule = await _context.GameRules.FindAsync(id);
        if (rule == null) return NotFound();
        _context.GameRules.Remove(rule);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}