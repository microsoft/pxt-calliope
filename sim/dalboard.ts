/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/core/dal.d.ts"/>
/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim {
    export class DalBoard extends CoreBoard
        implements CommonBoard
        , RadioBoard
        , LightBoard
        , MicrophoneBoard
        , ControlMessageBoard
        , samples.SampleBoard {
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
        microphoneState: MicrophoneState;
        recordingState: RecordingState;
        lightState: pxt.Map<CommonNeoPixelState>;
        rgbLedState: number;
        rgbLedLeftState: number;
        rgbLedRightState: number;
        speakerState: SpeakerState;
        fileSystem: FileSystemState;
        logoTouch: Button;
        speakerEnabled: boolean = true;
        controlMessageState: ControlMessageState;
        samplesState: samples.SamplesState;

        // visual
        viewHost: visuals.BoardHost;
        view: SVGElement;

        // board hardware version
        hardwareVersion = 3;
        // Per-channel motor usage [M0, M1], derived at load from the tracked Motor argument
        // (motors.dualMotorPower trackArgs=0); drives which v3 motor(s) the simulator displays.
        motorUsed: boolean[] = [false, false];
        // True when the program uses the v1/v2 single-motor block (motors.motorPower, trackArgs=0);
        // drives the v2 single-motor visualization (the v3 dualMotorPower block does NOT show on v2).
        singleMotorUsed: boolean = false;

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
                    DAL.MICROBIT_ID_IO_P0,
                    DAL.MICROBIT_ID_IO_P1,
                    DAL.MICROBIT_ID_IO_P2,
                    DAL.MICROBIT_ID_IO_P3,
                    DAL.MICROBIT_ID_LOGO,
                    DAL.MICROBIT_ID_IO_P4,
                    DAL.MICROBIT_ID_IO_P5,
                    DAL.MICROBIT_ID_IO_P6,
                    DAL.MICROBIT_ID_IO_P7,
                    DAL.MICROBIT_ID_IO_P8,
                    DAL.MICROBIT_ID_IO_P9,
                    DAL.MICROBIT_ID_IO_P10,
                    DAL.MICROBIT_ID_IO_P11,
                    DAL.MICROBIT_ID_IO_P12,
                    DAL.MICROBIT_ID_IO_P13, 
                    DAL.MICROBIT_ID_IO_P14,
                    DAL.MICROBIT_ID_IO_P15,
                    DAL.MICROBIT_ID_IO_P16, // A1_RX
                    DAL.MICROBIT_ID_IO_P17, // C17 (A1 TX)
                    DAL.MICROBIT_ID_IO_P18, // C18
                    DAL.MICROBIT_ID_IO_P19, // A0_SCL
                    DAL.MICROBIT_ID_IO_P20, // A0_SDA
                    // Calliope mini v3 motor-driver pins — registered so the simulator
                    // captures motors.dualMotorPower() pin writes and can visualize them.
                    DAL.MICROBIT_ID_IO_M_A_IN1, // M0_DIR   = 152
                    DAL.MICROBIT_ID_IO_M_A_IN2, // M0_SPEED = 153
                    DAL.MICROBIT_ID_IO_M_B_IN1, // M1_DIR   = 154
                    DAL.MICROBIT_ID_IO_M_B_IN2, // M1_SPEED = 155
                    DAL.MICROBIT_ID_IO_M_MODE   // M_MODE   = 156
                ],
                servos: {
                    // All GPIO pins can drive a servo; a servo on a pin missing from this map
                    // resolves to an undefined pin and crashes MicroServoView.updateState().
                    // Keys are enum MEMBER names (pxsim.readPin returns the part after the
                    // dot), so every DigitalPin/AnalogPin alias needs its own entry: the
                    // P names, the C names (C4=P4 …), and the serial/I2C A-names.
                    "P0": DAL.MICROBIT_ID_IO_P0,
                    "P1": DAL.MICROBIT_ID_IO_P1,
                    "P2": DAL.MICROBIT_ID_IO_P2,
                    "P3": DAL.MICROBIT_ID_IO_P3,
                    "P4": DAL.MICROBIT_ID_IO_P4,
                    "P5": DAL.MICROBIT_ID_IO_P5,
                    "P6": DAL.MICROBIT_ID_IO_P6,
                    "P7": DAL.MICROBIT_ID_IO_P7,
                    "P8": DAL.MICROBIT_ID_IO_P8,
                    "P9": DAL.MICROBIT_ID_IO_P9,
                    "P10": DAL.MICROBIT_ID_IO_P10,
                    "P11": DAL.MICROBIT_ID_IO_P11,
                    "P12": DAL.MICROBIT_ID_IO_P12,
                    "P13": DAL.MICROBIT_ID_IO_P13,
                    "P14": DAL.MICROBIT_ID_IO_P14,
                    "P15": DAL.MICROBIT_ID_IO_P15,
                    "P16": DAL.MICROBIT_ID_IO_P16,
                    "P17": DAL.MICROBIT_ID_IO_P17,
                    "P18": DAL.MICROBIT_ID_IO_P18,
                    "P19": DAL.MICROBIT_ID_IO_P19,
                    "P20": DAL.MICROBIT_ID_IO_P20,
                    "C4": DAL.MICROBIT_ID_IO_P4,
                    "C5": DAL.MICROBIT_ID_IO_P5,
                    "C6": DAL.MICROBIT_ID_IO_P6,
                    "C7": DAL.MICROBIT_ID_IO_P7,
                    "C8": DAL.MICROBIT_ID_IO_P8,
                    "C9": DAL.MICROBIT_ID_IO_P9,
                    "C10": DAL.MICROBIT_ID_IO_P10,
                    "C11": DAL.MICROBIT_ID_IO_P11,
                    "C12": DAL.MICROBIT_ID_IO_P12,
                    "C13": DAL.MICROBIT_ID_IO_P13,
                    "C14": DAL.MICROBIT_ID_IO_P14,
                    "C15": DAL.MICROBIT_ID_IO_P15,
                    "C16": DAL.MICROBIT_ID_IO_P16,
                    "C17": DAL.MICROBIT_ID_IO_P17,
                    "C18": DAL.MICROBIT_ID_IO_P18,
                    "C19": DAL.MICROBIT_ID_IO_P19,
                    "C20": DAL.MICROBIT_ID_IO_P20,
                    "A1_RX": DAL.MICROBIT_ID_IO_P16,
                    "A1_TX": DAL.MICROBIT_ID_IO_P17,
                    "A0_SCL": DAL.MICROBIT_ID_IO_P19,
                    "A0_SDA": DAL.MICROBIT_ID_IO_P20
                }
            });
            this.builtinParts["radio"] = this.radioState = new RadioState(runtime, this, {
                ID_RADIO: DAL.MICROBIT_ID_RADIO,
                RADIO_EVT_DATAGRAM: DAL.MICROBIT_RADIO_EVT_DATAGRAM
            });
            this.builtinParts["microphone"] = this.microphoneState = new MicrophoneState(DAL.DEVICE_ID_MICROPHONE, 0, 255, 75, 180);
            this.builtinParts["recording"] = this.recordingState = new RecordingState();
            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
            this.builtinParts["serial"] = this.serialState = new SerialState(runtime, this);
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new LightSensorState();
            this.builtinParts["compass"] = this.compassState = new CompassState();
            this.builtinParts["speaker"] = this.speakerState = new SpeakerState();
            this.builtinParts["microservo"] = this.edgeConnectorState;
            // Onboard motor driver: state-only part (drawn on the board, no breadboard visual).
            // Registered so a parts="motor" program resolves cleanly and we can detect it at load.
            this.builtinParts["motor"] = this.edgeConnectorState;
            this.builtinParts["logotouch"] = this.logoTouch = new Button(DAL.MICROBIT_ID_LOGO);

            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["ledmatrix"] = () => new visuals.LedMatrixView();
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();

            this.builtinParts["neopixel"] = (pin: Pin) => { return this.neopixelState(pin.id); };
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView(pxsim.parsePinString);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);

            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["ledmatrix"] = (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8);
            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);

            this.samplesState = new samples.SamplesState();
        }

        // Board revision implied by a device connected over WebUSB, or 0 when none is.
        //
        // With "matchWebUSBDeviceInSim" set in pxtarget.json, pxt-core puts the connected
        // device's compile variant into the run message's `theme` field (it is the value of
        // PacketIOWrapper.devVariant). editor/flash.ts reports "mbcodal" for a mini v3 (the
        // DAPLink board id is probed in DAPWrapper.reconnectAsync) and "mbdal" for a v1/v2
        // (a v2 is a SEGGER J-Link; a v1 is a non-CODAL DAPLink).
        //
        // Note the sim only models two revisions, v2 and v3, so a v1 renders as the v2 board
        // -- which is correct as far as the simulated feature set goes, since v1 and v2 share
        // the mbdal build.
        static hardwareVersionFromTheme(theme: string | pxt.Map<string>): number {
            const variant = typeof theme === "string" ? theme : undefined;
            if (variant === "mbcodal") return 3;
            if (variant === "mbdal") return 2;
            return 0;
        }

        // Revision passed to control.simulatorBoardVersion(), read from the tracked
        // compile-time arguments (trackArgs=0), or 0 when the program does not call it.
        static requestedBoardVersion(fnArgs: any): number {
            if (!fnArgs) return 0;
            for (const k of Object.keys(fnArgs)) {
                if (k.indexOf("simulatorBoardVersion") < 0) continue;
                const calls = fnArgs[k];
                if (!calls || !calls.length) continue;
                // tracked value is the string literal, e.g. "v2" (a non-literal arrives as "*")
                const v = parseInt(("" + calls[0]).replace(/[^0-9]/g, ""));
                if (v === 1 || v === 2) return 2; // v1 and v2 share the v2 board
                if (v === 3) return 3;
            }
            return 0;
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
            // Calliope mini simulator revision (v2/v3): the board connected over WebUSB if
            // there is one (editor/flash.ts restarts the sim when it changes), else a revision
            // requested by the program via control.simulatorBoardVersion() (docs pages),
            // otherwise v3.
            this.hardwareVersion = DalBoard.hardwareVersionFromTheme(msg.theme)
                || DalBoard.requestedBoardVersion(fnArgs)
                || 3;

            // Show, from sim start, only the motor channel(s) the program actually uses — derived
            // from the tracked Motor argument of motors.dualMotorPower (trackArgs=0). Each tracked
            // callsite value is parsed for M0 / M1 / M0_M1 (name or numeric 0/1/2 encoding).
            this.motorUsed = [false, false];
            if (fnArgs) {
                Object.keys(fnArgs).forEach(k => {
                    if (k.indexOf("dualMotorPower") < 0) return;
                    const calls = fnArgs[k];
                    if (!calls || !calls.forEach) return;
                    calls.forEach((c: any) => {
                        const s = ("" + c).trim();
                        if (s.indexOf("M0_M1") >= 0 || s === "2") { this.motorUsed[0] = true; this.motorUsed[1] = true; }
                        else if (s.indexOf("M1") >= 0 || s === "1") { this.motorUsed[1] = true; }
                        else if (s.indexOf("M0") >= 0 || s === "0") { this.motorUsed[0] = true; }
                    });
                });
            }
            // Fallback: program uses motors but the channel couldn't be resolved -> show both.
            const anyMotor = (cmpsList && cmpsList.indexOf("motor") >= 0)
                || (msg.builtinParts && msg.builtinParts.indexOf("motor") >= 0);
            if (anyMotor && !this.motorUsed[0] && !this.motorUsed[1])
                this.motorUsed = [true, true];

            // The v1/v2 single-motor block (motors.motorPower, trackArgs=0) is the only thing that
            // shows a motor on the v2 board. Detect it separately from dualMotorPower: its fnArgs
            // key contains "motorPower" but not "dualMotorPower".
            this.singleMotorUsed = false;
            if (fnArgs)
                this.singleMotorUsed = Object.keys(fnArgs).some(k =>
                    k.indexOf("motorPower") >= 0 && k.indexOf("dualMotorPower") < 0);

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
            if (shouldShowMute()) {
                document.body.appendChild(createMuteButton());
                AudioContextManager.mute(true);
                setParentMuteState("disabled");
            }
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

        kill() {
            super.kill();
            this.viewHost.removeEventListeners();
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