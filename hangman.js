
var inquirer = require("inquirer");
var UpdateGuesses = require("./UpdateGuesses.js");
var RebuildWordView = require("./RebuildWordView.js");
var UpdateMatchedLetters = require("./UpdateMatchedLetters.js");
var ProcessUpdateTotalGuesses = require("./ProcessUpdateTotalGuesses.js");

// Creating a giant hangmanGame object that will house logic and variables.
var hangmanGame = {

    // Object of all words that can be chosen, along with info such as their picture and a funfacts clip.
    wordsToPick: {
        "fish": {
            funfacts: "The world's oceans are inhabited with over 14,000 species of saltwater fish. A fascinating realm of sea creatures that are natural wonders of color, form, and display."
        },
        "amphibian": {
            funfacts: "Amphibians include frogs, toads, salamanders and newts. Arthropods cover the arachnids, like spiders, tarantulas, scorpions and whip scorpions: myriapods containing centipedes and millipedes; and other land invertebrates."
        },
        "horse": {
            funfacts: "The different breeds of horses come in a variety of colors, and vary greatly in height and size."
        },
        "dog": {
            funfacts: "Dogs are the most amazing animals and devoted companions. They accept you for what you are and don't care about your eccentricities or faults."
        },
        "cat": {
            funfacts: "The beginnings of domestic cat breeds, the first “modern” felines, appeared somewhere around 7000 to 5000 B.C. in northern Africa."
        },
        "bird": {
            funfacts: "The world is inhabited with over 9000 species of birds. They are natural wonders of song, color, flight and display."
        },
        "reptile": {
            funfacts: "reptiles includes many types of lizards, snakes, different types of turtles, and tortoises."
        },
       "ferret": {
            funfacts: "Ferrets are extremely playful, very curious, love to go exploring, and love to play games. The name ferret comes from the latin word 'furritus' meaning 'little thief'."
        },
        "gerbil": {
            funfacts: "Although approximately half of the planet's animals are rodents, the Gerbil or Mongolian Gerbil is one of the sweetest natured of ALL the rodent pets!"
        },
        "hamster": {
            funfacts: "Hamsters are gentle, attractive and amusing to watch. They are virtually odorless and are habitually clean."
        },
        "rabbit": {
            funfacts: "Rabbits are a very popular pet for children and adults alike. They are relatively inexpensive to keep, easy to house and feed, and can live for over 10 years if well taken care of."
        },
    },

    // Variables that set the initial state of our hangman game.
    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    letterGuessed: null,
    wins: 0,

    // The setupGame method is called when the page first loads.
    setupGame: function() {
        // Here we pick a random word.
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

        // Split the chosen word up into its individual letters.
        this.lettersOfTheWord = this.wordInPlay.split("");

        // Builds the representation of the word we are trying to guess and displays it to the console.
        var rebuildWordView = new RebuildWordView(this.lettersOfTheWord, this.matchedLetters);
        
        // This sets the number of guesses the user gets, and renders it to the console.
        var processUpdateTotalGuesses = new ProcessUpdateTotalGuesses(this.lettersOfTheWord, this.guessesLeft);

        ProcessUpdateTotalGuesses.prototype.getGuessesLeft = function(){
            return this.guessesLeft;
        }
        this.guessesLeft = processUpdateTotalGuesses.getGuessesLeft();
    },

    // This function is run whenever the user guesses a letter..
    updatePage: function(letter) {
    
        // Check for and handle incorrect guesses.
        var updateGuesses = new UpdateGuesses(letter, this.guessesLeft, this.guessedLetters, this.lettersOfTheWord);

        UpdateGuesses.prototype.getGuessesLeft = function(){
            return this.guessesLeft;
        }
        this.guessesLeft = updateGuesses.getGuessesLeft();
        
        UpdateGuesses.prototype.getGuessedLetters = function(){
            return this.guessedLetters;
        }
        this.guessedLetters = updateGuesses.getGuessedLetters();
        
        // If the user has no guesses left, finish the game.
        if (this.guessesLeft === 0) {
            console.log("\nYou Lost!");
            return true;
        }
        // Otherwise...
        else {

            // Check for and handle correct guesses.
            var updateMatchedLetters = new UpdateMatchedLetters(letter, this.lettersOfTheWord, this.matchedLetters);
            
            this.matchedLetters = updateMatchedLetters.matchedLetters;

            // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
            var rebuildWordView = new RebuildWordView(this.lettersOfTheWord, this.matchedLetters);

            // If the user wins, restart the game.
            if (this.updateWins() === true) {
                this.restartGame();
            }
            return false;
        }

    },

    // Function that "restarts" the game by resetting all of the variables.
    restartGame: function() {
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.letterGuessed = null;
        this.setupGame();
    },

    // Function that checks to see if the user has won.
    updateWins: function() {
        var win;
        // If you haven't correctly guessed a letter in the word yet, we set win to false.
        if (this.matchedLetters.length === 0) {
            win = false;
        }
        // Otherwise, we set win to true.
        else {
            win = true;
        }
        // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                win = false;
            }
        }
        // If win is true...
        if (win) {
            // Increment wins.
            this.wins = this.wins + 1;

            console.log("\nYour Number of Wins: ", this.wins);
            console.log("Fun Pet Owner Facts: ", this.wordsToPick[this.wordInPlay].funfacts);
            console.log("Restarting the Game!")
            console.log("\n");

            // return true, which will trigger the restart of our game in the updatePage function.
            return true;
        }
        // If win is false, return false to the updatePage function. The game goes on!
        return false;
    }
};


var gameOver = false;

// This function handles ending the game
function endGame() {
  // Alert user the game is over
  promptUserRestartGame();
}

function playRound(gameOver) {
  // end the game
  if (gameOver === true) {
    endGame();
  }
  // keep playing
  else {
    promptUser();
  }
}


// Initialize the game.
hangmanGame.setupGame();
playRound(gameOver);


function promptUser() {
  
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "\nGuess a letter: "
  }]).then(function(answer) {

        // Capture pressed key and make it lowercase.
        hangmanGame.letterGuessed = answer.text.charAt(0).toLowerCase();
        
        gameOver = hangmanGame.updatePage(hangmanGame.letterGuessed);

        // Play the next round 
        playRound(gameOver);   
  });
}

function promptUserRestartGame() {
  
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "\nWould you like to restart the game? "
  }]).then(function(answer) {

        // Capture pressed key and make it lowercase.
        var restart = answer.text.charAt(0).toLowerCase();
        
        if (restart === "y") {
            console.log("\n");
            gameOver = false;
            hangmanGame.restartGame();
            playRound(gameOver);
        }
        else {
         console.log("\nGAME OVER!!!");
        };
          
  });
}