using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleCrud.Domain.Entities;
using SimpleCrud.Infrastructure;

namespace SimpleCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly SimpleCrudContext context;
        public PeopleController(SimpleCrudContext simpleCrudContext)
        {
            this.context = simpleCrudContext ?? throw new ArgumentNullException(nameof(simpleCrudContext));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = context.People.ToArray();

            if (result == null || result.Count() == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost]
        public IActionResult Save([FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Add<Person>(person);
                context.SaveChanges();

            }
            catch (Exception e)
            {
                return BadRequest(e);
                throw;
            }

            return Created("", person);

        }

        [HttpPut]
        public IActionResult Alter([FromBody] Person personDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Person person = context.Find<Person>(personDTO.Id);
            if (person == null)
            {
                return NotFound();
            }

            person.Email = personDTO.Email;
            person.Phone = personDTO.Phone;
            person.Name = personDTO.Name;

            context.SaveChanges();

            return Ok();

        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            if (id == default(int))
            {
                return BadRequest();
            }

            Person person = context.Find<Person>(id);
            if (person == null)
            {
                return NotFound();
            }

            context.Remove(person);
            context.SaveChanges();

            return Ok();

        }

    }
}