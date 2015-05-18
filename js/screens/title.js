game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title')), -10);

        game.data.option1 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 12, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "TURBO SUPER SMASH BROS ALL STARS BATTLE ROYAL AT THE OLYMPIC GAMES HD REMIX AND KNUCKLES", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.PLAY);
            }
        }));
    },
    onDestroyEvent: function() {

    }
});
