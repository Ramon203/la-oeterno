document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'laradm' && password === 'laradm') {
        localStorage.removeItem('selectedPatientId'); // Limpa a seleção de pacientes
        window.location.href = 'index.html'; // Acesso total
    } else if (username === 'cliente' && password === 'acessocliente') {
        window.location.href = 'restricted.html'; // Acesso restrito
    } else {
        alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
    }
});
