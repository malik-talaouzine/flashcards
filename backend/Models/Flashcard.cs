using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Flashcard
    {
        public int Id { get; set; }

        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        public DateOnly NextQuery { get; set; }

        public int Level { get; set; } = 0;

        public string Question { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public int? UserId { get; set; }

        public User? User { get; set; }


        public Flashcard()
        {
            NextQuery = CreatedAt.AddDays(1);
        }
    }
}