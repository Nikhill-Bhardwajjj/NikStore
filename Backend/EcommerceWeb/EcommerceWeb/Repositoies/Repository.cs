
using EcommerceWeb.Data;
using Microsoft.EntityFrameworkCore;

namespace EcommerceWeb.Repositoies
{
    public class Repository<T> : IRepository<T> where T : class
    {

        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository (ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public  async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
        public void update(T entity) => _dbSet.Update(entity);
       
        public void Delete(T entity) => _dbSet.Remove(entity);
        public async Task SaveAsync() => await _context.SaveChangesAsync();

       
    }
}
