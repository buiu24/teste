using Microsoft.AspNetCore.Mvc;
using PetBomBack.Context;
using PetBomBack.Entities;
 
 
namespace PetBomBack.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly PetDBContext _context;
 
        public AutenticacaoController(PetDBContext dbContext)
        {
            _context = dbContext;
        }
 
        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            var user = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email && u.Senha == usuario.Senha);
            if (user == null)
            {
                return Unauthorized();
            }
         
            return Ok(new { Message = "Logado!", UsuarioId = usuario.Id });
        }
    }
}