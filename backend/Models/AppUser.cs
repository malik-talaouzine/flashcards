using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
    }
}