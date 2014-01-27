Game = {
    map_grid: {
        width: 100,
        height: 100,
        tile: {
            height: 70,
            width: 70
        }
    },
    viewport: {
        min: {x: 0, y:0},
        max: {x: 1600, y:900}
    }, 
    spritesheets: [],
    reels: {},

    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function() {
        Crafty.init(1200, 600);
        Crafty.background('#222');
        Crafty.scene("loading");
    }
};
