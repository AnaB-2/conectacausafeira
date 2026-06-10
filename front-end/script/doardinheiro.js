function verificarConta2() {
    var temConta = true; 

    if (temConta) {
        alert("Doação recorrente realizada com sucesso! Voltando para a tela inicial...");
        window.location.href = "Index.html";
    } else {
        alert("Você não tem uma conta. Redirecionando para a criação de conta...");
        window.location.href = "criarconta.html";
    }
}
