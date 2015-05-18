game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
        }
        return true;
    },
    gameOver: function(win) {
        this.gameover = true;
        me.save.exp = game.data.exp;
        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("Fail");
                });
    }
});

game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        return true;
    },
    
    goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 500)){
            this.lastCreep = this.now;
            var creep = me.pool.pull("EnemyCreep", 27500, 0, {});
            var creepe = me.pool.pull("PlayerCreep", 100, 0, {});
            me.game.world.addChild(creepe, 5);
            me.game.world.addChild(creep, 5);
        }
    }
});
game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        //updates it
        this.alwaysUpdate = true;
    }, 
    
    update: function(){
        //checks if player/players is dead
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.game.world.removeChild(game.data.MiniPlayerLocation);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player2.dead){
            me.game.world.removeChild(game.data.player2);
            me.game.world.removeChild(game.data.MiniPlayerLocation);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player3.dead){
            me.game.world.removeChild(game.data.player3);
            me.game.world.removeChild(game.data.MiniPlayerLocation);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player4.dead){
            me.game.world.removeChild(game.data.player4);
            me.game.world.removeChild(game.data.MiniPlayerLocation);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player5.dead){
            me.game.world.removeChild(game.data.player5);
            me.game.world.removeChild(game.data.MiniPlayerLocation);
            me.state.current().resetPlayer(10, 0);
        }
        
        return true;
    }
});
