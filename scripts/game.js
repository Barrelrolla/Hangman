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
        this.game.stage.backgroundColor = "#ffffff";
        this.hangingMan0 = this.game.add.sprite(0, 0, "hangingMan0");
    },
    update: function () {

    },
    init: function (word) {
        game.add.text(0, 264, word);
    }
};