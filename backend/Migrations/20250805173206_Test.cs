using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    gameId = table.Column<Guid>(type: "TEXT", nullable: false),
                    gameName = table.Column<string>(type: "TEXT", nullable: false),
                    authorName = table.Column<string>(type: "TEXT", nullable: false),
                    range = table.Column<int>(type: "INTEGER", nullable: false),
                    timeLimit = table.Column<int>(type: "INTEGER", nullable: false),
                    createdAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.gameId);
                });

            migrationBuilder.CreateTable(
                name: "GameRules",
                columns: table => new
                {
                    ruleId = table.Column<Guid>(type: "TEXT", nullable: false),
                    gameId = table.Column<Guid>(type: "TEXT", nullable: false),
                    divisibleNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    replacedWord = table.Column<string>(type: "TEXT", nullable: false),
                    createdAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameRules", x => x.ruleId);
                    table.ForeignKey(
                        name: "FK_GameRules_Games_gameId",
                        column: x => x.gameId,
                        principalTable: "Games",
                        principalColumn: "gameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameSessions",
                columns: table => new
                {
                    sessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    gameId = table.Column<Guid>(type: "TEXT", nullable: false),
                    playerName = table.Column<string>(type: "TEXT", nullable: false),
                    score = table.Column<string>(type: "TEXT", nullable: false),
                    startTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    endTime = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSessions", x => x.sessionId);
                    table.ForeignKey(
                        name: "FK_GameSessions_Games_gameId",
                        column: x => x.gameId,
                        principalTable: "Games",
                        principalColumn: "gameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionQuestions",
                columns: table => new
                {
                    questionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    sessionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    questionNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    correctAnswers = table.Column<string>(type: "TEXT", nullable: false),
                    playerAnswer = table.Column<string>(type: "TEXT", nullable: true),
                    isCorrect = table.Column<bool>(type: "INTEGER", nullable: false),
                    createdAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionQuestions", x => x.questionId);
                    table.ForeignKey(
                        name: "FK_SessionQuestions_GameSessions_sessionId",
                        column: x => x.sessionId,
                        principalTable: "GameSessions",
                        principalColumn: "sessionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameRules_gameId",
                table: "GameRules",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_GameSessions_gameId",
                table: "GameSessions",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionQuestions_sessionId",
                table: "SessionQuestions",
                column: "sessionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameRules");

            migrationBuilder.DropTable(
                name: "SessionQuestions");

            migrationBuilder.DropTable(
                name: "GameSessions");

            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
