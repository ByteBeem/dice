 const socket = io('https://spinz-wheel-server-fad3c875d012.herokuapp.com/');



function rollDice() {
  const storedToken = localStorage.getItem('token');
  playDiceRollSound();
  const selectedBet = document.getElementById('bet-dropdown').value;

  const balanceAmountElement = document.getElementById('balance-amount');
  let dynamicBalance = parseFloat(balanceAmountElement.textContent.replace('R', ''));

  if (dynamicBalance <= 0 || dynamicBalance < selectedBet) {
    alert("Insufficient balance, please deposit!");
  } else {
    dynamicBalance -= parseFloat(selectedBet);
    balanceAmountElement.textContent = `R${dynamicBalance.toFixed(2)}`;

    // Send the roll request to the server
    socket.emit('rollDice', selectedBet, storedToken);
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

