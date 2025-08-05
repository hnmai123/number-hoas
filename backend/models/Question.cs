namespace NumberHoas.Models;

public class Question
{
    public Guid questionId { get; set; }
    public Guid sessionId { get; set; }
    public int questionNumber { get; set; }
    public required List<string> correctAnswers { get; set; }
    public string? playerAnswer { get; set; }
    public bool isCorrect { get; set; } = false;
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
}

public class SubmitAnswerDto
{
    public string playerAnswer { get; set; } = string.Empty;
}