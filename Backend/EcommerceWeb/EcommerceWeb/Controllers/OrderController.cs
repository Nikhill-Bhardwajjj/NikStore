using EcommerceWeb.Models;
using EcommerceWeb.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.EntityFrameworkCore;

namespace EcommerceWeb.Controllers
{

    [Route("api/orders")]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;
        

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
           
            
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(string userId)
        {
            var orders = await _orderService.GetOrdersByUserAsync(userId);
            return Ok(orders);
        }

        // ✅ Place Order
        [HttpPost("place")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderDto orderDto)
        {
            if(orderDto == null || orderDto.Items.Count == 0)
        {
                return BadRequest("Order must have at least one item.");
            }

            var order = await _orderService.PlaceOrderAsync(orderDto);
            return Ok(new { message = "Order placed successfully", order });
        }

       


        // ❌ Remove Order
        [HttpDelete("remove/{orderId}")]
        public async Task<IActionResult> RemoveOrder(int orderId)
        {
            bool isRemoved = await _orderService.RemoveOrderAsync(orderId);
            if (!isRemoved)
            {
                return NotFound("Order not found.");
            }

            return Ok("Order removed successfully.");
        }
    }
}

public class OrderDto
{
    public string UserId { get; set; } // User ki ID
    public List<OrderItemDto> Items { get; set; } // Order ke items
    public decimal TotalPrice { get; set; } // Total price calculate hoke aayega
    public ShippingAddressDto ShippingAddress { get; set; } // Address
    public string PaymentMethod { get; set; } // Payment type (COD, CreditCard, etc.)
}


public class OrderItemDto
{
    public int ProductId { get; set; } // Product ki ID
    public int Quantity { get; set; } // Kitna quantity order ho raha hai
}


public class ShippingAddressDto
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
}




