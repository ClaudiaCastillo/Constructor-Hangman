// This contructor function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
function UpdateGuesses(letter, guessesLeft, guessedLetters, lettersOfTheWord) {
    this.letter = letter;
    this.guessesLeft = guessesLeft;
    this.guessedLetters = guessedLetters;
    this.lettersOfTheWord = lettersOfTheWord;

    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
        // Add the letter to the guessedLetters array.
        this.guessedLetters.push(letter);
        // Decrease guesses by one.
        this.guessesLeft--;
        // guesses remaining and guesses letters on the page.
        console.log("Incorrect!");
        console.log("Number of guesses remaining: ", this.guessesLeft);
        console.log("Guessed Letters: ", this.guessedLetters.join(", "));
    }
}

module.exports = UpdateGuesses