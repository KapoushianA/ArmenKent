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
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player1);;
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player2.dead){
            me.game.world.removeChild(game.data.player2);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});
