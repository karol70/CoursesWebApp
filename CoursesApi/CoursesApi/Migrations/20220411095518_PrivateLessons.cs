using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesApi.Migrations
{
    public partial class PrivateLessons : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrivateLessons_Cities_CityId",
                table: "PrivateLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_PrivateLessons_PrivateLessonsCategories_PrivateLessonsCatego~",
                table: "PrivateLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_PrivateLessons_Types_TypeId",
                table: "PrivateLessons");

            migrationBuilder.DropIndex(
                name: "IX_PrivateLessons_CityId",
                table: "PrivateLessons");

            migrationBuilder.DropIndex(
                name: "IX_PrivateLessons_PrivateLessonsCategoryId",
                table: "PrivateLessons");

            migrationBuilder.DropIndex(
                name: "IX_PrivateLessons_TypeId",
                table: "PrivateLessons");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "PrivateLessons");

            migrationBuilder.DropColumn(
                name: "PrivateLessonsCategoryId",
                table: "PrivateLessons");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "PrivateLessons");

            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "PrivateLessons",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Plan",
                table: "PrivateLessons",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "PrivateLessons",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ContactNumber",
                table: "PrivateLessons",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CourseHomePage",
                table: "PrivateLessons",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "PrivateLessons",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrivateLessonsCategoriesPrivateLessons",
                columns: table => new
                {
                    PrivateLessonId = table.Column<int>(type: "int", nullable: false),
                    PrivateLessonsCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLessonsCategoriesPrivateLessons", x => new { x.PrivateLessonsCategoryId, x.PrivateLessonId });
                    table.ForeignKey(
                        name: "FK_PrivateLessonsCategoriesPrivateLessons_PrivateLessons_Privat~",
                        column: x => x.PrivateLessonId,
                        principalTable: "PrivateLessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrivateLessonsCategoriesPrivateLessons_PrivateLessonsCategor~",
                        column: x => x.PrivateLessonsCategoryId,
                        principalTable: "PrivateLessonsCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrivateLessonsCities",
                columns: table => new
                {
                    PrivateLessonId = table.Column<int>(type: "int", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLessonsCities", x => new { x.CityId, x.PrivateLessonId });
                    table.ForeignKey(
                        name: "FK_PrivateLessonsCities_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrivateLessonsCities_PrivateLessons_PrivateLessonId",
                        column: x => x.PrivateLessonId,
                        principalTable: "PrivateLessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrivateLessonsComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PrivateLessonId = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLessonsComments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrivateLessonsRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Rate = table.Column<int>(type: "int", nullable: false),
                    PrivateLessonId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLessonsRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrivateLessonsRatings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrivateLessonsRatings_PrivateLessons_PrivateLessonId",
                        column: x => x.PrivateLessonId,
                        principalTable: "PrivateLessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrivateLessonsTypes",
                columns: table => new
                {
                    PrivateLessonId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLessonsTypes", x => new { x.TypeId, x.PrivateLessonId });
                    table.ForeignKey(
                        name: "FK_PrivateLessonsTypes_PrivateLessons_PrivateLessonId",
                        column: x => x.PrivateLessonId,
                        principalTable: "PrivateLessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrivateLessonsTypes_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessonsCategoriesPrivateLessons_PrivateLessonId",
                table: "PrivateLessonsCategoriesPrivateLessons",
                column: "PrivateLessonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessonsCities_PrivateLessonId",
                table: "PrivateLessonsCities",
                column: "PrivateLessonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessonsRatings_PrivateLessonId",
                table: "PrivateLessonsRatings",
                column: "PrivateLessonId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessonsRatings_UserId",
                table: "PrivateLessonsRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessonsTypes_PrivateLessonId",
                table: "PrivateLessonsTypes",
                column: "PrivateLessonId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrivateLessonsCategoriesPrivateLessons");

            migrationBuilder.DropTable(
                name: "PrivateLessonsCities");

            migrationBuilder.DropTable(
                name: "PrivateLessonsComments");

            migrationBuilder.DropTable(
                name: "PrivateLessonsRatings");

            migrationBuilder.DropTable(
                name: "PrivateLessonsTypes");

            migrationBuilder.DropColumn(
                name: "CourseHomePage",
                table: "PrivateLessons");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PrivateLessons");

            migrationBuilder.UpdateData(
                table: "PrivateLessons",
                keyColumn: "Price",
                keyValue: null,
                column: "Price",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "PrivateLessons",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "PrivateLessons",
                keyColumn: "Plan",
                keyValue: null,
                column: "Plan",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Plan",
                table: "PrivateLessons",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "PrivateLessons",
                keyColumn: "Image",
                keyValue: null,
                column: "Image",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "PrivateLessons",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "PrivateLessons",
                keyColumn: "ContactNumber",
                keyValue: null,
                column: "ContactNumber",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ContactNumber",
                table: "PrivateLessons",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "PrivateLessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PrivateLessonsCategoryId",
                table: "PrivateLessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "PrivateLessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessons_CityId",
                table: "PrivateLessons",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessons_PrivateLessonsCategoryId",
                table: "PrivateLessons",
                column: "PrivateLessonsCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLessons_TypeId",
                table: "PrivateLessons",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateLessons_Cities_CityId",
                table: "PrivateLessons",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateLessons_PrivateLessonsCategories_PrivateLessonsCatego~",
                table: "PrivateLessons",
                column: "PrivateLessonsCategoryId",
                principalTable: "PrivateLessonsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateLessons_Types_TypeId",
                table: "PrivateLessons",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
