let randomNumber = parseInt(Math.random() * 300 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

//let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validGuess(guess);
    });
}

function validGuess(guess) {
    if(isNaN(guess)) alert('Please enter a valid Number');
    else if(guess < 1) alert('Please enter a number more than 0');
    else if(guess > 300) alert('Please enter a number less than 301');
    else
    {
        //prevGuess.push(guess);
        if(numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else
        {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess === randomNumber) {
        displayMessage(`Your guessed it Right`);
        endGame();
    }
    else if(guess < randomNumber) displayMessage(`Number is too low`);
    else displayMessage(`Number is too high`);
}

function displayGuess(guess) {
    userInput.value = ``; 
    guessSlot.innerHTML += `${guess}  `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `${message}`;
}

function endGame() {
    userInput.innerHTML = ``;
    userInput.setAttribute('disabled', ''); 
    p.classList.add('button');
    p.innerHTML = `<input type="submit" style="color:red; font-size:25px; font:bold; border-radius: 10px;" 
                    id="NewGame" value="Click to Start New Game">`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#NewGame');
    newGameButton.addEventListener('click', (e) => {
        randomNumber = parseInt(Math.random() * 300 + 1);
        //prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        lowOrHi.innerHTML = ``;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;  
    });
}