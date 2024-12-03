document.addEventListener('DOMContentLoaded', function() {
    const patientPhoto = document.getElementById('patientPhoto');
    const patientName = document.getElementById('patientName');
    const patientAge = document.getElementById('patientAge');
    const patientDOB = document.getElementById('patientDOB');

    // Verifica se há um paciente selecionado na URL
    const urlParams = new URLSearchParams(window.location.search);
    let patientId = urlParams.get('id') || localStorage.getItem('selectedPatientId');

    if (!patientId) {
        // Limpa as informações do paciente
        patientPhoto.src = 'img/account-group-outline.PNG';
        patientName.textContent = '';
        patientAge.textContent = '';
        patientDOB.textContent = '';
    } else {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const patient = patients.find(p => p.id === patientId);

        if (patient) {
            patientPhoto.src = patient.photo || 'img/default-placeholder.png';
            patientName.textContent = patient.name;
            const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
            patientAge.textContent = `${age} Anos`;
            patientDOB.textContent = `Nascimento: ${new Date(patient.dob).toLocaleDateString('pt-BR')}`;

            // Armazena o ID do paciente no localStorage
            localStorage.setItem('selectedPatientId', patientId);
        }
    }

    document.getElementById('data-icon').addEventListener('click', function(event) {
        event.preventDefault();
        const patientId = localStorage.getItem('selectedPatientId');
        if (patientId) {
            window.location.href = `layout4_dados.html?id=${patientId}`;
        } else {
            alert('Selecione um paciente primeiro!');
        }
    });
});
