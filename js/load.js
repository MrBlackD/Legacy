WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Press Start 2P']
    }

};


var loadState={
	preload:function(){
		loadingLable=game.add.text(game.world.centerX,game.world.centerY,'loading',{font:'30px Press Start 2P',fill:'#fff'});//Press Start 2P
	    loadingLable.anchor.x=0.5;
		loadingLable.anchor.y=0.5;
		loadingLable.visible = false;
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.image("back-trees","assets/background/parallax-forest-back-trees.png");
		game.load.image("middle-trees","assets/background/parallax-forest-middle-trees.png");
		game.load.image("front-trees","assets/background/parallax-forest-front-trees.png");
		game.load.image("lights","assets/background/parallax-forest-lights.png");

		game.load.audio("rain","assets/sound/rain.ogg");
		game.load.audio("intro","assets/sound/intro.mp3");
		game.load.audio("lightningStrikeSound","assets/sound/lightningStrike.mp3");
		game.load.audio("fireEaterSound","assets/sound/swoosh.mp3");
		game.load.audio("introBoosVoice","assets/sound/introBoosVoice.mp3");

		game.load.spritesheet("player","assets/player/player.png",32,64);
		game.load.spritesheet("goblin_peasant","assets/enemies/goblin_peasant.png",32,64);
		game.load.spritesheet("goblin_peasant_corpse","assets/enemies/goblin_peasant.png",64,64);

		game.load.spritesheet("bloodSkeleton","assets/enemies/bloodSkeleton.png",32,64);
		game.load.spritesheet("bloodSkeletonCorpse","assets/enemies/bloodSkeleton.png",64,64);

		game.load.spritesheet("introBoss1","assets/enemies/introBoss1.png",85,94);
		game.load.spritesheet("introBoss3","assets/enemies/introBoss3.png",87,110);


		game.load.spritesheet("fireEater","assets/spells/fireEater.png",168,148);
		game.load.spritesheet("lightningStrike","assets/spells/lightningStrike.png",98,203);

		game.load.spritesheet("blackExplosion","assets/spells/blackExplosion.png",50,47);

		game.load.spritesheet("magicBarrier","assets/spells/magicBarrier.png",128,128);

		game.load.image("frame","assets/path/frame-0-grey.png");
		game.load.image("path-monk","assets/path/monk/runes-orange-1.png");
		
		game.load.image('menu-button', 'assets/ui/menu.png');

		game.load.image('raindrops', 'assets/rain/raindrops_1_30_1.png');
		game.load.image('lightning1', 'assets/rain/lightning1.png');
		game.load.image('lightning2', 'assets/rain/lightning2.png');
		game.load.image('lightning3', 'assets/rain/lightning3.png');
		game.load.image('lightning4', 'assets/rain/lightning4.png')

	},
	create:function(){


        count=0;
		rainSound=game.add.audio('rain');
		introSound=game.add.audio('intro');
		lightningStrikeSound=game.add.audio("lightningStrikeSound");
		fireEaterSound=game.add.audio("fireEaterSound");
		introBoosVoice=game.add.audio("introBoosVoice");
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
		
		if(rainSound.isDecoded&&introSound.isDecoded&&lightningStrikeSound.isDecoded&&fireEaterSound.isDecoded&&introBoosVoice.isDecoded){

			game.state.start('intro');
		}
		
	}
}


function createText(){
	loadingLable.visible = true;
}

