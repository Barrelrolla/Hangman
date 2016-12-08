var MenuState = {
    preload: function () {
        this.load.image("button", "assets/images/button.png");
    },
    create: function () {
        var coord = 80;
        var text;
        this.game.stage.backgroundColor = "#ffffff";
        text = this.game.add.text(game.world.centerX, 0, "HANGMAN", { fontSize: 30 });
        text.anchor.x = 0.5;
        text = this.game.add.text(game.world.centerX, 40, "Select category:");
        text.anchor.x = 0.5;
        for (var cat in categories) {
            var length = categories[cat].words.length;
            var rng = Math.floor((Math.random() * length));
            var button = this.game.add.button(game.world.centerX, coord, "button");
            button.anchor.x = 0.5;
            button.variable = categories[cat].words[rng];
            button.inputEnabled = true;
            button.events.onInputDown.add(this.gameStart, this);
            text = this.game.add.text(game.world.centerX, coord + 5, cat);
            text.anchor.x = 0.5;
            coord += 50;
        }
    },
    update: function () {

    },
    gameStart: function (button) {
        var word = button.variable;
        this.game.state.start("GameState", true, false, word);
    }
};