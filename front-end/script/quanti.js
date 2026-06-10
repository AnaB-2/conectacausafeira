function mostrarDoacao() {
    var valor = document.getElementById("dinheiro").value;
    if (valor.trim() === "") {
        alert("Por favor, digite um valor para doar.");
    } else {
        alert("Valor doado com sucesso. R$ " + valor);
    }
}