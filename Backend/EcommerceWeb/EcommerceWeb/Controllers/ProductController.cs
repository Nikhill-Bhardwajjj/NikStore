using EcommerceWeb.Models;
using EcommerceWeb.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()

        {
            var products = await _productService.GetAllProductAsync();
            if (products == null || !products.Any()) // Check if products are null or empty
            {
                return NotFound(new { message = "No products found!" });
            }
            return Ok(products);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> Getprodct( int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> addProduct([FromBody] Product product)
        {
            await _productService.AddProductAsync(product);
            return CreatedAtAction(nameof(Getprodct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateProduct(int id , [FromBody] Product product)
        {
            if (id != product.Id) return BadRequest(); 
            await _productService.UpdateProductAsync(product);
            return NoContent(); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }

    }
}
