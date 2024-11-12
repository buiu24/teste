let listaLoveDogGlobal = []; 

async function carregarlistaLoveDog() {
    try {
        const response = await fetch('http://localhost:5195/api/Pet');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista do Love Dog.');
        }
        const listaLoveDog = await response.json();
        listaLoveDogGlobal = listaLoveDog; 
        exibirPets(listaLoveDog); 
    } catch (error) {
        console.error('Erro ao carregar lista do Love Dog:', error);
        Toastify({
            text: "Erro ao carregar lista de LoveDog, Verifique sua Internet!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "center", // `left`, `center` ou `right`
            stopOnFocus: true, // Impede o fechamento ao passar o mouse
            style: {
              background: "#78E7FF",
            },
        }).showToast();
        return;
    }
}

async function exibirPets(listaLoveDog) {
    const listaLoveDogElement = document.getElementById('listaLoveDog');
    listaLoveDogElement.innerHTML = ''; 

    for (const pet of listaLoveDog) {
        { 
            const listItem = document.createElement('li');
            listItem.className = 'pet';

            let imageUrl = 'default.jpg'; 
            
            if (pet.imagemUrl) {
                imageUrl = pet.imagemUrl;
            } else {
                try {
                    const imageResponse = await fetch(`http://localhost:5195/api/Pet/${pet.id}/imagem`);
                    if (imageResponse.ok) {
                        const blob = await imageResponse.blob();
                        imageUrl = URL.createObjectURL(blob);
                    }
                } catch (error) {
                    console.error(`Erro ao carregar imagem do pet ${pet.nomeDoPet}:`, error);
                }
            }

            listItem.innerHTML = `
                <img src="${imageUrl}" alt="Imagem do Animal"><br>
                <strong>Nome do Pet:</strong> ${pet.nomeDoPet}<br>
                <strong>Espécie:</strong> ${pet.especie}<br>
                <strong>Raça:</strong> ${pet.raca}<br>
                <strong>Idade do Pet:</strong> ${pet.idadeDoPet}<br>
                <button onclick="verDetalhes(${pet.usuarioId})">Ver Detalhes</button>
                <hr>
            `;
            listaLoveDogElement.appendChild(listItem);
        }
    }
}

function filtrarPets() {
    const termoPesquisa = document.getElementById('pesquisaInput').value.toLowerCase();
    const petsFiltrados = listaLoveDogGlobal.filter(pet => {
        return pet.nomeDoPet.toLowerCase().includes(termoPesquisa) ||
               pet.especie.toLowerCase().includes(termoPesquisa) ||
               pet.raca.toLowerCase().includes(termoPesquisa);
    });
    exibirPets(petsFiltrados); 
}

async function verDetalhes(usuarioId) {
    try {
        const response = await fetch(`http://localhost:5195/api/Usuarios/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter as informações do usuário.');
        }
        const usuario = await response.json();

        const telefoneLimpo = usuario.telefone.replace(/\D/g, '');

        const linkWhatsApp = `https://wa.me/${telefoneLimpo}`;

        const detalhesUsuario = `
            <strong>Nome do Usuário:</strong> ${usuario.nome}<br>
            <strong>Email:</strong> ${usuario.email}<br>
            <strong>Telefone:</strong> <a href="${linkWhatsApp}" target="_blank">${usuario.telefone}</a><br>
            <strong>Endereço:</strong> ${usuario.endereco}
        `;
        
        document.getElementById('detalhesUsuario').innerHTML = detalhesUsuario;
        document.getElementById('detalhesModal').style.display = 'block';

    } catch (error) {
        console.error('Erro ao carregar as informações do usuário:', error);
        alert('Erro ao carregar as informações do usuário. Tente novamente mais tarde.');
    }
}

function fecharModal() {
    document.getElementById('detalhesModal').style.display = 'none';
}

carregarlistaLoveDog();
