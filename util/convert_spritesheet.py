#!/usr/bin/env python

import sys
import json
import os.path

texture_file = sys.argv[1]


def load_textureatlas(filename):
    from lxml import etree
    tree = etree.parse(filename)
    root = tree.getroot()
    sprites = {}
    fields = 'x,y,width,height'.split(',')
    for subtexture in root:
        attrs = subtexture.attrib
        dims = [int(attrs[field]) for field in fields]
        name, _ = os.path.splitext(attrs['name'])
        sprites[name] = dims

    png_file, _ = os.path.splitext(filename)
    png_file = png_file + ".png"
    return {'sprites': sprites, 'filename': png_file}

spritesheet = load_textureatlas(texture_file)

sprites_json = json.dumps(spritesheet)
print "Game.spritesheets.push(" + sprites_json + ");"
