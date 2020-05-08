#!/usr/bin/env sh

CMD=$1
FN_LOADED=.loaded

case $CMD in

clean)

if [ -f $FN_LOADED ]; then
rm lunch-api/db.sqlite3
rm $FN_LOADED
else
echo Already clean
fi
;;


test)

docker-compose run --rm api ./manage.py test
;;


start|*)

if [[ ! -f $FN_LOADED ]]
then
docker-compose run --rm api ./manage.py migrate
docker-compose run --rm api ./manage.py loaddata initial.json
touch $FN_LOADED
fi
docker-compose up

esac