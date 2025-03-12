using EcommerceWeb.Models;
using System.Net.Http.Headers;

namespace EcommerceWeb.Repositoies
{
    public interface IProductRepository : IRepository<Product>
    {

        Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId); 

    }
}
