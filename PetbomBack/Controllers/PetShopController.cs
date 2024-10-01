using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetbomBack.Entities;
using PetBomBack.Context;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetBomBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetShopController : ControllerBase
    {
        private readonly PetDBContext _context;

        public PetShopController(PetDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetShop>>> PetShops()
        {
            return await _context.PetShop.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPetShopPorId(int id)
        {
            var petShopEncontrado = await _context.PetShop.FindAsync(id);
            if (petShopEncontrado == null)
            {
                return NotFound($"PetShop com ID {id} não encontrado.");
            }

            return Ok(petShopEncontrado);
        }

        [HttpPost]
        public async Task<IActionResult> CriarPetShop(PetShop petshop)
        {
            if (petshop == null)
            {
                return BadRequest("Dados inválidos para criar um PetShop.");
            }

            var usuarioExistente = await _context.Usuarios.FindAsync(petshop.UsuarioId);
            if (usuarioExistente == null)
            {
                return BadRequest("Usuário não encontrado. O PetShop deve estar associado a um usuário existente.");
            }

            petshop.Usuarios = usuarioExistente;

            _context.PetShop.Add(petshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObterPetShopPorId), new { id = petshop.Id }, petshop);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarPetShop(int id, PetShop petshopAtualizado)
        {
            if (id != petshopAtualizado.Id)
            {
                return BadRequest("ID do pedido não corresponde aos dados fornecidos.");
            }

            var petshopExistente = await _context.PetShop.FindAsync(id);
            if (petshopExistente == null)
            {
                return NotFound($"Pedido com ID {id} não encontrado.");
            }

            petshopExistente.UsuarioId = petshopAtualizado.UsuarioId;
            petshopExistente.Endereco = petshopAtualizado.Endereco;
            petshopExistente.Nome = petshopAtualizado.Nome;
            petshopExistente.ServicosOferecidos = petshopAtualizado.ServicosOferecidos;
            petshopExistente.Contato = petshopAtualizado.Contato;
            petshopExistente.TipoAnimal = petshopAtualizado.TipoAnimal;
            
            await _context.SaveChangesAsync();

            return Ok(petshopExistente);
        }

        [HttpPost("{id}/upload")]
        public async Task<IActionResult> UploadImagem(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Arquivo de imagem inválido.");
            }

            var petshop = await _context.PetShop.FindAsync(id);
            if (petshop == null)
            {
                return NotFound("PetShop não encontrado.");
            }

            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine("wwwroot/images", fileName);

            if (!Directory.Exists("wwwroot/images"))
            {
                Directory.CreateDirectory("wwwroot/images");
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            petshop.CaminhoImagemm = $"/images/{fileName}";
            _context.Entry(petshop).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { caminho = petshop.CaminhoImagemm });
        }

        [HttpGet("{id}/imagem")]
        public async Task<IActionResult> GetImagem(int id)
        {
            var petshop = await _context.PetShop.FindAsync(id);
            if (petshop == null || string.IsNullOrEmpty(petshop.CaminhoImagemm))
            {
                return NotFound("Imagem não encontrada.");
            }

            var imageFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", petshop.CaminhoImagemm.TrimStart('/'));

            if (!System.IO.File.Exists(imageFilePath))
            {
                return NotFound("Imagem não encontrada no servidor.");
            }

            var image = System.IO.File.OpenRead(imageFilePath);
            return File(image, "image/jpeg"); // Ajuste o tipo MIME conforme necessário
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirPetShop(int id)
        {
            var petshopParaExcluir = await _context.PetShop.FindAsync(id);
            if (petshopParaExcluir == null)
            {
                return NotFound($"Petshop com ID {id} não encontrado.");
            }

            _context.PetShop.Remove(petshopParaExcluir);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
