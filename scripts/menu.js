var MenuState = {
    preload: function () {
        this.load.image("button", "assets/images/button.png");
    },
    create: function () {
        this.game.stage.backgroundColor = "#ffffff";
        this.game.add.text(0, 0, "Select category:");
        var coord = 50;
        for (var cat in categories) {
            this.game.add.button(0, coord, "button", this.gameStart(categories[cat].words[0].word));
            this.game.add.text(0, coord, cat)
            coord += 50;
        }
    },
    update: function () {

    },
    gameStart: function (word) {
        game.state.start("GameState", true, false, word);
    }
};