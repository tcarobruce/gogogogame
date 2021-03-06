Crafty.scene("loading", function() {
    var reel,
        files = [];
    Game.spritesheets.forEach(function(sheet) {
        files.push(sheet.filename);
    });
    Crafty.load(files, function () {
        var name, group, groups;
        Game.spritesheets.forEach(function(sheet) {
            Crafty.sprite(1, sheet.filename, sheet.sprites);

            for (spritename in sheet.sprites) {
                groups = spritename.match('(.*)([0-9]{2})$');
                if (groups) {
                    // This assumes sprites are in order
                    group = groups[1];
                    if (! Game.reels[group]) {
                       Game.reels[group] = [];
                    } 
                    Game.reels[group].push(sheet.sprites[spritename]); 
                }
            }
        });
        Crafty.scene("main");
    });
});

Crafty.scene("main", function() {
    var i;
    Game.log = function(message) { Crafty.e("Log").text(message); };
    dude = Crafty.e("Dude").at(0, 0);
    Crafty.e("Grass").at(0, 2);

    Crafty.addEvent(Crafty, Crafty.stage.elem, 'mousedown', function(e) {
        console.log(e.clientY);
        console.log(Crafty.viewport.bounds);
        if (Crafty.viewport.height - e.clientY < 50) {
            if (e.clientX > Crafty.viewport.width / 2) {
                dude._movement.x = Game.player.speed;
            } else {
                dude._movement.x = -Game.player.speed;
            }
        } else {
            dude._up = true;
	}
    });

    Crafty.addEvent(Crafty, Crafty.stage.elem, 'mouseup', function(e) {
        dude._movement.x = 0;
    });

    for (i = 0; i < Game.map_grid.width; i++) {
        Crafty.e("Lava").at(i, Game.map_grid.height);
	if (i > 0 && Math.random() < Game.world.block_frequency) {
            Crafty.e("Grass").at(i, Math.floor(Math.random() * Game.map_grid.height));
        }
    }
    Crafty.viewport.follow(dude, 0, 0); 
});
