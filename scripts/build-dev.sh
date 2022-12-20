#!/usr/bin/env bash

# Ensure the build directory is there
mkdir -p ./build

# Do a dev build of the filter worker. This will result in a file
# which lives here: build/gen/filter-worker-dev.js
./scripts/build-worker-dev.sh

# Read in the generated file into a variable.
FILTER_WORKER_JS=$(<build/gen/filter-worker-dev.js)

# Here we have our little JavaScript template. This code should
#  mirror what we have else where. It would be great if this could
#  live in 1 place.
read -d '' tpl << EOF
const getMuchSelectTemplate = (styleTag) => {
  const templateTag = document.createElement("template");
  templateTag.innerHTML = \`
    <div>
      \${styleTag}
      <slot name="select-input"></slot>
      <div id="mount-node"></div>
      <script id="filter-worker" type="javascript/worker">
        %s
      </script>
    </div>
  \`;
  return templateTag;
};

export default getMuchSelectTemplate;
EOF

# Generate the muchSelectTemplate es6 module.
printf "$tpl" "$FILTER_WORKER_JS" > ./build/much-select-template.js

# Clean up. We do not need build/gen/filter-worker-dev.js any more
#  since all it contents have been put in /build/gen/much-select-template.js
#  so lets clean up after ourselves.
rm ./build/gen/filter-worker-dev.js

# We are all done with the gen directory, so lets clean that up too
rmdir ./build/gen

# Build much select as a ESM module and put the compiled JavaScript in elm-main.js
npx elm-esm make src/Main.elm --output=build/elm-main.js --debug

# There are more JavaScript files the sandbox site needs, let's copy those over
#  to the build directory
cp src/much-select.js build/much-select.js
cp src/ascii-fold.js build/ascii-fold.js
cp src/diacritics.js build/diacritics.js