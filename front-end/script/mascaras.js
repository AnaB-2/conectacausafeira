const telInput = document.getElementById('telefone');
  telInput.addEventListener('input', () => {
    let value = telInput.value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    telInput.value = value;
  });
  
  const enderecoInput = document.getElementById('endereco');
  enderecoInput.addEventListener('blur', () => {
    enderecoInput.value = enderecoInput.value
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  });

  document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    const campos = this.querySelectorAll('input, textarea');
    let valid = true;

    campos.forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.border = '2px solid red';
        valid = false;
      } else {
        campo.style.border = '1px solid #ccc';
      }
    });

    if (!valid) {
      e.preventDefault();
      alert('Por favor, preencha todos os campos corretamente.');
    }
  });

