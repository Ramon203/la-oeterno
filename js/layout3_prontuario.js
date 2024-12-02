document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let patientId = urlParams.get('id');
    const dataInput = document.getElementById('data');
    const turnoDiurno = document.getElementById('diurnoFields');
    const turnoNoturno = document.getElementById('noturnoFields');

    if (!patientId) {
        patientId = localStorage.getItem('selectedPatientId');
    }

    // Função para carregar os dados de um turno específico
    function loadTurnoData(patientId, date, turno) {
        const prontuario = JSON.parse(localStorage.getItem(`prontuario_${patientId}_${date}_${turno}`)) || {};
        document.getElementById(`troca_${turno}`).value = prontuario.troca || '';
        document.getElementById(`intercorrencias_${turno}`).value = prontuario.intercorrencias || '';
        document.getElementById(`responsavel_${turno}`).value = prontuario.responsavel || '';

        const alimentacao = prontuario.alimentacao || '';
        const eliminacoes = prontuario.eliminacoes || '';
        const banho = prontuario.banho || '';
        const medicacao = prontuario.medicacao || '';

        document.querySelectorAll(`input[name="alimentacao_${turno}"]`).forEach(radio => {
            radio.checked = radio.value === alimentacao;
        });
        document.querySelectorAll(`input[name="eliminacoes_${turno}"]`).forEach(radio => {
            radio.checked = radio.value === eliminacoes;
        });
        document.querySelectorAll(`input[name="banho_${turno}"]`).forEach(radio => {
            radio.checked = radio.value === banho;
        });
        document.querySelectorAll(`input[name="medicacao_${turno}"]`).forEach(radio => {
            radio.checked = radio.value === medicacao;
        });
    }

    // Função para limpar os dados dos campos
    function clearTurnoData(turno) {
        document.getElementById(`troca_${turno}`).value = '';
        document.getElementById(`intercorrencias_${turno}`).value = '';
        document.getElementById(`responsavel_${turno}`).value = '';

        document.querySelectorAll(`input[name="alimentacao_${turno}"]`).forEach(radio => {
            radio.checked = false;
        });
        document.querySelectorAll(`input[name="eliminacoes_${turno}"]`).forEach(radio => {
            radio.checked = false;
        });
        document.querySelectorAll(`input[name="banho_${turno}"]`).forEach(radio => {
            radio.checked = false;
        });
        document.querySelectorAll(`input[name="medicacao_${turno}"]`).forEach(radio => {
            radio.checked = false;
        });
    }

    // Função para salvar os dados de um turno específico
    function saveTurnoData(patientId, date, turno) {
        const prontuario = {
            alimentacao: document.querySelector(`input[name="alimentacao_${turno}"]:checked`) ? document.querySelector(`input[name="alimentacao_${turno}"]:checked`).value : '',
            eliminacoes: document.querySelector(`input[name="eliminacoes_${turno}"]:checked`) ? document.querySelector(`input[name="eliminacoes_${turno}"]:checked`).value : '',
            banho: document.querySelector(`input[name="banho_${turno}"]:checked`) ? document.querySelector(`input[name="banho_${turno}"]:checked`).value : '',
            medicacao: document.querySelector(`input[name="medicacao_${turno}"]:checked`) ? document.querySelector(`input[name="medicacao_${turno}"]:checked`).value : '',
            troca: document.getElementById(`troca_${turno}`).value,
            intercorrencias: document.getElementById(`intercorrencias_${turno}`).value,
            responsavel: document.getElementById(`responsavel_${turno}`).value
        };

        localStorage.setItem(`prontuario_${patientId}_${date}_${turno}`, JSON.stringify(prontuario));
    }

    // Alterna entre os turnos e carrega os dados correspondentes
    function toggleTurno(turno) {
        const date = dataInput.value;
        if (date) {
            const currentTurno = turnoDiurno.style.display === 'none' ? 'noturno' : 'diurno';
            saveTurnoData(patientId, date, currentTurno);
            if (turno === 'diurno') {
                turnoDiurno.style.display = 'block';
                turnoNoturno.style.display = 'none';
            } else {
                turnoDiurno.style.display = 'none';
                turnoNoturno.style.display = 'block';
            }
            loadTurnoData(patientId, date, turno);
        }
    }

    // Adiciona evento de mudança nos rádios de turno
    document.querySelectorAll('input[name="turno"]').forEach(radio => {
        radio.addEventListener('change', function() {
            toggleTurno(this.value);
        });
    });

    // Carrega dados iniciais
    if (patientId) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const patient = patients.find(p => p.id === patientId);

        if (patient) {
            document.getElementById('patientPhoto').src = patient.photo || 'img/User.png';
            document.getElementById('patientName').textContent = patient.name;

            dataInput.addEventListener('change', function() {
                const date = this.value;
                const turno = document.querySelector('input[name="turno"]:checked').value;
                if (date) {
                    clearTurnoData('diurno');
                    clearTurnoData('noturno');
                    loadTurnoData(patientId, date, turno);
                }
            });

            document.getElementById('saveButton').addEventListener('click', function() {
                const date = dataInput.value;
                const turno = document.querySelector('input[name="turno"]:checked').value;
                if (date) {
                    saveTurnoData(patientId, date, turno);
                    alert('Prontuário salvo com sucesso!');
                } else {
                    alert('Por favor, selecione uma data.');
                }
            });

            // Define a data atual como padrão
            const today = new Date().toISOString().split('T')[0];
            dataInput.value = today;

            // Carrega dados do turno diurno como padrão
            loadTurnoData(patientId, today, 'diurno');
        }
    }
});
