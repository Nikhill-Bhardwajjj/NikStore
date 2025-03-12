using EcommerceWeb.Data;
using EcommerceWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceWeb.Repositoies
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _context; 
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async  Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId)
        {
            return await _context.Products.Include(p => p.CategoryId == categoryId).ToListAsync();
        }
    }
}
