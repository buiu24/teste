document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;
    const errorSpan = document.getElementById('dateError');

    const inputDate = new Date(ano, mes - 1, dia);
    const currentDate = new Date();
    
    if (inputDate.getFullYear() != ano || inputDate.getMonth() != mes - 1 || inputDate.getDate() != dia || inputDate > currentDate) {
        errorSpan.style.display = 'inline';
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
        alert("Coloque todas as suas informações");
        return;
    }

    const dataNascimento = new Date(ano, mes - 1, dia).toISOString(); // Formatação para ISO 8601

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    try {
        const response = await fetch('http://localhost:5195/api/Usuarios/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                nome: nome,
                dataDeNascimento: dataNascimento, // Enviando data formatada
                senha: senha,
                confirmarSenha: confirmarSenha,
                telefone: telefone,
                endereco: endereco
            })
        });
        
        console.log('Status Code:', response.status);
        if (response.status === 200 || response.status === 201) {
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/PaginaInicial.html";
            }, 1000); // redireciona após 1 segundo
        } else {
            const errorData = await response.json();
            console.error('Erro ao cadastrar:', errorData);
            alert('Erro ao cadastrar: ' + (errorData.message || response.statusText));
        }

        const novoIdusuarioJson = await response.json();
        const IdUsuario = novoIdusuarioJson.id;

        localStorage.setItem('IdUsuario', IdUsuario.toString());


        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'Cadastrar.html'; // Redirecionar para a página inicial após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique o console para mais detalhes.');
    }
}
