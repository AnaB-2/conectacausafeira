const API_USERS = "http://localhost:3650/users";
const API_LOGIN = "http://localhost:3650/login";

function CadastroValidation(event, form) {
    event.preventDefault();

    let allValid = true;
    const allInputs = form.querySelectorAll('input, select');

    allInputs.forEach(input => {
        if (!input.checkValidity()) {
            allValid = false;
            input.classList.add('campo-invalido');
            input.classList.remove('campo-valido');
        } else {
            input.classList.remove('campo-invalido');
            input.classList.add('campo-valido');
        }
    });

    if (allValid) {
        const nameInput = form.querySelector('#nome') || form.querySelector('input[type="text"]:not(#cpf):not(#cargo)');
        const emailInput = form.querySelector('input[type="email"]');
        const telefoneInput = form.querySelector('input[type="tel"]');
        const passwordInput = form.querySelector('input[type="password"]');
        const cargoInput = form.querySelector('#cargo');

        const name = nameInput ? nameInput.value : "Usuário Sem Nome";
        const email = emailInput ? emailInput.value : "";
        const telefone = telefoneInput ? telefoneInput.value : "";
        const password = passwordInput ? passwordInput.value : "";
        const cargo = cargoInput ? cargoInput.value : "";

        const payload = { nome: name, email, telefone, senha: password };

        if (cargo) {
            payload.cargo = cargo;
        }

        console.log('Enviando dados de cadastro para a API...', payload);

        fetch(API_USERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(result => {
                if (result.message === "Success" || result.message === "Sucess") {
                    alert("Cadastro realizado com sucesso!");
                    form.reset();

                    allInputs.forEach(input => {
                        input.classList.remove('campo-invalido', 'campo-valido');
                    });

                    if (form.id === 'cadastroFormAdministrador') {
                        window.location.href = 'loginadm.html';
                    } else {
                        window.location.href = 'entrar.html';
                    }
                } else {
                    alert("Erro ao cadastrar: " + (result.data || "Verifique as informações."));
                }
            })
            .catch(error => {
                console.error("Erro na requisição de cadastro:", error);
                alert("Não foi possível conectar à API.");
            });

    } else {
        const firstError = form.querySelector('.campo-invalido');

        if (firstError) {
            firstError.reportValidity();
            firstError.focus();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Cadastro do cidadão
    const formCadastrar = document.getElementById('formCadastrar');

    if (formCadastrar) {
        formCadastrar.addEventListener('submit', function (event) {
            CadastroValidation(event, this);
        });
    }

    // Cadastro do administrador
    const formCadastroAdministrador = document.getElementById('cadastroFormAdministrador');

    if (formCadastroAdministrador) {
        formCadastroAdministrador.addEventListener('submit', function (event) {
            CadastroValidation(event, this);
        });
    }

    // Login do cidadão
    const botaoEntrar = document.getElementById('btnEntrar');

    if (botaoEntrar) {
        botaoEntrar.addEventListener('click', function (event) {
            event.preventDefault();

            const form = document.getElementById('formLogin') || botaoEntrar.closest('form');

            if (!form) {
                alert("Erro: Formulário de login do cidadão não encontrado.");
                return;
            }

            const email = form.querySelector('input[type="email"]')?.value;
            const password = form.querySelector('input[type="password"]')?.value;

            if (!email || !password) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            fetch(API_LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    senha: password
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message === "Success") {
                        alert("Login efetuado com sucesso!");

                        sessionStorage.setItem(
                            "usuarioLogado",
                            JSON.stringify(result.data)
                        );

                        sessionStorage.setItem("tipoUsuario", "doador");

                        window.location.href = './segundatela.html';


                    } else {
                        alert("Falha no login: " + result.data);
                    }
                })
                .catch(error => {
                    console.error("Erro no login:", error);
                    alert("Erro ao se conectar com o servidor.");
                });
        });
    }

    // Login do administrador
    const btnEntrarAdmin = document.getElementById('btnEntrarAdmin');

    if (btnEntrarAdmin) {
        btnEntrarAdmin.addEventListener('click', function (event) {
            event.preventDefault();

            const form = document.getElementById('formLoginAdm') || btnEntrarAdmin.closest('form');

            if (!form) {
                alert("Erro: Formulário de login do administrador não encontrado.");
                return;
            }

            const email = form.querySelector('input[type="email"]')?.value;
            const password = form.querySelector('input[type="password"]')?.value;

            if (!email || !password) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message === "Success") {
                        alert("Login administrativo efetuado!");

                        sessionStorage.setItem(
                            "usuarioLogado",
                            JSON.stringify(result.data)
                        );

                        sessionStorage.setItem("tipoUsuario", "admin");

                        window.location.href = '../adm/inicialadm.html';

                    } else {
                        alert("Falha no login administrativo: " + (result.data || "Verifique suas credenciais."));
                    }
                })
                .catch(error => {
                    console.error("Erro no login administrativo:", error);
                    alert("Erro ao se conectar com o servidor.");
                });
        });
    }
});
