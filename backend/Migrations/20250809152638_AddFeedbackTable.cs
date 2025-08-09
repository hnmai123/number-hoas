using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFeedbackTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    feedbackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    authorName = table.Column<string>(type: "TEXT", nullable: false),
                    isPublic = table.Column<bool>(type: "INTEGER", nullable: false),
                    content = table.Column<string>(type: "TEXT", nullable: false),
                    createdAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    authorId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.feedbackId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedbacks");
        }
    }
}
