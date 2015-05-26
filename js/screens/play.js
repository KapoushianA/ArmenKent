game.PlayScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //shows what stage is gonna be loaded
                me.levelDirector.loadLevel("map1");
                //resets the player's location
                game.data.player1 = me.pool.pull("player1", 0, 420, {});
                me.game.world.addChild(game.data.player1, 5);
                game.data.player3 = me.pool.pull("player3", 950, 420, {});
                me.game.world.addChild(game.data.player3, 5);
                //takes out info from gameTimerManager
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                game.gameover = false;
                
                //sets the keys to set an output when the key is pressed
                me.input.bindKey(me.input.KEY.A, "P1LEFT");
                me.input.bindKey(me.input.KEY.S, "P1DOWN");
                me.input.bindKey(me.input.KEY.W, "P1UP");
                me.input.bindKey(me.input.KEY.D, "P1LEFT");
                me.input.bindKey(me.input.KEY.LEFT, "P2LEFT");
                me.input.bindKey(me.input.KEY.RIGHT, "P2RIGHT");
                me.input.bindKey(me.input.KEY.UP, "P2UP");
                me.input.bindKey(me.input.KEY.DOWN, "P2DOWN");
                me.input.bindKey(me.input.KEY.V, "P1ATTACK");
                me.input.bindKey(me.input.KEY.B, "P1SPECIAL");
                me.input.bindKey(me.input.KEY.ENTER, "P2SPECIAL");
                me.input.bindKey(me.input.KEY.SHIFT, "P2ATTACK");
                me.input.bindKey(me.input.KEY.ESC, "leave");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
                
//                me.audio.playTrack("gamebackground");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
//            game.data.player1 = me.pool.pull("player1", 0, 420, {});
//            me.game.world.addChild(game.data.player1, 5);
//            
//            game.data.player2 = me.pool.pull("player2", 0, 420, {});
//            me.game.world.addChild(game.data.player2, 5);
        }
        
});
