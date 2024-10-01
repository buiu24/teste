using Microsoft.AspNetCore.Mvc;
using PetBomBack.Context;
using PetBomBack.Entities;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace PetBomBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly PetDBContext _context;

        public PetController(PetDBContext context)
        {
            _context = context;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Pet>>> Pets()
        {
            return await _context.Pets.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPetPorId(int id)
        {
            var petEncontrado = await _context.Pets.FindAsync(id);
            if (petEncontrado == null)
            {
                return NotFound($"Animal com ID {id} não encontrado.");
            }

            return Ok(petEncontrado);
        }

        [HttpPost]
        public async Task<IActionResult> CriarPet(Pet pet)
        {
            if (pet == null)
            {
                return BadRequest("Dados inválidos para criar um Pet.");
            }

            var usuarioExistente = await _context.Usuarios.FindAsync(pet.UsuarioId);
            if (usuarioExistente == null)
            {
                return BadRequest("Usuário não encontrado. O pet deve estar associado a um usuário existente.");
            }

            pet.Usuario = usuarioExistente;
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObterPetPorId), new { id = pet.Id }, pet);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarPet(int id, Pet petAtualizado)
        {
            if (id != petAtualizado.Id)
            {
                return BadRequest("ID do pet não corresponde aos dados fornecidos.");
            }

            var petExistente = await _context.Pets.FindAsync(id);
            if (petExistente == null)
            {
                return NotFound($"Pet com ID {id} não encontrado.");
            }

            petExistente.NomeDoPet = petAtualizado.NomeDoPet;
            petExistente.Especie = petAtualizado.Especie;
            petExistente.Raca = petAtualizado.Raca;
            petExistente.IdadeDoPet = petAtualizado.IdadeDoPet;

            await _context.SaveChangesAsync();

            return Ok(petExistente);
        }

        [HttpPost("{id}/upload")]
        public async Task<IActionResult> UploadImagem(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Arquivo de imagem inválido.");
            }

            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound("Pet não encontrado.");
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

            pet.CaminhoImagem = $"/images/{fileName}";
            _context.Entry(pet).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { caminho = pet.CaminhoImagem });
        }

        [HttpGet("{id}/imagem")]
        public async Task<IActionResult> GetImagem(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null || string.IsNullOrEmpty(pet.CaminhoImagem))
            {
                return NotFound("Imagem não encontrada.");
            }

            var imageFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", pet.CaminhoImagem.TrimStart('/'));

            if (!System.IO.File.Exists(imageFilePath))
            {
                return NotFound("Imagem não encontrada no servidor.");
            }

            var image = System.IO.File.OpenRead(imageFilePath);
            return File(image, "image/jpeg"); // Ajuste o tipo MIME conforme necessário
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirPet(int id)
        {
            var petParaExcluir = await _context.Pets.FindAsync(id);
            if (petParaExcluir == null)
            {
                return NotFound($"Pet com ID {id} não encontrado.");
            }

            _context.Pets.Remove(petParaExcluir);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
