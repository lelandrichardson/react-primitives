#!/usr/bin/env bash

#######################################
# ONLY IF YOU DON'T HAVE Sketch.app,  #
# USE THIS SCRIPT TO INSTALL THE TOOL #
#######################################

mkdir temp
cd temp
curl -L -o sketch.zip http://www.sketchapp.com/download/sketch.zip
unzip -q sketch.zip
cd Sketch.app/Contents/Resources/sketchtool/
sh ./install.sh
cd ../../../../../
rm -Rf temp
