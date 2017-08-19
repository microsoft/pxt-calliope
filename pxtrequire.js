/// <reference path="../node_modules/pxt-core/typings/globals/node/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
"use strict";
var path = require("path");
exports.pxtCore = require("pxt-core");
// require.resolve() gives path to [pxt dir]/built/pxt.js, so move up twice to get pxt root dir
exports.pxtCoreDir = path.resolve(require.resolve("pxt-core"), "..", "..");
