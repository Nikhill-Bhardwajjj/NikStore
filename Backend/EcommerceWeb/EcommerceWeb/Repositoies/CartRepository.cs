using EcommerceWeb.Data;
using EcommerceWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceWeb.Repositoies
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _context;

        public CartRepository(ApplicationDbContext context)
        {
            _context = context;
        }





        public void AddToCart(string userId, int productId, int quantity)
        {
           var cart = GetCartByUserId(userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId, cartItems = new List<cartItem>() };
                _context.Carts.Add(cart);
                save();
                
            }

            var _cartItem = cart.cartItems.FirstOrDefault(ci=> ci.ProcuctId == productId );

            if (_cartItem != null)
            {
                _cartItem.Quantity += quantity;
            }
            else
            {
                cart.cartItems.Add(new cartItem
                {
                    ProcuctId = productId,
                    Quantity = quantity
                });

            }
            save();

        }

        public void ClearCart(string userId)
        {
            var cart = GetCartByUserId(userId);
            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.cartItems);
                save();
            }

        }
        public async Task<Cart?> GetCartByUserIdAsync(string userId)
        {
            return await _context.Carts.Include(c => c.cartItems)
                  .ThenInclude(ci => ci.Product)
                  .FirstOrDefaultAsync(c => c.UserId == userId);
        }




        public Cart GetCartByUserId(string userId)
        {
            return _context.Carts.Include(c => c.cartItems)
                  .ThenInclude(ci => ci.Product)
                  .FirstOrDefault(c => c.UserId == userId); 
        }


        public async Task<bool> RemoveFromCart(string userId, int cartItemId)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == cartItemId && ci.Cart.UserId == userId);

            if (cartItem == null)
            {
                return false; // Item exists hi nahi ya phir doosre user ka hai
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task UpdateCart(Cart cart)
        {
            _context.Carts.Update(cart);
            await _context.SaveChangesAsync();
        }


        public void save()
        {
            _context.SaveChanges();
        }
    }
}
