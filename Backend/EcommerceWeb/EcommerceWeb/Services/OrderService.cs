using EcommerceWeb.Models;
using EcommerceWeb.Repositoies;

namespace EcommerceWeb.Services
{
    public class OrderService : IOrderService
    {

        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        // ✅ Place Order
        public async Task<OrderDto> PlaceOrderAsync(OrderDto orderDto)
        {
            var order = new Order
            {
                UserId = orderDto.UserId,
                TotalAmount = orderDto.TotalPrice,
                OrderDate = DateTime.UtcNow,
                Status = "pending",
                OrderItems = orderDto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = GetProductPrice(i.ProductId) * i.Quantity // Ensure price is set properly
                }).ToList()
            };

            var createdOrder = await _orderRepository.PlaceOrderAsync(order);

            await _orderRepository.ClearCartAsync(orderDto.UserId);

            return new OrderDto
            {
                UserId = createdOrder.UserId,
                TotalPrice = createdOrder.TotalAmount,
                Items = createdOrder.OrderItems.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity
                }).ToList(),
                ShippingAddress = orderDto.ShippingAddress,
                PaymentMethod = orderDto.PaymentMethod
            };
        }

        // ✅ Get Orders by User ID
        public async Task<List<OrderDto>> GetOrdersByUserAsync(string userId)
        {
            var orders = await _orderRepository.GetOrdersByUserAsync(userId);

            return orders.Select(o => new OrderDto
            {
                UserId = o.UserId,
                TotalPrice = o.TotalAmount,
                Items = o.OrderItems.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity
                }).ToList(),
                PaymentMethod = "CreditCard" // Hardcoded for now
            }).ToList();
        }

        private decimal GetProductPrice(int productId)
        {
            // 🔴 Product price fetch karna hai toh actual logic add karo!
            return 500; // Dummy price
        }


        // ✅ Remove Order
        public async Task<bool> RemoveOrderAsync(int orderId)
        {
            var order = await _orderRepository.GetOrdersByUserAsync(orderId.ToString());
            if (order == null)
            {
                return false;
            }

            await _orderRepository.RemoveOrderAsync(order.First());
            return true;
        }

       

    }
}


