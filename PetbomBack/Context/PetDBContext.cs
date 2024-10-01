using PetBomBack.Entities;
using Microsoft.EntityFrameworkCore;
using PetbomBack.Entities;

namespace PetBomBack.Context
{
    public class PetDBContext : DbContext
    {
 
        public PetDBContext(DbContextOptions<PetDBContext> options)
     : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetShop> PetShop { get; set; }
 
    }
}