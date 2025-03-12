using EcommerceWeb.Models;

namespace EcommerceWeb.Services
{
    public interface ICategoryService
    {

        Task<IEnumerable<Category>> GetAllCategoriesAsync(); 
        Task<Category> CategoryByIdAsync(int id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id); 
    }
}
