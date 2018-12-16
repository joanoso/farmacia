#!/bin/bash

currDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")

## Comandos base
_mvn="mvn"
_npm=$currDir"/webapp/node/node_modules/npm/bin/npm"
_node=$currDir"/webapp/node/node"
_webpack=$currDir"/webapp/node_modules/webpack/bin/webpack.js"
_colorize=$currDir"/bin/colorize.sh"

## Parametros
_webDir=$currDir"/web"
_webappDir=$currDir"/webapp"

## init script

function _info {
    echo -e "\e[90m"$1"\e[39m"
}

intexit() {
    # Kill all subprocesses (all processes in the current process group)
    kill -HUP -$$
}

hupexit() {
    # HUP'd (probably by intexit)
    _info
    _info
    _info "Bye!"
    exit
}

function _exists {
    if ! [ -x "$(command -v $1)" ]; then
      _info 'Error: '$1' is not installed.' >&2
      exit 1
    fi
}

function separator {
    _info  "================================================================================"
}

function info {
    _info
    separator
    _info "Webpack en modo watch"
    _info "Si tiene problemas, ejecute 'mvn clean install'"
    separator
    _info
}

function startSystem {
    separator;
    _info "Starting system ...";

    cd $_webDir
    $_mvn spring-boot:run 2>&1
    cd ..
}

### $_node $_webpack --watch
function startWatch {
    (
        separator;
        _info "Starting watch ...";
        _info $_npm;
        cd $_webDir
        $_npm -version
        cd ..
    )&
    (
        sleep 60;
        info
    )
}

trap hupexit HUP
trap intexit INT

_exists $_mvn
_exists $_npm
_exists $_node
_exists $_webpack


### Analisis de parametros
if [[ -z $@ ]]
then
    _default="true"
    _info "Default runleven selected"

else
    for i in "$@"
    do
    case $i in
        ## Ejemplo parametro comun
        #-e|--extension)
        #EXTENSION="$2"
        #shift # past argument
        #;;
        ## Ejemplo parametro con valor
        #-e=*|--extension=*)
        #EXTENSION="${i#*=}"
        #shift # past argument=value
        #;;

        system|-s)
        _systemRunlevel="true"
        _info "System runlevel"
        shift # past argument
        ;;

        watch|-w)
        _watchRunlevel="true"
        _info "Watch runlevel"
        shift # past argument
        ;;

        *)
            _info "Error al pasar parametros"
            _info
            _info "Argumentos posibles:"
            _info "system, -s:\t\tEjecuta solo el sistema"
            _info "watch, -w:\t\tEjecuta solo watch"
            exit 1
        ;;
    esac
    done
fi

if [ "$_default" == "true" ] || [ "$_systemRunlevel" == "true" ]
then

    _startingSystem="true"
    startSystem
fi

if [ "$_default" == "true" ] || [ "$_watchRunlevel" == "true" ]
then
    if [ "$_startingSystem" == "true" ]
    then
        # Hace la espera solo si esta corriendo el sistema
        sleep 20
    fi

    startWatch
fi

wait
