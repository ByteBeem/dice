function rollDice() {
  playDiceRollSound();
  const dice = [...document.querySelectorAll(".die-list")];
  const selectedBet = document.getElementById('bet-dropdown').value;
  console.log("bet", selectedBet);
  


  dice.forEach(die => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
  });
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playDiceRollSound() {
  const audio = new Audio('dice-142528.mp3');
  audio.play();
}

document.getElementById("roll-button").addEventListener("click", rollDice);
