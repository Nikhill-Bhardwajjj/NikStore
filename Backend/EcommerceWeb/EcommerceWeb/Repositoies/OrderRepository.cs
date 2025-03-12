using EcommerceWeb.Data;
using EcommerceWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceWeb.Repositoies
{
    public class OrderRepository : IOrderRepository
    {

        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> PlaceOrderAsync(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order), "Order object is null");
            }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }


        public async Task<List<Order>> GetOrdersByUserAsync(string userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task ClearCartAsync(string userId)
        {
            var cart = await _context.Carts
                .Include(c => c.cartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.cartItems); // 🔥 पहले Cart Items Delete करो
                _context.Carts.Remove(cart);                   // 🔥 फिर पूरा Cart Delete करो
                await _context.SaveChangesAsync();
            }
        }


        public async Task RemoveOrderAsync(Order order)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
