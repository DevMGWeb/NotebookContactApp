using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotebookContactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookContactApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PersonaController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<Persona> Get()
        {
            return this._context.Personas.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var persona = this._context.Personas.FirstOrDefault(x => x.Id == id);

            if (persona == null)
                return NotFound();

            return Ok(persona);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            this._context.Personas.Add(persona);
            this._context.SaveChanges();

            return Ok(persona);
        }

        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Persona persona, int id)
        {
            if (persona.Id != id)
                return BadRequest();

            this._context.Entry(persona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this._context.SaveChanges();

            return Ok(persona);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var persona = this._context.Personas.Where(x => x.Id == id).FirstOrDefault();

            if (persona.Equals(null))
                return NotFound();

            this._context.Personas.Remove(persona);
            this._context.SaveChanges();

            return Ok(persona);
        }
    }
}
