namespace NumberHoas.Models;
public class Game
{
    public Guid gameId { get; set; }
    public required string gameName { get; set; }
    public string authorName { get; set; } = string.Empty;
    public int range { get; set; }
    public int timeLimit { get; set; }
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
}