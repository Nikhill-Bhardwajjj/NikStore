using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceWeb.Migrations
{
    /// <inheritdoc />
    public partial class OrderChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prodcutId",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "OrderItems",
                newName: "Quantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "OrderItems",
                newName: "quantity");

            migrationBuilder.AddColumn<int>(
                name: "prodcutId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
