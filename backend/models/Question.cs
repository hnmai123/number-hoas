namespace NumberHoas.Models;
public class Question
{
    public Guid questionId { get; set; }
    public Guid sessionId { get; set; }
    public int questionNumber { get; set; }
    public required string correctAnswer { get; set; }
    public required string playerAnswer { get; set; }
    public bool isCorrect { get; set; } = false;
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
}