var game = new Phaser.Game(800, 480, Phaser.AUTO);

game.state.add("MenuState", MenuState);
game.state.add("GameState", GameState);
game.state.start("MenuState");