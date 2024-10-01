document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const loginError = document.getElementById('loginError');

    if (email === '' || senha === '') {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch('http://localhost:5195/api/Autenticacao/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        });
        
        const responseBody = await response.json();

        if (response.ok) {
            loginError.style.display = 'none';
            alert('Login bem-sucedido!');
            window.location.href = "http://127.0.0.1:5500/PaginaInicial.html";
        } else {
            console.error('Erro ao fazer login:', responseBody);
            loginError.style.display = 'inline';
            loginError.textContent = 'Erro ao fazer login: ' + responseBody.title;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        loginError.style.display = 'inline';
        loginError.textContent = 'Erro ao fazer login: ' + error;
    }
});
