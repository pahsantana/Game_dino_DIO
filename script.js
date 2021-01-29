const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const btn = document.querySelector('.btn');
var score = document.querySelector('.score');
var point = 0;

let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function replay(){
  window.location.reload();
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 10);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 10);
}

function startGame(){
  function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
  
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftInterval = setInterval(() => {
      if (cactusPosition < -60) {
        // Saiu da tela
        if (cactusPosition < 0) {
          point++;
          score.textContent = point;
        }
        clearInterval(leftInterval);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        // Game over
        clearInterval(leftInterval);
        document.body.innerHTML = '<img class="game-over" src="game_over.png" alt="Imagem fim de jogo"> <button class="btn" onclick="replay();">Replay</button>';
        alert("YOU LOST DEAR!")
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
  }

  function createPterodatilo() {
    const pterodatilo = document.createElement('div');
    let pterodatiloPosition = 4000;
    let randomTime = Math.random() * 7000;
  
    pterodatilo.classList.add('pterodatilo');
    background.appendChild(pterodatilo);
    pterodatilo.style.left = pterodatiloPosition + 'px';
  
    let leftInterval = setInterval(() => {
      if (pterodatiloPosition < -60) {
        // Saiu da tela
        if (cactusPosition < 0) {
          point++;
          score.textContent = point;
        }
        clearInterval(leftInterval);
        background.removeChild(pterodatilo);
      } else if (pterodatiloPosition > 0 && pterodatiloPosition < 60 && position < 60) {
        // Game over
        clearInterval(leftInterval);
        document.body.innerHTML = '<img class="game-over" src="game_over.png" alt="Imagem fim de jogo">';
      } else {
        pterodatiloPosition -= 10;
        pterodatilo.style.left = pterodatiloPosition + 'px';
      }
    }, 10);
  
    setTimeout(createPterodatilo, randomTime);
  }
  createCactus();
  createPterodatilo();
}


document.addEventListener('keyup', handleKeyUp);