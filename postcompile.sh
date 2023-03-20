#!/bin/bash

cp ./support/package.esm.json ./build/esm/package.json

cp -r ./build/esm/ ./build/esm-debug/

# console.debub 가 들어간 Line을 삭제한다 
# 두번째 "" 는 Mac OS 에서 sed -i 를 사용하기 위한 옵션
#sed -i "" '/debug(/d' ./build/esm/*.js
# sed -i '/debug(/d' ./build/esm/*.js