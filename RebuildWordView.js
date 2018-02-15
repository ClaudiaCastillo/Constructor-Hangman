
// This constructor function builds the display of the word that is currently being guessed.
// For example, if we are trying to guess "hamster", it might display "ham_t__".
function RebuildWordView(lettersOfTheWord, matchedLetters) {
    this.lettersOfTheWord = lettersOfTheWord;
    this.matchedLetters = matchedLetters;
    // We start with an empty string.
    var wordView = "";
    var wordLength = this.lettersOfTheWord.length;

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
        // If the current letter has been guessed, display that letter.
        if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
            wordView += this.lettersOfTheWord[i];
        }
        // If it hasn't been guessed, display a "_" instead.
        else {
            wordView += " _ ";
        }
    }
    // Update the console with the new string we built.
    console.log("Hangman for Pets => Current pet word being guessed: ", wordView);
}

module.exports = RebuildWordView