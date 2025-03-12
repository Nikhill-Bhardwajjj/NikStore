using EcommerceWeb.Models;

namespace EcommerceWeb.Repositoies
{
    public interface IOrderRepository
    {

        Task<Order> PlaceOrderAsync(Order order);
        Task<List<Order>> GetOrdersByUserAsync(string userId);
        Task RemoveOrderAsync(Order order);

        Task ClearCartAsync(string userId);
    }
}

