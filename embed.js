(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-calliope/",
    "workerjs": "/pxt-calliope/worker.js",
    "tdworkerjs": "/pxt-calliope/tdworker.js",
    "monacoworkerjs": "/pxt-calliope/monacoworker.js",
    "pxtVersion": "1.0.20",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-calliope/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetCdnUrl": "/pxt-calliope/",
    "targetUrl": "",
    "simUrl": "/pxt-calliope/simulator.html",
    "partsUrl": "/pxt-calliope/siminstructions.html",
    "runUrl": "/pxt-calliope/run.html",
    "docsUrl": "/pxt-calliope/docs.html",
    "isStatic": true
};

    var appCdnRoot = "/pxt-calliope/";
    var scripts = [
        "highlight.js/highlight.pack.js",
        "bluebird.min.js",
        "typescript.js",
        "semantic.js",
        "marked/marked.min.js",
        "lzma/lzma_worker-min.js",
        "blockly/blockly_compressed.js",
        "blockly/blocks_compressed.js",
        "blockly/msg/js/en.js",
        "pxtlib.js",
        "pxtblocks.js",
        "pxteditor.js",
        "pxtsim.js",
        "target.js",
        "pxtrunner.js"
    ].map(function(s) { return appCdnRoot + s; })

    if (typeof jQuery == "undefined")
        scripts.unshift(appCdnRoot + "jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
