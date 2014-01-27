Game = {
    map_grid: {
        width: 100, 
        height: 5,
        tile: {
            height: 70,
            width: 70
        }
    },
    spritesheets: [],
    reels: {},

    start: function() {
        Crafty.init();
        Crafty.background("url('http://tcbxyz.com/game/assets/images/ufo_background.jpg')");
        Crafty.scene("loading");
    }
};
