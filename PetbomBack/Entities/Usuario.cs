using System;

namespace PetBomBack.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public DateTimeOffset? DataDeNascimento { get; set; } 
        public string DataNascimentoFormatada => DataDeNascimento?.ToString("dd/MM/yyyy");
    }
}
