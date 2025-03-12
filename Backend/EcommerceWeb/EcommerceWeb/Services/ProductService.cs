using EcommerceWeb.Models;
using EcommerceWeb.Repositoies;

namespace EcommerceWeb.Services
{
    public class ProductService : IProductService
    {

        private readonly IProductRepository _productRepository;


        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository; 
        }

        public async Task<IEnumerable<Product>> GetAllProductAsync() => await _productRepository.GetAllAsync();
        public async Task<Product> GetProductByIdAsync(int id) => await _productRepository.GetByIdAsync(id);
        public async Task AddProductAsync(Product product)
        {
            await _productRepository.AddAsync(product);
            await _productRepository.SaveAsync();

        }
        public async Task UpdateProductAsync(Product product)
        {
            _productRepository.update(product); 
            await _productRepository.SaveAsync();

                }
        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product != null)
            {
                _productRepository.Delete(product);
                await _productRepository.SaveAsync();
            }
        }

    }
}

