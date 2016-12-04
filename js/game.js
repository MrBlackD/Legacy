var game = new Phaser.Game(gameWidth,gameHeight);//('100%', '100%');



game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('play',playState);
game.state.add('menu',menuState);
game.state.add('intro',introState);
game.state.start('boot');


