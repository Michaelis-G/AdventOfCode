#!/usr/bin/zsh

if [[ ${#} < 2 ]]; then
    echo "no parameters"
    exit 1
fi

if ! [[ $1 =~ "^[0-9]{4}$" ]]; then
    echo "first arg must be 4 digits"
    exit 2
fi

if ! [[ $2 =~ "^[0-9]{2}$" ]]; then
    echo "second arg must be 2 digits"
    exit 3
fi

script="${1}-${2}.js"
data="./data/${1}-${2}"
testData="./data/${1}-${2}.test"
echo "${testData}"
exit 0