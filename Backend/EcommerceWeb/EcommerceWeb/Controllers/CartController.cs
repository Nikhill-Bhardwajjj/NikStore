using EcommerceWeb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EcommerceWeb.Controllers
{
    [Route("api/cart")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        
        }


        [HttpGet]
        public IActionResult GetCart()
        {



            string userId = GetUserId();
            if (userId == null) return Unauthorized();

            var cart = _cartService.GetUserCart(userId);
            return Ok(cart);
        }

        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItemDto cartItemDto)
        {
            if (cartItemDto == null || cartItemDto.ProductId <= 0 || cartItemDto.Quantity <= 0)
                return BadRequest(new { message = "Invalid cart item data" });

            string userId = GetUserId();
            if (userId == null) return Unauthorized();

            _cartService.AddProductToCart(userId, cartItemDto.ProductId, cartItemDto.Quantity);
            return Ok(new { message = "Product added to cart successfully" });
        }


       

        [HttpDelete("clear")]
        public IActionResult ClearCart()
        {
            string userId = GetUserId();
            if (userId == null) return Unauthorized();

            _cartService.ClearUserCart(userId);
            return Ok(new { message = "Cart cleared successfully" });
        }

        [HttpGet("{userId}")] //  Yeh update karo
        public IActionResult GetCart(string userId)
        {
            var cart = _cartService.GetUserCart(userId);
            if (cart == null)
            {
                return NotFound(new { message = "Cart not found for user" }); // 🔴 Yeh 404 ka cause ho sakta hai
            }
            return Ok(cart);
        }


        [HttpDelete("remove/{userId}/{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(string userId, int cartItemId)
        {
            var isRemoved = await _cartService.RemoveProductFromCart(userId, cartItemId);

            if (!isRemoved)
            {
                return NotFound(new { message = "Item not found in user's cart" });
            }

            return Ok(new { message = "Item removed successfully" });
        }


        [HttpPut("update-quantity/{userId}/{cartItemId}/{quantity}")]
        public async Task<IActionResult> UpdateCartItemQuantity(string userId, int cartItemId, int quantity)
        {
            if (quantity < 1)
                return BadRequest("Quantity must be at least 1.");

            var updatedCart =  await _cartService.UpdateCartItemQuantity(userId, cartItemId, quantity);

            if (updatedCart == null)
                return NotFound("Cart item not found.");

            return Ok(updatedCart);
        }









        private string GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User ID not found in token.");
            return userId;
        }


    }
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
