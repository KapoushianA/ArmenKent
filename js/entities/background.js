game.background = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "background",
                width:1400,
                height:700,
                spritewidth:"1400",
                spriteheight:"700",
                getShape: function(){
                    return (new me.Rect(0, 0, 1400, 700)).toPolygon();
                }
        }]);
    }
});

