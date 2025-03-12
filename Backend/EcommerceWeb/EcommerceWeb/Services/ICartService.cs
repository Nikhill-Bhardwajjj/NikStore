using EcommerceWeb.Models;

namespace EcommerceWeb.Services
{
    public interface ICartService
    {
        Cart GetUserCart(string userId);
        void AddProductToCart(string userId, int productId, int quantity);
        Task<bool> RemoveProductFromCart(string userId ,int cartItemId);
        Task<Cart?> UpdateCartItemQuantity(string userId, int cartItemId, int quantity);
        void ClearUserCart(string userId);
    }
}
