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
    dude = Crafty.e("Dude").at(5, 5);
    
    //Crafty.viewport.centerOn(dude, 2); 
    //Crafty.viewport.follow(dude, 0, 0); 
    for (i = 0; i < Game.map_grid.width; i++) {
        Crafty.e("Platform").at(i, 20);
        Crafty.e("Platform").at(i, Math.floor(Math.random() * 7 + 10));
    }
    Crafty.viewport.follow(dude, 0, 0); 
});
