var menuState={
	preload:function(){


	},
	create:function(){
		
		music.play();
		


        paralax1 = game.add.tileSprite(0, 0, 272,160, 'back-trees');
        paralax1.autoScroll(5,0);
        paralax1.scale.setTo(scale,scale);
        paralax1.alpha=0;


        paralax2 = game.add.tileSprite(0, 0, 272,160, 'lights');
        paralax2.autoScroll(10,0);
        paralax2.scale.setTo(scale,scale);
        paralax2.alpha=0;

        paralax3 = game.add.tileSprite(0, 0, 272,160, 'middle-trees');
        paralax3.autoScroll(15,0);
        paralax3.scale.setTo(scale,scale);
		paralax3.alpha=0;


        player=game.add.sprite(w-32*scale,h-10*scale,'player');
        player.anchor.setTo(1,1);
        player.scale.setTo(-scale,scale);
        player.alpha=0;

        player.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);

        player.animations.play('walk');

        paralax4 = game.add.tileSprite(0, 0, 272,160, 'front-trees');
        paralax4.autoScroll(25,0);
        paralax4.scale.setTo(scale,scale);
        paralax4.alpha=0;

        paralax1_tween=game.add.tween(paralax1).to( { alpha: 1 }, 2000, "Linear");
        paralax2_tween=game.add.tween(paralax2).to( { alpha: 1 }, 2000, "Linear");
        paralax3_tween=game.add.tween(paralax3).to( { alpha: 1 }, 3000, "Linear");
        paralax4_tween=game.add.tween(paralax4).to( { alpha: 1 }, 3000, "Linear");
        player_tween=game.add.tween(player).to( { alpha: 1 }, 4000, "Linear");



        text = game.add.text(game.world.centerX, game.world.centerY, "LEGACY");
        text_tween=game.add.tween(text).to( { alpha: 1 }, 5000, "Linear");
        text.alpha=0;
	    //  Centers the text
	    text.anchor.set(0.5);
	    text.align = 'center';

	    //  Our font + size
	    text.font = 'Press Start 2P';
	    text.fontWeight = 'bold';
	    text.fontSize = 70;
	    text.fill = '#fff';


	    //  Here we create our fake reflection :)
	    //  It's just another Text object, with an alpha gradient and flipped vertically

	    textReflect = game.add.text(game.world.centerX, game.world.centerY + 50, text.text);
	    textReflect_tween=game.add.tween(textReflect).to( { alpha: 1 }, 5000, "Linear");
		textReflect.alpha=0;
	    //  Centers the text
	    textReflect.anchor.set(0.5);
	    textReflect.align = text.align;
	    textReflect.scale.y = -1;

	    //  Our font + size
	    textReflect.font = text.font;
	    textReflect.fontWeight = text.fontWeight;
	    textReflect.fontSize = text.fontSize;

	    //  Here we create a linear gradient on the Text context.
	    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
	    var grd = textReflect.context.createLinearGradient(0, 0, 0, text.canvas.height);

	    //  Add in 2 color stops
	    grd.addColorStop(0, 'rgba(255,255,255,0)');
	    grd.addColorStop(1, 'rgba(255,255,255,0.08)');

	    //  And apply to the Text
	    textReflect.fill = grd;

	    paralax1_tween.chain(paralax2_tween);
	    paralax2_tween.chain(paralax3_tween);
	    paralax3_tween.chain(paralax4_tween);

	    paralax4_tween.chain(player_tween);

	    text_tween.chain(textReflect_tween);
	    player_tween.chain(text_tween);
	    
	    paralax1_tween.start();

		//textReflect_tween.start();
	    //text_tween.start();
        
        fpsLabel = game.add.text(0,0, '0',{fontSize:14,fill:'#999'});
        fpsLabel.fixedToCamera=true;
	    
	},
	update:function(){

		fpsLabel.text = game.time.fps;
	}
}

