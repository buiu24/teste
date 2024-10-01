let currentIndex = 0;

function showNextImage() {
    const images = document.querySelectorAll('.image-slider img');
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-slider img');
    images.forEach((img, index) => {
        if (index !== 0) img.style.display = 'none';
    });
    setInterval(showNextImage, 10000); // Troca a cada 10 segundos

    // Inicialização do seletor de estado e cidade
    initializeSelectors();
    
    // Inicialização das imagens deslizantes nas colunas
    initializeSlidingImages();
});

function initializeSelectors() {
    const stateSelector = document.getElementById('state');
    const citySelector = document.getElementById('city');

    // Lista de estados - deve ser obtida de uma API ou banco de dados
    const states = [
        { code: 'SP', name: 'São Paulo' },
        { code: 'RJ', name: 'Rio de Janeiro' },
        { code: 'MG', name: 'Minas Gerais' }
        // Adicione mais estados conforme necessário
    ];

    // Preenche o seletor de estados
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        stateSelector.appendChild(option);
    });

    // Evento para carregar cidades quando um estado for selecionado
    stateSelector.addEventListener('change', () => {
        const selectedState = stateSelector.value;
        if (selectedState) {
            // Chame a API para obter as cidades do estado selecionado
            fetchCities(selectedState);
        } else {
            citySelector.innerHTML = '<option value="">Selecione uma cidade</option>';
        }
    });
}

function fetchCities(stateCode) {
    const citySelector = document.getElementById('city');
    citySelector.innerHTML = '<option value="">Carregando...</option>';

    // Exemplo de chamada para a API do Google Maps para buscar cidades
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
        query: `${stateCode}, Brazil`,
        fields: ['name']
    };

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            citySelector.innerHTML = '<option value="">Selecione uma cidade</option>';
            results.forEach(place => {
                const option = document.createElement('option');
                option.value = place.name;
                option.textContent = place.name;
                citySelector.appendChild(option);
            });
        } else {
            citySelector.innerHTML = '<option value="">Erro ao carregar cidades</option>';
        }
    });
}

function initializeSlidingImages() {
    const slidingColumns = document.querySelectorAll('.sliding-images');
    slidingColumns.forEach(column => {
        const images = column.querySelectorAll('img');
        let index = 0;
        setInterval(() => {
            images[index].style.transform = 'translateX(-100%)';
            index = (index + 1) % images.length;
            images[index].style.transform = 'translateX(0)';
        }, 5000); // Troca a cada 5 segundos
    });
}
// Obtém o modal
var modal = document.getElementById("myModal");

// Obtém o botão que abre o modal
var btn = document.getElementById("openModalBtn");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, abre o modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function EntrarLoveDog() {
    console.log("Teste")
    window.location.href = ("http://127.0.0.1:5500/pag_2/LoveDog.html");
    }

function VoltarInicio() {
    console.log("Teste")
    window.location.href = ("http://127.0.0.1:5500/PaginaInicial.html");
    }

function CadastrarPetshop() {
    window.location.href = ("http://127.0.0.1:5500/CadastrarPetShop.html")
}