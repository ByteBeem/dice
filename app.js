const socket = io('https://wood-copper-khaan.glitch.me/');

function rollDice() {
  playDiceRollSound();
  const selectedBet = document.getElementById('bet-dropdown').value;
  
  socket.emit('rollDice', selectedBet);
}

socket.on('diceRollResult', (randomNumbers) => {
  
  const dice = [...document.querySelectorAll(".die-list")];

  dice.forEach((die, index) => {
    toggleClasses(die);
    die.dataset.roll = randomNumbers[index];
  });

});

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function playDiceRollSound() {
  const audio = new Audio('dice-142528.mp3');
  audio.play();
}

document.getElementById("roll-button").addEventListener("click", rollDice);
