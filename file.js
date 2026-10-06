const choices = ["rock", "paper", "scissors"];
const WINNING_SCORE = 5;

let playerScore = 0;
let computerScore = 0;
let countdownTimer;

const startBtn = document.getElementById("startBtn");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const resetBtn = document.getElementById("resetBtn");

const countdownText = document.getElementById("countdown");
const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("result");
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

function getWinner(player, computer) {
    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        return "player";
    }

    return "computer";
}

function setButtonsDisabled(state) {
    rockBtn.disabled = state;
    paperBtn.disabled = state;
    scissorsBtn.disabled = state;
}

function startRound() {
    startBtn.disabled = true;
    setButtonsDisabled(true);
    resultText.textContent ="";
    playerChoiceText.textContent = "Your choice: ";
    computerChoiceText.textContent = "Computer's choice: ";

    let count = 3;
    countdownText.textContent = count;

    countdownTimer = setInterval(function () {
        count--;

        if (count > 0) {
            countdownText.textContent = count;
        } else {
            clearInterval(countdownTimer);
            countdownText.textContent = "Go! Pick now! ✊🖐️✌️";
            setButtonsDisabled(false);
        }
    }, 1000);
}


function playRound(playerPick) {
    const computerPick = choices[Math.floor(Math.random() * 3)];

    playerChoiceText.textContent = "Your choice: " + playerPick;
    computerChoiceText.textContent = "Computer's choice: " + computerPick;

    const winner = getWinner(playerPick, computerPick);

    if (winner === "player") {
        playerScore++;
        resultText.textContent = "You won this round! 🎉";
        resultText.style.color = "#2ecc71";
    } else if (winner === "computer") {
        computerScore++;
        resultText.textContent = "You lose this round! ☹️";
        resultText.style.color = "#e74c3c";
    } else {
        resultText.textContent = "It's a draw! 🤝";
        resultText.style.color = "f39c12";
    }

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    setButtonsDisabled(true);

    if (playerScore === WINNING_SCORE) {
        resultText.textContent = "🏆 You won the game!";
        resultText.style.color = "#2ecc71";
        countdownText.textContent = "Game over! Click Reset to play again.";
    } else if (computerScore === WINNING_SCORE) {
        resultText.textContent = "💻 The computer won the game!";
        resultText.style.color = "#e74c3c";
        countdownText.textContent = "Game over! Click Reset to play again.";
    } else {
        startBtn.disabled = false;
        countdownText.textContent = "Click Start Round for the next round";
    }
}

function resetGame() {
    clearInterval(countdownTimer);

    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;
    playerChoiceText.textContent = "Your choice: ";
    computerChoiceText.textContent = "Computer's choice: ";
    resultText.textContent = "";
    resultText.style.color = "#dddddd";
    countdownText.textContent = "Click Start Round to begin";

    startBtn.disabled = false;
    setButtonsDisabled(true);
}

startBtn.addEventListener("click", startRound);
rockBtn.addEventListener("click", function () {
    playRound("rock");
});
paperBtn.addEventListener("click", function () {
    playRound("paper");
});
scissorsBtn.addEventListener("click", function () {
    playRound("scissors");
});
resetBtn.addEventListener("click", resetGame);

setButtonsDisabled(true);