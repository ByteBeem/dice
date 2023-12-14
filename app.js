document.addEventListener('DOMContentLoaded', () => {
  const socket = io('https://wood-copper-khaan.glitch.me/');
  let dynamicBalance = 680.00;

  // Function to send token to the server
  function sendTokenToServer() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      fetch('https://wood-copper-khaan.glitch.me/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: storedToken,
        }),
      })
      .then(response => response.json())
      .then(data => {
        const { decodedToken, userBalance } = data;

        // Update UI or perform any other actions based on the user balance
        dynamicBalance = userBalance;
        document.getElementById('balance-amount').textContent = `R${dynamicBalance.toFixed(2)}`;
      })
      .catch(error => {
        console.error('Error sending token to server:', error);
      });
    }
  }

  // Call the function to send token when the page loads
  sendTokenToServer();

  function rollDice() {
    playDiceRollSound();
    const selectedBet = document.getElementById('bet-dropdown').value;

    if (dynamicBalance <= 0 || dynamicBalance < selectedBet) {
      alert("Insufficient balance, please deposit!");
    } else {
      dynamicBalance -= parseFloat(selectedBet);
      document.getElementById('balance-amount').textContent = `R${dynamicBalance.toFixed(2)}`;
      socket.emit('rollDice', selectedBet);
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
});
