using EcommerceWeb.Models;
using EcommerceWeb.Repositoies;

namespace EcommerceWeb.Services
{
    public class CategoryService : ICategoryService
    {

        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        public async Task<IEnumerable<Category>> GetAllCategoriesAsync() => await _categoryRepository.GetAllAsync(); 
        public async Task<Category> CategoryByIdAsync(int id) => await _categoryRepository.GetByIdAsync(id);
        public async Task AddCategoryAsync(Category category)
        {
            await _categoryRepository.AddAsync(category);
            await _categoryRepository.SaveAsync();
        }
        public async Task UpdateCategoryAsync(Category category) =>  _categoryRepository.update(category);
        public async Task DeleteCategoryAsync(int id)
        {
            var Category = await _categoryRepository.GetByIdAsync(id);
            if(Category!=null)
            {
                _categoryRepository.Delete(Category);
                await _categoryRepository.SaveAsync();
            }
        }
    }
}
