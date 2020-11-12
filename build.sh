#!/bin/sh

RUN_IN() {
  CWD="`pwd`"
  cd "$2"
  eval $1 || exit 1
  cd "$CWD"
}

PRINT() {
  echo "\n$1"
}

NPM=${NPM:="npm --registry=https://registry.npm.taobao.org"}


PRINT "COPY CONFIG FIEL"
RUN_IN "copy config.example.ts config.ts" "../backend"

PRINT "install backend module"
RUN_IN "$NPM install" "../backend"

PRINT "install frontend module"
RUN_IN "$NPM install" "../frontend"


