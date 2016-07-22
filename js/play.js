


var playState={
	preload:function() {

	},

	create:function() {


        paralax1 = game.add.tileSprite(0, 0, 272,160, 'back-trees');
        paralax1.autoScroll(5,0);
        paralax1.scale.setTo(scale,scale);



        paralax2 = game.add.tileSprite(0, 0, 272,160, 'lights');
        paralax2.autoScroll(10,0);
        paralax2.scale.setTo(scale,scale);


        paralax3 = game.add.tileSprite(0, 0, 272,160, 'middle-trees');
        paralax3.autoScroll(15,0);
        paralax3.scale.setTo(scale,scale);



        player=game.add.sprite(w-32*scale,h-15*scale,'player');
        player.anchor.setTo(1,1);
        player.scale.setTo(-scale,scale);


        player.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);

        player.animations.play('walk');


        enemy=game.add.sprite(0,h-15*scale,'goblin_peasant');
        enemy.anchor.setTo(0,1);
        enemy.scale.setTo(scale,scale);

        enemy.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);

        enemy.animations.play('walk');


        paralax4 = game.add.tileSprite(0, 0, 272,160, 'front-trees');
        paralax4.autoScroll(25,0);
        paralax4.scale.setTo(scale,scale);


        paralax1_tween=game.add.tween(paralax1).to( { alpha: 1 }, 2000, "Linear");
        paralax2_tween=game.add.tween(paralax2).to( { alpha: 1 }, 2000, "Linear");
        paralax3_tween=game.add.tween(paralax3).to( { alpha: 1 }, 3000, "Linear");
        paralax4_tween=game.add.tween(paralax4).to( { alpha: 1 }, 3000, "Linear");
        player_tween=game.add.tween(player).to( { alpha: 1 }, 4000, "Linear");


        fpsLabel = game.add.text(0,0, '0',{fontSize:14,fill:'#999'});
        fpsLabel.fixedToCamera=true;

	},

	update:function() {
		

        enemy.x+=2;
        fpsLabel.text = game.time.fps;
        
	},

	render:function() {
        //paralax1.x+=5;
	}
};

