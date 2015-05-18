var game = {
    data: {
        score: 0,
        player1: "",
        player2: "",
        playerHealth: 1000,
        playerPunch: 10,
        playerKick: 15,
        punchTimer: 100,
        kickTimer: 100,
        pausePos: "",
        pausescreen: "",
        pausetext: ""
    },
    "onload": function() {
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, '1.0')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }
        me.audio.init("mp3,ogg");

        me.loader.onload = this.loaded.bind(this);

        me.loader.preload(game.resources);

        me.state.change(me.state.LOADING);
    },
    "loaded": function() {
        me.pool.register("player1", game.Player1, true);
        me.pool.register("player2", game.Player2, true);
        me.pool.register("GameManager", game.GameManager);

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.state.change(me.state.PLAY);
    }
};
