using EcommerceWeb.Models;

namespace EcommerceWeb.Repositoies
{
    public interface ICategoryRepository : IRepository<Category>
    {

        Task SaveAsync();
    }
    
}
