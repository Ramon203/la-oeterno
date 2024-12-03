document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('patientForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('patientName').value;
        const dob = document.getElementById('patientDOB').value;
        const cpf = document.getElementById('patientCPF').value;
        const rg = document.getElementById('patientRG').value;
        const responsible = document.getElementById('patientResponsible').value;
        const photoInput = document.getElementById('patientPhoto');
        const defaultPhoto = 'img/user.png';  // Caminho para a imagem padrão

        // Função para salvar o paciente com a foto (padrão ou fornecida)
        function savePatient(photo) {
            const patient = {
                id: Date.now().toString(),
                name: name,
                dob: dob,
                cpf: cpf,
                rg: rg,
                responsible: responsible,
                photo: photo
            };

            let patients = JSON.parse(localStorage.getItem('patients')) || [];
            patients.push(patient);
            localStorage.setItem('patients', JSON.stringify(patients));

            window.location.href = 'layout2_pacientes.html'; // Redireciona para a página de pacientes
        }

        // Verifica se há uma foto selecionada
        if (photoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photo = e.target.result;
                savePatient(photo);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            // Usa a imagem padrão se nenhuma foto for selecionada
            savePatient(defaultPhoto);
        }
    });
});
