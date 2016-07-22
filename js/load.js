var loadState={
	preload:function(){
		loadingLable=game.add.text(game.world.centerX,game.world.centerY,'loading',{font:'30px Courier',fill:'#fff'});//Press Start 2P
        count=0;
		loadingLable.anchor.x=0.5;
		loadingLable.anchor.y=0.5;
		
		game.load.image("back-trees","assets/background/parallax-forest-back-trees.png");
		game.load.image("middle-trees","assets/background/parallax-forest-middle-trees.png");
		game.load.image("front-trees","assets/background/parallax-forest-front-trees.png");
		game.load.image("lights","assets/background/parallax-forest-lights.png");
		game.load.audio("ultrablue","assets/sound/ultrablue.mp3");

		game.load.spritesheet("player","assets/player/player.png",32,64);
		game.load.spritesheet("goblin_peasant","assets/enemies/goblin_peasant.png",32,64);
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	},
	create:function(){
		music=game.add.audio('ultrablue');
        game.time.events.loop(Phaser.Timer.SECOND/2, function(){
            count++;
            if(count>3){
                loadingLable.text="loading";
                count=0;
            }else{
                loadingLable.text+=".";
            }
            
            
        }, this);

	},
	update:function(){
		if(music.isDecoded){

			game.state.start('play');
		}
	}
}
