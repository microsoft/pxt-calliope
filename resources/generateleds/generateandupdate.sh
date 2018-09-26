# Run the generate script
node generateleds.js

# Copy the generated led png files into the right directory
cp -R out/*.png ../../libs/core/jres/icons/

# Rebuilt the jres with those new files
cd ../../libs/core
pxt jres

# Return back to generateleds directory
cd ../../resources/generateleds
