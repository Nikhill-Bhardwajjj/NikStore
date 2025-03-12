using EcommerceWeb.Models;

namespace EcommerceWeb.Services
{
    public interface IProductService
    {

        Task<IEnumerable<Product>> GetAllProductAsync();
        Task<Product> GetProductByIdAsync(int id); 
        Task AddProductAsync(Product product);
        Task DeleteProductAsync(int id);
        Task UpdateProductAsync(Product product);

    }
}
