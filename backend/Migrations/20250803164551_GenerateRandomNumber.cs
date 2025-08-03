using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class GenerateRandomNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "correctAnswer",
                table: "SessionQuestions",
                newName: "correctAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "playerAnswer",
                table: "SessionQuestions",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "correctAnswers",
                table: "SessionQuestions",
                newName: "correctAnswer");

            migrationBuilder.AlterColumn<string>(
                name: "playerAnswer",
                table: "SessionQuestions",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
