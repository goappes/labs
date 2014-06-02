Labs - Cordova.js
=================

## Pre-requisites
```shell
install SDK Platform target-8 (Android 2.2 - API 8) in ADM:
$ android
$ npm install -g cordova bower
```

## Clone project
```shell
$ git clone git@github.com:greenlizard/labs.git
```

## Build / install apk for debug
```shell
$ ./platforms/android/cordova/clean
$ cordova prepare android
$ cordova run --debug android
```

## Debuggin (enable settings / developer / USB debug)
```shell
in google chrome:
open chrome://inspect

in terminal:
$ adm shell
shell@ghost:/ $ logcat | grep :CONSOLE
```

