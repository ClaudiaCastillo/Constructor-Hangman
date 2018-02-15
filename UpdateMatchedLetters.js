
// This constructor function governs what happens if the user makes a successful guess.
function UpdateMatchedLetters(letter, lettersOfTheWord, matchedLetters) {
	this.letter = letter;
	this.lettersOfTheWord = lettersOfTheWord;
	this.matchedLetters = matchedLetters;

    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
        // If the guessed letter is in the solution, and we haven't guessed it already..
        if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
            // Push the newly guessed letter into the matchedLetters array.
            this.matchedLetters.push(letter);
            console.log("Correct!");
        }
    }
}

module.exports = UpdateMatchedLetters