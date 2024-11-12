document.getElementById('agreeBtn').addEventListener('click', function(){
    localStorage.setItem('aceitouTermos', 'true');
    window,location.href = 'http://127.0.0.1:5500/PetBomFront/Cadastrar.html';
});