using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    feedbackId = table.Column<Guid>(type: "uuid", nullable: false),
                    authorName = table.Column<string>(type: "text", nullable: false),
                    isPublic = table.Column<bool>(type: "boolean", nullable: false),
                    content = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    authorId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.feedbackId);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    gameId = table.Column<Guid>(type: "uuid", nullable: false),
                    gameName = table.Column<string>(type: "text", nullable: false),
                    authorName = table.Column<string>(type: "text", nullable: false),
                    range = table.Column<int>(type: "integer", nullable: false),
                    timeLimit = table.Column<int>(type: "integer", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.gameId);
                });

            migrationBuilder.CreateTable(
                name: "GameRules",
                columns: table => new
                {
                    ruleId = table.Column<Guid>(type: "uuid", nullable: false),
                    gameId = table.Column<Guid>(type: "uuid", nullable: false),
                    divisibleNumber = table.Column<int>(type: "integer", nullable: false),
                    replacedWord = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                    sessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    gameId = table.Column<Guid>(type: "uuid", nullable: false),
                    playerName = table.Column<string>(type: "text", nullable: false),
                    score = table.Column<string>(type: "text", nullable: false),
                    startTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    endTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                    questionId = table.Column<Guid>(type: "uuid", nullable: false),
                    sessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    questionNumber = table.Column<int>(type: "integer", nullable: false),
                    correctAnswers = table.Column<List<string>>(type: "text[]", nullable: false),
                    playerAnswer = table.Column<string>(type: "text", nullable: true),
                    isCorrect = table.Column<bool>(type: "boolean", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                name: "Feedbacks");

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
