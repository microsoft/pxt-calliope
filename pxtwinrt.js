/// <reference path="../typings/globals/bluebird/index.d.ts"/>
/// <reference path="../typings/globals/winrt/index.d.ts"/>
/// <reference path="../built/pxtlib.d.ts"/>
var pxt;
(function (pxt) {
    var winrt;
    (function (winrt) {
        function deployCoreAsync(res) {
            var drives = pxt.appTarget.compile.deployDrives;
            pxt.Util.assert(!!drives);
            pxt.log("deploying to drives " + drives);
            var drx = new RegExp(drives);
            var r = res.outfiles[pxtc.BINARY_HEX];
            function writeAsync(folder) {
                pxt.log("writing .hex to " + folder.displayName);
                return pxt.winrt.promisify(folder.createFileAsync("firmware.hex", Windows.Storage.CreationCollisionOption.replaceExisting)
                    .then(function (file) { return Windows.Storage.FileIO.writeTextAsync(file, r); })).then(function (r) { }).catch(function (e) {
                    pxt.log("failed to write to " + folder.displayName + " - " + e);
                });
            }
            return pxt.winrt.promisify(Windows.Storage.KnownFolders.removableDevices.getFoldersAsync())
                .then(function (ds) {
                var df = ds.filter(function (d) { return drx.test(d.displayName); });
                var pdf = df.map(writeAsync);
                var all = Promise.join.apply(Promise, pdf);
                return all;
            }).then(function (r) { });
        }
        winrt.deployCoreAsync = deployCoreAsync;
        function browserDownloadAsync(text, name, contentType) {
            var file;
            return pxt.winrt.promisify(Windows.Storage.ApplicationData.current.temporaryFolder.createFileAsync(name, Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (f) { return Windows.Storage.FileIO.writeTextAsync(file = f, text); })
                .then(function () { return Windows.System.Launcher.launchFileAsync(file); })
                .then(function (b) { }));
        }
        winrt.browserDownloadAsync = browserDownloadAsync;
    })(winrt = pxt.winrt || (pxt.winrt = {}));
})(pxt || (pxt = {}));
/// <reference path="../typings/globals/winrt/index.d.ts"/>
var pxt;
(function (pxt) {
    var winrt;
    (function (winrt) {
        var watcher;
        var ports = {};
        var options;
        function initSerial() {
            if (!pxt.appTarget.serial
                || !pxt.appTarget.serial.log
                || !pxt.appTarget.serial.nameFilter)
                return;
            var filter = new RegExp(pxt.appTarget.serial.nameFilter);
            var serialDeviceSelector = Windows.Devices.SerialCommunication.SerialDevice.getDeviceSelector();
            // Create a device watcher to look for instances of the Serial device
            // The createWatcher() takes a string only when you provide it two arguments, so be sure to include an array as a second 
            // parameter (JavaScript can only recognize overloaded functions with different numbers of parameters).
            watcher = Windows.Devices.Enumeration.DeviceInformation.createWatcher(serialDeviceSelector, []);
            watcher.addEventListener("added", function (dis) {
                winrt.toArray(dis.detail).forEach(function (di) {
                    if (!filter.test(di.name))
                        return;
                    pxt.debug("serial port added " + di.name + " - " + di.id);
                    ports[di.id] = {
                        info: di
                    };
                    Windows.Devices.SerialCommunication.SerialDevice.fromIdAsync(di.id)
                        .done(function (dev) {
                        ports[di.id].device = dev;
                        startDevice(di.id);
                    });
                });
            });
            watcher.addEventListener("removed", function (dis) {
                winrt.toArray(dis.detail).forEach(function (di) { return delete ports[di.id]; });
            });
            watcher.addEventListener("updated", function (dis) {
                winrt.toArray(dis.detail).forEach(function (di) { return ports[di.id] ? ports[di.id].info.update(di.info) : null; });
            });
            watcher.start();
        }
        winrt.initSerial = initSerial;
        function startDevice(id) {
            var port = ports[id];
            if (!port)
                return;
            if (!port.device) {
                var status_1 = Windows.Devices.Enumeration.DeviceAccessInformation.createFromId(id).currentStatus;
                pxt.debug("device issue: " + status_1);
                return;
            }
            port.device.baudRate = 115200;
            var stream = port.device.inputStream;
            var reader = new Windows.Storage.Streams.DataReader(stream);
            var readMore = function () { return reader.loadAsync(32).done(function (bytesRead) {
                var msg = reader.readString(Math.floor(bytesRead / 4) * 4);
                window.postMessage({
                    type: 'serial',
                    data: msg,
                    id: id
                }, "*");
                readMore();
            }, function (e) {
                setTimeout(function () { return startDevice(id); }, 1000);
            }); };
            readMore();
        }
    })(winrt = pxt.winrt || (pxt.winrt = {}));
})(pxt || (pxt = {}));
/// <reference path="../typings/globals/bluebird/index.d.ts"/>
var pxt;
(function (pxt) {
    var winrt;
    (function (winrt) {
        function promisify(p) {
            return new Promise(function (resolve, reject) {
                p.done(function (v) { return resolve(v); }, function (e) { return reject(e); });
            });
        }
        winrt.promisify = promisify;
        function toArray(v) {
            var r = [];
            var length = v.length;
            for (var i = 0; i < length; ++i)
                r.push(v[i]);
            return r;
        }
        winrt.toArray = toArray;
        /**
         * Detects if the script is running in a browser on windows
         */
        function isWindows() {
            return !!navigator && /Win32/i.test(navigator.platform);
        }
        winrt.isWindows = isWindows;
        function isWinRT() {
            return typeof Windows !== "undefined";
        }
        winrt.isWinRT = isWinRT;
        function initAsync(onHexFileImported) {
            if (!isWinRT())
                return Promise.resolve();
            winrt.initSerial();
            if (onHexFileImported)
                initActivation(onHexFileImported);
            return Promise.resolve();
        }
        winrt.initAsync = initAsync;
        function initActivation(onHexFileImported) {
            // Subscribe to the Windows Activation Event
            Windows.UI.WebUI.WebUIApplication.addEventListener("activated", function (args) {
                var activation = Windows.ApplicationModel.Activation;
                if (args.kind === activation.ActivationKind.file) {
                    var info = args;
                    var file = info.files.getAt(0);
                    if (file && file.isOfType(Windows.Storage.StorageItemTypes.file)) {
                        var f = file;
                        Windows.Storage.FileIO.readBufferAsync(f)
                            .done(function (buffer) {
                            var ar = new Uint8Array(buffer.length);
                            var dataReader = Windows.Storage.Streams.DataReader.fromBuffer(buffer);
                            dataReader.readBytes(ar);
                            dataReader.close();
                            pxt.cpp.unpackSourceFromHexAsync(ar)
                                .done(function (hex) { return onHexFileImported(hex); });
                        });
                    }
                }
                ;
            });
        }
    })(winrt = pxt.winrt || (pxt.winrt = {}));
})(pxt || (pxt = {}));
