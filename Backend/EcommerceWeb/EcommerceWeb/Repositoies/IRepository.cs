namespace EcommerceWeb.Repositoies
{
    public interface IRepository<T> where T : class 
    {

        Task<IEnumerable<T>> GetAllAsync(); 
        Task<T> GetByIdAsync(int id);
        Task AddAsync (T entity);
        void update (T entity);
        void Delete (T entity);
        Task SaveAsync(); 

    }
}
