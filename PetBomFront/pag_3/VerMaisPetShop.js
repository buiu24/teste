let listaPetShopGlobal = []; 

async function carregarlistaPetShop() {
    try {
        const response = await fetch('http://localhost:5195/api/PetShop');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista dos PetShops.');
        }
        const listaPetShop = await response.json();
        listaPetShopGlobal = listaPetShop;
        exibirPetShops(listaPetShop); 
    } catch (error) {
        console.error('Erro ao carregar lista do PetShop:', error);
        Toastify({
            text: "Erro ao carregar lista do PetShop, Verifique sua Internet!",
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

async function exibirPetShops(listaPetShop) {
    const listaPetShopElement = document.getElementById('listaPetShop');
    listaPetShopElement.innerHTML = ''; 

    for (const petshop of listaPetShop) {
        const listItem = document.createElement('li');
        listItem.className = 'petshop';

        let imageUrl = 'default.jpg'; // Imagem padrão

        if (petshop.imagemUrl) {
            imageUrl = petshop.imagemUrl;
        } else {
            try {
                const imageResponse = await fetch(`http://localhost:5195/api/PetShop/${petshop.id}/imagem`);
                if (imageResponse.ok) {
                    const blob = await imageResponse.blob();
                    imageUrl = URL.createObjectURL(blob);
                }
            } catch (error) {
                console.error(`Erro ao carregar imagem do PetShop ${petshop.nome}:`, error);
            }
        }

        listItem.innerHTML = `
            <img src="${imageUrl}" alt="Imagem do PetShop"><br>
            <strong>Nome do PetShop:</strong> ${petshop.nome}<br>
            <strong>Endereço:</strong> ${petshop.endereco}<br>
            <strong>Serviços Oferecidos:</strong> ${petshop.servicosOferecidos}<br>
            <strong>Contato:</strong> ${petshop.contato}<br>
            <strong>Tipo de Animal Atendido:</strong> ${petshop.tipoAnimal}<br>
            <button onclick="verDetalhes(${petshop.usuarioId})">Ver Detalhes</button>
            <hr>
        `;
        listaPetShopElement.appendChild(listItem);
    }
}

function filtrarPetShops() {
    const termoPesquisa = document.getElementById('pesquisaInput').value.toLowerCase();
    const petshopFiltrados = listaPetShopGlobal.filter(petshop => {
        return petshop.nome.toLowerCase().includes(termoPesquisa) ||
        petshop.endereco.toLowerCase().includes(termoPesquisa) ||
        petshop.tipoAnimal.toLowerCase().includes(termoPesquisa) ||
        petshop.servicosOferecidos.toLowerCase().includes(termoPesquisa);
    });
    exibirPetShops(petshopFiltrados);
}

async function verDetalhes(usuarioId) {
    try {
        const response = await fetch(`http://localhost:5195/api/Usuarios/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter as informações do usuário.');
        }
        const usuario = await response.json();
        alert(`Nome do Dono: ${usuario.nome}\nEmail Para Contato: ${usuario.email}\nTelefone: ${usuario.telefone}\nEndereço: ${usuario.endereco}`);
    } catch (error) {
        console.error('Erro ao carregar as informações do usuário:', error);
        Toastify({
            text: "Erro ao carregar Informações do Usuário, Tente Novamente!",
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


// Função para buscar e exibir os detalhes do usuário no modal
async function verDetalhes(usuarioId) {
    try {
        const response = await fetch(`http://localhost:5195/api/Usuarios/Usuarios/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter as informações do usuário.');
        }
        const usuario = await response.json();

        // Limpa o número de telefone, removendo caracteres especiais
        const telefoneLimpo = usuario.telefone.replace(/\D/g, '');

        // Gera o link do WhatsApp com o número de telefone formatado
        const linkWhatsApp = `https://wa.me/${telefoneLimpo}`;

        // Preenche o modal com as informações do usuário
        const detalhesUsuario = `
            <strong>Dono Do Petshop:</strong> ${usuario.nome}<br>
            <strong>Email do Dono:</strong> ${usuario.email}<br>
            <strong>Telefone Do Dono:</strong> <a href="${linkWhatsApp}" target="_blank">${usuario.telefone}</a><br>
        `;
        
        document.getElementById('detalhesUsuario').innerHTML = detalhesUsuario;
        document.getElementById('detalhesModal').style.display = 'block';

    } catch (error) {
        console.error('Erro ao carregar as informações do usuário:', error);
        Toastify({
            text: "Erro ao carregar Informações do Usuário, Tente novamente mais Tarde!",
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

function fecharModal() {
    document.getElementById('detalhesModal').style.display = 'none';
}

carregarlistaPetShop();
