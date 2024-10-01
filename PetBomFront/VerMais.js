async function carregarlistaLoveDog() {
    try {
        const response = await fetch('http://localhost:5195/api/Pet');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista do Love Dog.');
        }
        const listaLoveDog = await response.json();
        const listaLoveDogElement = document.getElementById('listaLoveDog');

        for (const pet of listaLoveDog) {
            const listItem = document.createElement('li');
            listItem.className = 'pet';

            const imageResponse = await fetch(`http://localhost:5195/api/Pet/${pet.id}/imagem`);
            let imageUrl = '';
            if (imageResponse.ok) {
                const blob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(blob);
            } else {
                imageUrl = 'default.jpg'; // Caminho para uma imagem padrão caso não exista imagem para o imóvel
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
    } catch (error) {
        console.error('Erro ao carregar lista do Love Dog:', error);
        alert('Erro ao carregar lista do Love Dog. Tente novamente mais tarde.');
    }
}

async function verDetalhes(usuarioId) {
    try {
        const response = await fetch(`http://localhost:5195/api/Usuarios/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter as informações do usuário.');
        }
        const usuario = await response.json();
        alert(`Nome do Usuário: ${usuario.nome}\nEmail: ${usuario.email}\nTelefone: ${usuario.telefone}\nEndereço: ${usuario.endereco}`);
    } catch (error) {
        console.error('Erro ao carregar as informações do usuário:', error);
        alert('Erro ao carregar as informações do usuário. Tente novamente mais tarde.');
    }
}

carregarlistaLoveDog();
