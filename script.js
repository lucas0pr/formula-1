let saldoTorcedor = 10000;
let valorAposta = 0;

function startRace() {
    const cars = document.querySelectorAll('.car');
    const raceTrackWidth = document.querySelector('.track').offsetWidth - 60; // 60 is the width of the car
    const participantsList = document.getElementById('participants-list');

    const participants = {
        schumacher,
        senna,
        hamilton,
        prost
    };

    // Função para atualizar a lista de participantes
    const updateParticipantsList = () => {
        Object.keys(participants).forEach(driver => {
            const pos = participants[driver];
            const li = document.getElementById(driver + '-pos');
            li.textContent = `${driver.charAt(0).toUpperCase() + driver.slice(1)}: ${pos}`;
        });
    };

    cars.forEach(car => {
        car.style.left = '0';
    });

    const moveCars = () => {
        cars.forEach(car => {
            const distance = Math.floor(Math.random() * 10) + 1; // Random distance between 1 and 10
            const currentPos = parseInt(car.style.left) || 0;
            car.style.left = currentPos + distance + 'px';

            // Atualizar a posição do participante
            const driver = car.id;
            participants[driver] = currentPos + distance;

            if (currentPos >= raceTrackWidth) {
                clearInterval(interval);
                alert(car.id.toUpperCase() + ' Venceu!');

                // Verificar se o corredor vencedor foi o mesmo da aposta
                const corredorSelecionado = document.getElementById('selecionar-corredor').value;
                if (car.id === corredorSelecionado) {
                    saldoTorcedor += valorAposta * 2; // Dobrar o valor da aposta
                    console.log(`Parabéns! Você ganhou a aposta. Seu novo saldo é: R$ ${saldoTorcedor}`);
                }

                // Reiniciar a posição dos carros para o início da pista
                cars.forEach(car => {
                    car.style.left = '0';
                });

                // Reiniciar as posições dos participantes
                Object.keys(participants).forEach(driver => {
                    participants[driver] = 0;
                });

                // Atualizar a lista de participantes
                updateParticipantsList();
                atualizarSaldoTorcedor();
            }
        });
    };

    const interval = setInterval(moveCars, 100); // Adjust speed by changing the interval time
}

function fazerAposta() {
    const valorApostaInput = parseInt(document.getElementById('valor-aposta').value);
    const corredorSelecionado = document.getElementById('selecionar-corredor').value;

    if (!isNaN(valorApostaInput) && valorApostaInput > 0) {
        if (valorApostaInput <= saldoTorcedor) {
            saldoTorcedor -= valorApostaInput;
            valorAposta = valorApostaInput;

            console.log(`Aposta de R$ ${valorAposta} no corredor ${corredorSelecionado.toUpperCase()} realizada com sucesso!`);
            atualizarSaldoTorcedor();
        } else {
            alert('Saldo insuficiente para realizar a aposta!');
        }
    } else {
        alert('Por favor, insira um valor válido para a aposta!');
    }
}

function atualizarSaldoTorcedor() {
    document.querySelector('.saldo-torcedor').textContent = `Saldo do Torcedor: R$ ${saldoTorcedor}`;
}
