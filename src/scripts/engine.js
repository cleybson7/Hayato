const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameTime: 1000,
        countDownTimerId: setInterval(countDown, 1000),
        hitPosition: 0,
        result: 0,
        curretTime: 30
    },
}; 

function playSound() {
    let audioLapada = new Audio("./src/audios/slap-sound-effect-free.mp3");
    let audioAnn = new Audio("./src/audios/aaann.mp3");
    let audioChan = new Audio("./src/audios/okachan.mp3")
    
    if (state.values.result <= 10) {
        audioLapada.play();
    }
    else{
        audioAnn.play();
    }
    if (state.values.curretTime <= 0) {
        audioChan.play();
    }
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerId);
        playSound();

        alert("Fim de jogo! Seu placar foi de "+state.values.result+" pontos");
    }
}

function enemyRandomSquare(){
    // Remove a classe "enemy" de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gera um número aleatório entre 0 e 8 para escolher um quadrado
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    // Adiciona a classe "enemy" ao quadrado escolhido
    randomSquare.classList.add("enemy");

    // Atualiza a posição do inimigo
    state.values.hitPosition = randomSquare.id; // Atualiza a hitPosition com o ID do quadrado
}

function moveEnemy(){
    state.values.timerId = setInterval(enemyRandomSquare, state.values.gameTime);
}

function checkHit(square) {
    if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
    }
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            checkHit(square);
            playSound();
        });
        square.addEventListener("click", () => {
            checkHit(square);
            playSound();
        });
    });
}

function main(){
    moveEnemy();
    addListenerHitBox();
}

main();

