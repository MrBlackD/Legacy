
var introState={
	preload:function() {

	},

	create:function() {
		game.stage.backgroundColor = '#ffffff';
		lightningEvent=[];
		


		

		rainSound.play();
		introSound.play();
		initBackgroundParalaxIntro();
		//backgroundParalaxStart();
		
		lightningEvent.push(game.time.events.loop(5*1000, lightning, this));
		lightningEvent.push(game.time.events.loop(6*1000, lightning, this));

		garbage=game.add.group();
		ashes=game.add.group();

		introBoss1=game.add.sprite(scale,gameHeight-15*scale,'introBoss1');
		introBoss1.anchor.setTo(0,1);
		introBoss1.scale.setTo(scale,scale);
		introBoss1.alpha=0;

		player=game.add.sprite(gameWidth-32*scale,gameHeight-15*scale,'player');

		player.stats=playerStats;
		tintScreen(0x505050);
		player.anchor.setTo(1,1);
		player.scale.setTo(-scale,scale);
		player.inputEnabled=true;

		player.animations.add('fireEater', [10,24,0], 6);
		player.animations.add('lightningStrike', [26,22,21,0], 6);
		player.animations.add('oath',[15],3,true);

		//player.animations.play('walk');
		drops=game.add.group();
		rain();
		story=game.add.text(game.world.centerX,game.world.centerY,'',{font:'16px Press Start 2P',fill:'#fff',align: "center"});
		story.anchor.x=0.5;
		story.anchor.y=0.5;
		story.alpha=0;
		In=5000;
		Out=1000;


		

		game.time.events.add(0, function(){
			fadeInOut(In,Out);
			introBoss();
			story.text="Long time ago"
		}, this);
		game.time.events.add(6*1000, function(){
			fadeInOut(In,Out);

			story.text="The greatest magician \nreleased an ancient evil";
		}, this);
		game.time.events.add(12*1000, function(){
			fadeInOut(In,Out);
			story.text="To destroy it forever"; 
		}, this);
		game.time.events.add(18*1000, function(){
			fadeInOut(In,Out);
			introBossForm2();
			story.text="but when they met \nface to face \nhe lost";
		}, this);
		game.time.events.add(24*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.2;
			story.text="Then he brought \na magical oath";
		}, this);
		game.time.events.add(30*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.3;
			story.text="Evil will be enchanted \n";

			
		}, this);
		game.time.events.add(36*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.4;
			story.text="Until his son's heir \nwill born";
		}, this);
		game.time.events.add(42*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.5;
			story.text="Then he will devote \nhis life to \ndestruction of evil";
		}, this);

		game.time.events.add(48*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.6;
			story.text="If he will lost \nhe must bring \nthe same oath";
		}, this);
		game.time.events.add(54*1000, function(){
			fadeInOut(In,Out);
			bloodPool.alpha=0.7;	
			story.text="This is your \ncurse";
		}, this);
		game.time.events.add(60*1000, function(){
			fadeOutAll();
			game.time.events.remove(lightningEvent[0]);
			game.time.events.remove(lightningEvent[1]);
			story.text="This is your";

		}, this);
		game.time.events.add(66*1000, function(){

			game.state.start('menu');
		}, this);
		fpsCounter(true);
	},

	update:function() {
		clearGarbage();
		fpsLabel.text = game.time.fps;


		drops.forEach(function(drop){
			if(drop.y>=game.height-60){
				
				tmp=game.add.sprite(drop.x,drop.y,'raindrops');
				garbage.add(tmp);
				drop.y=-10;
				game.add.tween(tmp).to( {alpha: 0}, 200, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
					tmp.destroy();
					if(garbage.length>=100)
						garbage.removeAll();
				});
			}
			drop.y+=game.rnd.integerInRange(10, 50);
	});
		
	},

	render:function() {

	}
};

function fpsCounter(bool){
	if(!bool)
		return;



	fpsLabel = game.add.text(0,0, '0',{fontSize:14,fill:'#999'});
	fpsLabel.fixedToCamera=true;
}



function initBackgroundParalaxIntro(){
	paralaxBackground=[];
	
	var paralax = game.add.tileSprite(0, 0, 272,160, 'back-trees');
	paralax.speed=BACKGROUND_PARALAX_SPEED1;
	paralax.scale.setTo(scale,scale);
	paralaxBackground.push(paralax);




	paralax = game.add.tileSprite(0, 0, 272,160, 'middle-trees');
	paralax.speed=BACKGROUND_PARALAX_SPEED3;
	paralax.scale.setTo(scale,scale);
	paralaxBackground.push(paralax);

	paralax = game.add.tileSprite(0, 0, 272,160, 'front-trees');
	paralax.speed=BACKGROUND_PARALAX_SPEED4;
	paralax.scale.setTo(scale,scale);
	paralaxBackground.push(paralax);


}



function backgroundParalaxStart(){
	for(var i=0;i<paralaxBackground.length;i++)
		paralaxBackground[i].autoScroll(paralaxBackground[i].speed,0);
}

function backgroundParalaxPause(){
	for(var i=0;i<paralaxBackground.length;i++)
		paralaxBackground[i].autoScroll(0,0);
}

function tintScreen(color){
	player.tint=color;
	for(var i=0;i<paralaxBackground.length;i++)
		paralaxBackground[i].tint=color;

	introBoss1.tint=color;
}

function rain(){
	var rainDropData = [
	'........',
	'...11...',
	'...11...',
	'...11...',
	'...11...',
	'...11...',
	'...11...',
	'........'
];	
	game.create.texture('rainDrop', rainDropData, 1, 1, 0);
	for(i=0;i<200;i++){
		drop=game.add.sprite(game.rnd.integerInRange(0, game.width),game.rnd.integerInRange(-500, 500),'rainDrop');
		drops.add(drop);
	}
}

function lightning(){

	tintScreen(0xccccff);
	tmp=game.add.sprite(0,game.rnd.integerInRange(0,50),'lightning'+game.rnd.pick(['1','2','3','4']));
	tmp.anchor.setTo(0,0.5);
	tmp.scale.x=0.2;
	while(tmp.width<game.width){
		tmp.scale.x+=0.1;
	}
	
	tmp.scale.y=0.5;
	game.add.tween(tmp).to( {alpha: 0}, 200, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
		garbage.add(this);
		this.kill();

	},tmp);

	game.time.events.add(Phaser.Timer.SECOND/5, function(){
		tintScreen(0x505050);

	}, this);
}

function clearGarbage(){
	if(garbage.length>=100)
		garbage.removeAll();
}

function fadeInOut(In,Out){
	story.fontSize=16;
	game.add.tween(story).to( {alpha: 1,fontSize:20}, In, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){
		game.add.tween(story).to( {alpha: 0}, Out, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){

		});
	});
}

function fadeOutAll(){
	game.add.tween(story).to( {alpha: 1}, In, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){
		game.world.children.forEach(function(item){
			
			game.add.tween(item).to( {alpha: 0}, Out, Phaser.Easing.Exponential.Out, true);
		});
		
	});

}



function introBoss(){


	introBoss1.tint=0x000000;
	introBoss1.animations.add('idle', [1, 2, 3, 4, 5, 6,7,8], 8, true);
	introBoss1.animations.play('idle');
	game.add.tween(introBoss1).to( {alpha: 1}, 25000, Phaser.Easing.Linear.None, true).onComplete.add(function(){

		
	});
	//tintScreen(0x505050);
}

function introBossForm2(){
	game.stage.backgroundColor = '#000000';

	game.world.children.forEach(function(item){
			if(item.alpha==0)
				return;
		game.add.tween(item).to( {alpha: 0}, Out, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){
			if(item==introBoss1){
				garbage.removeAll();
				introBoosVoice.play();
				introBoss1.loadTexture('introBoss3',null,false);
				game.add.tween(introBoss1).to( {x: player.x}, 54000, Phaser.Easing.Linear.None, true)
			}

			if(item==player){
				
				player.play('oath');
				bloodPool=game.add.sprite(0,0,'bloodPool');
				//magicBarrier.scale.setTo(scale,scale);
				bloodPool.width=game.width;
				bloodPool.height=game.height;
				bloodPool.animations.add('play',
					[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],
					30,true);
				bloodPool.alpha=0.1;
				bloodPool.play('play');
			}
			game.add.tween(item).to( {alpha: 1}, Out, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){
				game.stage.backgroundColor = '#ffffff';
			});
		});
	});


}