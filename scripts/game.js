var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    alphabetButtonArray,
    alphabetTextArray,
    wordToSearch = "",
    wordArray = [],
    checkedLetters = "",
    button,
    errors = 0,
    displayedWord,
    description,
    descriptionWord,
    letter,
    buttonText,
    message,
    guessButton,
    guessButtonText,
    lettersStat,
    guessedLetters,
    triedLetters,
    wrongLetters;

var GameState = {
    preload: function () {
        this.load.image("hangingMan0", "assets/images/0.png");
        this.load.image("hangingMan1", "assets/images/1.png");
        this.load.image("hangingMan2", "assets/images/2.png");
        this.load.image("hangingMan3", "assets/images/3.png");
        this.load.image("hangingMan4", "assets/images/4.png");
        this.load.image("hangingMan5", "assets/images/5.png");
        this.load.image(constants.buttonImageName, "assets/images/button.png");

    },

    create: function () {
        errors = 0;
        triedLetters = "";
        wrongLetters = "";
        alphabetButtonArray = [];
        alphabetTextArray = [];
        stats = JSON.parse(localStorage.getItem(constants.localStorageStatsName)) || stats;
        this.game.stage.backgroundColor = constants.whiteColor;
        this.game.add.text(0, 0, constants.playedGamesText + stats.playedGames, { fontSize: constants.smallText });
        this.game.add.text(0, constants.wonGamesCoordinate, constants.wonGamesText + stats.wonGames, { fontSize: constants.smallText });
        this.game.add.text(0, constants.lostGamesCoordinate, constants.lostGamesText + stats.lostGames, { fontSize: constants.smallText });
        guessButton = this.game.add.button(constants.guessWordX, constants.guessWordY, constants.buttonImageName, function () {
            game.state.states.GameState.destroyGuessButton();
            game.state.states.GameState.destroyAlphabetButtons();            
            var container = document.getElementById("container");
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", "wordInput");
            container.appendChild(input);
            input.focus();
            game.input.keyboard.onDownCallback = function (e) {
                if (e.keyCode == constants.enterKey) {
                    var input = document.getElementById("wordInput");
                    var word = input.value;
                    input.remove();

                    if (word.toUpperCase() == wordToSearch) {
                        stats.guessedWords++;
                        stats.playedGames++;
                        stats.wonGames++;
                        game.state.states.GameState.revealWord();

                        var win = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youWinText, {
                            fontSize: constants.bigText, backgroundColor: constants.whiteColor
                        });

                        win.anchor.x = 0.5;
                        game.state.states.GameState.addButton(constants.newGameText);
                    } else {
                        stats.playedGames++;
                        stats.lostGames++;
                        var lose = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youLoseText, {
                            fontSize: constants.bigText, backgroundColor: constants.whiteColor
                        });

                        lose.anchor.x = 0.5;
                        game.state.states.GameState.addButton(constants.newGameText);
                    }
                }
            };
        });
        guessButton.scale.setTo(0.6, 1);
        guessButton.anchor.x = 0.5;
        guessButtonText = this.game.add.text(constants.guessWordX, constants.guessWordY + constants.buttonTextModifier, constants.guessWordText);
        guessButtonText.anchor.x = 0.5;
        lettersStat = this.game.add.text(0, constants.guessedLettersCoordinate, constants.guessedLettersText + stats.guessedLetters, { fontSize: constants.smallText });
        this.game.add.text(0, constants.guessedWordsCoordinate, constants.guessedWordsText + stats.guessedWords, { fontSize: constants.smallText });
        guessedLetters = this.game.add.text(0, constants.wrongLettersCoordintates, constants.wrongLettersText + wrongLetters, { fontSize: constants.smallText });
        message = this.game.add.text();
        message.anchor.x = 0.5;
        this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan0");
        this.hangingMan.anchor.x = 0.5;
        this.game.input.keyboard.enabled = true;
        this.game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode >= constants.aKey && e.keyCode <= constants.zKey) {
                letter = String.fromCharCode(e.keyCode);
                game.state.states.GameState.checkMatch(letter);
            }
        };        

        displayedWord = this.game.add.text(game.world.centerX, constants.displayedWordCoordinate, wordArray.join(" "));
        displayedWord.anchor.x = 0.5;
        description = this.game.add.text(game.world.centerX, constants.descriptionCoordinate, descriptionWord, { fontSize: constants.smallText });
        description.anchor.x = 0.5;
        this.addAlphabet();
    },

    update: function () {
    },

    init: function (selectedWord) {
        wordToSearch = selectedWord.word.toUpperCase();
        descriptionWord = selectedWord.description;

        var words = selectedWord.word.split(" "),
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
        }
    },

    addAlphabet: function () {
        var x = 480;
        var y = 120;
        for (var i = 0; i < alphabet.length; i++) {
            var letter = alphabet[i]
            button = this.game.add.button(x, y, constants.buttonImageName, function (e) {
                this.scale.setTo(0.05, -0.5)
                var letter = alphabetButtonArray.indexOf(this);
                game.state.states.GameState.checkMatch(alphabet[letter]);                
            });
            button.anchor.x = 0.5;
            button.anchor.y = 0.5;
            button.scale.setTo(0.05, 0.5);
            alphabetButtonArray.push(button);
            buttonText = this.game.add.text(x, y + 4, alphabet[i], { fontSize:constants.smallText });
            buttonText.anchor.x = 0.5;
            buttonText.anchor.y = 0.5;
            alphabetTextArray.push(buttonText)
            x += 30;
            if (i % 5 === 0 && i > 0) {
                y += 30;
                x = 480;
            }
        }
    },

    addButton: function (text) {
        button = this.game.add.button(game.world.centerX, constants.newGameButtonCoordinate, constants.buttonImageName, this.newGame);
        button.scale.setTo(0.5, 1);
        button.anchor.x = 0.5;
        buttonText = this.game.add.text(game.world.centerX, constants.newGameButtonCoordinate + constants.buttonTextModifier, text);
        buttonText.anchor.x = 0.5;
        this.game.input.keyboard.enabled = false;
    },

    newGame: function () {
        wordArray = [];
        localStorage.setItem(constants.localStorageStatsName, JSON.stringify(stats));
        this.game.state.start(constants.menuStateName);
    },

    destroyGuessButton: function () {
        guessButton.destroy();
        guessButtonText.destroy();
    },

    destroyAlphabetButtons: function () {
        for (var i = 0; i < alphabetButtonArray.length; i++) {
            // this removes the callback function intead of removing the buttons, but I don't like it
            // alphabetButtonArray[i].onInputUp = alphabetButtonArray[i].onInputDown;
            alphabetButtonArray[i].destroy();
            alphabetTextArray[i].destroy();
        }
    },

    revealWord: function () {
        var wordLength = wordToSearch.length;
        for (var i = 0; i < wordLength; i++) {
            wordArray[i] = wordToSearch.charAt(i);
        }
        this.updateWord();
    },

    updateWord: function() {
        displayedWord.destroy();
        displayedWord = this.game.add.text(game.world.centerX, constants.displayedWordCoordinate, wordArray.join(" "));
        displayedWord.anchor.x = 0.5;
    },

    checkMatch: function (letter) {
        if (triedLetters.indexOf(letter) >= 0) {
            message.destroy();
            message = this.game.add.text(game.world.centerX, constants.messageCoordinates, constants.triedLetterMessage, { fontSize: constants.smallText });
            message.anchor.x = 0.5;
            this.game.time.events.add(constants.messageTimerTime, function () {
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
                lettersStat = this.game.add.text(0, constants.guessedLettersCoordinate, constants.guessedLettersText + stats.guessedLetters, { fontSize: constants.smallText });

                this.updateWord();

                if (wordArray.indexOf("_") < 0) {
                    stats.playedGames++;
                    stats.wonGames++;
                    game.state.states.GameState.destroyGuessButton();
                    game.state.states.GameState.destroyAlphabetButtons();

                    var win = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youWinText, {
                        fontSize: constants.bigText, backgroundColor: constants.whiteColor
                    });
                    win.anchor.x = 0.5;
                    this.addButton(constants.newGameText);
                }

            } else {
                errors++;
                wrongLetters += letter;
                guessedLetters.destroy();
                guessedLetters = this.game.add.text(0, constants.wrongLettersCoordintates, constants.wrongLettersText + wrongLetters, { fontSize: constants.smallText });
                this.hangingMan.destroy();
                this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan" + errors);
                this.hangingMan.anchor.x = 0.5;

                if (errors == constants.maxErrors) {
                    stats.playedGames++;
                    stats.lostGames++;
                    game.state.states.GameState.destroyGuessButton();
                    game.state.states.GameState.destroyAlphabetButtons();                    

                    var lose = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youLoseText, {
                        fontSize: constants.bigText, backgroundColor: constants.whiteColor
                    });
                    lose.anchor.x = 0.5;
                    this.addButton(constants.newGameText);
                }
            }
        }
    }
};