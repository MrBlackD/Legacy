var loadState={
	preload:function(){
		var loadingLable=game.add.text(game.world.centerX,game.world.centerY,'loading...',{font:'30px Courier',fill:'#fff'});
		loadingLable.anchor.x=0.5;
		loadingLable.anchor.y=0.5;
		
		game.load.image("back-trees","assets/background/parallax-forest-back-trees.png");
		game.load.image("middle-trees","assets/background/parallax-forest-middle-trees.png");
		game.load.image("front-trees","assets/background/parallax-forest-front-trees.png");
		game.load.image("lights","assets/background/parallax-forest-lights.png");
		game.load.audio("ultrablue","assets/sound/ultrablue.mp3");

		game.load.spritesheet("player","assets/player/player.png",32,64);
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	},
	create:function(){
		music=game.add.audio('ultrablue');

	},
	update:function(){
		if(music.isDecoded){

			game.state.start('menu');
		}
	}
}
