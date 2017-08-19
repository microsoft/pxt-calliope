var pxt;
(function (pxt) {
    var editor;
    (function (editor) {
        /**
         * Binds incoming window messages to the project view.
         * Requires the "allowParentController" flag in the pxtarget.json/appTheme object.
         *
         * When the project view receives a request (EditorMessageRequest),
         * it starts the command and returns the result upon completion.
         * The response (EditorMessageResponse) contains the request id and result.
         * Some commands may be async, use the ``id`` field to correlate to the original request.
         */
        function bindEditorMessages(projectView) {
            if (!window.parent)
                return;
            window.addEventListener("message", function (msg) {
                var data = msg.data;
                if (!data || data.type != "pxteditor" || !data.action)
                    return false;
                var p = Promise.resolve();
                switch (data.action.toLowerCase()) {
                    // TODO: make async
                    case "switchjavascript":
                        p = p.then(function () { return projectView.openJavaScript(); });
                        break;
                    case "switchblocks":
                        p = p.then(function () { return projectView.openBlocks(); });
                        break;
                    case "startsimulator":
                        p = p.then(function () { return projectView.startSimulator(); });
                        break;
                    case "restartsimulator":
                        p = p.then(function () { return projectView.restartSimulator(); });
                        break;
                    case "hidesimulator":
                        p = p.then(function () { return projectView.collapseSimulator(); });
                        break;
                    case "showsimulator":
                        p = p.then(function () { return projectView.expandSimulator(); });
                        break;
                    case "stopsimulator": {
                        var stop_1 = data;
                        p = p.then(function () { return projectView.stopSimulator(stop_1.unload); });
                        break;
                    }
                    case "newproject": {
                        var create_1 = data;
                        p = p.then(function () { return projectView.newProject(create_1.options); });
                        break;
                    }
                    case "proxytosim": {
                        var simmsg_1 = data;
                        p = p.then(function () { return projectView.proxySimulatorMessage(simmsg_1.content); });
                        break;
                    }
                }
                p.done(function () { return sendResponse(data, true, undefined); }, function (err) { return sendResponse(data, false, err); });
                return true;
            }, false);
        }
        editor.bindEditorMessages = bindEditorMessages;
        function sendResponse(request, success, error) {
            window.parent.postMessage({
                type: "pxteditor",
                id: request.id,
                success: success,
                error: error
            }, "*");
        }
    })(editor = pxt.editor || (pxt.editor = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var storage;
    (function (storage) {
        var MemoryStorage = (function () {
            function MemoryStorage() {
                this.items = {};
            }
            MemoryStorage.prototype.removeItem = function (key) {
                delete this.items[key];
            };
            MemoryStorage.prototype.getItem = function (key) {
                return this.items[key];
            };
            MemoryStorage.prototype.setItem = function (key, value) {
                this.items[key] = value;
            };
            MemoryStorage.prototype.clear = function () {
                this.items = {};
            };
            return MemoryStorage;
        }());
        var LocalStorage = (function () {
            function LocalStorage(storageId) {
                this.storageId = storageId;
            }
            LocalStorage.prototype.targetKey = function (key) {
                return this.storageId + '/' + key;
            };
            LocalStorage.prototype.removeItem = function (key) {
                window.localStorage.removeItem(this.targetKey(key));
            };
            LocalStorage.prototype.getItem = function (key) {
                return window.localStorage[this.targetKey(key)];
            };
            LocalStorage.prototype.setItem = function (key, value) {
                window.localStorage[this.targetKey(key)] = value;
            };
            LocalStorage.prototype.clear = function () {
                var prefix = this.targetKey('');
                var keys = [];
                for (var i = 0; i < window.localStorage.length; ++i) {
                    var key = window.localStorage.key(i);
                    if (key.indexOf(prefix) == 0)
                        keys.push(key);
                }
                keys.forEach(function (key) { return window.localStorage.removeItem(key); });
            };
            return LocalStorage;
        }());
        function storageId() {
            var id = pxt.appTarget ? pxt.appTarget.id : window.pxtConfig ? window.pxtConfig.targetId : '';
            return id;
        }
        storage.storageId = storageId;
        var impl;
        function init() {
            if (impl)
                return;
            // test if local storage is supported
            var sid = storageId();
            var supported = false;
            // no local storage in sandbox mode
            if (!pxt.shell.isSandboxMode()) {
                try {
                    window.localStorage[sid] = '1';
                    var v = window.localStorage[sid];
                    supported = true;
                }
                catch (e) { }
            }
            if (!supported) {
                impl = new MemoryStorage();
                pxt.debug('storage: in memory');
            }
            else {
                impl = new LocalStorage(sid);
                pxt.debug("storage: local under " + sid);
            }
        }
        function setLocal(key, value) {
            init();
            impl.setItem(key, value);
        }
        storage.setLocal = setLocal;
        function getLocal(key) {
            init();
            return impl.getItem(key);
        }
        storage.getLocal = getLocal;
        function removeLocal(key) {
            init();
            impl.removeItem(key);
        }
        storage.removeLocal = removeLocal;
        function clearLocal() {
            init();
            impl.clear();
        }
        storage.clearLocal = clearLocal;
    })(storage = pxt.storage || (pxt.storage = {}));
})(pxt || (pxt = {}));
/// <reference path="../typings/globals/bluebird/index.d.ts"/>
/// <reference path="../localtypings/monaco.d.ts" />
/// <reference path="../built/pxtlib.d.ts"/>
var pxt;
(function (pxt) {
    var vs;
    (function (vs) {
        function syncModels(mainPkg, libs, currFile, readOnly) {
            if (readOnly)
                return monaco.Promise.as(undefined);
            var extraLibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs();
            var modelMap = {};
            var toPopulate = [];
            var definitions = {};
            mainPkg.sortedDeps().forEach(function (pkg) {
                pkg.getFiles().forEach(function (f) {
                    var fp = pkg.id + "/" + f;
                    var proto = "pkg:" + fp;
                    if (/\.(ts)$/.test(f) && fp != currFile) {
                        if (!monaco.languages.typescript.typescriptDefaults.getExtraLibs()[fp]) {
                            var content = pkg.readFile(f) || " ";
                            libs[fp] = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, fp);
                        }
                        modelMap[fp] = "1";
                        // store which files we need to populate definitions for the monaco toolbox
                        toPopulate.push({ f: f, fp: fp });
                    }
                });
            });
            // dispose of any extra libraries, the typescript worker will be killed as a result of this
            Object.keys(extraLibs)
                .filter(function (lib) { return /\.(ts)$/.test(lib) && !modelMap[lib]; })
                .forEach(function (lib) {
                libs[lib].dispose();
            });
            // populate definitions for the monaco toolbox
            var promises = [];
            toPopulate.forEach(function (populate) {
                var promise = populateDefinitions(populate.f, populate.fp, definitions);
                promises.push(promise);
            });
            return monaco.Promise.join(promises)
                .then(function () {
                return definitions;
            });
        }
        vs.syncModels = syncModels;
        function displayPartsToParameterSignature(parts) {
            return "(" + parts.filter(function (part) { return part.kind == "parameterName"; }).map(function (part) { return part.text; }).join(", ") + ")";
        }
        function populateDefinitions(f, fp, definitions) {
            var typeDefs = {};
            return monaco.languages.typescript.getTypeScriptWorker().then(function (worker) {
                return worker(monaco.Uri.parse(fp))
                    .then(function (client) {
                    return client.getNavigationBarItems(fp).then(function (items) {
                        return populateDefinitionsForKind(client, ts.ScriptElementKind.interfaceElement, items)
                            .then(function () { return populateDefinitionsForKind(client, ts.ScriptElementKind.classElement, items); })
                            .then(function () { return populateDefinitionsForKind(client, ts.ScriptElementKind.moduleElement, items); });
                    });
                })
                    .then(function () {
                    Object.keys(definitions).forEach(function (name) {
                        var moduleDef = definitions[name];
                        if (moduleDef.vars) {
                            Object.keys(moduleDef.vars).forEach(function (typeString) {
                                var typeDef = typeDefs[typeString];
                                if (typeDef) {
                                    Object.keys(typeDef.fns).forEach(function (functionName) {
                                        var qName = typeString + "." + functionName;
                                        if (moduleDef.fns[qName]) {
                                            return;
                                        }
                                        var fn = typeDef.fns[functionName];
                                        if (fn) {
                                            fn.snippet = moduleDef.vars[typeString] + "." + fn.snippet;
                                            moduleDef.fns[qName] = fn;
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            });
            function populateDefinitionsForKind(client, kind, items) {
                return monaco.Promise.join(items.filter(function (item) { return item.kind == kind; }).map(function (item) {
                    if (kind === ts.ScriptElementKind.moduleElement) {
                        if (!definitions[item.text]) {
                            definitions[item.text] = {
                                fns: {}
                            };
                        }
                        return populateNameDefinition(client, fp, item, definitions[item.text]);
                    }
                    else {
                        if (!typeDefs[item.text]) {
                            typeDefs[item.text] = {
                                fns: {}
                            };
                        }
                        return populateNameDefinition(client, fp, item, typeDefs[item.text]);
                    }
                }));
                function populateNameDefinition(client, fp, parent, definition) {
                    var promises = [];
                    // metadata promise
                    promises.push(client.getLeadingComments(fp, parent.spans[0].start)
                        .then(function (comments) {
                        if (comments) {
                            var meta_1 = pxtc.parseCommentString(comments);
                            if (meta_1) {
                                if (!definition.metaData) {
                                    definition.metaData = meta_1;
                                }
                                else {
                                    Object.keys(meta_1).forEach(function (k) { return definition.metaData[k] = meta_1[k]; });
                                }
                            }
                        }
                    }));
                    // function promises
                    promises.push(monaco.Promise.join(parent.childItems
                        .filter(function (item) { return (item.kind == ts.ScriptElementKind.functionElement ||
                        item.kind === ts.ScriptElementKind.memberFunctionElement) && isExported(item); })
                        .map(function (fn) {
                        // exported function
                        return client.getCompletionEntryDetailsAndSnippet(fp, fn.spans[0].start, fn.text, fn.text, parent.text)
                            .then(function (details) {
                            if (!details)
                                return;
                            return client.getLeadingComments(fp, fn.spans[0].start)
                                .then(function (comments) {
                                var meta;
                                if (comments)
                                    meta = pxtc.parseCommentString(comments);
                                var comment = meta ? meta.jsDoc : ts.displayPartsToString(details[0].documentation);
                                definition.fns[fn.text] = {
                                    sig: displayPartsToParameterSignature(details[0].displayParts),
                                    snippet: details[1],
                                    comment: comment,
                                    metaData: meta
                                };
                            });
                        });
                    })));
                    if (kind === ts.ScriptElementKind.moduleElement) {
                        if (!definition.vars) {
                            definition.vars = {};
                        }
                        promises.push(monaco.Promise.join(parent.childItems.filter(function (v) { return v.kind === ts.ScriptElementKind.constElement && isExported(v); }).map(function (v) {
                            return client.getQuickInfoAtPosition(fp, v.spans[0].start)
                                .then(function (qInfo) {
                                if (qInfo) {
                                    var typePart = qInfo.displayParts.filter(function (part) { return part.kind === "interfaceName" || part.kind === "className"; })[0];
                                    if (typePart && !definition.vars[typePart.text]) {
                                        definition.vars[typePart.text] = v.text;
                                    }
                                }
                            });
                        })));
                    }
                    return monaco.Promise.join(promises);
                    function isExported(item) {
                        if (kind === ts.ScriptElementKind.interfaceElement) {
                            return true;
                        }
                        if (item.kind === ts.ScriptElementKind.memberFunctionElement && !item.kindModifiers) {
                            return true;
                        }
                        return item.kindModifiers.indexOf(ts.ScriptElementKindModifier.exportedModifier) !== -1 ||
                            item.kindModifiers.indexOf(ts.ScriptElementKindModifier.ambientModifier) !== -1;
                    }
                }
            }
        }
        function initMonacoAsync(element) {
            return new Promise(function (resolve, reject) {
                if (typeof (window.monaco) === 'object') {
                    // monaco is already loaded
                    resolve(createEditor(element));
                    return;
                }
                var onGotAmdLoader = function () {
                    window.require.config({ paths: { 'vs': pxt.webConfig.pxtCdnUrl + 'vs' } });
                    // Load monaco
                    window.require(['vs/editor/editor.main'], function () {
                        setupMonaco();
                        resolve(createEditor(element));
                    });
                };
                // Load AMD loader if necessary
                if (!window.require) {
                    var loaderScript = document.createElement('script');
                    loaderScript.type = 'text/javascript';
                    loaderScript.src = pxt.webConfig.pxtCdnUrl + 'vs/loader.js';
                    loaderScript.addEventListener('load', onGotAmdLoader);
                    document.body.appendChild(loaderScript);
                }
                else {
                    onGotAmdLoader();
                }
            });
        }
        vs.initMonacoAsync = initMonacoAsync;
        function setupMonaco() {
            if (!monaco.languages.typescript)
                return;
            initAsmMonarchLanguage();
            // validation settings
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                noSyntaxValidation: false,
                noSemanticValidation: false
            });
            // compiler options
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                allowUnreachableCode: true,
                noImplicitAny: true,
                allowJs: false,
                allowUnusedLabels: true,
                target: monaco.languages.typescript.ScriptTarget.ES5,
                outDir: "built",
                rootDir: ".",
                noLib: true,
                mouseWheelZoom: true
            });
            // maximum idle time
            monaco.languages.typescript.typescriptDefaults.setMaximunWorkerIdleTime(20 * 60 * 1000);
        }
        function createEditor(element) {
            var inverted = pxt.appTarget.appTheme.invertedMonaco;
            var editor = monaco.editor.create(element, {
                model: null,
                //ariaLabel: lf("JavaScript Editor"),
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'monospace'",
                scrollBeyondLastLine: false,
                language: "typescript",
                experimentalScreenReader: true,
                mouseWheelZoom: true,
                tabCompletion: true,
                wordBasedSuggestions: true,
                lineNumbersMinChars: 3,
                //automaticLayout: true,
                mouseWheelScrollSensitivity: 0.5,
                quickSuggestionsDelay: 200,
                theme: inverted ? 'vs-dark' : 'vs'
            });
            editor.layout();
            return editor;
        }
        vs.createEditor = createEditor;
        function initAsmMonarchLanguage() {
            monaco.languages.register({ id: 'asm', extensions: ['.asm'] });
            monaco.languages.setMonarchTokensProvider('asm', {
                // Set defaultToken to invalid to see what you do not tokenize yet
                // defaultToken: 'invalid',
                tokenPostfix: '',
                //Extracted from http://infocenter.arm.com/help/topic/com.arm.doc.qrc0006e/QRC0006_UAL16.pdf
                //Should be a superset of the instructions emitted
                keywords: [
                    'movs', 'mov', 'adds', 'add', 'adcs', 'adr', 'subs', 'sbcs', 'sub', 'rsbs',
                    'muls', 'cmp', 'cmn', 'ands', 'eors', 'orrs', 'bics', 'mvns', 'tst', 'lsls',
                    'lsrs', 'asrs', 'rors', 'ldr', 'ldrh', 'ldrb', 'ldrsh', 'ldrsb', 'ldm',
                    'str', 'strh', 'strb', 'stm', 'push', 'pop', 'cbz', 'cbnz', 'b', 'bl', 'bx', 'blx',
                    'sxth', 'sxtb', 'uxth', 'uxtb', 'rev', 'rev16', 'revsh', 'svc', 'cpsid', 'cpsie',
                    'setend', 'bkpt', 'nop', 'sev', 'wfe', 'wfi', 'yield',
                    'beq', 'bne', 'bcs', 'bhs', 'bcc', 'blo', 'bmi', 'bpl', 'bvs', 'bvc', 'bhi', 'bls',
                    'bge', 'blt', 'bgt', 'ble', 'bal',
                    //Registers
                    'r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15',
                    'pc', 'sp', 'lr'
                ],
                typeKeywords: [
                    '.startaddr', '.hex', '.short', '.space', '.section', '.string', '.byte'
                ],
                operators: [],
                // Not all of these are valid in ARM Assembly
                symbols: /[:\*]+/,
                // C# style strings
                escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                // The main tokenizer for our languages
                tokenizer: {
                    root: [
                        // identifiers and keywords
                        [/(\.)?[a-z_$\.][\w$]*/, {
                                cases: {
                                    '@typeKeywords': 'keyword',
                                    '@keywords': 'keyword',
                                    '@default': 'identifier'
                                }
                            }],
                        // whitespace
                        { include: '@whitespace' },
                        // delimiters and operators
                        [/[{}()\[\]]/, '@brackets'],
                        [/[<>](?!@symbols)/, '@brackets'],
                        [/@symbols/, {
                                cases: {
                                    '@operators': 'operator',
                                    '@default': ''
                                }
                            }],
                        // @ annotations.
                        [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation' }],
                        // numbers
                        //[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                        [/(#|(0[xX]))?[0-9a-fA-F]+/, 'number'],
                        // delimiter: after number because of .\d floats
                        [/[;,.]/, 'delimiter'],
                        // strings
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
                        // characters
                        [/'[^\\']'/, 'string'],
                        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                        [/'/, 'string.invalid']
                    ],
                    comment: [],
                    string: [
                        [/[^\\"]+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, 'white'],
                        [/\/\*/, 'comment', '@comment'],
                        [/;.*$/, 'comment'],
                    ],
                }
            });
        }
    })(vs = pxt.vs || (pxt.vs = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var shell;
    (function (shell) {
        (function (EditorLayoutType) {
            EditorLayoutType[EditorLayoutType["IDE"] = 0] = "IDE";
            EditorLayoutType[EditorLayoutType["Sandbox"] = 1] = "Sandbox";
            EditorLayoutType[EditorLayoutType["Widget"] = 2] = "Widget";
        })(shell.EditorLayoutType || (shell.EditorLayoutType = {}));
        var EditorLayoutType = shell.EditorLayoutType;
        var layoutType;
        function init() {
            if (layoutType !== undefined)
                return;
            var sandbox = /sandbox=1|#sandbox|#sandboxproject/i.test(window.location.href)
                || pxt.BrowserUtils.isIFrame();
            var nosandbox = /nosandbox=1/i.test(window.location.href);
            var layout = /editorlayout=(widget|sandbox|ide)/i.exec(window.location.href);
            layoutType = EditorLayoutType.IDE;
            if (nosandbox)
                layoutType = EditorLayoutType.Widget;
            else if (sandbox)
                layoutType = EditorLayoutType.Sandbox;
            if (layout) {
                switch (layout[1].toLowerCase()) {
                    case "widget":
                        layoutType = EditorLayoutType.Widget;
                        break;
                    case "sandbox":
                        layoutType = EditorLayoutType.Sandbox;
                        break;
                    case "ide":
                        layoutType = EditorLayoutType.IDE;
                        break;
                }
            }
            pxt.debug("shell: layout type " + EditorLayoutType[layoutType] + ", readonly " + isReadOnly());
        }
        function layoutTypeClass() {
            init();
            return pxt.shell.EditorLayoutType[layoutType].toLowerCase();
        }
        shell.layoutTypeClass = layoutTypeClass;
        function isSandboxMode() {
            init();
            return layoutType == EditorLayoutType.Sandbox;
        }
        shell.isSandboxMode = isSandboxMode;
        function isReadOnly() {
            return isSandboxMode()
                && !/[?&]edit=1/i.test(window.location.href);
        }
        shell.isReadOnly = isReadOnly;
    })(shell = pxt.shell || (pxt.shell = {}));
})(pxt || (pxt = {}));
/// <reference path="../typings/globals/bluebird/index.d.ts"/>
/// <reference path="../built/pxtlib.d.ts"/>
