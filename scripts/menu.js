var MenuState = {
    preload: function () {
        this.load.image(constants.buttonImageName, "assets/images/button.png");
    },
    
    create: function () {
        var coord = constants.firstMenuButton;
        var text;
        this.game.stage.backgroundColor = constants.whiteColor;
        text = this.game.add.text(game.world.centerX, 0, constants.gameName, { fontSize: constants.bigText });
        text.anchor.x = 0.5;
        text = this.game.add.text(game.world.centerX, constants.menuCategoryCoordinate, constants.menuCategoriesName);
        text.anchor.x = 0.5;
        for (var cat in categories) {
            var wordCount = categories[cat].words.length;
            var rng = Math.floor((Math.random() * wordCount));
            var button = this.game.add.button(game.world.centerX, coord, constants.buttonImageName);
            button.anchor.x = 0.5;
            button.variable = categories[cat].words[rng];
            button.inputEnabled = true;
            button.events.onInputDown.add(this.gameStart, this);
            text = this.game.add.text(game.world.centerX, coord + constants.buttonTextModifier, categories[cat].name);
            text.anchor.x = 0.5;
            coord += constants.buttonModifier;
        }
    },

    update: function () {
    },
    
    gameStart: function (button) {
        var word = button.variable;
        this.game.state.start(constants.gameStateName, true, false, word);
    }
};