#!/bin/sh
HOST='18.213.248.143'
USER='bbiweb'
PASSWD='c3513aI092Of00T'
FILE='./*.js'
FILE2='./*.html'
FILE3='./*.css'

ftp -inv $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
cd ./front/front
delete *.js
delete *.html
lcd ./dist/front/
mput $FILE -v
mput $FILE2 -v
mput $FILE3 -v
quit
END_SCRIPT
exit 0
