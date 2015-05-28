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
                image: "ryu",
                width:27,
                height: 36,
                spritewidth: "27",
                spriteheight: "36",
                getShape: function(){
                    return(new me.Rect(0, 0, 27, 36)).toPolygon();
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
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [1, 2, 3, 4], 80);
        this.renderable.addAnimation("attack", [9, 10, 11], 80);
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
        if(response.b.type==='player2'){
            this.collideWithPlayer2(response);
        }else if(response.b.type==='player3'){
            this.collideWithPlayer3(response);
        }
    },
    collideWithPlayer2: function(response){
        response.b.loseHealth(game.data.playerAttack);
    },
    collideWithPlayer3: function(response){
        response.b.loseHealth(game.data.playerAttack);
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
                image: "ryu",
                width:27,
                height: 36,
                spritewidth: "27",
                spriteheight: "36",
                getShape: function(){
                    return(new me.Rect(0, 0, 27, 36)).toPolygon();
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
        this.renderable.addAnimation("idle", [18]);
        this.renderable.addAnimation("walk", [19, 20, 21, 22], 80);
        this.renderable.addAnimation("attack", [27, 28, 29], 80);
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
        }else if(response.b.type==='player3'){
            this.collideWithPlayer3(response);
        }
    },
    collideWithPlayer1: function(response){
        response.b.loseHealth(game.data.playerAttack);
    },
    collideWithPlayer3: function(response){
        response.b.loseHealth(game.data.playerAttack);
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
game.Player3Entity = me.Entity.extend({
    init: function(x, y, settings){
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "player3";
        this.setFlags();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y){
        this._super(me.Entity, 'init', [x, y, {
                image: "player3",
                width:32,
                height: 32,
                spritewidth: "32",
                spriteheight: "32",
                getShape: function(){
                    return(new me.Rect(0, 0, 32, 32)).toPolygon();
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
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [1, 3, 2, 3, 0], 80);
        this.renderable.addAnimation("attack", [80, 81], 80);
        this.renderable.addAnimation("sideattack", [5], 80);
        this.renderable.addAnimation("roll", [6, 7, 8, 9, 10], 80);
        this.renderable.addAnimation("crouch", [4], 80);
        this.renderable.addAnimation("fire", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], 10);
        this.renderable.addAnimation("downattack", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70, 67, 68, 69, 70], 20);
        this.renderable.addAnimation("downspecial", [101], 80);
        this.renderable.addAnimation("downsmash", [121, 122], 40);
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
        this.crouch = me.input.isKeyPressed("P2DOWN");
        this.attacking = me.input.isKeyPressed("P2ATTACK");
        this.downattack = me.input.isKeyPressed("P2DOWN")&& me.input.isKeyPressed("P2ATTACK");
        this.rightattack = me.input.isKeyPressed("P2RIGHT")&& me.input.isKeyPressed("P2ATTACK");
        this.leftattack = me.input.isKeyPressed("P2LEFT")&& me.input.isKeyPressed("P2ATTACK");
        this.special = me.input.isKeyPressed("P2SPECIAL") && me.input.isKeyPressed("P2DOWN");
        this.sidespecial = me.input.isKeyPressed("P2SPECIAL") && me.input.isKeyPressed("P2SIDE");
        this.downsmash = me.input.isKeyPressed("P2SPECIAL") && me.input.isKeyPressed("P2DOWN") && me.input.isKeyPressed("P2ATTACK");
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
        if(this.crouch){
            this.renderable.setCurrentAnimation("crouch");
        }
        if(this.downattack){
            this.renderable.setCurrentAnimation("downattack");
        }
        if(this.rightattack){
            this.renderable.setCurrentAnimation("sideattack");
        }
        if(this.leftattack){
            this.renderable.setCurrentAnimation("sideattack");
        }
        if(this.special){
            this.renderable.setCurrentAnimation("downspecial");
        }
        if(this.sidespecial){
            this.renderable.setCurrentAnimation("fire");
        }
        if(this.downsmash){
            this.renderable.setCurrentAnimation("downsmash");
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
        response.b.loseHealth(game.data.playerAttack);
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
    