namespace EcommerceWeb.Models
{
    public class Order
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); 
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public string  Status { get; set; } = "pending"; 
    }
}
