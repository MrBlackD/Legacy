


var playState={
	preload:function() {

	},

	create:function() {
        game.renderer.renderSession.roundPixels=true;
        fpsLabel = game.add.text(game.camera.x+game.camera.width-50,game.camera.y+ 10, '0',{fontSize:14,fill:'#999'});
        fpsLabel.fixedToCamera=true;

        paralax1 = game.add.tileSprite(0, 0, 272,160, 'back-trees');
        paralax1.autoScroll(5,0);
        paralax1.scale.setTo(2,2);


        paralax2 = game.add.tileSprite(0, 0, 272,160, 'lights');
        paralax2.autoScroll(10,0);
        paralax2.scale.setTo(2,2);

        paralax3 = game.add.tileSprite(0, 0, 272,160, 'middle-trees');
        paralax3.autoScroll(15,0);
        paralax3.scale.setTo(2,2);



        player=game.add.sprite(272*2-64,160*2-30,'player');
        player.anchor.setTo(1,1);
        player.scale.setTo(-2,2);

        player.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);

        player.animations.play('walk');

                        paralax4 = game.add.tileSprite(0, 0, 272,160, 'front-trees');
        paralax4.autoScroll(25,0);
        paralax4.scale.setTo(2,2);




	},

	update:function() {
		


        fpsLabel.text = game.time.fps;
        
	},

	render:function() {
        //paralax1.x+=5;
	}
};

