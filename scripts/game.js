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
        this.hangingMan = this.game.add.sprite(0, 0, "hangingMan0");
        this.game.input.keyboard.onDownCallback = function(e) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                var letter = String.fromCharCode(e.keyCode);
                checkForMatch(letter);
            }
        };
    },
    update: function () {
        this.hangingMan = this.game.add.sprite(0, 0, "hangingMan" + errors);
        if (errors > 5) {
            this.game.destroy();
            location.reload();
        }
        displayedWord.destroy();
        displayedWord = this.game.add.text(0, 264, wordArray.join(" "));
        if (wordArray.indexOf("_") < 0) {
            this.game.add.text(0, 150, "YOU WIN!", { fontSize: 30 });
            var button = this.game.add.button(0, 200, "button", this.newGame);
            button.scale.setTo(0.5, 1);
            this.game.add.text(0, 200, "New Game");
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
            console.log(wordArray);
            hiddenWords.push(hiddenWord.join(" "));
        }
        displayedWord = this.game.add.text(0, 264, wordArray.join(" "));
        game.add.text(0, 300, selectedWord.description, { fontSize: 16 })
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
        console.log("Евала, намери буква");
    } else {
        console.log("Кор");
        errors++;
    }
}