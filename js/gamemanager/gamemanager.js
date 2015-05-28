game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        return true;
    }
});
game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    }, 
    
    update: function(){
//        if(game.data.player.dead){
//            me.game.world.removeChild(game.data.player1);;
//            me.state.current().resetPlayer(10, 0);
//        }else if(game.data.player2.dead){
//            me.game.world.removeChild(game.data.player2);
//            me.state.current().resetPlayer(10, 0);
//        }else if(game.data.player3.dead){
//            me.game.world.removeChild(game.data.player3);
//            me.state.current().resetPlayer(10, 0);
//        }
        return true;
    }
});
