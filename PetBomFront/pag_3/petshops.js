let slideIndex = 1;
showSlides(slideIndex);
 
function plusSlides(n) {
  showSlides(slideIndex += n);
}
 
function currentSlide(n) {
  showSlides(slideIndex = n);
}
 
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
 
// Adiciona um timer para trocar as imagens a cada 5 segundos
setInterval(function() {
  plusSlides(1);
}, 5000);
 
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('LoveDog');
    botao.addEventListener('click', () => {
        window.location.href = '../pag_2/index.html';
    });
});
 
// menu
const menuButton = document.querySelector('.menu-button');
const modal = document.querySelector('.modal');
const menu = document.querySelector('.menu');
 
// Adiciona evento de click ao botão do menu
menuButton.addEventListener('click', () => {
  modal.style.display = 'block';
  modal.style.overflowX = 'hidden'; // Adiciona essa linha para remover o overflow-x
  menu.classList.add('active');
});
 
// Adiciona evento de click ao modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    menu.classList.remove('active');
  }
});
 
// Adiciona evento de click ao botão que abre o modal
menuButton.onclick = function() {
  modal.style.display = "block";
  modal.style.overflowX = 'hidden'; // Adiciona essa linha para remover o overflow-x
}
 
// Adiciona evento de click ao elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
 
// Adiciona evento de click fora do modal
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
 