namespace pxsim.visuals {
    const MB_STYLE = `
        svg.sim {
            margin-bottom:1em;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button {
            pointer-events: none;
        }

        .sim-button-outer:hover {
            stroke:grey;
            stroke-width: 3px;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
        .sim-pin:hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }

        .sim-pin-touch.touched:hover {
            stroke:darkorange;
        }

        .sim-led-back:hover {
            stroke:#a0a0a0;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }

        .sim-light-level-button {
            stroke:#fff;
            stroke-width: 3px;
        }

        .sim-antenna {
            stroke:#555;
            stroke-width: 2px;
        }

        .sim-text {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:16px;
        fill:#fff;
        pointer-events: none;
        }
        .sim-text.inverted {
            fill:#000;
        }

        .sim-text-pin {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:20px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 3px;
        }

        /* animations */
        .sim-theme-glow {
            animation-name: sim-theme-glow-animation;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
        }
        @keyframes sim-theme-glow-animation {
            from { opacity: 1; }
            to   { opacity: 0.75; }
        }

        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            fill: none;
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
        .sim-wireframe .sim-board {
            stroke-width: 2px;
        }
    `;
    const pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6, 188.9, 201.3, 213.6, 275.2, 287.5, 299.8, 312.1, 324.5, 385.1, 397.4, 409.7, 422];
    const pins4onMids = pins4onXs.map(x => x + 5);
    const littlePinDist = pins4onMids[1] - pins4onMids[0];
    const bigPinWidth = pins4onMids[4] - pins4onMids[3];
    const pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
    const pin3mid = pin0mid - bigPinWidth / 2.0;
    const pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
    const pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
    const pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
    const pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
    const pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = [
        "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
        "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"];
    const pinTitles = [
        "P0, ANALOG IN",
        "P1, ANALOG IN",
        "P2, ANALOG IN",
        "P3, ANALOG IN, LED Col 1",
        "P4, ANALOG IN, LED Col 2",
        "P5, BUTTON A",
        "P6, LED Col 9",
        "P7, LED Col 8",
        "P8",
        "P9, LED Col 7",
        "P10, ANALOG IN, LED Col 3",
        "P11, BUTTON B",
        "P12, RESERVED ACCESSIBILITY",
        "P13, SPI - SCK",
        "P14, SPI - MISO",
        "P15, SPI - MOSI",
        "P16, SPI - Chip Select",
        "P17, +3v3",
        "P18, +3v3",
        "P19, I2C - SCL",
        "P20, I2C - SDA",
        "GND", "GND", "+3v3", "GND"
    ];
    const MB_WIDTH = 340;
    const MB_HEIGHT = 312;
    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUp?: string;
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE"].map(accent => {
        return {
            accent: accent,
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7777",
            ledOff: "#666",
            buttonOuter: "#979797",
            buttonUp: "#000",
            buttonDown: "#FFA500",
            virtualButtonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "yellow",
            lightLevelOff: "#555"
        }
    });

    export function randomTheme(): IBoardTheme {
        return themes[Math.floor(Math.random() * themes.length)];
    }

    export interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
        wireframe?: boolean;
    }

    export class MicrobitBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;

        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        private pins: SVGElement[];
        private pinGradients: SVGLinearGradientElement[];
        private pinTexts: SVGTextElement[];
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private systemLed: SVGCircleElement;
        private antenna: SVGPolylineElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerText: SVGTextElement;
        private shakeButton: SVGElement;
        public board: pxsim.DalBoard;
        private pinNmToCoord: Map<Coord> = {};
        private rgbLed: SVGElement;

        constructor(public props: IBoardProps) {
            this.recordPinCoords();
            this.buildDom();
            if (props && props.wireframe)
                svg.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
                this.attachEvents();
            }
        }

        public getView(): SVGAndSize<SVGSVGElement> {
            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            return this.pinNmToCoord[pinNm];
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return littlePinDist * 1.7;
        }

        public recordPinCoords() {
            const pinsY = 356.7 + 40;
            pinNames.forEach((nm, i) => {
                let x = pinMids[i];
                this.pinNmToCoord[nm] = [x, pinsY];
            });
        }

        private updateTheme() {
            let theme = this.props.theme;

            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
            svg.fills(this.buttons.slice(0, 2), theme.buttonUp);
            svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
            svg.fill(this.buttons[2], theme.virtualButtonUp);

            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
            svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);

            svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
        }

        public updateState() {
            let state = this.board;
            if (!state) return;
            let theme = this.props.theme;

            let bpState = state.buttonPairState;
            let buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            buttons.forEach((btn, index) => {
                svg.fill(this.buttons[index], btn.pressed ? (btn.virtual ? theme.virtualButtonDown : theme.buttonDown) : (btn.virtual ? theme.virtualButtonUp : theme.buttonUp));
            });

            let bw = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw
            let img = state.ledMatrixState.image;
            this.leds.forEach((led, i) => {
                let sel = (<SVGStylable><any>led)
                sel.style.opacity = ((bw ? img.data[i] > 0 ? 255 : 0 : img.data[i]) / 255.0) + "";
            })
            this.updatePins();
            this.updateTilt();
            this.updateHeading();
            this.updateLightLevel();
            this.updateTemperature();
            this.updateButtonAB();
            this.updateGestures();
            this.updateRgbLed();

            if (!runtime || runtime.dead) svg.addClass(this.element, "grayscale");
            else svg.removeClass(this.element, "grayscale");
        }

        private updateRgbLed() {
            let state = this.board;
            if (state.rgbLedState) {
                if (!this.rgbLed)
                    this.rgbLed = svg.child(this.g, "circle", { cx: 170, cy: 200 });
                svg.fill(this.rgbLed, svg.toHtmlColor(state.rgbLedState));
            }
        }

        private updateGestures() {
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeButton) {
                let shake = this.mkBtn(40, 210);
                this.shakeButton = shake.inner;
                svg.fill(this.shakeButton, this.props.theme.virtualButtonUp)
                svg.buttonEvents(shake.outer,
                    ev => { },
                    (ev) => {
                        svg.fill(this.shakeButton, this.props.theme.virtualButtonDown)
                    },
                    (ev) => {
                        svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                        this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, 11); // GESTURE_SHAKE
                    }
                )
                let shakeText = svg.child(shake.outer, "text", { x: 25, y: 245, class: "sim-text inverted" }) as SVGTextElement;
                shakeText.textContent = "SHAKE"
            }
        }

        private updateButtonAB() {
            let state = this.board;
            if (state.buttonPairState.usesButtonAB && (<any>this.buttons[2]).style.visibility != "visible") {
                (<any>this.buttonsOuter[2]).style.visibility = "visible";
                (<any>this.buttons[2]).style.visibility = "visible";
                this.updateTheme();
            }
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;
            let text = this.pinTexts[index];
            let v = "";
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "1" : "0";
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = "";
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index], v);
        }

        private updateTemperature() {
            let state = this.board;
            if (!state || !state.thermometerState.usesTemperature) return;

            let tmin = -5;
            let tmax = 50;
            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(this.defs, gid);
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer",
                    x: 120,
                    y: 110,
                    width: 20,
                    height: 160,
                    rx: 5, ry: 5,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130 }) as SVGTextElement;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (260 - cur.y) / 140))
                        state.thermometerState.temperature = Math.floor(tmin + t * (tmax - tmin));
                        this.updateTemperature();
                    }, ev => { }, ev => { })
            }

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature))
            let per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
            this.thermometerText.textContent = t + "°C";
        }

        private updateHeading() {
            let xc = 258;
            let yc = 75;
            let state = this.board;
            if (!state || !state.compassState.usesHeading) return;
            /*
            if (!this.headInitialized) {
                let p = this.head.firstChild.nextSibling as SVGPathElement;
                p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                this.updateTheme();
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(
                    this.head,
                    (ev: MouseEvent) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        state.compassState.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI + 90);
                        if (state.compassState.heading < 0) state.compassState.heading += 360;
                        this.updateHeading();
                    });
                this.headInitialized = true;
            }

            let txt = state.compassState.heading.toString() + "°";
            if (txt != this.headText.textContent) {
                svg.rotateElement(this.head, xc, yc, state.compassState.heading + 180);
                this.headText.textContent = txt;
            } */
        }

        private lastFlashTime: number = 0;
        public flashSystemLed() {
            if (!this.systemLed)
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 95, cy: 73, r: 5 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private lastAntennaFlash: number = 0;
        public flashAntenna() {
            if (!this.antenna) {
                let ax = 380;
                let dax = 18;
                let ayt = 10;
                let ayb = 40;
                this.antenna = <SVGPolylineElement>svg.child(this.g, "polyline", { class: "sim-antenna", points: `${ax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt}` })
            }
            let now = Date.now();
            if (now - this.lastAntennaFlash > 200) {
                this.lastAntennaFlash = now;
                svg.animate(this.antenna, 'sim-flash-stroke')
            }
        }

        private updatePins() {
            let state = this.board;
            if (!state) return;

            state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
        }

        private updateLightLevel() {
            let state = this.board;
            if (!state || !state.lightSensorState.usesLightLevel) return;

            if (!this.lightLevelButton) {
                let gid = "gradient-light-level";
                this.lightLevelGradient = svg.linearGradient(this.defs, gid)
                let cy = 50;
                let r = 35;
                this.lightLevelButton = svg.child(this.g, "circle", {
                    cx: `50px`, cy: `${cy}px`, r: `${r}px`,
                    class: 'sim-light-level-button',
                    fill: `url(#${gid})`
                }) as SVGCircleElement;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.lightLevelButton,
                    (ev) => {
                        let pos = svg.cursorPoint(pt, this.element, ev);
                        let rs = r / 2;
                        let level = Math.max(0, Math.min(255, Math.floor((pos.y - (cy - rs)) / (2 * rs) * 255)));
                        if (level != this.board.lightSensorState.lightLevel) {
                            this.board.lightSensorState.lightLevel = level;
                            this.applyLightLevel();
                        }
                    }, ev => { },
                    ev => { })
                this.lightLevelText = svg.child(this.g, "text", { x: 85, y: cy + r - 5, text: '', class: 'sim-text' }) as SVGTextElement;
                this.updateTheme();
            }

            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.lightLevel * 100 / 255))) + '%')
            this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
        }

        private applyLightLevel() {
            let lv = this.board.lightSensorState.lightLevel;
            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%')
            this.lightLevelText.textContent = lv.toString();
        }

        private updateTilt() {
            if (this.props.disableTilt) return;
            let state = this.board;
            if (!state || !state.accelerometerState.accelerometer.isActive) return;

            let x = state.accelerometerState.accelerometer.getX();
            let y = state.accelerometerState.accelerometer.getY();
            let af = 8 / 1023;

            this.element.style.transform = "perspective(30em) rotateX(" + y * af + "deg) rotateY(" + x * af + "deg)"
            this.element.style.perspectiveOrigin = "50% 50% 50%";
            this.element.style.perspective = "30em";
        }

        private buildDom() {
            this.element = <SVGSVGElement>svg.elt("svg")
            this.element.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 340.2 311.8">
  <symbol id="b" viewBox="-122.3 -112.9 244.6 225.8">
    <use xlink:href="#a" width="298.9" height="263.3" x="-150.5" y="-131.7" transform="matrix(.82 0 0 .82 .67 -5.36)" overflow="visible"/>
    <path d="M-42.4-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-1 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-42.4-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.5-1-1-1z"/>
    <path d="M-35.2-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-1 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-35.2-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.5-1-1-1z"/>
    <path d="M-28-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-1 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-28-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.5-1-1-1z"/>
    <path d="M-20.9-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-20.9-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z"/>
    <path d="M-13.7-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-13.7-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z"/>
    <path d="M-6.5-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-6.5-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z"/>
    <path d="M.7-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M.7-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.5-.4-1-1-1z"/>
    <path d="M7.9-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M7.9-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z"/>
    <path d="M15.1-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M15.1-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z"/>
    <path d="M22.3-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M22.3-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z"/>
    <path d="M29.5-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M29.5-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1-.4-1-1-1z"/>
    <path d="M36.7-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M36.7-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z"/>
    <path d="M43.9-78.2c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1s-.9 2.1-2.1 2.1zm0-3.2c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M43.9-81.4c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.4-1-1-1z"/>
    <path d="M-42.4-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c0 1.2-1 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-42.4-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.5-1-1-1z"/>
    <path d="M-35.2-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1 0 1.2-1 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-35.2-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.5-1-1-1z"/>
    <path d="M-28-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1 0 1.2-1 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.5-1-1-1z" fill="#EFDA48"/>
    <path d="M-28-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.5-1-1-1z"/>
    <path d="M-20.9-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-20.9-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M-13.7-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-13.7-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M-6.5-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-6.5-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M.7-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M.7-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M7.9-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M7.9-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z"/>
    <path d="M15.1-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M15.1-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z"/>
    <path d="M22.3-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M22.3-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z"/>
    <path d="M29.5-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M29.5-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z"/>
    <path d="M36.7-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M36.7-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z"/>
    <path d="M43.9-71c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1 0 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M43.9-74.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z"/>
    <path d="M-13.7-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-13.7-60.3c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M-6.5-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M-6.5-60.3c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M.7-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M.7-60.3c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c.1-.6-.4-1-1-1z"/>
    <path d="M7.9-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M7.9-60.3c-.6 0-1 .5-1 1 0 .6.5 1 1 1s1-.5 1-1c0-.6-.4-1-1-1z"/>
    <path d="M15.1-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1zm0-3.1c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z" fill="#EFDA48"/>
    <path d="M15.1-60.3c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1z"/>
    <path fill="#EFDA48" d="M80.6 17.6l-3 2.9 3 3 2.9-3z"/>
    <path d="M79.9 19.8c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0s.4-1 0-1.4c-.4-.4-1-.4-1.4 0z"/>
    <path d="M86.3 18.1c-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3 .8-.8 2.2-.8 3 0 .8.8.8 2.1 0 3zm-2.2-2.3c-.4.4-.4 1 0 1.4s1 .4 1.4 0 .4-1 0-1.4-1-.4-1.4 0z" fill="#EFDA48"/>
    <path d="M84.1 15.8c-.4.4-.4 1 0 1.4s1 .4 1.4 0 .4-1 0-1.4-1-.4-1.4 0z"/>
    <path d="M90.1 14.3c-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3s2.2-.8 3 0c.8.8.8 2.2 0 3zm-2.2-2.2c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0s.4-1 0-1.4c-.4-.4-1-.4-1.4 0z" fill="#EFDA48"/>
    <path d="M87.9 12.1c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0s.4-1 0-1.4c-.4-.4-1-.4-1.4 0z"/>
    <path d="M94.4 10c-.8.8-2.2.8-3 0-.8-.8-.8-2.2 0-3s2.2-.8 3 0c.9.8.9 2.2 0 3zm-2.2-2.2c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0s.4-1 0-1.4c-.4-.4-1-.4-1.4 0z" fill="#EFDA48"/>
    <path d="M92.2 7.8c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0s.4-1 0-1.4c-.4-.4-1-.4-1.4 0z"/>
    <path fill="#EFDA48" d="M-88 8.6l-3-2.9-3 2.9 3 3z"/>
    <path d="M-90.3 8c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1.1 0-1.4z"/>
    <path d="M-88.5 14.4c-.8-.8-.8-2.2 0-3 .8-.8 2.2-.8 3 0 .8.8.8 2.2 0 3-.8.8-2.2.8-3 0zm2.2-2.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1.1 0-1.4z" fill="#EFDA48"/>
    <path d="M-86.3 12.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1.1 0-1.4z"/>
    <path d="M-84.8 18.2c-.8-.8-.8-2.2 0-3 .8-.8 2.2-.8 3 0 .8.8.8 2.2 0 3-.8.8-2.2.8-3 0zm2.2-2.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1 0-1.4z" fill="#EFDA48"/>
    <path d="M-82.6 16c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1 0-1.4z"/>
    <path d="M-80.5 22.5c-.8-.8-.8-2.2 0-3 .8-.8 2.2-.8 3 0 .8.8.8 2.2 0 3-.8.8-2.2.8-3 0zm2.2-2.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1 0-1.4z" fill="#EFDA48"/>
    <path d="M-78.3 20.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4s1 .4 1.4 0c.4-.4.4-1 0-1.4z"/>
    <path d="M-107.8 8.6c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9S-93.9-13-93.9-5.3s-6.2 13.9-13.9 13.9zm0-20.6c-3.7 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6c3.7 0 6.6-3 6.6-6.6s-2.9-6.6-6.6-6.6zM54.8 102.3c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9 13.9 6.2 13.9 13.9-6.3 13.9-13.9 13.9zm0-20.6c-3.7 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6-3-6.6-6.6-6.6zm53.6-73.1c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9 13.9 6.2 13.9 13.9-6.2 13.9-13.9 13.9zm0-20.6c-3.7 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6-3-6.6-6.6-6.6zM54.8-84.2c-7.7 0-13.9-6.2-13.9-13.9S47.1-112 54.8-112s13.9 6.2 13.9 13.9-6.3 13.9-13.9 13.9zm0-20.5c-3.7 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6c3.7 0 6.6-3 6.6-6.6s-3-6.6-6.6-6.6zM-53.1-85C-60.8-85-67-91.2-67-98.9s6.2-13.9 13.9-13.9 13.9 6.2 13.9 13.9S-45.4-85-53.1-85zm0-20.5c-3.7 0-6.6 3-6.6 6.6 0 3.7 3 6.6 6.6 6.6s6.6-3 6.6-6.6c0-3.7-2.9-6.6-6.6-6.6zm0 207.8c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9 13.9 6.2 13.9 13.9-6.2 13.9-13.9 13.9zm0-20.6c-3.7 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6c3.7 0 6.6-3 6.6-6.6s-2.9-6.6-6.6-6.6z" fill="#EFDA48"/>
    <path d="M-20.9 36.6H-23V42h2.1zm11 0h-2.2V42h2.2zm10.9 0h-2.1V42H1zm11 0H9.8V42H12zm10.9 0h-2.1V42h2.1zm-43.8-10.7H-23v5.4h2.1zm11 0h-2.2v5.4h2.2zm10.9 0h-2.1v5.4H1zm11 0H9.8v5.4H12zm10.9 0h-2.1v5.4h2.1zm-43.8-10.8H-23v5.5h2.1zm11 0h-2.2v5.5h2.2zm10.9 0h-2.1v5.5H1zm11 0H9.8v5.5H12zm10.9 0h-2.1v5.5h2.1zM-20.9 4.4H-23v5.5h2.1zm11 0h-2.2v5.5h2.2zM1 4.4h-2.1v5.5H1zm11 0H9.8v5.5H12zm10.9 0h-2.1v5.5h2.1zM-20.9-6.3H-23v5.4h2.1zm11 0h-2.2v5.4h2.2zM1-6.3h-2.1v5.4H1zm11 0H9.8v5.4H12zm10.9 0h-2.1v5.4h2.1z" fill="#FFF"/>
    <path d="M-61.4 47.4c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm5.4 0c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.9.1 1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm5.4 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm-5.4 29.2c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zm5.4 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zm5.4 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6zm0-8.3c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6s1.6-.8 1.6-1.6zM-.1 47.4c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6zm5.5 0c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6z" fill="#EFDA48"/>
    <path d="M8.8 66.6H-8.8c-.7 0-1.2.5-1.2 1.2v13.5c0 .7.5 1.2 1.2 1.2H8.8c.7 0 1.2-.5 1.2-1.2V67.8c0-.6-.6-1.2-1.2-1.2z" fill="#BDD1CF"/>
    <path d="M-59.9 36.6H-62V42h2.1zm11.7 0h-2.1V42h2.1zM-59.9 16H-62v5.5h2.1zm11.7 0h-2.1v5.5h2.1z" fill="#FFF"/>
    <path d="M-48.3 21.4h-13.6c-.6 0-1.1.5-1.1 1.1v13.7c0 .6.5 1.1 1.1 1.1h13.6c.6 0 1.1-.5 1.1-1.1V22.4c0-.6-.5-1-1.1-1z" fill="#BDD1CF"/>
    <path d="M-50.2 29.3c0-2.7-2.2-4.9-4.9-4.9s-4.9 2.2-4.9 4.9 2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9z" fill="#476975"/>
    <path d="M-59.3 35.2c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6zm11.7 0c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.8 0 1.6-.7 1.6-1.6zm-11.7-11.6c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.9 0 1.6-.7 1.6-1.6zm11.7 0c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.8 0 1.6-.7 1.6-1.6z"/>
    <g fill="#FFF">
      <path d="M68.7-61.4h-17c-.8 0-1.5.7-1.5 1.5V-39c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-20.9c0-.8-.7-1.5-1.5-1.5z"/>
      <path d="M54.4-40.8H44v3.3h10.4zm0-20.6H44v3.4h10.4z"/>
    </g>
    <path d="M76.6-2.2c-9.9 0-17.9-8-17.9-17.9S66.7-38 76.6-38s17.9 8 17.9 17.9-8 17.9-17.9 17.9z"/>
    <path d="M39.1-57.2c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1c.1 1.2-.9 2.1-2.1 2.1z" fill="#EFDA48"/>
    <path d="M51.6 36.6h-2.1V42h2.1zm11.7 0h-2.2V42h2.2zM51.6 16h-2.1v5.5h2.1zm11.7 0h-2.2v5.5h2.2z" fill="#FFF"/>
    <path d="M63.2 21.4H49.6c-.6 0-1.1.5-1.1 1.1v13.7c0 .6.5 1.1 1.1 1.1h13.6c.6 0 1.1-.5 1.1-1.1V22.4c0-.6-.5-1-1.1-1z" fill="#BDD1CF"/>
    <path d="M61.3 29.3c0-2.7-2.2-4.9-4.9-4.9s-4.9 2.2-4.9 4.9 2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9z" fill="#476975"/>
    <path d="M52.2 35.2c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6zm11.6 0c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6zM52.2 23.6c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.9 0 1.6-.7 1.6-1.6zm11.6 0c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6c.9 0 1.6-.7 1.6-1.6z"/>
    <path d="M37.3 60H23.7c-.6 0-1.1.5-1.1 1.1v13.7c0 .6.5 1.1 1.1 1.1h13.6c.6 0 1.1-.5 1.1-1.1V61.1c0-.6-.5-1.1-1.1-1.1z" fill="#BDD1CF"/>
    <path d="M35.5 68c0-2.7-2.2-4.9-4.9-4.9s-4.9 2.2-4.9 4.9 2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9z" fill="#476975"/>
    <path fill="#F9B233" d="M37.1-46H25.4v21h11.7z"/>
    <path d="M-31.8-47.4l-11.9 11.9 11.9 11.9 11.9-11.9zm28.2-5.1v6.1h6.1v-6.1z"/>
    <path fill="#FFF" d="M5.3-35.5H-5.5V-25H5.3z"/>
    <path d="M4-30.2c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1 1.8 4.1 4.1 4.1S4-28 4-30.2z" fill="#BDD1CF"/>
    <path fill="#FFF" d="M-36.8-54.6l-6.8-4.4-3.9 6.1 6.8 4.4z"/>
  </symbol>
  <symbol id="a" viewBox="-150.5 -131.7 298.9 263.3">
    <path d="M-77.1 127.5c6.2 4.6 14.6 4.8 20.9.5 12.5-8.4 34.7-21 56-21 23.2 0 45.7 13.5 56.4 21 4.3 3 9.8 3.8 14.7 2l.6-.2c7.3-2.6 11.8-9.8 11-17.4-1.7-15.4-3-41.9 13-62.9 16.8-21.9 31.7-31.2 42.3-34.8 5.9-2 9.9-7.4 10.4-13.6.5-8-5.1-13.6-12.3-17-12-5.7-30.8-15.7-42.8-36.2-14.4-24.9-13-51.3-11.4-62.7.7-5.1-1.6-10.1-5.9-12.8-4.8-3-11.9-4.6-21.4 1.5-5.5 3.6-12 8.6-20.8 12-10.8 4.1-16.9 5.5-20.3 5.8-2.4.2-4.4 1.8-5.2 4-1.1 2.9-3.4 6.2-8.2 6.2-5 0-7.2-3.6-8.2-6.6-.8-2.5-3.3-3.4-5.9-3.7-4.9-.4-12.5-2.4-20.5-6.1-7.1-3.3-14-7.9-20.4-12.7-5.5-4.1-15-5.5-20.4-1.3-5.7 4.4-7.4 11.7-6.5 18.8 1.9 15.3 1.1 43.3-16.7 64.2-17.6 20.8-28.2 26.2-37.2 29.2-3.9 1.3-11.4 5.4-12.3 14.1s3 14.5 10.9 18.4c12.3 6.1 30.5 17.2 42.1 34.1 15.1 22 15.1 48.1 13.1 61.7-.7 5.7.4 12.1 5 15.5z" fill="#034854"/>
    <path d="M-133.5 17c-9.4 0-17.1-7.6-17.1-17.1s7.6-17.1 17.1-17.1 17.1 7.6 17.1 17.1-7.7 17.1-17.1 17.1zm0-25.2c-4.5 0-8.1 3.6-8.1 8.1S-138 8-133.5 8s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm199 139.9c-9.4 0-17.1-7.6-17.1-17.1S56 97.5 65.5 97.5s17.1 7.6 17.1 17.1-7.7 17.1-17.1 17.1zm0-25.2c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zM131.2 17c-9.4 0-17.1-7.6-17.1-17.1s7.6-17.1 17.1-17.1 17.1 7.6 17.1 17.1S140.6 17 131.2 17zm0-25.2c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.7-8.1-8.1-8.1zM65.5-96.6c-9.4 0-17.1-7.6-17.1-17.1s7.6-17.1 17.1-17.1 17.1 7.6 17.1 17.1-7.7 17.1-17.1 17.1zm0-25.1c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm-132 24.1c-9.4 0-17.1-7.6-17.1-17.1s7.6-17.1 17.1-17.1 17.1 7.6 17.1 17.1-7.7 17.1-17.1 17.1zm0-25.1c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm0 254.4c-9.4 0-17.1-7.6-17.1-17.1s7.6-17.1 17.1-17.1 17.1 7.6 17.1 17.1-7.7 17.1-17.1 17.1zm0-25.2c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1z" fill="#EFDA48"/>
    <path d="M131.2-8.2c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.7-8.1-8.1-8.1zM65.5 106.5c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm-132 0c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm-67-114.6c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm67-114.6c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1zm132 1c-4.5 0-8.1 3.6-8.1 8.1s3.6 8.1 8.1 8.1 8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1z" fill="#FFF"/>
  </symbol>
  <g transform="matrix(1.37 0 0 1.37 -54.72 -54.89)">
    <use xlink:href="#b" width="244.6" height="225.8" x="-122.3" y="-112.9" transform="matrix(1 0 0 -1 164.02 147.6)" overflow="visible"/>
    <path d="M156.7 83.9v2.9c0 .2 0 .4-.1.6-.1.2-.2.3-.3.5-.1.2-.3.2-.4.3-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.2-.1-.3-.2-.4-.3-.1-.1-.2-.3-.3-.5-.1-.2-.1-.4-.1-.6v-2.9h.5v2.9c0 .1 0 .2.1.4 0 .1.1.2.2.3.1.1.2.2.3.2.1.1.2.1.4.1s.3 0 .4-.1c.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3.1-.1.1-.2.1-.4v-2.9h.3zm3.2 3.2c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.2.1.2 0 .2-.1zm1.3 1.1v-4.3h1.3c.2 0 .3 0 .5.1.2 0 .3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5 0 .1 0 .2-.1.3-.1.1-.1.2-.1.2l-.2.2c-.1.1-.2.1-.3.1.1 0 .2.1.3.1.1.1.2.1.2.2s.1.2.2.3c0 .1.1.2.1.4s0 .4-.1.5c-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2-.2.1-.3.1-.5.1h-1.3zm.6-2.5h1.1c.1 0 .2-.1.3-.1l.2-.2c.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2s-.2-.1-.3-.1h-1v1.2zm0 .5v1.5h.8c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2l.2-.2c0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2s-.2-.1-.3-.2c-.1-.1-.2-.1-.3-.1h-.8z" fill="#fff"/>
    <path d="M67.3 153.4c0 .3 0 .5-.1.7-.1.2-.2.4-.3.5-.1.1-.3.3-.4.3-.1 0-.4.1-.6.1-.2 0-.4 0-.6-.1-.2-.1-.3-.2-.4-.3-.1-.1-.2-.3-.3-.5-.1-.2-.1-.5-.1-.7v-1c0-.3 0-.5.1-.7.1-.2.2-.4.3-.5.1-.1.3-.3.4-.3.2-.1.4-.1.6-.1.2 0 .4 0 .6.1.2.1.3.2.4.3.1.1.2.3.3.5.1.2.1.5.1.7v1zm-2.2-.1l1.7-1.3c0-.3-.1-.5-.2-.6-.1-.1-.3-.2-.6-.2s-.5.1-.6.3c-.1.2-.2.5-.2.8v1zm1.6-.8l-1.7 1.3c0 .3.1.5.3.6.2.1.3.2.6.2s.5-.1.6-.3c.1-.2.2-.5.2-.8v-1zM111.8 70h-2.2v-.4h2.2v.4zm106.9-.6h1.2v.5h-1.2v1.3h-.5v-1.3H217v-.5h1.2v-1.2h.5v1.2zm43.1 83.2h.4c.1 0 .3 0 .4-.1.1-.1.2-.1.3-.2l.2-.2c.1-.1.1-.2.1-.3 0-.2-.1-.4-.2-.6-.1-.1-.3-.2-.6-.2-.1 0-.2 0-.3.1-.1 0-.2.1-.2.1l-.2.2c-.1.1-.1.2-.1.3h-.5c0-.2 0-.3.1-.5.1-.1.2-.3.3-.4.1-.1.3-.2.4-.3.2-.1.3-.1.5-.1s.4 0 .5.1c.1.1.3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5v.3c0 .1-.1.2-.1.3 0 .1-.1.2-.2.2-.1.1-.2.1-.3.2.1 0 .3.1.3.2s.2.2.2.2c.1.1.1.2.1.3v.3c0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.4.2-.2.1-.3.1-.5.1s-.4 0-.5-.1c-.1-.1-.3-.1-.4-.2-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5h.5c0 .1 0 .2.1.3 0 .1.1.2.2.2s.2.1.3.1c.1 0 .2.1.3.1h.3c.1 0 .2-.1.3-.1.1 0 .1-.1.2-.2 0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.1h-.8v-.5zm-150.1 85.7h-.5v-3.6l-1.1.4v-.5l1.6-.6v4.3zm107.8-.6h-2.8v-.4l1.4-1.6c.1-.1.2-.3.3-.4.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.2c0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2s-.1-.1-.2-.2c-.1 0-.2-.1-.3-.1-.1 0-.3 0-.4.1-.1 0-.2.1-.3.2-.1.1-.1.2-.2.3 0 .1-.1.2-.1.4h-.5c0-.2 0-.3.1-.5s.2-.3.3-.4c.1-.1.3-.2.4-.3.1-.1.4-.1.6-.1.2 0 .4 0 .5.1.2.1.3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5 0 .1 0 .3-.1.4-.1.1-.1.2-.2.4-.1.1-.2.2-.3.4-.1.1-.2.2-.3.4l-1.1 1.2h2.1v.3z"/>
    <path d="M166.4 169.8v-4.3h1.3c.2 0 .3 0 .5.1.2 0 .3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5 0 .1 0 .2-.1.3-.1.1-.1.2-.1.2l-.2.2c-.1.1-.2.1-.3.1.1 0 .2.1.3.1.1.1.2.1.2.2s.1.2.2.3c0 .1.1.2.1.4s0 .4-.1.5c-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2-.2.1-.3.1-.5.1h-1.3zm.5-2.4h1.1c.1 0 .2-.1.3-.1l.2-.2c.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2s-.2-.1-.3-.1h-1v1.2zm0 .4v1.5h.8c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2l.2-.2c0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2s-.2-.1-.3-.2c-.1-.1-.2-.1-.3-.1h-.8zm5.1.9h-1.4l-.3 1.1h-.5l1.4-4.3h.5l1.4 4.3h-.5l-.6-1.1zm-1.2-.5h1.1l-.6-1.9-.5 1.9zm5.7-2.2h-1.3v3.8h-.5V166h-1.3v-.5h3.2v.5zm3.6 0h-1.3v3.8h-.5V166H177v-.5h3.2v.5zm3.1 1.8h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm2.6.3h-.8v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.9-1.6zm-.8-.5h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.6v1.9zm3-2.1h2.6v.5h-1v3.3h1v.5H188v-.5h1V166h-1v-.5zm6 2.3h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm-27-5.3h2.1v.5h-2.6v-4.3h.5v3.8zm5-.6h-1.4l-.3 1.1h-.5l1.4-4.3h.5l1.4 4.3h-.5l-.6-1.1zm-1.2-.5h1.1l-.6-1.9-.5 1.9zm5.5-2.7v2.9c0 .2 0 .4-.1.6-.1.2-.2.3-.3.5-.1.2-.3.2-.4.3-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.2-.1-.3-.2-.4-.3-.1-.1-.2-.3-.3-.5-.1-.2-.1-.4-.1-.6v-2.9h.5v2.9c0 .1 0 .2.1.4 0 .1.1.2.2.3.1.1.2.2.3.2.1.1.2.1.4.1s.3 0 .4-.1c.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3.1-.1.1-.2.1-.4v-2.9h.3zm3.8.5h-1.3v3.8h-.5v-3.8H177v-.5h3.2v.5zm2.9 2.7c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.5c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.1.1.1 0 .1-.1zm2-.6v1.7h-.5v-4.3h1.4c.2 0 .4 0 .5.1.2.1.3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5s0 .4-.1.5c-.1.2-.2.3-.3.4-.1.1-.3.2-.4.2-.2.1-.4.1-.5.1h-.9zm0-.5h.8c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1h-.8v1.8zm4.4.4h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.8-.4h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.9zm5.4.2h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm4 .7c0 .2-.1.4-.2.5-.1.2-.2.3-.3.4-.1.1-.3.2-.4.3-.2.1-.4.1-.6.1-.2 0-.3 0-.5-.1-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.1-.2-.2-.4-.1-.1-.1-.3-.1-.4V160c0-.2.1-.3.1-.4.1-.1.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .6.1c.2.1.3.2.4.3.1.1.2.3.3.4.1.2.1.4.1.6h-.5c0-.1 0-.2-.1-.4s-.1-.2-.2-.3c-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.4-.1-.1 0-.2 0-.3.1-.1 0-.2.1-.3.2-.1.1-.1.2-.2.3 0 .1-.1.2-.1.3 0 .1-.1.2-.1.3v1.2c0 .1 0 .2.1.3 0 .1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.3.1.1 0 .3 0 .4-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3.1-.1.1-.2.1-.4h.6zm3.5 1.3h-.5v-2h-1.7v2h-.5v-4.3h.5v1.8h1.7v-1.8h.5v4.3zm3.3-2H203v1.5h2.1v.5h-2.6v-4.3h2.6v.5H203v1.4h1.8v.4zm2.6.2h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.8-.4h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.9zm-131.5 7.3v1.7h-.5v-4.3H76c.2 0 .4 0 .5.1.2.1.3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5s0 .4-.1.5c-.1.2-.2.3-.3.4-.1.1-.3.2-.4.2-.2.1-.4.1-.5.1h-.9zm0-.4h.8c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1h-.8v1.8zm4.4.4h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.8-.5h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.9zm5.8.3v.5c0 .2-.1.3-.1.5s-.1.3-.2.4l-.3.3c-.1.1-.2.2-.4.2-.1.1-.3.1-.5.1s-.3 0-.5-.1c-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.1-.3-.2-.4-.1-.1-.1-.3-.1-.4V167c0-.2.1-.3.1-.5.1-.1.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2.1-.1.3-.1.5-.1s.3 0 .5.1c.1.1.3.1.4.2l.3.3c.1.1.1.3.2.4.1.1.1.3.1.5v.9zm-.6-.5v-.3c0-.1 0-.2-.1-.3 0-.1-.1-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.2-.2-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.2.1-.2.2-.1.1-.1.2-.2.3-.1.1-.1.2-.1.3 0 .1 0 .2-.1.3-.1.1 0 .2 0 .3v.8c0 .1 0 .2.1.3 0 .1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.2.2s.2.1.3.1c.1 0 .2 0 .3-.1.1 0 .2-.1.2-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.2.1-.3.1-.1 0-.2 0-.3v-.5zm1.8 1.9H88v.5h-2.8v-.4l2.1-3.4h-2.1v-.5h2.7v.4l-2.2 3.4zm5.5-1.5h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm3.5.9c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.2.1.2 0 .2-.1zm3.6 0c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1H97c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.2.1.2 0 .2-.1zm4.2-.8v.5c0 .2-.1.3-.1.5s-.1.3-.2.4l-.3.3c-.1.1-.2.2-.4.2-.1.1-.3.1-.5.1s-.3 0-.5-.1c-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.1-.3-.2-.4-.1-.1-.1-.3-.1-.4V167c0-.2.1-.3.1-.5.1-.1.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2.1-.1.3-.1.5-.1s.3 0 .5.1c.1.1.3.1.4.2l.3.3c.1.1.1.3.2.4.1.1.1.3.1.5v.9zm-.6-.5v-.3c0-.1 0-.2-.1-.3 0-.1-.1-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.2-.2-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.2.1-.2.2-.1.1-.1.2-.2.3-.1.1-.1.2-.1.3 0 .1 0 .2-.1.3-.1.1 0 .2 0 .3v.8c0 .1 0 .2.1.3 0 .1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.2.2s.2.1.3.1c.1 0 .2 0 .3-.1.1 0 .2-.1.2-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.2.1-.3.1-.1 0-.2 0-.3v-.5zm2.8.7h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.8-.5h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.9zm-28-6.4H75v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.8-.4h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1H75v1.9zm5.8 1.6c-.2.2-.4.4-.6.5-.2.1-.5.2-.8.1-.2 0-.3 0-.5-.1-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.2-.3-.2-.4-.1-.1-.1-.3-.1-.5V160c0-.2.1-.3.1-.5s.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2s.3-.1.5-.1.4 0 .6.1c.2.1.3.2.4.3.1.1.2.3.3.4.1.2.1.3.1.5h-.5c0-.1-.1-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.4-.1-.1 0-.2 0-.3.1-.1 0-.2.1-.3.2-.1.1-.1.2-.2.3 0 .1-.1.2-.1.3 0 .1-.1.2-.1.3v1.1c0 .1 0 .2.1.3.1.1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.3.2.1 0 .2.1.3.1h.4s.1-.1.2-.1.1-.1.2-.2v-1h-.9v-.5h1.4l.2 1.8zm.8.6v-4.3H83c.2 0 .3 0 .5.1.2 0 .3.1.4.2.1.1.2.2.3.4.1.2.1.3.1.5 0 .1 0 .2-.1.3-.1.1-.1.2-.1.2l-.2.2c-.1.1-.2.1-.3.1.1 0 .2.1.3.1.1.1.2.1.2.2s.1.2.2.3c0 .1.1.2.1.4s0 .4-.1.5c-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2-.2.1-.3.1-.5.1h-1.3zm.5-2.5h1.1c.1 0 .2-.1.3-.1l.2-.2c.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2s-.2-.1-.3-.1h-1v1.2zm0 .5v1.5h.8c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2l.2-.2c0-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2s-.2-.1-.3-.2c-.1-.1-.2-.1-.3-.1h-.8zm5.3 1.5h2.1v.5H87v-4.3h.5v3.8zm5.3-1.5H91v1.5h2.1v.5h-2.6v-4.3h2.6v.5H91v1.4h1.8v.4zm1.2 2v-4.3h1c.3 0 .6.1.8.2.2.1.4.2.6.4.2.2.3.4.4.6.1.2.1.5.1.8v.3c0 .3 0 .6-.1.8-.1.2-.2.4-.4.6-.2.2-.4.3-.6.4-.2.1-.5.1-.8.1h-1zm.6-3.9v3.4h.4c.2 0 .4 0 .6-.1.2-.1.3-.2.4-.3.1-.1.2-.3.2-.5.1-.2.1-.4.1-.6v-.3c0-.2 0-.4-.1-.6-.1-.2-.1-.3-.2-.5-.1-.1-.2-.2-.4-.3-.2-.1-.4-.1-.6-.1h-.4zm40.3 56.3h2.1v.5h-2.6v-4.3h.5v3.8zm5.1-.7h-1.4l-.3 1.1h-.5l1.4-4.3h.5l1.4 4.3h-.5l-.6-1.1zm-1.3-.4h1.1l-.6-1.9-.5 1.9zm5.6 1c-.2.2-.4.4-.6.5-.2.1-.5.2-.8.1-.2 0-.3 0-.5-.1-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.2-.3-.2-.4-.1-.1-.1-.3-.1-.5v-1.5c0-.2.1-.3.1-.5s.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2s.3-.1.5-.1.4 0 .6.1c.2.1.3.2.4.3.1.1.2.3.3.4.1.2.1.3.1.5h-.5c0-.1-.1-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.4-.1-.1 0-.2 0-.3.1-.1 0-.2.1-.3.2-.1.1-.1.2-.2.3 0 .1-.1.2-.1.3 0 .1-.1.2-.1.3v1.1c0 .1 0 .2.1.3.1.1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.3.2.1 0 .2.1.3.1h.4s.1-.1.2-.1.1-.1.2-.2v-1h-.9v-.5h1.4l.2 1.8zm3.2-1.4h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm3.4.9c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.2.1.2 0 .2-.1zm3.8-.9h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm3.9 2h-.6l-1.7-3.2v3.2h-.5v-4.3h.6l1.7 3.2v-3.2h.5v4.3zm3.2-1.1c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.1 0 .3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1.1.2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.1.1.2 0 .2-.1zm4.1-.8v.5c0 .2-.1.3-.1.5s-.1.3-.2.4l-.3.3c-.1.1-.2.2-.4.2-.1.1-.3.1-.5.1s-.3 0-.5-.1c-.1-.1-.3-.1-.4-.2l-.3-.3c-.1-.1-.1-.3-.2-.4-.1-.1-.1-.3-.1-.4v-1.5c0-.2.1-.3.1-.5.1-.1.1-.3.2-.4l.3-.3c.1-.1.2-.2.4-.2.1-.1.3-.1.5-.1s.3 0 .5.1c.1.1.3.1.4.2l.3.3c.1.1.1.3.2.4.1.1.1.3.1.5v.9zm-.5-.5v-.3c0-.1 0-.2-.1-.3 0-.1-.1-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.2-.2-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.2.1-.2.2-.1.1-.1.2-.2.3-.1.1-.1.2-.1.3 0 .1 0 .2-.1.3-.1.1 0 .2 0 .3v.8c0 .1 0 .2.1.3 0 .1.1.2.1.3 0 .1.1.2.2.3.1.1.2.1.2.2s.2.1.3.1c.1 0 .2 0 .3-.1.1 0 .2-.1.2-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.2.1-.3.1-.1 0-.2 0-.3v-.5zm2.7.6h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.5l-.9-1.6zm-.8-.4h.7c.1 0 .2 0 .3-.1.1-.1.2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.9zM155.5 92.9h-.9v1.7h-.5v-4.3h1.3c.2 0 .4 0 .6.1.2.1.3.1.5.2.1.1.2.2.3.4.1.2.1.3.1.6 0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1 0-.2.1-.3.2l.9 1.8h-.6l-.8-1.6zm-.9-.4h.7c.1 0 .2 0 .3-.1.1 0 .2-.1.3-.2.1-.1.1-.2.2-.2 0-.1.1-.2.1-.3 0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.4-.1h-.7v1.8zm5.4.2h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm3.5.9c0-.1 0-.2-.1-.3-.1-.1-.1-.2-.2-.2-.1-.1-.2-.1-.3-.2-.1-.1-.2-.1-.3-.1-.2 0-.3-.1-.5-.2s-.3-.2-.4-.3c-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5s0-.3.1-.5c.1-.1.2-.3.3-.4.1-.1.3-.2.4-.2.2-.1.3-.1.5-.1s.4 0 .5.1c.2.1.3.1.5.3.2.2.2.2.3.4.1.2.1.3.1.5h-.6c0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1h-.3c-.1 0-.2.1-.3.1l-.2.2c-.1.1-.1.2-.1.3 0 .1 0 .2.1.3.1.1.1.2.2.2.1.1.2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .2.1.3.2.1.1.2.1.2.2.1.1.1.2.2.3 0 .1.1.2.1.3 0 .2 0 .4-.1.5-.1.1-.2.3-.3.4-.1.1-.3.2-.5.2s-.3.1-.5.1-.4 0-.6-.1c-.2-.1-.3-.1-.5-.3-.1-.1-.3-.2-.4-.4-.1-.2-.1-.3-.1-.5h.6c0 .1.1.2.1.4.1.1.1.2.2.3.1.1.2.1.3.2.1 0 .2.1.4.1h.3c.1 0 .2-.1.3-.1l.2-.2c.2.1.2 0 .2-.1zm3.7-.9h-1.8v1.5h2.1v.5h-2.6v-4.3h2.6v.5h-2.1v1.4h1.8v.4zm4.1-1.8H170v3.8h-.5v-3.8h-1.3v-.5h3.2v.5zm62 15.4c.8 0 1.5.2 2 .5s.7.8.7 1.5c0 .3-.1.6-.3.9-.2.3-.4.5-.8.6.4.1.7.3 1 .6.2.3.3.6.3 1 0 .7-.2 1.2-.7 1.5-.4.4-1.1.5-1.9.5h-3.5v-.9l.8-.1v-5.1l-.8-.1v-.9h3.2zm-1 2.9h1c.4 0 .7-.1.9-.2.2-.1.3-.4.3-.7 0-.3-.1-.6-.3-.7-.2-.2-.5-.2-.9-.2h-1v1.8zm0 1v2.1h1.3c.4 0 .7-.1.9-.2.2-.2.3-.4.3-.7 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3h-1.4z" fill="#fff"/>
    <g fill="#fff">
      <path d="M238 120.5l-1.7-.9.9 1.7"/>
      <path d="M240.4 115.9c-1.3-1.3-3.4-1.3-4.6 0l-1.2 1.2c-1.3 1.3-1.3 3.4 0 4.6l4.2 4.2 5.9-5.9-4.3-4.1zm-.9 5.3l-1-.5-1 1 .5 1-.4.4-2-4 .3-.3 4 2.1-.4.3zm-1.3-3.7l-.5 1.1-.3-.4.7-1.6 3 3-.4.4-2.5-2.5z"/>
    </g>
    <path d="M91.2 112.7l.5-.1 2.2-6.2h1.5l2.1 6.2.5.1v.9h-2.4v-.9l.5-.1-.3-1h-2.3l-.3 1 .5.1v.9h-2.4v-.9zm2.6-2.1h1.6l-.8-2.5-.8 2.5z" fill="#fff"/>
    <g fill="#fff">
      <path d="M89.7 121.4c0 .2.1.4.3.6.2.2.4.3.7.2.3-.1.5-.2.7-.5l.7-.7-2.1-.3c-.3.3-.3.5-.3.7zm2-2.1c-.2 0-.5.2-.7.5l-.7.7 2.1.3c.2-.2.3-.4.3-.6 0-.2-.1-.4-.3-.6-.2-.3-.4-.4-.7-.3zm-2.8 0l.9-1.7-1.7.9"/>
      <path d="M93.4 117.4l-1.2-1.2c-1.3-1.3-3.4-1.3-4.6 0l-4.2 4.2 5.9 5.9 4.2-4.2c1.2-1.4 1.2-3.4-.1-4.7zm-5.3 3.3l.5-1-1-1-1 .5-.4-.4 4-2 .3.3-2.1 4-.3-.4zm4.8.1c-.1.2-.3.4-.4.6l-.7.7c-.2.2-.4.3-.6.4-.2.1-.4.2-.6.2-.2 0-.4 0-.5-.1-.2-.1-.3-.2-.5-.3-.2-.2-.3-.3-.3-.5-.1-.2-.1-.4-.1-.5 0-.2.1-.4.2-.6.1-.2.3-.4.4-.6l.7-.7c.2-.2.4-.3.6-.4.2-.1.4-.2.6-.2.2 0 .4 0 .5.1.2.1.3.2.5.3.2.2.3.3.3.5.1.2.1.4.1.5 0 .1-.1.4-.2.6z"/>
    </g>
    <g fill="#fff">
      <path d="M216.2 132.2h-4.4c-.7 0-1.2.5-1.2 1.2v3.3c0-2.8-2.3-5.1-5.1-5.1s-5.1 2.3-5.1 5.1v5.6l-6 4.5c-4 3.1-1.9 9.5 3.2 9.5h1.2c.5-3.7 1.7-8.3 4-11.1h5.5c2.4 2.8 3.4 7.4 3.9 11.1h1.7c1.9 0 3.4-1.5 3.4-3.4v-19.6c.1-.6-.5-1.1-1.1-1.1zm-12.7 2.7h4.2v2.8c0 .9-.7 1.6-1.6 1.6h-.9c-.9 0-1.6-.7-1.6-1.6v-2.8zm-1 8.2l1.9-3.6 1.1 3.6h-3zm3.1 0l1.1-3.6 1.9 3.6h-3zm5.8-3.2v-6.2h5v6.2h-5z"/>
      <path d="M209.6 156.3c-2.7-1.9-4.9-7-6.6-11.1v11.1h6.6z"/>
    </g>
    <path stroke-miterlimit="10" fill="none" stroke="#fff" stroke-width=".75" d="M171.8 92.8h7.7l1.7-1.7v-7.3l1.5-1.6h3.1m-28.4 93.4h-16.2l-12-12h-18.4l-2.8-3H97.7"/>
    <path stroke-miterlimit="10" fill="none" stroke="#fff" stroke-width=".75" d="M108.1 167.5h2.7l2.5-2.5h11.1l6.1 6.2M166 85.8h10.7l1.7-1.7v-5.4l-1.5-1.5H175m20.5 90.1h13.6l1.7 1.7v13.4m-.3-21.8h12.6m-64.5 36.7h-21.5l-8.3 8.8v4.6l3.4 3.5"/>
  </g>
</svg>      `;
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE;

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            // leds
            this.leds = [];
            this.ledsOuter = [];
            const left = 138, top = 89, ledoffw = 15, ledoffh = 14.5;
            const ledw = 5;
            const ledh = 10;
            for (let i = 0; i < 5; ++i) {
                let ledtop = i * ledoffh + top;
                for (let j = 0; j < 5; ++j) {
                    let ledleft = j * ledoffw + left;
                    let k = i * 5 + j;
                    this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: ledw, height: ledh, rx: 1, ry: 1 }));
                    this.leds.push(svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 1, y: ledtop - 1, width: ledw + 2, height: ledh + 2, rx: 2, ry: 2, title: `(${j},${i})` }));
                }
            }

            // https://www.microbit.co.uk/device/pins
            // P0, P1, P2
            this.pins = [
                "M16.5,341.2c0,0.4-0.1,0.9-0.1,1.3v60.7c4.1,1.7,8.6,2.7,12.9,2.7h34.4v-64.7h0.3c0,0,0-0.1,0-0.1c0-13-10.6-23.6-23.7-23.6C27.2,317.6,16.5,328.1,16.5,341.2z M21.2,341.6c0-10.7,8.7-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3c0,10.7-8.6,19.3-19.3,19.3C29.9,360.9,21.2,352.2,21.2,341.6z",
                "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z",
                "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z"
            ].map((p, pi) => svg.path(this.g, "sim-pin sim-pin-touch", p));

            // P3
            this.pins.push(svg.path(this.g, "sim-pin", "M0,357.7v19.2c0,10.8,6.2,20.2,14.4,25.2v-44.4H0z"));

            pins4onXs.forEach(x => {
                this.pins.push(svg.child(this.g, "rect", { x: x, y: 356.7, width: 10, height: 50, class: "sim-pin" }));
            })
            this.pins.push(svg.path(this.g, "sim-pin", "M483.6,402c8.2-5,14.4-14.4,14.4-25.1v-19.2h-14.4V402z"));
            this.pins.push(svg.path(this.g, "sim-pin", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406H383v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z"));
            this.pins.push(svg.path(this.g, "sim-pin", "M458,317.6c-13,0-23.6,10.6-23.6,23.6c0,0,0,0.1,0,0.1h0V406H469c4.3,0,8.4-1,12.6-2.7v-60.7c0-0.4,0-0.9,0-1.3C481.6,328.1,471,317.6,458,317.6z M457.8,360.9c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C477.1,352.2,468.4,360.9,457.8,360.9z"));

            this.pins.forEach((p, i) => svg.hydrate(p, { title: pinTitles[i] }));

            this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            })

            this.pinTexts = [67, 165, 275].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: x, y: 345 }));

            this.buttonsOuter = []; this.buttons = [];

            const outerBtn = (left: number, top: number) => {
                const button = this.mkBtn(left, top);
                this.buttonsOuter.push(button.outer);
                this.buttons.push(button.inner);

                return button;
            }

            outerBtn(83.61, 96.8);
            outerBtn(236.66, 96.8);
            let ab = outerBtn(275, 69);
            let abtext = svg.child(ab.outer, "text", { x: 275, y: 65, class: "sim-text inverted" }) as SVGTextElement;
            abtext.textContent = "A+B";
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
            (<any>this.buttons[2]).style.visibility = "hidden";
        }

        private mkBtn(left: number, top: number): { outer: SVGElement, inner: SVGElement } {
            const btnr = 3;
            const btnw = 21.71;
            const btnn = 1;
            const btnnm = 1;
            const btnb = 5;
            let btng = svg.child(this.g, "g", { class: "sim-button-group" });
            svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
            svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
            svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
            svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
            svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });

            const outer = btng;
            const inner = svg.child(btng, "circle", {
                class: "sim-button",
                cx: left + btnw / 2,
                cy: top + btnw / 2,
                r: btnb
            });

            return { outer, inner };
        }

        private attachEvents() {
            Runtime.messagePosted = (msg) => {
                switch (msg.type || "") {
                    case "serial": this.flashSystemLed(); break;
                    case "radiopacket": this.flashAntenna(); break;
                }
            }
            let tiltDecayer = 0;
            this.element.addEventListener(pointerEvents.move, (ev: MouseEvent) => {
                let state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (tiltDecayer) {
                    clearInterval(tiltDecayer);
                    tiltDecayer = 0;
                }

                let ax = (ev.clientX - this.element.clientWidth / 2) / (this.element.clientWidth / 3);
                let ay = (ev.clientY - this.element.clientHeight / 2) / (this.element.clientHeight / 3);

                let x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                let y = Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
                let z2 = 1023 * 1023 - x * x - y * y;
                let z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));

                state.accelerometerState.accelerometer.update(x, y, z);
                this.updateTilt();
            }, false);
            this.element.addEventListener(pointerEvents.leave, (ev: MouseEvent) => {
                let state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (!tiltDecayer) {
                    tiltDecayer = setInterval(() => {
                        let accx = state.accelerometerState.accelerometer.getX(MicroBitCoordinateSystem.RAW);
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = state.accelerometerState.accelerometer.getY(MicroBitCoordinateSystem.RAW);
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            clearInterval(tiltDecayer);
                            tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        state.accelerometerState.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }, 50)
                }
            }, false);

            this.pins.forEach((pin, index) => {
                if (!this.board.edgeConnectorState.pins[index]) return;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(pin,
                    // move
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // start
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.addClass(svgpin, "touched");
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.removeClass(svgpin, "touched");
                        this.updatePin(pin, index);
                        return false;
                    });
            })
            this.pins.slice(0, 3).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = true;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
            })

            let bpState = this.board.buttonPairState;
            let stateButtons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            this.buttonsOuter.slice(0, 2).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = true;
                    svg.fill(this.buttons[index], this.props.theme.buttonDown);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.down, ev => {
                let state = this.board;
                stateButtons[0].pressed = true;
                stateButtons[1].pressed = true;
                stateButtons[2].pressed = true;
                svg.fill(this.buttons[0], this.props.theme.buttonDown);
                svg.fill(this.buttons[1], this.props.theme.buttonDown);
                svg.fill(this.buttons[2], this.props.theme.buttonDown);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);

                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            })
        }
    }
}