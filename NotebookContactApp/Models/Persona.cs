using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookContactApp.Models
{
    public class Persona
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }
        
        [StringLength(100)]
        public string Apellido { get; set; }

        [StringLength(30)]
        public string Telefono { get; set; }
        
        [StringLength(30)]
        public string Celular { get; set; }
        
        [StringLength(50)]
        public string Correo { get; set; }
    }
}
