using EcommerceWeb.Data;
using EcommerceWeb.Models;

namespace EcommerceWeb.Repositoies
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }
    }
}
