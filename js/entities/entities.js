game.Player1Entity = me.Entity.extend({
    init: function(x, y, settings){
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "player1";
        this.setFlags();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y){
        this._super(me.Entity, 'init', [x, y, {
                image: "player1",
                width:64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
    },
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function(){
        this.facing = "right";
        this.dead = false;
    },
    addAnimation: function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
        this.renderable.addAnimation("attack", [91, 91, 93, 94, 95, 96, 97, 98], 80);
    },
    update: function(delta){
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function(){
        if(this.health <= 0){
            return true;
        }
        return false;
    },
    checkKeyPressesAndMove: function(){
        if(me.input.isKeyPressed("P1RIGHT")){
            this.moveRight();
        }else if(me.input.isKeyPressed("P1LEFT")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
        if(me.input.isKeyPressed("P1UP") && !this.body.jumping && !this.body.falling){
            this.jump();
        }
        this.attacking = me.input.isKeyPressed("P1ATTACK");
    },
    moveRight: function(){
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(false);
    },
    moveLeft: function(){
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(false);
    },
    jump: function(){
        this.body.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    setAnimation: function(){
        if(this.attacking){
            if(!this.renderable.isCurrentAnimation("attack")){
                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }else if(this.body.vel.x !==0 && !this.renderable.isCurrentAnimation("attack")){
            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
    },
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    collideHandler: function(response){
        if(response.b.type==='player2'){
            this.collideWithPlayer2(response);
        }
    },
    collideWithPlayer2: function(response){
        var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            this.stopMovement(xdif);
            if(this.checkAttack(xdif, ydif)){
                this.hitPlayer2(response);
            };
    },
    stopMovement: function(xdif){
        if(xdif>0){
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
                if(this.facing==="right"){
                    this.body.vel.x = 0;
                }
            }
    },
    checkAttack: function(xdif, ydif){
        if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.attackTimer
                    && (Math.abs(ydif) <40)  && 
                    (((xdif>0 ) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;
                return true;
            }
        return false;
    }
});
    
game.Player2Entity = me.Entity.extend({
    init: function(x, y, settings){
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "player2";
        this.setFlags();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y){
        this._super(me.Entity, 'init', [x, y, {
                image: "player2",
                width:64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
    },
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function(){
        this.facing = "left";
        this.dead = false;
    },
    addAnimation: function(){
        this.renderable.addAnimation("idle", [26]);
        this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
        this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200], 80);
    },
    update: function(delta){
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function(){
        if(this.health <= 0){
            return true;
        }
        return false;
    },
    checkKeyPressesAndMove: function(){
        if(me.input.isKeyPressed("P2RIGHT")){
            this.moveRight();
        }else if(me.input.isKeyPressed("P2LEFT")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
        if(me.input.isKeyPressed("P2UP") && !this.body.jumping && !this.body.falling){
            this.jump();
        }
        this.attacking = me.input.isKeyPressed("P2ATTACK");
    },
    moveRight: function(){
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(false);
    },
    moveLeft: function(){
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(true);
    },
    jump: function(){
        this.body.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    setAnimation: function(){
        if(this.attacking){
            if(!this.renderable.isCurrentAnimation("attack")){
                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }else if(this.body.vel.x !==0 && !this.renderable.isCurrentAnimation("attack")){
            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
    },
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    collideHandler: function(response){
        if(response.b.type==='player1'){
            this.collideWithPlayer1(response);
        }
    },
    collideWithPlayer1: function(response){
        var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            this.stopMovement(xdif);
            if(this.checkAttack(xdif, ydif)){
                this.hitPlayer2(response);
            };
    },
    stopMovement: function(xdif){
        if(xdif>0){
            if(this.facing==="left"){
                this.body.vel.x = 0;
            }
        }else{
            if(this.facing==="right"){
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function(xdif, ydif){
        if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.attackTimer
                    && (Math.abs(ydif) <40)  && 
                    (((xdif>0 ) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;
                return true;
            }
        return false;
    }
});
    