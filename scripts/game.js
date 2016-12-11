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
        // this.load.image("hangingMan0", "assets/images/0.png");
        // this.load.image("hangingMan1", "assets/images/1.png");
        // this.load.image("hangingMan2", "assets/images/2.png");
        // this.load.image("hangingMan3", "assets/images/3.png");
        // this.load.image("hangingMan4", "assets/images/4.png");
        // this.load.image("hangingMan5", "assets/images/5.png");
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
            game.state.states.GameState.guessButtonFunction();
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
        // this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan0");
        // this.hangingMan.anchor.x = 0.5;
        this.game.input.keyboard.enabled = true;
        this.game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode >= constants.aKey && e.keyCode <= constants.zKey) {
                letter = String.fromCharCode(e.keyCode);
                game.state.states.GameState.checkMatch(letter);
            }
        };

        drawInitalState();

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

    guessButtonFunction: function () {
        game.state.states.GameState.destroyGuessButton();
        game.state.states.GameState.destroyAlphabetButtons();
        var container = document.getElementById("container");
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "wordInput");
        container.appendChild(input);
        input.focus();
        game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode == constants.enterKey || e.keyCode == constants.mobileEnterKey) {
                var input = document.getElementById("wordInput");
                var word = input.value;
                input.remove();

                if (word.toUpperCase() == wordToSearch) {
                    game.state.states.GameState.winGame();
                } else {
                    game.state.states.GameState.loseGame();
                }
            }
        };
    },

    addAlphabet: function () {
        var x = constants.alphabetButtonsX;
        var y = constants.alphabetButtonsY;
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
            buttonText = this.game.add.text(x, y + constants.alphabetButtonTextModifier, alphabet[i], { fontSize: constants.smallText });
            buttonText.anchor.x = 0.5;
            buttonText.anchor.y = 0.5;
            alphabetTextArray.push(buttonText)
            x += constants.alphabetButtonModifier;
            if (i % constants.alphabetRowModifier === 0 && i > 0) {
                y += constants.alphabetButtonModifier;
                x = constants.alphabetButtonsX;
            }
        }
    },

    addNewGameButton: function (text) {
        button = this.game.add.button(game.world.centerX, constants.newGameButtonCoordinate, constants.buttonImageName, this.newGame);
        button.scale.setTo(0.5, 1);
        button.anchor.x = 0.5;
        buttonText = this.game.add.text(game.world.centerX, constants.newGameButtonCoordinate + constants.buttonTextModifier, text);
        buttonText.anchor.x = 0.5;
        this.game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode == constants.enterKey) {
                game.state.states.GameState.newGame();
            }
        };
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

    winGame: function () {
        stats.playedGames++;
        stats.wonGames++;
        this.destroyGuessButton();
        this.destroyAlphabetButtons();
        drawHappyFace();

        var win = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youWinText, {
            fontSize: constants.bigText, backgroundColor: "white"
        });
        win.anchor.x = 0.5;
        this.addNewGameButton(constants.newGameText);
    },

    loseGame: function () {
        stats.playedGames++;
        stats.lostGames++;
        this.destroyGuessButton();
        this.destroyAlphabetButtons();

        for (errors ; errors <= constants.maxErrors; errors++) {
            drawArray[errors]();            
        }

        var lose = this.game.add.text(game.world.centerX, constants.resultTextCoordinate, constants.youLoseText, {
            fontSize: constants.bigText, backgroundColor: "white"
        });

        lose.anchor.x = 0.5;
        game.state.states.GameState.addNewGameButton(constants.newGameText);
    },

    revealWord: function () {
        var wordLength = wordToSearch.length;
        for (var i = 0; i < wordLength; i++) {
            wordArray[i] = wordToSearch.charAt(i);
        }
        this.updateWord();
    },

    updateWord: function () {
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
                    this.winGame();
                }

            } else {
                errors++;
                wrongLetters += letter;
                guessedLetters.destroy();
                guessedLetters = this.game.add.text(0, constants.wrongLettersCoordintates, constants.wrongLettersText + wrongLetters, { fontSize: constants.smallText });
                drawArray[errors]();
                // this.hangingMan.destroy();
                // this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan" + errors);
                // this.hangingMan.anchor.x = 0.5;

                if (errors == constants.maxErrors) {
                    this.loseGame();
                }
            }
        }
    }
};

var drawInitalState = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(370, 220);
    graphics.lineTo(370, 40);
    graphics.lineTo(300, 40);
    graphics.lineTo(300, 70);
    graphics.drawCircle(300, 95, 50);
    graphics.beginFill(constants.blackColor);
    graphics.drawCircle(310, 88, 4);
    graphics.drawCircle(290, 88, 4);
    graphics.endFill();
    graphics.moveTo(290, 110);
    graphics.lineTo(315, 100);
};

var drawBody = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 120);
    graphics.lineTo(300, 190);
};

var drawLeftHand = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 135);
    graphics.lineTo(260, 165);
};

var drawRightHand = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 135);
    graphics.lineTo(340, 165);
};

var drawLeftLeg = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 190);
    graphics.lineTo(255, 225);
};

var drawRightLeg = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 190);
    graphics.lineTo(345, 225);
    drawXeyes();
};

var drawXeyes = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.whiteColor);
    graphics.beginFill(constants.whiteColor);
    graphics.drawCircle(310, 88, 4);
    graphics.drawCircle(290, 88, 4);
    graphics.endFill();
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(285, 84);
    graphics.lineTo(295, 94);
    graphics.moveTo(295, 84);
    graphics.lineTo(285, 94);
    graphics.moveTo(305, 84);
    graphics.lineTo(315, 94);
    graphics.moveTo(315, 84);
    graphics.lineTo(305, 94);
};

var drawHappyFace = function () {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.whiteColor);
    graphics.moveTo(290, 110);
    graphics.lineTo(315, 100);
    graphics.lineStyle(4, constants.blackColor);    
    graphics.arc(300, 100, 10, 0, Math.PI)
};

var drawArray = [drawInitalState, drawBody, drawLeftHand, drawRightHand, drawLeftLeg, drawRightLeg];