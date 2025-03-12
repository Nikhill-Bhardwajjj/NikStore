using EcommerceWeb.Models;
using EcommerceWeb.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;


namespace EcommerceWeb.Controllers
{


    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService) {
            
                _categoryService = categoryService;
            }

            [HttpGet]
            public async Task<IActionResult> GetAllCategories()
            {
                var categories = await _categoryService.GetAllCategoriesAsync();
                return Ok(categories);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetCategory(int id)
            {
                var category = await _categoryService.CategoryByIdAsync(id);
                if (category == null) return NotFound();
                return Ok(category);
            }

            [HttpPost]
            public async Task<IActionResult> AddCategory([FromBody] Category category)
            {
                await _categoryService.AddCategoryAsync(category);
                return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
            {
                if (id != category.Id) return BadRequest();
                await _categoryService.UpdateCategoryAsync(category);
                return NoContent();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteCategory(int id)
            {
                await _categoryService.DeleteCategoryAsync(id);
                return NoContent();
            }



        }
    }

