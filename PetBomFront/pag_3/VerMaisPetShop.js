async function carregarlistaPetShop() {
    try {
        const response = await fetch('http://localhost:5195/api/PetShop');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista dos PetShops.');
        }
        const listaPetShop = await response.json();
        const listaPetShopElement = document.getElementById('listaPetShop');

        for (const petshop of listaPetShop) {
            const listItem = document.createElement('li');
            listItem.className = 'petshop';

            const imageResponse = await fetch(`http://localhost:5195/api/PetShop/${petshop.id}/imagem`);
            let imageUrl = '';
            if (imageResponse.ok) {
                const blob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(blob);
            } else {
                imageUrl = 'default.jpg'; // Caminho para uma imagem padrão caso não exista imagem para o imóvel
            }

            listItem.innerHTML = `
                <img src="${imageUrl}" alt="Imagem do PetShop"><br>
                <table>
                    <tr>
                        <th>Nome do PetShop</th>
                        <td>${petshop.nome}</td>
                    </tr>
                    <tr>
                        <th>Endereço</th>
                        <td>${petshop.endereco}</td>
                    </tr>
                    <tr>
                        <th>Serviços Oferecidos</th>
                        <td>${petshop.servicosOferecidos}</td>
                    </tr>
                    <tr>
                        <th>Contato Do PetShop</th>
                        <td>${petshop.contato}</td>
                    </tr>
                    <tr>
                        <th>Animal Atendido</th>
                        <td>${petshop.tipoAnimal}</td>
                    </tr>
                </table>
                <button onclick="verDetalhes(${petshop.id})">Ver Detalhes</button>
                <hr>
            `;
            listaPetShopElement.appendChild(listItem);
        }
    } catch (error) {
        console.error('Erro ao carregar lista do PetShop:', error);
        alert('Erro ao carregar lista do PetShop. Tente novamente mais tarde.');
    }
}

async function verDetalhes(usuarioId) {
    try {
        const response = await fetch(`http://localhost:5195/api/Usuarios/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter as informações do usuário.');
        }
        const usuario = await response.json();
        alert(`Nome do Dono : ${usuario.nome}\nEmail Para Contato : ${usuario.email}\nTelefone :  ${usuario.telefone}\nEndereço : ${usuario.endereco}`);
    } catch (error) {
        console.error('Erro ao carregar as informações do usuário:', error);
        alert('Erro ao carregar as informações do usuário. Tente novamente mais tarde.');
    }
}

carregarlistaPetShop();
