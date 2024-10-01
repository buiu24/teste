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
        });

//encaminhar 
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('LoveDog');
    botao.addEventListener('click', () => {
        window.location.href = '../pag_2/index.html';
    });
});

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

function EntrarPetShop() {
    console.log("Teste")
    window.location.href = ("http://127.0.0.1:5500/pag_3/petshops.html");
    }

function Labrador() {
    window.location.href = ("http://127.0.0.1:5500/pag_4/labrador.html");
}

function Collie() {
    window.location.href = ("http://127.0.0.1:5500/pag_5/BorderCollie.html");
}

function Sbe() {
    window.location.href = ("http://127.0.0.1:5500/pag_6/SãoBernardo.html");
}

function EntrarCadastroPet() {
    window.location.href = ("http://127.0.0.1:5500/CadastrarPet.html");
}

function CadastrarPetshop() {
    window.location.href = ("http://127.0.0.1:5500/CadastrarPetShop.html");
}