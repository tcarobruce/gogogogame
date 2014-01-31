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
        this.requires("Actor, Twoway, Gravity, Collision, SpriteAnimation, p1_stand")
            .twoway(10, 12)
            .stopOnSolids()
            .directionFacing()
            .gravity("Tile")
            .gravityConst(Game.world.gravity)
            .reel("p1_walk", 1000, Game.reels.p1_walk);
    },

    directionFacing: function() {
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.animate("p1_walk", -1);
                if (this._flipX) {
                    this.unflip("X");
                }
            } else if(data.x < 0) {
                this.animate("p1_walk", -1);
                if (!this._flipX) {
                   this.flip("X");
                }
            } else {
            } 
        });
        return this;
    },

    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    stopMovement: function() {
        if (this._movement) {
            this.x -= this._movement.x;
            if (this.hit('Solid')) {
                this.y += this._jumpSpeed;
                this._up = false;
            }
        } else {
            this._speed = 0;
        }
    }
});

Crafty.c("Tile", {
    init: function() {
        this.requires("Actor, Solid");
    }
});
Crafty.c("Grass", {
    init: function() {
        this.requires("Tile, grassMid");
    }
});
Crafty.c("Lava", {
    init: function() {
        this.requires("Tile, liquidLavaTop_mid");
    }
});
Crafty.c("Snow", {
    init: function() {
        this.requires("Actor, Solid, snowMid");
    }
});
Crafty.c("Log", {
    init: function(message) {
        var dude = Crafty("Dude");
        this.requires("2d, Canvas, Text")
            .attr({x: dude.x + 20, y: dude.y + 80})
            .textColor("#ffffff", 1);
    }
});
