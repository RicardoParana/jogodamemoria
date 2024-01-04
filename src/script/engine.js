
const images = [
  "../src/img/arthur_dedo.jpeg",
  "../src/img/arthur.jpeg",
  "../src/img/arthurisaac.jpeg",
  "../src/img/bentocarrossel.jpeg",
  "../src/img/bentonobarril.jpeg",
  "../src/img/isaac.jpeg",
  "../src/img/marianeebento.jpeg",
  "../src/img/marianepulinhobento.jpeg",
  "../src/img/arthur_dedo.jpeg",
  "../src/img/arthur.jpeg",
  "../src/img/arthurisaac.jpeg",
  "../src/img/bentocarrossel.jpeg",
  "../src/img/bentonobarril.jpeg",
  "../src/img/isaac.jpeg",
  "../src/img/marianeebento.jpeg",
  "../src/img/marianepulinhobento.jpeg"
];

let openCards = [];
let timerInterval;
let timeRemaining = 30; // Tempo inicial em segundos

const gameBoard = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");

function initGame() {
  // Use a função de embaralhamento de array para misturar as imagens
  let shuffledImages = images.sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffledImages.length; i++) {
    let card = document.createElement("div");
    card.className = "item";
    card.dataset.id = i;

    let img = document.createElement("img");
    img.src = shuffledImages[i];
    img.alt = "image";

    card.appendChild(img);
    card.addEventListener("click", handleClick);

    gameBoard.appendChild(card);
  }

   // Inicie o temporizador
   startTimer();

   // Inicie a música de fundo
   startBackgroundMusic();
 }

function handleClick() {
  if (openCards.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = openCards;

  // Obtém os caminhos das imagens
  const imgSrc1 = card1.querySelector('img').src;
  const imgSrc2 = card2.querySelector('img').src;

  if (imgSrc1 === imgSrc2 && card1.dataset.id !== card2.dataset.id) {
    card1.classList.add("boxMatch");
    card2.classList.add("boxMatch");
    playRandomSound("correctSound", 4);
  } else {
    setTimeout(() => {
      card1.classList.remove("boxOpen");
      card2.classList.remove("boxOpen");
      playRandomSound("wrongSound", 5);
    }, 500);
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === images.length) {
    // Pare o temporizador
    clearInterval(timerInterval);

    const backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.pause();

    // Inicie uma nova música
    startBackgroundMusic();
    alert("Você venceu!");
    // Adicione aqui a lógica para reiniciar o jogo ou tomar outras medidas
  }
}

  function playRandomSound(baseId, numberOfSounds) {
    const randomSoundIndex = Math.floor(Math.random() * numberOfSounds) + 1;
    const soundId = `${baseId}${randomSoundIndex}`;
    const audioElement = document.getElementById(soundId);
  
    if (audioElement) {
      audioElement.play();
    }
  }

  function startBackgroundMusic() {
    const backgroundMusic = document.getElementById("backgroundMusic");
    const randomNumber = Math.floor(Math.random() * backgroundMusic.children.length);
    const sourceId = `audioSource${randomNumber + 1}`;
    const selectedSource = document.getElementById(sourceId);
    backgroundMusic.src = selectedSource.src;
    backgroundMusic.play();
  }

  
  function startTimer() {
    timerInterval = setInterval(function () {
      timerDisplay.textContent = `Tempo Restante: ${timeRemaining}s`;
  
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        const backgroundMusic = document.getElementById("backgroundMusic");
        const timeUpSound1 = document.getElementById("timeUpSound");
        const timeUpSound2 = document.getElementById("timeUpSound1");
  
        // Pause a música e inicie o som de tempo esgotado
        backgroundMusic.pause();
  
        if (timeUpSound1 && timeUpSound2) {
          // Tocar o primeiro som
          timeUpSound1.play();
  
          // Aguarde um breve momento antes de tocar o segundo som
          setTimeout(function () {
            timeUpSound2.play();
  
            // Aguarde outro momento antes de exibir o alerta
            setTimeout(function () {
              // Exiba a mensagem de alerta
              alert("Tempo Esgotado! O jogo será reiniciado.");
  
              // Reinicie o jogo
              resetGame();
            }, 1500); // Tempo entre o segundo som e o alerta
          }, 1700); // Tempo entre os dois sons
        }
      } else {
        timeRemaining--;
      }
    }, 1500); // Intervalo principal
  }
  
  function resetGame() {
    // Remova as cartas existentes do tabuleiro
    gameBoard.innerHTML = "";
  
    // Reinicie as variáveis
    openCards = [];
    clearInterval(timerInterval);
    timeRemaining = 30;
  
    // Inicie um novo jogo
    initGame();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Inicie o jogo após o carregamento do DOM
    initGame();
  });
  