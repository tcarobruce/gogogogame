Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
    },

    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x / Game.map_grid.tile.width, 
                     y: this.y / Game.map_grid.tile.height };
        } else {
            this.attr({x: x * Game.map_grid.tile.width, 
                       y: y * Game.map_grid.tile.height });
            return this;
        }
    }
});
Crafty.c("Actor", {
    init: function() {
        this.requires("2D, Canvas, Grid");
    }
});

Crafty.c("Dude", {
    init: function() {
        this.facing = "right";
        this.requires("Actor, Twoway, Gravity, Collision, SpriteAnimation, p1_stand")
            .twoway(5, 7)
            .stopOnSolids()
            .gravity("Platform")
            .gravityConst(0.3)
            .reel("p1_walk", 1000, Game.reels.p1_walk);
    
        this.bind('NewDirection', function(data) {
            var staticComponents = "p1_stand,p1_jump";
            if (data.y > 0 || data.y < 0) {
                this.animate();
                dude.pauseAnimation();
                dude.resetAnimation();
            } else if (data.x > 0) {
                this.animate('p1_walk', -1);
                //dude.face("right");
                if (this.facing !== "right") {
                    this.flip("x");
                    this.facing = "right";
                }
            } else if (data.x < 0) {
                this.animate('p1_walk', -1);
                //dude.face("left");
                if (this.facing !== "left") {
                    this.flip("x");
                    this.facing = "left";
                }
            } else {
                dude.pauseAnimation();
                dude.resetAnimation();
            }
        });
    },

    face: function(direction) {
    },


    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    stopMovement: function() {
        if (this._movement) {
            this.x -= this._movement.x;
            if (this.hit('Solid') != false) {
                this.x += this._movement.x;
                this.y -= this._movement.y;
                if (this.hit('Solid') != false) {
                    this.x -= this._movement.x;
                    this.y -= this._movement.y;
                }
            }
        } else {
            this._speed = 0;
        }
    }
});

Crafty.c("Platform", {
    init: function() {
        this.requires("Actor, Solid, grassMid");
    }
});
