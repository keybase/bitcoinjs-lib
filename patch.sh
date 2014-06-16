#!/bin/sh

# Run this on fresh checkout for our patches...

FIND="require('bigi')"
REPLACE="require('bn').BigInteger"
regex="s/${FIND}/${REPLACE}/"

find test src -type f -regex '.*\.js' -exec sed -i.bak ${regex} {} \;
find test src -type f -regex '.*\.js.bak' -exec rm {} \;

FIND="require('ecurve')"
REPLACE="require('keybase-ecurve')"
regex="s/${FIND}/${REPLACE}/"

find test src -type f -regex '.*\.js' -exec sed -i.bak ${regex} {} \;
find test src -type f -regex '.*\.js.bak' -exec rm {} \;
