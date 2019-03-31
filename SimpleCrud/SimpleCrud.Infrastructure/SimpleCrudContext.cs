using Microsoft.EntityFrameworkCore;
using SimpleCrud.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SimpleCrud.Infrastructure
{
    public class SimpleCrudContext : DbContext
    {
        public SimpleCrudContext(DbContextOptions<SimpleCrudContext> options) : base(options)
        {
        }
        public DbSet<Person> People { get; set; }
    }
}
