using PetBomBack.Entities;

namespace PetbomBack.Entities
{
    public class PetShop
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string ServicosOferecidos  { get; set; }
         public string Contato { get; set; }
         public string CaminhoImagemm {get; set; }
         public string TipoAnimal { get; set; }
        public Usuario Usuarios { get; set; }
    }
}
