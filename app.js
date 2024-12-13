
import { wordList } from './word-list.js';

const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessess = document.querySelector(".guess-text b");
const hungmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetter, wrongguessed;
const max = 6;

const resetGame = () => {
    correctLetter = [];
    wrongguessed = 0;
    guessess.innerText = `${wrongguessed} / ${max}`;
    hungmanImage.src = `/hangman-game/hangman-game/images/hangman-${wrongguessed}.svg`;
    wordDisplay.innerHTML = currentWord.split("").map(() => ` <li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    })
    gameModel.classList.remove("show");
}
const getRandom = () => {                        // first task
    // selecring a random word and hint from the wordList

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}


const initGame = (button, clickedLetter) => {

    // checking if clicked word is exit on the currentword
    console.log(button, clickedLetter);
    if (currentWord.includes(clickedLetter)) {
        // showing all correct letter on the word display
        console.log(clickedLetter, "is exit on the word");
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                console.log(letter);
                console.log(index);
                correctLetter.push(letter)
                console.log(correctLetter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        console.log(clickedLetter, "is not exit on the word");
        wrongguessed++;
        hungmanImage.src = `/hangman-game/hangman-game/images/hangman-${wrongguessed}.svg`;
    }

    button.disabled = true;
    guessess.innerText = `${wrongguessed} / ${max}`;
    // Calling game over function if any of these condition meets
    if (wrongguessed === max) return gameOver(false);
    if (correctLetter.length === currentWord.length) return gameOver(true);
}
// Creating Keyboard button and event listener
for (let i = 97; i <= 122; i++) {                         // 2
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => {
        initGame(e.target, String.fromCharCode(i))
    })
}
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModel.querySelector("img").src = `/hangman-game/hangman-game/images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 100)

}









getRandom();

playAgainBtn.addEventListener("click", getRandom);

