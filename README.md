Labs - Cordova.js
=================

## Pre-requisites

### Download and install ADT in `/opt/adt-bundle`
http://developer.android.com/sdk/index.html#download

### Set follow env in ~/.bashrc or ~/.profile:
```shell
# Android ADT BUNDLE
export ANDROID_HOME="/opt/adt-bundle"
PATH="$PATH:$ANDROID_HOME:$ANDROID_HOME/sdk/tools:$ANDROID_HOME/sdk/platform-tools"
```

### Node.js global modules
```shell
$ npm install -g cordova bower
```

### Open Android SDK Manager (android) and install
```
`Android 2.2 / SDK Platform and Google APIs` (target-8)
`Android 4.4.2 / Google APIs (x86 System Image)` (Google Inc.:Google APIs:19)
`Android 4.4.2 / Google APIs (ARM System Image)`
`Extras / Google Play Services`
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

## Debuggin
```shell
in ripple:
grunt serve

in google chrome:
open chrome://inspect

in terminal:
$ adm shell
shell@ghost:/ $ logcat | grep :CONSOLE
```

