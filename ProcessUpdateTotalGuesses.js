
// This constructor function sets the initial guesses the user gets.
function ProcessUpdateTotalGuesses(lettersOfTheWord, guessesLeft) {
    // The user will get more guesses the longer the word is.
    this.lettersOfTheWord = lettersOfTheWord;
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;
    // Render the guesses left to the console.
    console.log("Number of guesses remaining: ", this.guessesLeft);
}


module.exports = ProcessUpdateTotalGuesses