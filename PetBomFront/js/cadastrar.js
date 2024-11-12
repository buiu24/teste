document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('aceitouTermos') === 'true') {
        document.getElementById('termoCheckbox').checked = true;
        localStorage.removeItem('aceitouTermos');
    }

    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = formData[key] === 'true'; 
                } else {
                    input.value = formData[key];
                }
            }
        });
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
   
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;
    const errorSpan = document.getElementById('dateError');
    const autorizacao = document.getElementById('termoCheckbox');

    const inputDate = new Date(ano, mes - 1, dia);
    const currentDate = new Date();

    if (inputDate.getFullYear() != ano || inputDate.getMonth() != mes - 1 || inputDate.getDate() != dia || inputDate > currentDate) {
        errorSpan.style.display = 'inline';
    } else if (!autorizacao.checked) {
        Toastify({
            text: "Você deve aceitar os termos de autorização para prosseguir.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "center", // `left`, `center` ou `right`
            stopOnFocus: true, // Impede o fechamento ao passar o mouse
            style: {
              background: "#ffeb3b",
            },
        }).showToast();
    } else {
        errorSpan.style.display = 'none';
        AdicionarUsuario(); 
    }
});

const inputs = document.querySelectorAll('.date-container input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.placeholder = '';
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.placeholder = input.getAttribute('name').charAt(0).toUpperCase() + input.getAttribute('name').slice(1);
        }
    });
});

document.getElementById('registerForm').addEventListener('input', function() {
    const formData = {
        email: document.getElementById('email').value,
        nome: document.getElementById('nome').value,
        dia: document.getElementById('dia').value,
        mes: document.getElementById('mes').value,
        ano: document.getElementById('ano').value,
        senha: document.getElementById('senha').value,
        confirmarSenha: document.getElementById('confirmarSenha').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        autorizacao: document.getElementById('termoCheckbox').checked
        
    };
    
    localStorage.setItem('formData', JSON.stringify(formData));
});

function gerarLinkWhatsApp(numeroTelefone) {
    let numeroFormatado = numeroTelefone.replace(/\D/g, '');
   
    return `https://wa.me/55${numeroFormatado}`;
}

async function AdicionarUsuario() {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    if (email === '' || nome === '' || dia === '' || mes === '' || ano === '' || senha === '' || confirmarSenha === '' || telefone === '' || endereco === '') {
        Toastify({
            text: "Por favor, preencha todos os campos obrigatórios.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ffeb3b",
            },
        }).showToast(); 
           return;
    }
    if (senha !== confirmarSenha) {
        Toastify({
            text: "As Senhas Não Coincidem",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#78E7FF",
            },
        }).showToast(); 
           return;
    }

    if (!email.includes('@')) {
        Toastify({
            text: "Coloque um @ no Email",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ffeb3b",
            },
        }).showToast();
        return; 
    }

    const dataNascimento = new Date(ano, mes - 1, dia).toISOString();

    if (senha !== confirmarSenha) {
        
        return;
    }

    const whatsappLink = gerarLinkWhatsApp(telefone);

    try {
        const response = await fetch('http://localhost:5195/api/Usuarios/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                nome: nome,
                dataDeNascimento: dataNascimento,
                senha: senha,
                telefone: telefone,
                endereco: endereco,
                whatsappLink: whatsappLink
            })
        });

        if (response.ok) {
            const novoIdusuarioJson = await response.json();
            const IdUsuario = novoIdusuarioJson.id;

            localStorage.setItem('IdUsuario', IdUsuario.toString());
            localStorage.removeItem('formData'); 
            
            Toastify({
                text: "Usúario Cadastrado",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#78E7FF",
                },
            }).showToast();
            window.location.href = 'http://127.0.0.1:5500/PetBomFront/PaginaInicial.html';
        } else {
            Toastify({
                text: "Erro ao Cadastrar",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#78E7FF",
                },
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: "Erro ao Cadastrar Usuário, Verifique sua Internet!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ffeb3b",
            },
        }).showToast();
    }
}
