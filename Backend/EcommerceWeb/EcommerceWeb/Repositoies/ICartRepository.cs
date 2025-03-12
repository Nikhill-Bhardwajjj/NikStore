using EcommerceWeb.Models;

namespace EcommerceWeb.Repositoies
{
    public interface ICartRepository
    {
        Cart GetCartByUserId(string userId);
        Task<Cart?> GetCartByUserIdAsync(string userId);
        void AddToCart(string userId, int productId, int quantity);
        Task<bool> RemoveFromCart(string userId , int cartItemId); 
        Task UpdateCart(Cart cart);
       

      
        void ClearCart(string userId);
        void save(); 
         

    }
}
