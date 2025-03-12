using EcommerceWeb.Models;
using EcommerceWeb.Repositoies;

namespace EcommerceWeb.Services
{
    public class CartService : ICartService
    {

        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public void AddProductToCart(string userId, int productId, int quantity)
        {
            _cartRepository.AddToCart(userId, productId, quantity);
        }

        public void ClearUserCart(string userId)
        {
            _cartRepository.ClearCart(userId);
        }

        public Cart GetUserCart(string userId)
        {
            return _cartRepository.GetCartByUserId(userId);
        }

        public async Task<bool> RemoveProductFromCart(string userId, int cartItemId)
        {
            return await _cartRepository.RemoveFromCart(userId, cartItemId);
        }

        public async Task<Cart?> UpdateCartItemQuantity(string userId, int cartItemId, int quantity)
        {
            var cart = await _cartRepository.GetCartByUserIdAsync(userId);
            if (cart == null) return null;

            var cartItem = cart.cartItems.FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null) return null;

            cartItem.Quantity = quantity;
            await _cartRepository.UpdateCart(cart);

            return cart;
        }

    }
}
