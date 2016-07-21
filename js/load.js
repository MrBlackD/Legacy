var loadState={
	preload:function(){
		var loadingLable=game.add.text(game.world.centerX,game.world.centerY,'loading...',{font:'30px Courier',fill:'#fff'});
		loadingLable.anchor.x=0.5;
		loadingLable.anchor.y=0.5;
		
		game.load.image("back-trees","assets/parallax_forest_pack/layers/parallax-forest-back-trees.png");
		game.load.image("middle-trees","assets/parallax_forest_pack/layers/parallax-forest-middle-trees.png");
		game.load.image("front-trees","assets/parallax_forest_pack/layers/parallax-forest-front-trees.png");
		game.load.image("lights","assets/parallax_forest_pack/layers/parallax-forest-lights.png");
		game.load.audio("ultrablue","assets/ultrablue.mp3");

		game.load.spritesheet("player","assets/maleBase/full/advnt_full.png",32,64);
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
