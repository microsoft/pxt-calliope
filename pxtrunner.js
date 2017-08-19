var pxt;
(function (pxt) {
    var runner;
    (function (runner) {
        /**
         * Starts the simulator and injects it into the provided container.
         * the simulator will attempt to establish a websocket connection
         * to the debugger's user interface on port 3234.
         *
         * @param container The container to inject the simulator into
         */
        function startDebuggerAsync(container) {
            var debugRunner = new DebugRunner(container);
            debugRunner.start();
        }
        runner.startDebuggerAsync = startDebuggerAsync;
        /**
         * Runner for the debugger that handles communication with the user
         * interface. Also talks to the server for anything to do with
         * the filesystem (like reading code)
         */
        var DebugRunner = (function () {
            function DebugRunner(container) {
                this.container = container;
                this.pkgLoaded = false;
                this.intervalRunning = false;
            }
            DebugRunner.prototype.start = function () {
                var _this = this;
                this.initializeWebsocket();
                if (!this.intervalRunning) {
                    this.intervalRunning = true;
                    this.intervalId = setInterval(function () {
                        if (!_this.ws) {
                            try {
                                _this.initializeWebsocket();
                            }
                            catch (e) {
                                console.warn("Connection to server failed, retrying in " + DebugRunner.RETRY_MS + " ms");
                            }
                        }
                    }, DebugRunner.RETRY_MS);
                }
                this.session = new pxsim.SimDebugSession(this.container);
                this.session.start(this);
            };
            DebugRunner.prototype.initializeWebsocket = function () {
                var _this = this;
                if (!pxt.Cloud.isLocalHost() || !pxt.Cloud.localToken)
                    return;
                pxt.debug('initializing debug pipe');
                this.ws = new WebSocket('ws://localhost:3234/' + pxt.Cloud.localToken + '/simdebug');
                this.ws.onopen = function (ev) {
                    pxt.debug('debug: socket opened');
                };
                this.ws.onclose = function (ev) {
                    pxt.debug('debug: socket closed');
                    if (_this.closeListener) {
                        _this.closeListener();
                    }
                    _this.session.stopSimulator();
                    _this.ws = undefined;
                };
                this.ws.onerror = function (ev) {
                    pxt.debug('debug: socket closed due to error');
                    if (_this.errorListener) {
                        _this.errorListener(ev.type);
                    }
                    _this.session.stopSimulator();
                    _this.ws = undefined;
                };
                this.ws.onmessage = function (ev) {
                    var message;
                    try {
                        message = JSON.parse(ev.data);
                    }
                    catch (e) {
                        pxt.debug('debug: could not parse message');
                    }
                    if (message) {
                        // FIXME: ideally, we should just open two websockets instead of adding to the
                        // debug protocol. One for the debugger, one for meta-information and file
                        // system requests
                        if (message.type === 'runner') {
                            _this.handleRunnerMessage(message);
                        }
                        else {
                            // Intercept the launch configuration and notify the server-side debug runner
                            if (message.type === "request" && message.command === "launch") {
                                _this.sendRunnerMessage("configure", {
                                    projectDir: message.arguments.projectDir
                                });
                            }
                            _this.dataListener(message);
                        }
                    }
                };
            };
            DebugRunner.prototype.send = function (msg) {
                this.ws.send(msg);
            };
            DebugRunner.prototype.onData = function (cb) {
                this.dataListener = cb;
            };
            DebugRunner.prototype.onError = function (cb) {
                this.errorListener = cb;
            };
            DebugRunner.prototype.onClose = function (cb) {
                this.closeListener = cb;
            };
            DebugRunner.prototype.close = function () {
                if (this.session) {
                    this.session.stopSimulator(true);
                }
                if (this.intervalRunning) {
                    clearInterval(this.intervalId);
                    this.intervalId = undefined;
                }
                if (this.ws) {
                    this.ws.close();
                }
            };
            DebugRunner.prototype.handleRunnerMessage = function (msg) {
                switch (msg.subtype) {
                    case "ready":
                        this.sendRunnerMessage("ready");
                        break;
                    case "runcode":
                        this.runCode(msg);
                        break;
                }
            };
            DebugRunner.prototype.runCode = function (msg) {
                var breakpoints = [];
                // The breakpoints are in the format returned by the compiler
                // and need to be converted to the format used by the DebugProtocol
                msg.breakpoints.forEach(function (bp) {
                    breakpoints.push([bp.id, {
                            verified: true,
                            line: bp.line,
                            column: bp.column,
                            endLine: bp.endLine,
                            endColumn: bp.endColumn,
                            source: {
                                path: bp.fileName
                            }
                        }]);
                });
                this.session.runCode(msg.code, msg.usedParts, msg.usedArguments, new pxsim.BreakpointMap(breakpoints), pxt.appTarget.simulator.boardDefinition);
            };
            DebugRunner.prototype.sendRunnerMessage = function (subtype, msg) {
                if (msg === void 0) { msg = {}; }
                msg["subtype"] = subtype;
                msg["type"] = "runner";
                this.send(JSON.stringify(msg));
            };
            DebugRunner.RETRY_MS = 2500;
            return DebugRunner;
        }());
        runner.DebugRunner = DebugRunner;
    })(runner = pxt.runner || (pxt.runner = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var runner;
    (function (runner) {
        function appendBlocks($parent, $svg) {
            $parent.append($('<div class="ui content blocks"/>').append($svg));
        }
        function appendJs($parent, $js, woptions) {
            $parent.append($('<div class="ui content js"/>').append($js));
            $('code.highlight').each(function (i, block) {
                var hljs = pxt.docs.requireHighlightJs();
                if (hljs)
                    hljs.highlightBlock(block);
            });
        }
        function fillWithWidget(options, $container, $js, $svg, woptions) {
            if (woptions === void 0) { woptions = {}; }
            if (!$svg || !$svg[0]) {
                var $c_1 = $('<div class="ui segment"></div>');
                $c_1.append($js);
                $container.replaceWith($c_1);
                return;
            }
            var cdn = pxt.webConfig.pxtCdnUrl;
            var images = cdn + "images";
            var $h = $('<div class="ui bottom attached tabular icon small compact menu">'
                + ' <div class="right icon menu"></div></div>');
            var $c = $('<div class="ui top attached segment"></div>');
            var $menu = $h.find('.right.menu');
            if (options.showJavaScript) {
                // blocks
                $c.append($js);
                // js menu
                if ($svg) {
                    var $svgBtn = $('<a class="item blocks"><i aria-label="Blocks" class="puzzle icon"></i></a>').click(function () {
                        if ($c.find('.blocks')[0])
                            $c.find('.blocks').remove();
                        else {
                            if ($js)
                                appendBlocks($js.parent(), $svg);
                            else
                                appendBlocks($c, $svg);
                        }
                    });
                    $menu.append($svgBtn);
                }
            }
            else {
                // blocks
                $c.append($svg);
                // js menu
                if (woptions.showJs) {
                    appendJs($c, $js, woptions);
                }
                else {
                    var $jsBtn = $('<a class="item js"><i aria-label="JavaScript" class="align left icon"></i></a>').click(function () {
                        if ($c.find('.js')[0])
                            $c.find('.js').remove();
                        else {
                            if ($svg)
                                appendJs($svg.parent(), $js, woptions);
                            else
                                appendJs($c, $js, woptions);
                        }
                    });
                    $menu.append($jsBtn);
                }
            }
            // runner menu
            if (woptions.run) {
                var $runBtn = $('<a class="item"><i aria-label="run" class="play icon"></i></a>').click(function () {
                    if ($c.find('.sim')[0])
                        $c.find('.sim').remove(); // remove previous simulators
                    else {
                        var padding = '81.97%';
                        if (pxt.appTarget.simulator)
                            padding = (100 / pxt.appTarget.simulator.aspectRatio) + '%';
                        var $embed = $("<div class=\"ui card sim\"><div class=\"ui content\"><div style=\"position:relative;height:0;padding-bottom:" + padding + ";overflow:hidden;\"><iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" src=\"" + (getRunUrl(options) + "#nofooter=1&code=" + encodeURIComponent($js.text())) + "\" allowfullscreen=\"allowfullscreen\" sandbox=\"allow-popups allow-scripts allow-same-origin\" frameborder=\"0\"></iframe></div></div></div>");
                        $c.append($embed);
                    }
                });
                $menu.append($runBtn);
            }
            if (woptions.hexname && woptions.hex) {
                var $hexBtn = $('<a class="item"><i aria-label="download" class="download icon"></i></a>').click(function () {
                    pxt.BrowserUtils.browserDownloadBinText(woptions.hex, woptions.hexname, pxt.appTarget.compile.hexMimeType);
                });
                $menu.append($hexBtn);
            }
            var r = [$c];
            // don't add menu if empty
            if ($menu.children().length)
                r.push($h);
            // inject container
            $container.replaceWith(r);
            // download screenshots
            if (options.downloadScreenshots && woptions.hexname) {
                pxt.debug("Downloading screenshot for: " + woptions.hexname);
                var filename_1 = woptions.hexname.substr(0, woptions.hexname.lastIndexOf('.'));
                var fontSize = window.getComputedStyle($svg.get(0).querySelector(".blocklyText")).getPropertyValue("font-size");
                var customCss = "\n.blocklyMainBackground {\n    stroke:none !important;\n}\n\n.blocklyText {\n    font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;\n    font-size:" + fontSize + " !important;  \n}\n\n.blocklyCheckbox,\n.blocklyLed {\n    fill: #ff3030 !important;\n    text-shadow: 0px 0px 6px #f00;\n    font-size: 17pt !important;\n}";
                var svgElement = $svg.get(0);
                var bbox = $svg.get(0).getBoundingClientRect();
                pxt.blocks.layout.svgToPngAsync(svgElement, customCss, 0, 0, bbox.width, bbox.height)
                    .done(function (uri) {
                    if (uri)
                        pxt.BrowserUtils.browserDownloadDataUri(uri, (name || (pxt.appTarget.nickname || pxt.appTarget.id) + "-" + filename_1) + ".png");
                });
            }
        }
        function renderNextSnippetAsync(cls, render, options) {
            if (!cls)
                return Promise.resolve();
            var $el = $("." + cls).first();
            if (!$el[0])
                return Promise.resolve();
            if (!options.emPixels)
                options.emPixels = 14;
            if (!options.layout)
                options.layout = pxt.blocks.BlockLayout.Flow;
            return pxt.runner.decompileToBlocksAsync($el.text(), options)
                .then(function (r) {
                try {
                    render($el, r);
                }
                catch (e) {
                    console.error('error while rendering ' + $el.html());
                    $el.append($('<div/>').addClass("ui segment warning").text(e.message));
                }
                $el.removeClass(cls);
                return Promise.delay(1, renderNextSnippetAsync(cls, render, options));
            });
        }
        function renderSnippetsAsync(options) {
            if (options.tutorial) {
                // don't render chrome for tutorials
                return renderNextSnippetAsync(options.snippetClass, function (c, r) {
                    var s = r.blocksSvg;
                    if (options.snippetReplaceParent)
                        c = c.parent();
                    var segment = $('<div class="ui segment"/>').append(s);
                    c.replaceWith(segment);
                }, { package: options.package, snippetMode: false });
            }
            var snippetCount = 0;
            return renderNextSnippetAsync(options.snippetClass, function (c, r) {
                var s = r.compileBlocks && r.compileBlocks.success ? $(r.blocksSvg) : undefined;
                var js = $('<code class="lang-typescript highlight"/>').text(c.text().trim());
                if (options.snippetReplaceParent)
                    c = c.parent();
                var compiled = r.compileJS && r.compileJS.success;
                var hex = options.hex && compiled && r.compileJS.outfiles[pxtc.BINARY_HEX]
                    ? r.compileJS.outfiles[pxtc.BINARY_HEX] : undefined;
                var hexname = (pxt.appTarget.nickname || pxt.appTarget.id) + "-" + (options.hexName || '') + "-" + snippetCount++ + ".hex";
                fillWithWidget(options, c, js, s, {
                    run: options.simulator && compiled,
                    hexname: hexname,
                    hex: hex,
                });
            }, { package: options.package });
        }
        function decompileCallInfo(stmt) {
            if (!stmt || stmt.kind != ts.SyntaxKind.ExpressionStatement)
                return null;
            var estmt = stmt;
            if (!estmt.expression || estmt.expression.kind != ts.SyntaxKind.CallExpression)
                return null;
            var call = estmt.expression;
            var info = call.callInfo;
            return info;
        }
        function renderSignaturesAsync(options) {
            return renderNextSnippetAsync(options.signatureClass, function (c, r) {
                var cjs = r.compileJS;
                if (!cjs)
                    return;
                var file = r.compileJS.ast.getSourceFile("main.ts");
                var info = decompileCallInfo(file.statements[0]);
                if (!info)
                    return;
                var s = r.compileBlocks && r.compileBlocks.success ? $(r.blocksSvg) : undefined;
                var sig = info.decl.getText().replace(/^export/, '');
                sig = sig.slice(0, sig.indexOf('{')).trim() + ';';
                var js = $('<code class="lang-typescript highlight"/>').text(sig);
                if (options.snippetReplaceParent)
                    c = c.parent();
                fillWithWidget(options, c, js, s, { showJs: true, hideGutter: true });
            }, { package: options.package, snippetMode: true });
        }
        function renderShuffleAsync(options) {
            return renderNextSnippetAsync(options.shuffleClass, function (c, r) {
                var s = r.blocksSvg;
                if (options.snippetReplaceParent)
                    c = c.parent();
                var segment = $('<div class="ui segment"/>').append(s);
                c.replaceWith(segment);
            }, {
                emPixels: 14, layout: pxt.blocks.BlockLayout.Shuffle, aspectRatio: options.blocksAspectRatio,
                package: options.package
            });
        }
        function renderBlocksAsync(options) {
            return renderNextSnippetAsync(options.blocksClass, function (c, r) {
                var s = r.blocksSvg;
                if (options.snippetReplaceParent)
                    c = c.parent();
                var segment = $('<div class="ui segment"/>').append(s);
                c.replaceWith(segment);
            }, { package: options.package, snippetMode: true });
        }
        function renderInlineBlocksAsync(options) {
            options = pxt.Util.clone(options);
            options.emPixels = 18;
            options.snippetMode = true;
            var $els = $(":not(pre) > code");
            var i = 0;
            function renderNextAsync() {
                if (i >= $els.length)
                    return Promise.resolve();
                var $el = $($els[i++]);
                var text = $el.text();
                var mbtn = /^(\|+)([^\|]+)\|+$/.exec(text);
                if (mbtn) {
                    var lev = mbtn[1].length == 1 ? "primary" : "";
                    var txt = mbtn[2];
                    $el.replaceWith($("<button class=\"ui button " + lev + "\"/>").text(pxt.U.rlf(txt)));
                    return renderNextAsync();
                }
                var m = /^\[([^\]]+)\]$/.exec(text);
                if (!m)
                    return renderNextAsync();
                var code = m[1];
                return pxt.runner.decompileToBlocksAsync(code, options)
                    .then(function (r) {
                    if (r.blocksSvg) {
                        var $newel = $('<span class="block"/>').append(r.blocksSvg);
                        var file = r.compileJS.ast.getSourceFile("main.ts");
                        var stmt = file.statements[0];
                        var info = decompileCallInfo(stmt);
                        if (info && info.attrs.help)
                            $newel = $("<a class=\"ui link\"/>").attr("href", "/reference/" + info.attrs.help).append($newel);
                        $el.replaceWith($newel);
                    }
                    return Promise.delay(1, renderNextAsync());
                });
            }
            return renderNextAsync();
        }
        function renderProjectAsync(options) {
            if (!options.projectClass)
                return Promise.resolve();
            function render() {
                var $el = $("." + options.projectClass).first();
                var e = $el[0];
                if (!e)
                    return Promise.resolve();
                $el.removeClass(options.projectClass);
                var id = pxt.Cloud.parseScriptId(e.innerText);
                if (id) {
                    if (options.snippetReplaceParent) {
                        e = e.parentElement;
                        // create a new div to host the rendered code
                        var d = document.createElement("div");
                        e.parentElement.insertBefore(d, e);
                        e.parentElement.removeChild(e);
                        e = d;
                    }
                    return pxt.runner.renderProjectAsync(e, id)
                        .then(function () { return render(); });
                }
                else
                    return render();
            }
            return render();
        }
        function renderLinksAsync(options, cls, replaceParent, ns) {
            return renderNextSnippetAsync(cls, function (c, r) {
                var cjs = r.compileJS;
                if (!cjs)
                    return;
                var file = r.compileJS.ast.getSourceFile("main.ts");
                var stmts = file.statements.slice(0).reverse();
                var ul = $('<div />').addClass('ui cards');
                var addItem = function (card) {
                    if (!card)
                        return;
                    ul.append(pxt.docs.codeCard.render(card, { hideHeader: true, shortName: true }));
                };
                stmts.forEach(function (stmt) {
                    var info = decompileCallInfo(stmt);
                    if (info) {
                        var block = Blockly.Blocks[info.attrs.blockId];
                        if (ns) {
                            var ii = r.compileBlocks.blocksInfo.apis.byQName[info.qName];
                            var nsi = r.compileBlocks.blocksInfo.apis.byQName[ii.namespace];
                            addItem({
                                name: nsi.name,
                                url: nsi.attributes.help || ("reference/" + nsi.name),
                                description: nsi.attributes.jsDoc,
                                blocksXml: block && block.codeCard
                                    ? block.codeCard.blocksXml
                                    : info.attrs.blockId
                                        ? "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"" + info.attrs.blockId + "\"></block></xml>"
                                        : undefined
                            });
                        }
                        else if (block) {
                            var card = pxt.U.clone(block.codeCard);
                            if (card) {
                                addItem(card);
                            }
                        }
                        else {
                            // no block available here
                            addItem({
                                name: info.qName,
                                description: info.attrs.jsDoc,
                                url: info.attrs.help || undefined
                            });
                        }
                    }
                    else
                        switch (stmt.kind) {
                            case ts.SyntaxKind.ExpressionStatement:
                                var es = stmt;
                                switch (es.expression.kind) {
                                    case ts.SyntaxKind.TrueKeyword:
                                    case ts.SyntaxKind.FalseKeyword:
                                        addItem({
                                            name: "Boolean",
                                            url: "blocks/logic/boolean",
                                            description: lf("True or false values"),
                                            blocksXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></xml>'
                                        });
                                        break;
                                    default:
                                        pxt.debug("card expr kind: " + es.expression.kind);
                                        break;
                                }
                                break;
                            case ts.SyntaxKind.IfStatement:
                                addItem({
                                    name: ns ? "Logic" : "if",
                                    url: "blocks/logic" + (ns ? "" : "/if"),
                                    description: ns ? lf("Logic operators and constants") : lf("Conditional statement"),
                                    blocksXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_if"></block></xml>'
                                });
                                break;
                            case ts.SyntaxKind.WhileStatement:
                                addItem({
                                    name: ns ? "Loops" : "while",
                                    url: "blocks/loops" + (ns ? "" : "/while"),
                                    description: ns ? lf("Loops and repetition") : lf("Repeat code while a condition is true."),
                                    blocksXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="device_while"></block></xml>'
                                });
                                break;
                            case ts.SyntaxKind.ForStatement:
                                addItem({
                                    name: ns ? "Loops" : "for",
                                    url: "blocks/loops" + (ns ? "" : "/for"),
                                    description: ns ? lf("Loops and repetition") : lf("Repeat code for a given number of times."),
                                    blocksXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_simple_for"></block></xml>'
                                });
                                break;
                            case ts.SyntaxKind.VariableStatement:
                                addItem({
                                    name: ns ? "Variables" : "variable declaration",
                                    url: "blocks/variables" + (ns ? "" : "/assign"),
                                    description: ns ? lf("Variables") : lf("Assign a value to a named variable."),
                                    blocksXml: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set"></block></xml>'
                                });
                                break;
                            default:
                                pxt.debug("card kind: " + stmt.kind);
                        }
                });
                if (replaceParent)
                    c = c.parent();
                c.replaceWith(ul);
            }, { package: options.package });
        }
        function fillCodeCardAsync(c, cards, options) {
            if (!cards || cards.length == 0)
                return Promise.resolve();
            if (cards.length == 0) {
                var cc = pxt.docs.codeCard.render(cards[0], options);
                c.replaceWith(cc);
            }
            else {
                var cd_1 = document.createElement("div");
                cd_1.className = "ui cards";
                cards.forEach(function (card) { return cd_1.appendChild(pxt.docs.codeCard.render(card, options)); });
                c.replaceWith(cd_1);
            }
            return Promise.resolve();
        }
        function renderNextCodeCardAsync(cls, options) {
            if (!cls)
                return Promise.resolve();
            var $el = $("." + cls).first();
            if (!$el[0])
                return Promise.resolve();
            $el.removeClass(cls);
            var cards;
            try {
                var js = JSON.parse($el.text());
                if (!Array.isArray(js))
                    js = [js];
                cards = js;
            }
            catch (e) {
                console.error('error while rendering ' + $el.html());
                $el.append($('<div/>').addClass("ui segment warning").text(e.messageText));
            }
            if (options.snippetReplaceParent)
                $el = $el.parent();
            return fillCodeCardAsync($el, cards, { hideHeader: true })
                .then(function () { return Promise.delay(1, renderNextCodeCardAsync(cls, options)); });
        }
        function getRunUrl(options) {
            return options.pxtUrl ? options.pxtUrl + '/--run' : pxt.webConfig && pxt.webConfig.runUrl ? pxt.webConfig.runUrl : '/--run';
        }
        function mergeConfig(options) {
            // additional config options
            if (!options.packageClass)
                return;
            $('.' + options.packageClass).each(function (i, c) {
                var $c = $(c);
                var name = $c.text().split('\n').map(function (s) { return s.replace(/\s*/g, ''); }).filter(function (s) { return !!s; }).join(',');
                options.package = options.package ? options.package + "," + name : name;
                if (options.snippetReplaceParent)
                    $c = $c.parent();
                $c.remove();
            });
        }
        function renderAsync(options) {
            if (!options)
                options = {};
            if (options.pxtUrl)
                options.pxtUrl = options.pxtUrl.replace(/\/$/, '');
            mergeConfig(options);
            if (options.simulatorClass) {
                // simulators
                $('.' + options.simulatorClass).each(function (i, c) {
                    var $c = $(c);
                    var padding = '81.97%';
                    if (pxt.appTarget.simulator)
                        padding = (100 / pxt.appTarget.simulator.aspectRatio) + '%';
                    var $sim = $("<div class=\"ui centered card\"><div class=\"ui content\">\n                    <div style=\"position:relative;height:0;padding-bottom:" + padding + ";overflow:hidden;\">\n                    <iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\" sandbox=\"allow-popups allow-scripts allow-same-origin\"></iframe>\n                    </div>\n                    </div></div>");
                    $sim.find("iframe").attr("src", getRunUrl(options) + "#nofooter=1&code=" + encodeURIComponent($c.text().trim()));
                    if (options.snippetReplaceParent)
                        $c = $c.parent();
                    $c.replaceWith($sim);
                });
            }
            return Promise.resolve()
                .then(function () { return renderInlineBlocksAsync(options); })
                .then(function () { return renderShuffleAsync(options); })
                .then(function () { return renderLinksAsync(options, options.linksClass, options.snippetReplaceParent, false); })
                .then(function () { return renderLinksAsync(options, options.namespacesClass, options.snippetReplaceParent, true); })
                .then(function () { return renderSignaturesAsync(options); })
                .then(function () { return renderNextCodeCardAsync(options.codeCardClass, options); })
                .then(function () { return renderSnippetsAsync(options); })
                .then(function () { return renderBlocksAsync(options); })
                .then(function () { return renderProjectAsync(options); });
        }
        runner.renderAsync = renderAsync;
    })(runner = pxt.runner || (pxt.runner = {}));
})(pxt || (pxt = {}));
/// <reference path="../built/pxtlib.d.ts" />
/// <reference path="../built/pxtblocks.d.ts" />
/// <reference path="../built/pxtsim.d.ts" />
var pxt;
(function (pxt) {
    var runner;
    (function (runner) {
        var EditorPackage = (function () {
            function EditorPackage(ksPkg, topPkg) {
                this.ksPkg = ksPkg;
                this.topPkg = topPkg;
                this.files = {};
            }
            EditorPackage.prototype.getKsPkg = function () {
                return this.ksPkg;
            };
            EditorPackage.prototype.getPkgId = function () {
                return this.ksPkg ? this.ksPkg.id : this.id;
            };
            EditorPackage.prototype.isTopLevel = function () {
                return this.ksPkg && this.ksPkg.level == 0;
            };
            EditorPackage.prototype.setFiles = function (files) {
                this.files = files;
            };
            EditorPackage.prototype.getAllFiles = function () {
                return pxt.Util.mapMap(this.files, function (k, f) { return f; });
            };
            return EditorPackage;
        }());
        var Host = (function () {
            function Host() {
            }
            Host.prototype.readFile = function (module, filename) {
                var epkg = getEditorPkg(module);
                return pxt.U.lookup(epkg.files, filename);
            };
            Host.prototype.writeFile = function (module, filename, contents) {
                if (filename == pxt.CONFIG_NAME)
                    return; // ignore config writes
                throw pxt.Util.oops("trying to write " + module + " / " + filename);
            };
            Host.prototype.getHexInfoAsync = function (extInfo) {
                return pxt.hex.getHexInfoAsync(this, extInfo);
            };
            Host.prototype.cacheStoreAsync = function (id, val) {
                return Promise.resolve();
            };
            Host.prototype.cacheGetAsync = function (id) {
                return Promise.resolve(null);
            };
            Host.prototype.downloadPackageAsync = function (pkg) {
                var proto = pkg.verProtocol();
                var epkg = getEditorPkg(pkg);
                return pkg.commonDownloadAsync()
                    .then(function (resp) {
                    if (resp) {
                        epkg.setFiles(resp);
                        return Promise.resolve();
                    }
                    if (proto == "empty") {
                        epkg.setFiles(emptyPrjFiles());
                        return Promise.resolve();
                    }
                    else if (proto == "docs") {
                        var files = emptyPrjFiles();
                        var cfg_1 = JSON.parse(files[pxt.CONFIG_NAME]);
                        pkg.verArgument().split(',').forEach(function (d) {
                            var m = /^([a-zA-Z0-9_-]+)(=(.+))?$/.exec(d);
                            if (m)
                                cfg_1.dependencies[m[1]] = m[3] || "*";
                            else
                                console.warn("unknown package syntax " + d);
                        });
                        if (!cfg_1.yotta)
                            cfg_1.yotta = {};
                        cfg_1.yotta.ignoreConflicts = true;
                        files[pxt.CONFIG_NAME] = JSON.stringify(cfg_1, null, 4);
                        epkg.setFiles(files);
                        return Promise.resolve();
                    }
                    else {
                        return Promise.reject("Cannot download " + pkg.version() + "; unknown protocol");
                    }
                });
            };
            return Host;
        }());
        function getEditorPkg(p) {
            var r = p._editorPkg;
            if (r)
                return r;
            var top = null;
            if (p != runner.mainPkg)
                top = getEditorPkg(runner.mainPkg);
            var newOne = new EditorPackage(p, top);
            if (p == runner.mainPkg)
                newOne.topPkg = newOne;
            p._editorPkg = newOne;
            return newOne;
        }
        function emptyPrjFiles() {
            var p = pxt.appTarget.tsprj;
            var files = pxt.U.clone(p.files);
            files[pxt.CONFIG_NAME] = JSON.stringify(p.config, null, 4) + "\n";
            files["main.blocks"] = "";
            return files;
        }
        function patchSemantic() {
            if ($ && $.fn && $.fn.embed && $.fn.embed.settings && $.fn.embed.settings.sources && $.fn.embed.settings.sources.youtube) {
                $.fn.embed.settings.sources.youtube.url = '//www.youtube.com/embed/{id}?rel=0';
            }
        }
        function initInnerAsync() {
            pxt.setAppTarget(window.pxtTargetBundle);
            pxt.Util.assert(!!pxt.appTarget);
            var mlang = /(live)?lang=([a-z]{2,}(-[A-Z]+)?)/i.exec(window.location.href);
            var lang = mlang ? mlang[2] : (pxt.appTarget.appTheme.defaultLocale || navigator.userLanguage || navigator.language);
            var live = mlang && !!mlang[1];
            patchSemantic();
            var cfg = pxt.webConfig;
            return pxt.Util.updateLocalizationAsync(cfg.pxtCdnUrl, lang, live)
                .then(function () {
                runner.mainPkg = new pxt.MainPackage(new Host());
            });
        }
        function initFooter(footer, shareId) {
            if (!footer)
                return;
            var theme = pxt.appTarget.appTheme;
            var body = $('body');
            var $footer = $(footer);
            var footera = $('<a/>').attr('href', theme.homeUrl)
                .attr('target', '_blank');
            $footer.append(footera);
            if (theme.organizationLogo)
                footera.append($('<img/>').attr('src', pxt.Util.toDataUri(theme.organizationLogo)));
            else
                footera.append(lf("powered by {0}", theme.title));
            body.mouseenter(function (ev) { return $footer.fadeOut(); });
            body.mouseleave(function (ev) { return $footer.fadeIn(); });
        }
        runner.initFooter = initFooter;
        function showError(msg) {
            console.error(msg);
        }
        runner.showError = showError;
        function loadPackageAsync(id, code) {
            var host = runner.mainPkg.host();
            runner.mainPkg = new pxt.MainPackage(host);
            runner.mainPkg._verspec = id ? /\w+:\w+/.test(id) ? id : "pub:" + id : "empty:tsprj";
            return host.downloadPackageAsync(runner.mainPkg)
                .then(function () { return host.readFile(runner.mainPkg, pxt.CONFIG_NAME); })
                .then(function (str) {
                if (!str)
                    return Promise.resolve();
                return runner.mainPkg.installAllAsync().then(function () {
                    if (code) {
                        //Set the custom code if provided for docs.
                        var epkg = getEditorPkg(runner.mainPkg);
                        epkg.files["main.ts"] = code;
                        //set the custom doc name from the URL.
                        var cfg = JSON.parse(epkg.files[pxt.CONFIG_NAME]);
                        cfg.name = window.location.href.split('/').pop().split(/[?#]/)[0];
                        ;
                        epkg.files[pxt.CONFIG_NAME] = JSON.stringify(cfg, null, 4);
                        //Propgate the change to main package
                        runner.mainPkg.config.name = cfg.name;
                        if (runner.mainPkg.config.files.indexOf("main.blocks") == -1) {
                            runner.mainPkg.config.files.push("main.blocks");
                        }
                    }
                }).catch(function (e) {
                    showError(lf("Cannot load package: {0}", e.message));
                });
            });
        }
        function getCompileOptionsAsync(hex) {
            var trg = runner.mainPkg.getTargetOptions();
            trg.isNative = !!hex;
            trg.hasHex = !!hex;
            return runner.mainPkg.getCompileOptionsAsync(trg);
        }
        function compileAsync(hex, updateOptions) {
            return getCompileOptionsAsync()
                .then(function (opts) {
                if (updateOptions)
                    updateOptions(opts);
                var resp = pxtc.compile(opts);
                if (resp.diagnostics && resp.diagnostics.length > 0) {
                    resp.diagnostics.forEach(function (diag) {
                        console.error(diag.messageText);
                    });
                }
                return resp;
            });
        }
        function generateHexFileAsync(options) {
            return loadPackageAsync(options.id)
                .then(function () { return compileAsync(true, function (opts) {
                if (options.code)
                    opts.fileSystem["main.ts"] = options.code;
            }); })
                .then(function (resp) {
                if (resp.diagnostics && resp.diagnostics.length > 0) {
                    console.error("Diagnostics", resp.diagnostics);
                }
                return resp.outfiles[pxtc.BINARY_HEX];
            });
        }
        runner.generateHexFileAsync = generateHexFileAsync;
        function simulateAsync(container, simOptions) {
            return loadPackageAsync(simOptions.id)
                .then(function () { return compileAsync(false, function (opts) {
                if (simOptions.code)
                    opts.fileSystem["main.ts"] = simOptions.code;
            }); })
                .then(function (resp) {
                if (resp.diagnostics && resp.diagnostics.length > 0) {
                    console.error("Diagnostics", resp.diagnostics);
                }
                var js = resp.outfiles[pxtc.BINARY_JS];
                if (js) {
                    var options_1 = {};
                    var driver = new pxsim.SimulatorDriver(container, options_1);
                    var fnArgs = resp.usedArguments;
                    var board = pxt.appTarget.simulator.boardDefinition;
                    var parts = pxtc.computeUsedParts(resp, true);
                    var runOptions = {
                        boardDefinition: board,
                        parts: parts,
                        fnArgs: fnArgs
                    };
                    if (pxt.appTarget.simulator)
                        runOptions.aspectRatio = parts.length && pxt.appTarget.simulator.partsAspectRatio
                            ? pxt.appTarget.simulator.partsAspectRatio
                            : pxt.appTarget.simulator.aspectRatio;
                    driver.run(js, runOptions);
                }
            });
        }
        runner.simulateAsync = simulateAsync;
        (function (LanguageMode) {
            LanguageMode[LanguageMode["Blocks"] = 0] = "Blocks";
            LanguageMode[LanguageMode["TypeScript"] = 1] = "TypeScript";
        })(runner.LanguageMode || (runner.LanguageMode = {}));
        var LanguageMode = runner.LanguageMode;
        runner.languageMode = LanguageMode.Blocks;
        runner.editorLocale = "en";
        function setEditorContextAsync(mode, locale) {
            runner.languageMode = mode;
            if (locale != runner.editorLocale) {
                var localeLiveRx = /^live-/;
                runner.editorLocale = locale;
                return pxt.Util.updateLocalizationAsync(pxt.webConfig.pxtCdnUrl, runner.editorLocale.replace(localeLiveRx, ''), localeLiveRx.test(runner.editorLocale));
            }
            return Promise.resolve();
        }
        runner.setEditorContextAsync = setEditorContextAsync;
        function receiveDocMessage(e) {
            var m = e.data;
            if (!m)
                return;
            switch (m.type) {
                case "fileloaded":
                    var fm = m;
                    var name_1 = fm.name;
                    setEditorContextAsync(/\.ts$/i.test(name_1) ? LanguageMode.TypeScript : LanguageMode.Blocks, fm.locale).done();
                    break;
                case "popout":
                    var mp = /#(doc|md):([^&?:]+)/i.exec(window.location.href);
                    if (mp) {
                        var docsUrl = pxt.webConfig.docsUrl || '/--docs';
                        var url = mp[1] == "doc" ? "" + mp[2] : docsUrl + "?md=" + mp[2];
                        window.open(url, "_blank");
                    }
                    break;
                case "tutorial":
                    var t = m;
                    switch (t.subtype) {
                        case "stepchange":
                            var ts_1 = t;
                            var loading_1 = document.getElementById('loading');
                            var content_1 = document.getElementById('content');
                            $(content_1).hide();
                            $(loading_1).show();
                            renderTutorialAsync(content_1, ts_1.tutorial, ts_1.step)
                                .finally(function () {
                                $(loading_1).hide();
                                $(content_1).show();
                            });
                            break;
                    }
                    break;
                case "localtoken":
                    var dm = m;
                    if (dm && dm.localToken) {
                        pxt.Cloud.localToken = dm.localToken;
                    }
                    break;
            }
        }
        function startDocsServer(loading, content) {
            function render(doctype, src) {
                pxt.debug("rendering " + doctype);
                $(content).hide();
                $(loading).show();
                Promise.delay(100) // allow UI to update
                    .then(function () {
                    switch (doctype) {
                        case "doc":
                            return renderDocAsync(content, src);
                        case "tutorial":
                            var body = $('body');
                            body.addClass('tutorial');
                            return renderTutorialAsync(content, src, 0);
                        default:
                            return renderMarkdownAsync(content, src);
                    }
                })
                    .catch(function (e) {
                    $(content).html("\n                    <img style=\"height:4em;\" src=\"" + pxt.appTarget.appTheme.docsLogo + "\" />\n                    <h1>" + lf("Oops") + "</h1>\n                    <h3>" + lf("We could not load the documentation, please check your internet connection.") + "</h3>\n                    <button class=\"ui button primary\" id=\"tryagain\">" + lf("Try Again") + "</button>");
                    $(content).find('#tryagain').click(function () {
                        render(doctype, src);
                    });
                    // notify parent iframe that docs weren't loaded
                    if (window.parent)
                        window.parent.postMessage({
                            type: "docfailed",
                            docType: doctype,
                            src: src
                        }, "*");
                }).finally(function () {
                    $(loading).hide();
                    $(content).show();
                })
                    .done(function () { });
            }
            function renderHash() {
                var m = /^#(doc|md|tutorial):([^&?:]+)(:([^&?:]+):([^&?:]+))?/i.exec(window.location.hash);
                if (m) {
                    // navigation occured
                    var p = m[4] ? setEditorContextAsync(/^blocks$/.test(m[4]) ? LanguageMode.Blocks : LanguageMode.TypeScript, m[5]) : Promise.resolve();
                    p.then(function () { return render(m[1], decodeURIComponent(m[2])); });
                }
            }
            window.addEventListener("message", receiveDocMessage, false);
            window.addEventListener("hashchange", function () {
                renderHash();
            }, false);
            parent.postMessage({ type: "sidedocready" }, "*");
            // delay load doc page to allow simulator to load first
            setTimeout(function () { return renderHash(); }, 1);
        }
        runner.startDocsServer = startDocsServer;
        function renderProjectAsync(content, projectid, template) {
            if (template === void 0) { template = "blocks"; }
            return pxt.Cloud.privateGetTextAsync(projectid + "/text")
                .then(function (txt) { return JSON.parse(txt); })
                .then(function (files) {
                var md = "```" + template + "\n" + files["main.ts"] + "\n```";
                return renderMarkdownAsync(content, md);
            });
        }
        runner.renderProjectAsync = renderProjectAsync;
        function renderDocAsync(content, docid) {
            docid = docid.replace(/^\//, "");
            return pxt.Cloud.downloadMarkdownAsync(docid, runner.editorLocale, pxt.Util.localizeLive)
                .then(function (md) { return renderMarkdownAsync(content, md, { path: docid }); });
        }
        var template = "\n<aside id=button class=box>\n   <a class=\"ui primary button\" href=\"@ARGS@\">@BODY@</a>\n</aside>\n\n<aside id=vimeo>\n<div class=\"ui two column stackable grid container\">\n<div class=\"column\">\n    <div class=\"ui embed mdvid\" data-source=\"vimeo\" data-id=\"@ARGS@\" data-placeholder=\"/thumbnail/1024/vimeo/@ARGS@\" data-icon=\"video play\">\n    </div>\n</div></div>\n</aside>\n\n<aside id=youtube>\n<div class=\"ui two column stackable grid container\">\n<div class=\"column\">\n    <div class=\"ui embed mdvid\" data-source=\"youtube\" data-id=\"@ARGS@\" data-placeholder=\"https://img.youtube.com/vi/@ARGS@/maxresdefault.jpg\">\n    </div>\n</div></div>\n</aside>\n\n<aside id=section>\n    <!-- section @ARGS@ -->\n</aside>\n\n<aside id=hide class=box>\n    <div style='display:none'>\n        @BODY@\n    </div>\n</aside>\n\n<aside id=avatar class=box>\n    <div class='avatar @ARGS@'>\n        <div class='avatar-image'></div>\n        <div class='ui compact message'>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n<aside id=hint class=box>\n    <div class=\"ui icon green message\">\n        <div class=\"content\">\n            <div class=\"header\">Hint</div>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n<!-- wrapped around ordinary content -->\n<aside id=main-container class=box>\n    <div class=\"ui text\">\n        @BODY@\n    </div>\n</aside>\n\n<!-- used for 'column' box - they are collected and wrapped in 'column-container' -->\n<aside id=column class=aside>\n    <div class='column'>\n        @BODY@\n    </div>\n</aside>\n<aside id=column-container class=box>\n    <div class=\"ui three column stackable grid text\">\n        @BODY@\n    </div>\n</aside>\n@breadcrumb@\n@body@";
        function renderMarkdownAsync(content, md, options) {
            if (options === void 0) { options = {}; }
            var path = options.path;
            var parts = (path || '').split('/');
            var bc = !path ? null : parts.map(function (e, i) {
                return {
                    href: "/" + parts.slice(0, i + 1).join("/"),
                    name: e
                };
            });
            var html = pxt.docs.renderMarkdown(template, md, pxt.appTarget.appTheme, null, bc);
            $(content).html(html);
            $(content).find('a').attr('target', '_blank');
            return pxt.runner.renderAsync({
                blocksAspectRatio: 0.5,
                snippetClass: 'lang-blocks',
                signatureClass: 'lang-sig',
                blocksClass: 'lang-block',
                shuffleClass: 'lang-shuffle',
                simulatorClass: 'lang-sim',
                linksClass: 'lang-cards',
                namespacesClass: 'lang-namespaces',
                codeCardClass: 'lang-codecard',
                packageClass: 'lang-package',
                projectClass: 'lang-project',
                snippetReplaceParent: true,
                simulator: true,
                hex: true,
                tutorial: !!options.tutorial,
                showJavaScript: runner.languageMode == LanguageMode.TypeScript,
                hexName: pxt.appTarget.id
            }).then(function () {
                // patch a elements
                $(content).find('a[href^="/"]').removeAttr('target').each(function (i, a) {
                    $(a).attr('href', '#doc:' + $(a).attr('href').replace(/^\//, ''));
                });
                // enable embeds
                $(content).find('.ui.embed').embed();
            });
        }
        runner.renderMarkdownAsync = renderMarkdownAsync;
        function renderTutorialAsync(content, tutorialid, step) {
            tutorialid = tutorialid.replace(/^\//, "");
            return pxt.Cloud.downloadMarkdownAsync(tutorialid, runner.editorLocale, pxt.Util.localizeLive)
                .then(function (tutorialmd) {
                var steps = tutorialmd.split(/\###.*(?!$)/i);
                if (steps.length < 1)
                    return;
                var options = steps[0];
                steps = steps.slice(1, steps.length);
                // Extract toolbox block ids
                var uptoSteps = steps.slice(0, step + 1).join();
                uptoSteps = uptoSteps.replace(/((?!.)\s)+/g, "\n");
                var regex = /```(sim|block|blocks|shuffle)\n([\s\S]*?)\n```/gmi;
                var match;
                var code = '';
                while ((match = regex.exec(uptoSteps)) != null) {
                    code += match[2] + "\n";
                }
                // Render current step
                return renderMarkdownAsync(content, steps[step], { tutorial: true })
                    .then(function () {
                    if (code == '')
                        return;
                    // Convert all blocks to blocks
                    return pxt.runner.decompileToBlocksAsync(code, {
                        emPixels: 14,
                        layout: pxt.blocks.BlockLayout.Flow,
                        package: undefined
                    }).then(function (r) {
                        var blocksxml = r.compileBlocks.outfiles['main.blocks'];
                        var toolboxSubset = {};
                        if (blocksxml) {
                            var headless = pxt.blocks.loadWorkspaceXml(blocksxml);
                            var allblocks = headless.getAllBlocks();
                            for (var bi = 0; bi < allblocks.length; ++bi) {
                                var blk = allblocks[bi];
                                toolboxSubset[blk.type] = 1;
                            }
                        }
                        if (toolboxSubset != {}) {
                            window.parent.postMessage({
                                type: "tutorial",
                                tutorial: tutorialid,
                                subtype: "steploaded",
                                data: toolboxSubset,
                                location: "bottom"
                            }, "*");
                        }
                    });
                });
            });
        }
        runner.renderTutorialAsync = renderTutorialAsync;
        function decompileToBlocksAsync(code, options) {
            return loadPackageAsync(options && options.package ? "docs:" + options.package : null, code)
                .then(function () { return getCompileOptionsAsync(pxt.appTarget.compile ? pxt.appTarget.compile.hasHex : false); })
                .then(function (opts) {
                // compile
                opts.fileSystem["main.ts"] = code;
                opts.ast = true;
                var resp = pxtc.compile(opts);
                if (resp.diagnostics && resp.diagnostics.length > 0)
                    resp.diagnostics.forEach(function (diag) { return console.error(diag.messageText); });
                if (!resp.success)
                    return Promise.resolve({ compileJS: resp });
                // decompile to blocks
                var apis = pxtc.getApiInfo(resp.ast);
                return ts.pxtc.localizeApisAsync(apis, runner.mainPkg)
                    .then(function () {
                    var blocksInfo = pxtc.getBlocksInfo(apis);
                    pxt.blocks.initBlocks(blocksInfo);
                    var bresp = pxtc.decompiler.decompileToBlocks(blocksInfo, resp.ast.getSourceFile("main.ts"), { snippetMode: options && options.snippetMode });
                    if (bresp.diagnostics && bresp.diagnostics.length > 0)
                        bresp.diagnostics.forEach(function (diag) { return console.error(diag.messageText); });
                    if (!bresp.success)
                        return { compileJS: resp, compileBlocks: bresp };
                    pxt.debug(bresp.outfiles["main.blocks"]);
                    return {
                        compileJS: resp,
                        compileBlocks: bresp,
                        blocksSvg: pxt.blocks.render(bresp.outfiles["main.blocks"], options)
                    };
                });
            });
        }
        runner.decompileToBlocksAsync = decompileToBlocksAsync;
        runner.initCallbacks = [];
        function init() {
            initInnerAsync()
                .done(function () {
                for (var i = 0; i < runner.initCallbacks.length; ++i) {
                    runner.initCallbacks[i]();
                }
            });
        }
        runner.init = init;
        function windowLoad() {
            var f = window.ksRunnerWhenLoaded;
            if (f)
                f();
        }
        windowLoad();
    })(runner = pxt.runner || (pxt.runner = {}));
})(pxt || (pxt = {}));
