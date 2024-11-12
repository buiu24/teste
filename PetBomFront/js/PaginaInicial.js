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
 
setInterval(function() {
  plusSlides(1);
}, 5000);
 
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('LoveDog');
    botao.addEventListener('click', () => {
        window.location.href = '../pag_2/index.html';
    });
});
 
const menuButton = document.querySelector('.menu-button');
const modal = document.querySelector('.modal');
const menu = document.querySelector('.menu');
 
menuButton.addEventListener('click', () => {
  modal.style.display = 'block';
  modal.style.overflowX = 'hidden'; // Adiciona essa linha para remover o overflow-x
  menu.classList.add('active');
});
 
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    menu.classList.remove('active');
  }
});
 
menuButton.onclick = function() {
  modal.style.display = "block";
  modal.style.overflowX = 'hidden'; // Adiciona essa linha para remover o overflow-x
}
 
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
 
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