var game = new Phaser.Game(640, 480, Phaser.AUTO);

game.state.add(constants.menuStateName, MenuState);
game.state.add(constants.gameStateName, GameState);
game.state.start(constants.menuStateName);