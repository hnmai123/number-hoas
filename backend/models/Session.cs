namespace NumberHoas.Models;
public class Session
{
    public Guid sessionId { get; set; }
    public Guid gameId { get; set; }
    public string playerName { get; set; } = string.Empty;
    public int score { get; set; } = 0;
    public DateTime startTime { get; set; } = DateTime.UtcNow;
    public DateTime endTime { get; set; } = DateTime.UtcNow;
}