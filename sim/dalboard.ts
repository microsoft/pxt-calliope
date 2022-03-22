/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/core/dal.d.ts"/>
/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim {
    export class DalBoard extends CoreBoard
        implements CommonBoard
        , RadioBoard
        , LightBoard
        , MicrophoneBoard
        , ControlMessageBoard {
        // state & update logic for component services
        ledMatrixState: LedMatrixState;
        edgeConnectorState: EdgeConnectorState;
        serialState: SerialState;
        accelerometerState: AccelerometerState;
        compassState: CompassState;
        thermometerState: ThermometerState;
        lightSensorState: LightSensorState;
        buttonPairState: ButtonPairState;
        radioState: RadioState;
        microphoneState: AnalogSensorState;
        lightState: pxt.Map<CommonNeoPixelState>;
        rgbLedState: number;
        speakerState: SpeakerState;
        fileSystem: FileSystemState;
        logoTouch: Button;
        speakerEnabled: boolean = true;
        controlMessageState: ControlMessageState;

        // visual
        viewHost: visuals.BoardHost;
        view: SVGElement;

        // board hardware version
        hardwareVersion = 1;

        constructor() {
            super()

            // components
            this.lightState = {};
            this.fileSystem = new FileSystemState();
            this.controlMessageState = new ControlMessageState(this);
            this.builtinParts["ledmatrix"] = this.ledMatrixState = new LedMatrixState(runtime);
            this.builtinParts["buttonpair"] = this.buttonPairState = new ButtonPairState({
                ID_BUTTON_A: DAL.MICROBIT_ID_BUTTON_A,
                ID_BUTTON_B: DAL.MICROBIT_ID_BUTTON_B,
                ID_BUTTON_AB: DAL.MICROBIT_ID_BUTTON_AB,
                BUTTON_EVT_UP: DAL.MICROBIT_BUTTON_EVT_UP,
                BUTTON_EVT_CLICK: DAL.MICROBIT_BUTTON_EVT_CLICK
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: [
                    DAL.MICROBIT_ID_IO_P12,
                    DAL.MICROBIT_ID_IO_P0,
                    DAL.MICROBIT_ID_IO_P1,
                    DAL.MICROBIT_ID_IO_P16,
                    DAL.MICROBIT_ID_IO_P2,
                    DAL.MICROBIT_ID_IO_P3,
                    DAL.MICROBIT_ID_IO_P4,
                    DAL.MICROBIT_ID_IO_P5,
                    DAL.MICROBIT_ID_IO_P6,
                    DAL.MICROBIT_ID_IO_P7,
                    DAL.MICROBIT_ID_IO_P8,
                    DAL.MICROBIT_ID_IO_P9,
                    DAL.MICROBIT_ID_IO_P10,
                    DAL.MICROBIT_ID_IO_P11, 
                    DAL.MICROBIT_ID_IO_P13,
                    DAL.MICROBIT_ID_IO_P14,
                    DAL.MICROBIT_ID_IO_P15,
                    0,
                    0,
                    DAL.MICROBIT_ID_IO_P19,
                    DAL.MICROBIT_ID_IO_P20,
                    DAL.MICROBIT_ID_IO_P21
                ],
                servos: {
                    "P0": DAL.MICROBIT_ID_IO_P12,
                    "P1": DAL.MICROBIT_ID_IO_P0,
                    "P2": DAL.MICROBIT_ID_IO_P1,
                    "P3": DAL.MICROBIT_ID_IO_P16
                }
            });
            this.builtinParts["radio"] = this.radioState = new RadioState(runtime, this, {
                ID_RADIO: DAL.MICROBIT_ID_RADIO,
                RADIO_EVT_DATAGRAM: DAL.MICROBIT_RADIO_EVT_DATAGRAM
            });
            this.builtinParts["microphone"] = this.microphoneState = new AnalogSensorState(3001 /* DEVICE_ID_MICROPHONE */, 0, 255, 75, 180);
            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
            this.builtinParts["serial"] = this.serialState = new SerialState(runtime, this);
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new LightSensorState();
            this.builtinParts["compass"] = this.compassState = new CompassState();
            this.builtinParts["speaker"] = this.speakerState = new SpeakerState();
            this.builtinParts["microservo"] = this.edgeConnectorState;

            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["ledmatrix"] = () => new visuals.LedMatrixView();
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();

            this.builtinParts["neopixel"] = (pin: Pin) => { return this.neopixelState(pin.id); };
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView(pxsim.parsePinString);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);

            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["ledmatrix"] = (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8);
            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);
        }

        ensureHardwareVersion(version: number) {
            if (version > this.hardwareVersion) {
                this.hardwareVersion = version;
                this.updateView();
            }
        }


        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const v2Parts: pxt.Map<boolean> = { 
                "microphone": true, 
                "logotouch": true, 
                "builtinspeaker": true,
                "v2": true
            };
            if (msg.builtinParts) {
                const v2PartsUsed = msg.builtinParts.filter(k => v2Parts[k])
                if (v2PartsUsed.length) {
                    console.log(`detected v2 feature`, v2PartsUsed);
                    cmpsList.push(...v2PartsUsed);
                    this.hardwareVersion = 2;
                }
            }

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
                highContrast: msg.highContrast
            };

            this.viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual,
                boardDef: boardDef,
                highContrast: msg.highContrast
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(this.view = this.viewHost.getView());

            return Promise.resolve();
        }

        tryGetNeopixelState(pinId: number): CommonNeoPixelState {
            return this.lightState[pinId];
        }

        neopixelState(pinId: number): CommonNeoPixelState {
            if (pinId === undefined) {
                pinId = DAL.MICROBIT_ID_IO_P0;
            }
            let state = this.lightState[pinId];
            if (!state) state = this.lightState[pinId] = new CommonNeoPixelState();
            return state;
        }

        screenshotAsync(width?: number): Promise<ImageData> {
            return this.viewHost.screenshotAsync(width);
        }
    }

    export function initRuntimeWithDalBoard() {
        U.assert(!runtime.board);
        let b = new DalBoard();
        runtime.board = b;
        runtime.postError = (e) => {
            led.setBrightness(255);
            let img = board().ledMatrixState.image;
            img.clear();
            img.set(0, 4, 255);
            img.set(1, 3, 255);
            img.set(2, 3, 255);
            img.set(3, 3, 255);
            img.set(4, 4, 255);
            img.set(0, 0, 255);
            img.set(1, 0, 255);
            img.set(0, 1, 255);
            img.set(1, 1, 255);
            img.set(3, 0, 255);
            img.set(4, 0, 255);
            img.set(3, 1, 255);
            img.set(4, 1, 255);
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }

    export function board(): DalBoard {
        return runtime.board as DalBoard;
    }

    export function parsePinString(gpioPin: string): Pin {
        if (gpioPin == "*")
            return board().edgeConnectorState.getPin(DAL.MICROBIT_ID_IO_P0);

        const m = /^(Analog|Digital)Pin\.P(\d)+/.exec(gpioPin);
        if (!m)
            return undefined;
        const pinNum = parseInt(m[2]);
        return board().edgeConnectorState.pins[pinNum]
    }
}