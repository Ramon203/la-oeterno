document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let patientId = urlParams.get('id');
    
    if (!patientId) {
        patientId = localStorage.getItem('selectedPatientId');
    }

    if (patientId) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const patient = patients.find(p => p.id === patientId);

        if (patient) {
            document.getElementById('patientPhoto').src = patient.photo || 'img/default-placeholder.png';
            document.getElementById('patientName').textContent = patient.name;
            document.getElementById('patientDOB').textContent = new Date(patient.dob).toLocaleDateString('pt-BR');
            document.getElementById('patientCPF').textContent = patient.cpf;
            document.getElementById('patientRG').textContent = patient.rg;
            document.getElementById('patientResponsible').textContent = patient.responsible;

            // Armazena o ID do paciente no localStorage
            localStorage.setItem('selectedPatientId', patientId);
        }
    }

    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    
    editButton.addEventListener('click', function() {
        toggleEditMode(true);
    });

    confirmButton.addEventListener('click', function() {
        saveEdits();
        toggleEditMode(false);
    });

    cancelButton.addEventListener('click', function() {
        toggleEditMode(false);
        loadPatients(); // Recarregar dados para desfazer as mudanças
    });

    function toggleEditMode(editing) {
        document.querySelectorAll('.editable').forEach(function(element) {
            const inputId = 'edit' + element.id.charAt(0).toUpperCase() + element.id.slice(1);
            const input = document.getElementById(inputId);
            if (editing) {
                input.value = element.textContent;
                element.style.display = 'none';
                input.style.display = 'block';
            } else {
                input.style.display = 'none';
                element.style.display = 'block';
            }
        });

        editButton.style.display = editing ? 'none' : 'block';
        confirmButton.style.display = editing ? 'block' : 'none';
        cancelButton.style.display = editing ? 'block' : 'none';
    }

    function saveEdits() {
        const patient = {
            id: patientId,
            photo: document.getElementById('patientPhoto').src,
            name: document.getElementById('editPatientName').value,
            dob: document.getElementById('editPatientDOB').value,
            cpf: document.getElementById('editPatientCPF').value,
            rg: document.getElementById('editPatientRG').value,
            responsible: document.getElementById('editPatientResponsible').value
        };

        let patients = JSON.parse(localStorage.getItem('patients')) || [];
        const index = patients.findIndex(p => p.id === patientId);
        if (index !== -1) {
            patients[index] = patient;
            localStorage.setItem('patients', JSON.stringify(patients));
            alert('Dados atualizados com sucesso.');
            document.getElementById('patientName').textContent = patient.name;
            document.getElementById('patientDOB').textContent = new Date(patient.dob).toLocaleDateString('pt-BR');
            document.getElementById('patientCPF').textContent = patient.cpf;
            document.getElementById('patientRG').textContent = patient.rg;
            document.getElementById('patientResponsible').textContent = patient.responsible;
        }
    }
});
