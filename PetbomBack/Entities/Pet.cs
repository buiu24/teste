namespace PetBomBack.Entities
{
    public class Pet
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string NomeDoPet { get; set; }
        public string Especie { get; set; }
        public string Raca { get; set; }
        public string IdadeDoPet { get; set; }
        public Usuario Usuario { get; set; }
        public string CaminhoImagem {get; set; }
     
    }
}