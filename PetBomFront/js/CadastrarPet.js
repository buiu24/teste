document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = localStorage.getItem('IdUsuario');
    if (!usuarioId) {
        alert('Usuário não está logado.');
        window.location.href = 'Cadastrar.html';
    }
});

document.getElementById("petForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("IdUsuario");
    const nomeDoPet = document.getElementById("nomeDoPet").value;
    const especie = document.getElementById("especie").value;
    const raca = document.getElementById("raca").value;
    const idadeDoPet = document.getElementById("idadeDoPet").value;
    const imagem = document.getElementById("imagem").files[0];
    
    const novoPet = {
        usuarioId : usuarioId,
        nomeDoPet : nomeDoPet,
        especie : especie, 
        raca : raca,
        idadeDoPet : idadeDoPet
    };
    
    
    try {
        const response = await fetch('http://localhost:5195/api/Pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (novoPet)
        });
        
        if (response.ok) {
            alert("Pet cadastrado com sucesso!");
            // Limpar o formulário
            document.getElementById("petForm").reset();
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
                document.getElementById("successMessage").style.display = "none";
            }, 3000);
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar pet: ${errorData.message || response.statusText}`);
        }
            const novoPetJson = await response.json();
            const PetId = novoPetJson.id;

            if (!imagem) {
                alert("Por favor, selecione uma imagem para o pet.");
                return;
            }
        
             const formData = new FormData();
             formData.append('file', imagem);
        
            const responseImage = await fetch(`http://localhost:5195/api/Pet/${PetId}/upload`, {
                method: 'POST',
                body : formData 
            });
        
            if(responseImage.ok)
                {
                    alert('Imagem postada com Sucesso!.');
                }
                else {
                    alert('Erro no upload da imagem!')
                }
    } catch (error) {
        alert(`Erro ao cadastrar pet: ${error.message}`);
    }
});
