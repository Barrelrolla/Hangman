var wordToSearch = "",
    wordArray = [],
    checkedLetters = "",
    button,
    errors = 0,
    displayedWord,
    description,
    letter,
    buttonText,
    message,
    lettersStat,
    guessedLetters,
    triedLetters,
    wrongLetters;

// TODO: Implement whole word guessing

var GameState = {
    preload: function () {
        this.load.image("hangingMan0", "assets/images/0.png");
        this.load.image("hangingMan1", "assets/images/1.png");
        this.load.image("hangingMan2", "assets/images/2.png");
        this.load.image("hangingMan3", "assets/images/3.png");
        this.load.image("hangingMan4", "assets/images/4.png");
        this.load.image("hangingMan5", "assets/images/5.png");
        this.load.image("button", "assets/images/button.png");

    },

    create: function () {
        errors = 0;
        triedLetters = "";
        wrongLetters = "";
        stats = JSON.parse(localStorage.getItem("stats")) || stats;
        this.game.stage.backgroundColor = "#ffffff";
        this.game.add.text(0, 0, "Played Games: " + stats.playedGames, { fontSize: 15 });
        this.game.add.text(0, 20, "Won Games: " + stats.wonGames, { fontSize: 15 });
        this.game.add.text(0, 40, "Lost Games: " + stats.lostGames, { fontSize: 15 });
        button = this.game.add.button(550, 40, "button", function() {
            var container = document.getElementById("container");
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", "wordInput");            
            container.appendChild(input);
            input.focus();
            //button.onDownCallback.enabled = false;
            game.input.keyboard.onDownCallback = function(e) {
                if (e.keyCode == 13) {
                    var input = document.getElementById("wordInput");
                    var word = input.value;
                    if (word.toUpperCase() == wordToSearch) {
                        console.log("you win");
                    } else {
                        console.log("you lose");
                    }
                }
            } ;
        });
        button.scale.setTo(0.6, 1);
        button.anchor.x = 0.5;
        buttonText =  this.game.add.text(550, 45, "Guess word");
        buttonText.anchor.x = 0.5;
        lettersStat = this.game.add.text(0, 60, "Guessed Letters: " + stats.guessedLetters, { fontSize: 15 });
        guessedLetters = this.game.add.text(0, 200, "Wrong Letters: " + wrongLetters, { fontSize: 15 });
        message = this.game.add.text();
        message.anchor.x = 0.5;
        this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan0");
        this.hangingMan.anchor.x = 0.5;
        this.game.input.keyboard.enabled = true;        
        this.game.input.keyboard.onDownCallback = function(e) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                letter = String.fromCharCode(e.keyCode);
                game.state.states.GameState.checkMatch(letter);
            }
        };
    },

    update: function () {
    },

    init: function (selectedWord) {
        wordToSearch = selectedWord.word.toUpperCase();

        var words = selectedWord.word.split(" "),
            hiddenWords = [],
            hiddenWord = [],            
            word,
            length;

        for (let i = 0; i < words.length; i++) {
            if (i > 0) {
                wordArray.push(" ");
            }

            word = words[i].toUpperCase();
            length = word.length;            
            hiddenWord = new Array(length).fill("_");
            hiddenWord[0] = word.charAt(0);
            hiddenWord[length - 1] = word.charAt(length - 1);
            hiddenWord.forEach(char => {
                wordArray.push(char);
            }, this);

            hiddenWords.push(hiddenWord.join(" "));
        }

        displayedWord = this.game.add.text(game.world.centerX, 264, wordArray.join(" "));
        displayedWord.anchor.x = 0.5;
        description = this.game.add.text(game.world.centerX, 300, selectedWord.description, { fontSize: 16 });
        description.anchor.x = 0.5;
    },

    addButton: function (text) {
        button = this.game.add.button(game.world.centerX, 200, "button", this.newGame);
        button.scale.setTo(0.5, 1);
        button.anchor.x = 0.5;
        buttonText = this.game.add.text(game.world.centerX, 205, text);
        buttonText.anchor.x = 0.5;
        this.game.input.keyboard.enabled = false;
    },

    newGame: function () {
        wordArray = [];
        localStorage.setItem("stats", JSON.stringify(stats));
        this.game.state.start("MenuState");
    },

    checkMatch: function (letter) {
        if (triedLetters.indexOf(letter) >= 0) {
            message.destroy();            
            message = this.game.add.text(game.world.centerX, 240, "You already tried this letter", { fontSize: 15 });
            message.anchor.x = 0.5;            
            this.game.time.events.add(3000, function() {
                message.destroy();
            });
        } else {
            triedLetters += letter;

            if (wordToSearch.indexOf(letter) >= 0) {
                var index = wordToSearch.indexOf(letter);
                while (index >= 0) {            
                    wordArray[index] = wordToSearch.charAt(index);
                    index = wordToSearch.indexOf(letter, index + 1);
                }

                stats.guessedLetters++;
                lettersStat.destroy();
                lettersStat = this.game.add.text(0, 60, "Guessed Letters: " + stats.guessedLetters, { fontSize: 15}); 
                
                displayedWord.destroy();
                displayedWord = this.game.add.text(game.world.centerX, 264, wordArray.join(" "));
                displayedWord.anchor.x = 0.5;

                if (wordArray.indexOf("_") < 0) {
                    stats.playedGames++;
                    stats.wonGames++;
                    var win = this.game.add.text(game.world.centerX, 150, "YOU WIN!", { fontSize: 30, backgroundColor: "#ffffff" });
                    win.anchor.x = 0.5;
                    this.addButton("New Game");
                }

            } else {
                errors++;
                wrongLetters += letter;
                guessedLetters.destroy();
                guessedLetters = this.game.add.text(0, 200, "Wrong Letters: " + wrongLetters, { fontSize: 15 });
                this.hangingMan.destroy();
                this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan" + errors);
                this.hangingMan.anchor.x = 0.5;

                if (errors == 5) {
                    stats.playedGames++;                
                    stats.lostGames++;
                    var lose = this.game.add.text(game.world.centerX, 150, "YOU LOSE!", { fontSize: 30, backgroundColor: "#ffffff" });
                    lose.anchor.x = 0.5;
                    this.addButton("New Game");
                }
            }
        }
    }
};