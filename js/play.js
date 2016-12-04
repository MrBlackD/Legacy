playerStats={
    hp:100,
    maxHp:100,
    damage:1,
    attackSpeed:3,
    level:1,
    exp:0,
    path:'none',
    spirit:0,
    maxSpirit:0
}


enemyStats={
    hp:2,
    maxHp:5,
    damage:1,
    attackSpeed:3,
    movementSpeed:2,
    exp:1
}

gameState={
    enemiesMax:10,
    enemiesLive:0,
    enemiesDead:0,
    enemiesSpawnRate:2000
}

monk={
    nakedFists:{
        name:"Naked Fists",
        path:"monk",
        require:null,
        level:0,
        maxLevel:1,
        value:0.1,
        stack:0,
        maxStack:5,
        type:"passive",
        desc:"",
        use:function(){

            if(this.stack>=this.maxStack){

                player.animations.currentAnim.speed=player.stats.attackSpeed;
                this.stack=0;
            }else{
                player.animations.currentAnim.speed*=(1+this.value);
                this.stack++;
            }
            
        }
    }
};


var playState={
	preload:function() {
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('assets/ui/kenney/kenney.json');
	},

	create:function() {

        initBackgroundParalax();
        backgroundParalaxStart();
        




        target=null;

        player=game.add.sprite(gameWidth-32*scale,gameHeight-15*scale,'player');

        player.stats=playerStats;

        player.anchor.setTo(1,1);
        player.scale.setTo(-scale,scale);

        player.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);
        var punch=player.animations.add('punch', [10,27,28], player.stats.attackSpeed, true);
        punch.onLoop.add(playerAutoAttack,this);
        player.animations.play('walk');

        
        enemyPool=game.add.group();
        corpsePool=game.add.group();
        game.time.events.loop(gameState.enemiesSpawnRate, spawnEnemy, this);
        

        //enemy health  bar

        
        playerHpBarFrame = game.add.graphics(game.world.width/2-102, game.camera.y+20);
        playerHpBarFrame.fixedToCamera=true;
        playerHpBar = game.add.graphics(game.camera.width/2-100, game.camera.y+20);
        playerHpBar.fixedToCamera=true;

        playerExpBar = game.add.graphics(0, game.camera.height-5);
        playerExpBar.fixedToCamera=true;

        enemyHpLabel=game.add.text(game.camera.x+game.camera.width/2,game.camera.y+ 22,'',{fontSize:14,fill:'#000'});
        enemyHpLabel.anchor.setTo(0.5,0.5);
        enemyHpLabel.fixedToCamera=true;



        
        fpsCounter(true);
	},

	update:function() {
		
        drawPlayerHpBar();
        enemyPool.forEach(function(enemy){
            if(player.x-enemy.x<=LOWEST_DISTANCE_TO_ENEMY){
                if(!target||!target.alive){
                    target=enemy;
                }
                enemy.animations.play('punch');
            }else{
                enemy.x+=enemy.stats.movementSpeed;
            }

            if(target&&target.alive){
                backgroundParalaxPause();
                player.animations.play('punch');
                //target.animations.play('punch');
            }else{
                
                player.animations.play('walk');
                backgroundParalaxStart();
                
            }

                
        },this);


        corpsePool.forEachAlive(function(corpse){
            if(!target||!target.alive){
                if(corpse.animations.currentFrame.index==8)
                corpse.x+=enemyStats.movementSpeed;
            }
        },this);
        


        fpsLabel.text = game.time.fps;
        
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

function statsUI(){
    var close, panel, menuButton;
        slickUI.add(panel = new SlickUI.Element.Panel(10, 10, game.width-20, game.height - 20));
        //panel.add(new SlickUI.Element.Text(10,0, "Menu")).centerHorizontally().text.alpha = 0.5;
        panel.add(new SlickUI.Element.Text(0,0, player.stats.path+" "+player.stats.level)).centerHorizontally().text.alpha = 0.5;
        panel.add(statsPanel=new SlickUI.Element.Panel(10, 30, panel.width*0.4, panel.height-20));
        panel.add(skillPanel=new SlickUI.Element.Panel(statsPanel.width+20, 30, panel.width*0.6, panel.height-20));
        
        panel.visible=false;
        panel.alpha = 0;
        statsPanel.add(new SlickUI.Element.Text(0,0, "MaxHP "+player.stats.maxHp)).text.alpha = 0.5;
        statsPanel.add(new SlickUI.Element.Text(0,30, "Damage "+player.stats.damage)).text.alpha = 0.5;
        statsPanel.add(new SlickUI.Element.Text(0,60, "Attack Speed "+player.stats.attackSpeed)).text.alpha = 0.5;
        console.log(statsPanel);
        panel.add(close = new SlickUI.Element.Button(panel.width-30,0, 30,30));
        close.add(new SlickUI.Element.Text(0,0, "X")).center();
        

        close.events.onInputDown.add(function () {
            game.paused=false;
            game.add.tween(panel).to( {alpha: 0}, 200, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible=false;

            });
            slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        }, this);


        slickUI.add(menuButton = new SlickUI.Element.DisplayObject(game.width - 50, 10, game.make.sprite(0, 0, 'menu-button')));
        menuButton.inputEnabled = true;
        menuButton.input.useHandCursor = true;

        menuButton.events.onInputDown.add(function () {
            if(panel.visible)
                return;
            panel.container.children[0].value=player.stats.path+" "+player.stats.level;
            statsPanel.container.children[0].value="MaxHP "+player.stats.maxHp;
            statsPanel.container.children[1].value="Damage "+player.stats.damage;
            statsPanel.container.children[2].value="Attack Speed "+player.stats.attackSpeed;

            panel.visible=true;
            slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
            game.add.tween(panel).to( {alpha: 1}, 200, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                //game.paused=true;
            });
            
        }, this);



}

function initBackgroundParalax(){
    paralaxBackground=[];

    var paralax = game.add.tileSprite(0, 0, 272,160, 'back-trees');
    paralax.speed=BACKGROUND_PARALAX_SPEED1;
    paralax.scale.setTo(scale,scale);

    paralaxBackground.push(paralax);

    paralax = game.add.tileSprite(0, 0, 272,160, 'lights');
    paralax.speed=BACKGROUND_PARALAX_SPEED2;
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


function playerAutoAttack(anim, frame){
    if(monk.nakedFists.level>0)
        monk.nakedFists.use();
    target.stats.hp-=player.stats.damage;
    if(target.alive&&target.stats.hp<=0){
        enemyDeath(target);
    }
}

function enemyAutoAttack(){
    player.stats.hp-=enemyStats.damage;
    if(player.alive&&player.stats.hp<=0){
        playerDeath();
    }
}

function spawnEnemy(){
    if(gameState.enemiesLive+gameState.enemiesDead>=gameState.enemiesMax)
        return;
    gameState.enemiesLive++;
    var enemy=game.add.sprite(-32*scale,gameHeight-15*scale,'goblin_peasant');

    enemy.stats={};
    for (var key in enemyStats) {
        enemy.stats[key] = enemyStats[key];
    }
    enemy.anchor.setTo(0,1);
    enemy.scale.setTo(scale,scale);

    enemy.animations.add('walk', [1, 2, 3, 4, 5, 6], 5, true);
    var punch=enemy.animations.add('punch', [10,27,28], enemy.stats.attackSpeed, true);
    punch.onLoop.add(enemyAutoAttack,this);
    enemy.animations.play('walk');
    enemyPool.add(enemy);
}

function playerDeath(){
    player.kill();
    console.log("YOU ARE DEAD!!!")
}

function enemyDeath(enemy){
    enemy.kill();
    gameState.enemiesLive--;
    gameState.enemiesDead++;
    gainExp(enemy.stats.exp);
    var corpse=game.add.sprite(target.x-20,target.y,'goblin_peasant_corpse');
    corpse.anchor.setTo(0,1);
    corpse.scale.setTo(scale,scale);
    corpse.animations.add('die', [7,8], 5, false);
    corpse.animations.play('die');
    corpse.checkWorldBounds = true;
    corpse.outOfBoundsKill = true;
    corpsePool.add(corpse);
}


function drawPlayerHpBar(){
    
    playerHpBarFrame.clear();
    playerHpBarFrame.lineStyle(24, 0xaa5533);
   
    playerHpBarFrame.moveTo(0, 0);  
    playerHpBarFrame.lineTo(204, 0);

    playerHpBar.clear();
    playerHpBar.lineStyle(20, 0xaa2222);
   
    playerHpBar.moveTo(0, 0);  
    playerHpBar.lineTo(200*player.stats.hp/player.stats.maxHp, 0);
    enemyHpLabel.text=player.stats.hp;
    

}

function drawPlayerExpBar(){
    playerExpBar.clear();
    playerExpBar.lineStyle(10,0x996611);

    playerExpBar.moveTo(0,0);
    playerExpBar.lineTo(game.camera.width*player.stats.exp/(player.stats.level*EXP_MODIFIER),0);
}

function gainExp(amount){
    console.log("Next level on "+EXP_MODIFIER*player.stats.level);
    console.log("Player exp "+player.stats.exp);
    player.stats.exp+=amount;
    while(player.stats.exp>=EXP_MODIFIER*player.stats.level){
        player.stats.exp-=EXP_MODIFIER*player.stats.level;
        levelUp();
    }
    drawPlayerExpBar();
}

function levelUp(){
    console.log("LEVEL UP!");
    if(player.stats.level==1)
        choosePath();
    player.stats.level++;
}

function choosePath(){
    if(player.stats.path!="none")
        return;
    statsUI();
    var pathPanel;
    var monk;

    var frame=game.make.sprite(0, 0, 'frame');
    frame.scale.x=0.1*scale;
    frame.scale.y=0.1*scale;
    var monkPath=game.make.sprite(0, 0, 'path-monk');
    monkPath.scale.x=0.1*scale;
    monkPath.scale.y=0.1*scale;

    slickUI.add(pathPanel = new SlickUI.Element.Panel(10, 10, game.width - 20, game.height - 20));
    pathPanel.add(title=new SlickUI.Element.Text(10,0, "Choose Your Path")).centerHorizontally().text.alpha = 0.5;



    pathPanel.add(monk = new SlickUI.Element.DisplayObject(10, 20,monkPath ));
    pathPanel.add(monkFrame = new SlickUI.Element.DisplayObject(10, 20,frame ));

    pathPanel.alpha=0;
    game.add.tween(pathPanel).to( {alpha: 1}, 500, Phaser.Easing.Exponential.Out, true);
    monk.inputEnabled=true;
    monk.input.useHandCursor = true;

    monk.events.onInputOver.add(function(){
        title.value="Monk";
        title.centerHorizontally();
        monk.alpha=0.5;
    }, this);

    monk.events.onInputOut.add(function(){
        title.value="Choose Your Path";
        title.centerHorizontally();
        monk.alpha=1;
    }, this);

    monk.events.onInputDown.add(function(){
        if(player.stats.path!="none")
            return;
        console.log("MONK!");
        monkChoosed();
        game.add.tween(pathPanel).to( {alpha: 0}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                pathPanel.visible = false;

        });
    }, this);

}

function monkChoosed(){
    player.stats.path="monk";
    player.stats.maxSpirit=100;
    game.time.events.loop(Phaser.Timer.SECOND/5, function(){
        if(player.stats.spirit==player.stats.maxSpirit)
            return;
        player.stats.spirit+=1;
        if(player.stats.spirit>player.stats.maxSpirit)
            player.stats.spirit=player.stats.maxSpirit;
        console.log("Spirit "+player.stats.spirit)
    }, this);
}