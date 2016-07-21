
var game = new Phaser.Game(272*2,160*2);//('100%', '100%');

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Architects Daughter']
    }

};

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('play',playState);
game.state.add('menu',menuState);

game.state.start('boot');