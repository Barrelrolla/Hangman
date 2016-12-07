var MenuState = {
    preload: function () {
        this.load.image("button", "assets/images/button.png");
    },
    create: function () {
        var coord = 50;
        this.game.stage.backgroundColor = "#ffffff";
        this.game.add.text(0, 0, "Select category:");
        for (var cat in categories) {
            var length = categories[cat].words.length;
            var rng = Math.floor((Math.random() * length));
            var button = this.game.add.button(0, coord, "button");
            button.variable = categories[cat].words[rng];
            button.inputEnabled = true;
            button.events.onInputDown.add(this.gameStart, this);
            this.game.add.text(0, coord, cat);
            coord += 50;
        }
    },
    update: function () {

    },
    gameStart: function (button) {
        var word = button.variable;
        game.state.start("GameState", true, false, word);
    }
};