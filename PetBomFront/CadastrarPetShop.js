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
    const nomeDoPetShop = document.getElementById("nomeDoPetShop").value;
    const contato = document.getElementById("contato").value;
    const endereco = document.getElementById("endereco").value;
    const servicosOferecidos = document.getElementById("servicosOferecidos").value;
    const imagem = document.getElementById("imagem").files[0];
    let tipoAnimal = document.querySelector('input[name="tipoAnimal"]:checked').value;

    if (tipoAnimal === "Outros") {
        tipoAnimal = document.getElementById("outrosTipo").value;
    }

    const novoPetShop = {
        usuarioId: usuarioId, 
        nome: nomeDoPetShop,
        endereco: endereco,
        servicosOferecidos: servicosOferecidos,
        tipoAnimal: tipoAnimal,
        contato: contato

    };

    try {
        const response = await fetch('http://localhost:5195/api/PetShop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPetShop)
        });

        if (response.ok) {
            alert("PetShop cadastrado com sucesso!");
            document.getElementById("petForm").reset();
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
                document.getElementById("successMessage").style.display = "none";
            }, 3000);
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar PetShop: ${errorData.message || response.statusText}`);
        }
            const novoPetShopJson = await response.json();
            const PetShopId = novoPetShopJson.id;

            if (!imagem){
                alert("Por favor, selecione uma imagem para o petshop.");
                return;
            }
            const formData = new FormData();
            formData.append('file', imagem);

            const responseImage = await fetch(`http://localhost:5195/api/PetShop/${PetShopId}/upload`, {
                method: 'POST',
                body : formData 
            });

            if(responseImage.ok)
                {
                    alert('Imagem Postada com Sucesso!');
                }
                else {
                    alert('Erro no upload da Imagem!')
                }

    } catch (error) {
        alert(`Erro ao cadastrar PetShop: ${error.message}`);
    }
});

document.querySelectorAll('input[name="tipoAnimal"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const outrosTipoContainer = document.getElementById("outrosTipoContainer");
        if (this.value === "Outros") {
            outrosTipoContainer.style.display = "block";
        } else {
            outrosTipoContainer.style.display = "none";
        }
    });
});
