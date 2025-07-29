using Microsoft.EntityFrameworkCore;
using NumberHoas.Models;

namespace NumberHoas.Data;
public class GameContext : DbContext
{
    public GameContext(DbContextOptions<GameContext> options) : base(options) { }
    public DbSet<Game> Games { get; set; }
    public DbSet<Rule> GameRules { get; set; }
    public DbSet<Session> GameSessions { get; set; }
    public DbSet<Question> SessionQuestions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>()
            .HasKey(g => g.gameId);

        modelBuilder.Entity<Question>()
            .HasKey(q => q.questionId);

        modelBuilder.Entity<Rule>()
            .HasKey(r => r.ruleId);

        modelBuilder.Entity<Session>()
            .HasKey(s => s.sessionId);

        // Game - Rule relationship
        modelBuilder.Entity<Rule>()
            .HasOne<Game>()
            .WithMany()
            .HasForeignKey(r => r.gameId)
            .OnDelete(DeleteBehavior.Cascade);

        // Game - Session relationship
        modelBuilder.Entity<Session>()
            .HasOne<Game>()
            .WithMany()
            .HasForeignKey(s => s.gameId)
            .OnDelete(DeleteBehavior.Cascade);

        // Session - Question relationship
        modelBuilder.Entity<Question>()
            .HasOne<Session>()
            .WithMany()
            .HasForeignKey(q => q.sessionId)
            .OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(modelBuilder);
    }
}