namespace EcommerceWeb.Models
{
    public class Cart
    {

        public int Id { get; set; }
        public string UserId { get; set; }
        public List<cartItem> cartItems { get; set; } = new List<cartItem>(); 

    }
}
