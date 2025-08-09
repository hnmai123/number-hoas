namespace NumberHoas.Models;
// Feedback {
//   feedbackId: string;
//   authorName: string;
//   createdAt: string; // ISO date string
//   isPublic: boolean;
//   content: string;
//   authorId?: string | null; // optional field for author ID
// }
public class Feedback
{
    public Guid feedbackId { get; set; }
    public string authorName { get; set; } = string.Empty;
    public bool isPublic { get; set; }
    public string content { get; set; } = string.Empty;
    public DateTime createdAt { get; set; }
    public string? authorId { get; set; }
}