using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SimpleCrud.Infrastructure;

namespace SimpleCrud
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        
        public void ConfigureServices(IServiceCollection services)
        {
            //var connection = @"Server=IATEC-GBWVVC2\DevServer;Initial Catalog=ScriptManager;Integrated Security=True;";
            services.AddDbContext<SimpleCrudContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ScDatabase")));

            //services.AddScoped<IResourceGenerator, ResourceService>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseStatusCodePages();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder =>
                builder.AllowAnyOrigin() //WithOrigins("http://localhost:8080")
                .AllowAnyMethod()
                .AllowAnyHeader()
                );

            app.UseMvc();
        }
    }
}
