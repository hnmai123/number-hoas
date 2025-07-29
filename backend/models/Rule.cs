namespace NumberHoas.Models;
public class Rule
{
    public Guid ruleId { get; set; }
    public Guid gameId { get; set; }
    public int divisibleNumber { get; set; }
    public required string replacedWord { get; set; }
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
}