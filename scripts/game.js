var wordToSearch;
var errors = 0;

var GameState = {
    preload: function () {
        this.load.image("hangingMan0", "assets/images/0.png");
        this.load.image("hangingMan1", "assets/images/1.png");
        this.load.image("hangingMan2", "assets/images/2.png");
        this.load.image("hangingMan3", "assets/images/3.png");
        this.load.image("hangingMan4", "assets/images/4.png");
        this.load.image("hangingMan5", "assets/images/5.png");
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
        }
    },
    update: function () {
        this.hangingMan.destroy();
        this.hangingMan = this.game.add.sprite(0, 0, "hangingMan" + errors);
        if (errors > 5) {
            this.game.destroy();
            location.reload();
        }
    },
    init: function (selectedWord) {
        wordToSearch = selectedWord.word.toUpperCase();

        var words = selectedWord.word.split(" "),
            hiddenWords = [],
            word,
            hiddenWord = [],
            length;

        for (let i = 0; i < words.length; i++) {
            word = words[i].toUpperCase();
            hiddenWord = [];
            length = word.length;
            hiddenWord[0] = word.charAt(0);
            hiddenWord[length - 2] = word.charAt(length - 1);
            hiddenWords.push(hiddenWord.join(" _ "));
        }
        game.add.text(0, 264, hiddenWords.join(" "));
        game.add.text(0, 300, selectedWord.description, { fontSize: 16 })
    }
};

function checkForMatch(letter) {
    if (wordToSearch.indexOf(letter) >= 0) {
        console.log("Евала, намери буква");
    } else {
        console.log("Кор");
        errors++;
    }
}