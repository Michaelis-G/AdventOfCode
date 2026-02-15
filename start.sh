#!/usr/bin/zsh

base=$(dirname $0)

if [[ ${#} < 2 ]]; then
    echo "usage: start.sh yyyy dd"
    exit 1
fi

if ! [[ $1 =~ "^[0-9]{4}$" && $2 =~ "^[0-9]{2}$" ]]; then
    echo "first arg must be 4 digits, second must be 2 digits"
    exit 2
fi

template=${base}"/template.js"
if ! [ -f ${template} ]; then
    echo "Template file missing"
    exit 3
fi

# new year => create directories
if ! [ -f "${base}/${1}" ]; then 
    mkdir -p ${base}/${1}/data
fi

script="${base}/${1}/${2}.js"
if [ -f ${script} ]; then
    echo "Script already exists";
else
    echo "Create script"
    cp ${template} ${script}
    sed -i -e "s/YYYY/${1}/g" ${script}
    sed -i -e "s/DD/${2}/g" ${script}
fi
data="${base}/${1}/data/${2}"
if [ -f ${data} ]; then
    echo "Data already exists";
else
    echo "Create data file"
    touch ${data}
fi
testData="${base}/${1}/data/${2}.test"
if [ -f ${testData} ]; then
    echo "Test data already exists";
else
    echo "Create test data"
    touch ${testData}
fi
exit 0