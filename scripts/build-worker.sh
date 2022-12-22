#!/usr/bin/env bash

# Ensure the build/gen directory is there.
mkdir -p ./build/gen

# Build the filter worker and put it in the build/gen file.
# Use the optimize flag because it's going to be a production build.
npx elm make ./src/FilterWorker.elm --optimize --output ./build/gen/filter-worker-elm.js

#/usr/local/opt/icu4c/bin/uconv -f utf-8 -t US-ASCII --callback escape-xml-dec --output ./build/gen/filter-worker-elm.js.tmp ./build/gen/filter-worker-elm.js
#cp ./build/gen/filter-worker-elm.js.tmp ./build/gen/filter-worker-elm.js

cat ./build/gen/filter-worker-elm.js | scripts/unicode-escape.py > ./build/gen/filter-worker-elm.js.tmp
cp ./build/gen/filter-worker-elm.js.tmp ./build/gen/filter-worker-elm.js

# Add some new lines to the compiled elm (JavaScript) so we can put the 2 files
# together it easy to see where 1 starts and the other ends.
printf "\n\n" >> ./build/gen/filter-worker-elm.js

# Concatenate the compiled Elm (JavaScript) and the JavaScript
# for initiating the Elm app and handing the ports. Make sure
# the compiled Elm comes first.
cat ./build/gen/filter-worker-elm.js ./src/filter-worker.js > ./build/gen/filter-worker.js

# There's a friendly elm error message that contains back ticks, that screws up ability
#  to put all this generated code inside of an HTML template string that's delenated by backticks
#  to the backticks must go
cat ./build/gen/filter-worker.js | tr -d '`' > ./build/gen/filter-worker.js.tmp
cp ./build/gen/filter-worker.js.tmp ./build/gen/filter-worker.js

# We don't need "just" the compiled elm (JavaScript) for the filter worker any more so
#  lets clean up after our selves.
rm ./build/gen/filter-worker-elm.js
