#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n Gettysburg.AR/host.exp.exponent.MainActivity
