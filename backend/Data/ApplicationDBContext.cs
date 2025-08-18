using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContexttOptions)
        : base(dbContexttOptions)
        {

        }

        public DbSet<Flashcard> Flashcards { get; set; }
    }
}