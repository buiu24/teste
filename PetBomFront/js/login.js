document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
   
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const loginError = document.getElementById('loginError');
 
    if (email === '' || senha === '') {
        Toastify({
            text: "Preencha todos os Campos!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "center", // `left`, `center` ou `right`
            stopOnFocus: true, // Impede o fechamento ao passar o mouse
            style: {
              background: "#ffeb3b",
            },
        }).showToast();
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
            Toastify({
                text: "Logado!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` ou `bottom`
                position: "center", // `left`, `center` ou `right`
                stopOnFocus: true, // Impede o fechamento ao passar o mouse
                style: {
                  background: "#78E7FF",
                },
            }).showToast();
            window.location.href = "http://127.0.0.1:5500/PetBomFront/PaginaInicial.html";
        } else {
            Toastify({
                text: "Este Usuário não existe! clique em criar uma conta ;D",
                duration: 3000,
                close: true,
                gravity: "top", // `top` ou `bottom`
                position: "center", // `left`, `center` ou `right`
                stopOnFocus: true, // Impede o fechamento ao passar o mouse
                style: {
                  background: "#78E7FF",
                },
            }).showToast();
            
        }
    } catch (error) {
        Toastify({
            text: "Erro ao Fazer o Login, Verifique sua Internet!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "center", // `left`, `center` ou `right`
            stopOnFocus: true, // Impede o fechamento ao passar o mouse
            style: {
              background: "#78E7FF",
            },
        }).showToast();
    }
});
 