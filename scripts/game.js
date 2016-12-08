var wordToSearch = "";
var wordArray = [];
var checkedLetters = "";
var errors = 0;
var displayedWord;

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
        this.game.stage.backgroundColor = "#ffffff";
        this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan0");
        this.hangingMan.anchor.x = 0.5;
        this.game.input.keyboard.enabled = true;        
        this.game.input.keyboard.onDownCallback = function(e) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                var letter = String.fromCharCode(e.keyCode);
                checkForMatch(letter);
            }
        };
    },
    update: function () {
        this.hangingMan.destroy();
        this.hangingMan = this.game.add.sprite(game.world.centerX, 0, "hangingMan" + errors);
        this.hangingMan.anchor.x = 0.5;
        var button;
        if (errors == 5) {
            var lose = this.game.add.text(game.world.centerX, 150, "YOU LOSE!", { fontSize: 30, backgroundColor: "#ffffff" });
            lose.anchor.x = 0.5;
            this.addButton("New Game");
        }
        displayedWord.destroy();
        displayedWord = this.game.add.text(game.world.centerX, 264, wordArray.join(" "));
        displayedWord.anchor.x = 0.5;
        if (wordArray.indexOf("_") < 0) {
            var win = this.game.add.text(game.world.centerX, 150, "YOU WIN!", { fontSize: 30, backgroundColor: "#ffffff" });
            win.anchor.x = 0.5;
            this.addButton("New Game");
        }

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
        var description = this.game.add.text(game.world.centerX, 300, selectedWord.description, { fontSize: 16 });
        description.anchor.x = 0.5;
    },
    addButton: function (text) {
        button = this.game.add.button(game.world.centerX, 200, "button", this.newGame);
        button.scale.setTo(0.5, 1);
        button.anchor.x = 0.5;
        var buttonText = this.game.add.text(game.world.centerX, 205, text);
        buttonText.anchor.x = 0.5;
        this.game.input.keyboard.enabled = false;
    },
    newGame: function () {
        wordArray = [];
        this.game.state.start("MenuState");
    }
};

function checkForMatch(letter) {
    if (wordToSearch.indexOf(letter) >= 0) {
        var index = wordToSearch.indexOf(letter);
        while (index >= 0) {            
            wordArray[index] = wordToSearch.charAt(index);
            index = wordToSearch.indexOf(letter, index + 1);
        }
    } else {
        errors++;
    }
}