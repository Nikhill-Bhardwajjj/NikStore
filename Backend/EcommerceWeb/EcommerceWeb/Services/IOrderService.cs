using EcommerceWeb.Models;

namespace EcommerceWeb.Services
{
    public interface IOrderService
    {
        Task<OrderDto> PlaceOrderAsync(OrderDto orderDto);
        Task<List<OrderDto>> GetOrdersByUserAsync(string userId);
        Task<bool> RemoveOrderAsync(int orderId);

    }
}
