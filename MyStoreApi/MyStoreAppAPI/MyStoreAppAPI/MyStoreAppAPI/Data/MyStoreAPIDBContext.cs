using Microsoft.EntityFrameworkCore;
using MyStoreAppAPI.Model;

namespace MyStoreAppAPI.Data
{
    public class MyStoreAPIDBContext : DbContext
    {
        public MyStoreAPIDBContext(DbContextOptions options):base(options)
        {

        }

        public DbSet<Clients> Clients { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Order_items> Order_Items { get; set; }
        public DbSet<Products> Products { get; set; }
    }
}
