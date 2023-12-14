 const socket = io('https://wood-copper-khaan.glitch.me/');



function rollDice() {
 const storedToken = localStorage.getItem('token');
  playDiceRollSound();
  const selectedBet = document.getElementById('bet-dropdown').value;

  if(dynamicBalance <= 0 || dynamicBalance < selectedBet){
    alert("Insufficient balance , please deposit!")
  }else{

  dynamicBalance -= parseFloat(selectedBet);
  document.getElementById('balance-amount').textContent = `R${dynamicBalance.toFixed(2)}`;

  socket.emit('rollDice', selectedBet , storedToken);
}
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

