using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesApi.Migrations
{
    public partial class Refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Cities_CityId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CoursesCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Types_TypeId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CityId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_TypeId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Courses");

            migrationBuilder.CreateTable(
                name: "CourseCategoriesCourses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    CourseCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCategoriesCourses", x => new { x.CourseCategoryId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_CourseCategoriesCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseCategoriesCourses_CoursesCategories_CourseCategoryId",
                        column: x => x.CourseCategoryId,
                        principalTable: "CoursesCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CoursesCities",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoursesCities", x => new { x.CityId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_CoursesCities_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CoursesCities_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CoursesTypes",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoursesTypes", x => new { x.TypeId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_CoursesTypes_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CoursesTypes_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCategoriesCourses_CourseId",
                table: "CourseCategoriesCourses",
                column: "CourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoursesCities_CourseId",
                table: "CoursesCities",
                column: "CourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoursesTypes_CourseId",
                table: "CoursesTypes",
                column: "CourseId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseCategoriesCourses");

            migrationBuilder.DropTable(
                name: "CoursesCities");

            migrationBuilder.DropTable(
                name: "CoursesTypes");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CourseCategoryId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CityId",
                table: "Courses",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_TypeId",
                table: "Courses",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Cities_CityId",
                table: "Courses",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CoursesCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CoursesCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Types_TypeId",
                table: "Courses",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
