#!/bin/bash

export currentpath=$PWD
echo $currentpath
export output
for  i in $(yarn cache dir); do 
    echo $i
    export output=$i
    cd $output
    DataList=".tmp*,*shared-*,*adk-*,*authentication*"
    Field_Separator=$IFS
    IFS=,
    for G in $DataList; do 
        find . -maxdepth 1 -type d  -name "$G" -exec rm -rf {} \;
        echo "$G"
    done
done