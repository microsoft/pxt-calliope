# micro:bit target for PXT



pxt-calliope is a [Microsoft Programming Experience Toolkit (PXT)](https://github.com/Microsoft/pxt) target that allows you to program a [Calliope mini](https://calliope.cc/en). 


* [Try it live](https://makecode.calliope.cc/)

## Issue tracking

Please add an issue if you discover an (unreported) bug.

## Developing new extensions

Authoring and testing of new extensions can be done directly from the web editor. See [our documentation](https://makecode.com/blog/github-packages) on how to get started. If you want to run the editor locally, keep reading.

## Local server setup

The local server lets you to run the editor and serve the documentation from your own computer. It is meant for a single developer used and not designed to serve the editor to a large amount of users.

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Clone this repository.
```
git clone https://github.com/microsoft/pxt-calliope
cd pxt-calliope
```
3. Install the PXT command line (add `sudo` for Mac/Linux shells).
```
npm install -g pxt
```
4. Install the pxt-calliope dependencies.
```
npm install
```

Go to the **Running** section.

### Developer Setup

This is the typical setup used by the MakeCode team to work on the microbit.

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Install [Docker](https://www.docker.com/get-started) if you plan to build ``.cpp`` files.
3. Clone the pxt repository.
```
git clone https://github.com/microsoft/pxt
cd pxt
```
4. Install the dependencies of pxt and build it
```
npm install
npm run build
cd ..
```
5. Clone the pxt-common-packages repository
```
git clone https://github.com/microsoft/pxt-common-packages
cd pxt-common-packages
npm install
cd ..
```
6. Clone this repository.
```
git clone https://github.com/microsoft/pxt-calliope
cd pxt-calliope
```
7. Install the PXT command line (add `sudo` for Mac/Linux shells).
```
npm install -g pxt
```
8. Install the pxt-calliope dependencies.
```
npm install
```
8. Link pxt-calliope back to base pxt repo (add `sudo` for Mac/Linux shells). 
This step is only required if you intend to make changes to pxt and/or 
pxt-common-packages repos. If all you want is serve a local Makecode, you can skip
this step.
```
pxt link ../pxt
pxt link ../pxt-common-packages
```
Note the above command assumes the folder structure of   
```
       makecode
          |
  ----------------------------------
  |       |                        |
 pxt      pxt-common-packages  pxt-calliope
 ```

### Running

Run this command from inside pxt-calliope to open a local web server
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need to modify the `.cpp` files (and have installed yotta), enable yotta compilation using the `--localbuild` flag:
```
pxt serve --local
```

If you want to speed up the build, you can use the ``rebundle`` option, which skips building and simply refreshes the target information
```
pxt serve --rebundle
```

### Cleaning

Sometimes, your built folder might be in a bad state, clean it and try again.
```
pxt clean
```

### Updates

Make sure to pull changes from all repos regularly. More instructions are at https://github.com/Microsoft/pxt#running-a-target-from-localhost

## Update playlists in markdown

Get a Google API key and store it in the ``GOOGLE_API_KEY`` environment variables (turn on data from the app).

```
pxt downloadplaylists
```

## Repos 

The pxt-calliope target depends on several other repos. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/Microsoft/pxt-common-packages, common APIs accross various MakeCode editors
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal

## History

See the [MakeCode blog](https://makecode.com/blog).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

MICROSOFT, the Microsoft Logo, and MAKECODE are registered trademarks of Microsoft Corporation. They can only be used for the purposes described in and in accordance with Microsoft’s Trademark and Brand guidelines published at https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general.aspx. If the use is not covered in Microsoft’s published guidelines or you are not sure, please consult your legal counsel or MakeCode team (makecode@microsoft.com).
