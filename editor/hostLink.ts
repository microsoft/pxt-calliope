// Shows the host's device connection on the Download button.
//
// Embedded with controller=2 (e.g. in Calliope Campus) pxt disables WebUSB and
// deploys through the host, so no packetio wrapper exists and the button always
// says "not connected". The host tells us its state with a window message
//   { type: "calliope-connection", usb: Link, ble: Link }
// and we hand pxt a packetio wrapper backed by that state; pxt then draws the
// button (connected class, device icon, tooltip) by itself.
import * as flash from "./flash";

type Link = "connected" | "connecting" | "disconnected";

let usb: Link = "disconnected";
let ble: Link = "disconnected";

export class HostLinkIO implements pxt.packetio.PacketIO {
    onDeviceConnectionChanged = (connect: boolean) => { };
    onConnectionChanged = () => { };
    onData = (v: Uint8Array) => { };
    onError = (e: Error) => { };
    onEvent = (v: Uint8Array) => { };
    error(msg: string) { return new Error(msg); }
    sendPacketAsync(pkt: Uint8Array) { return Promise.resolve(); }
    reconnectAsync() { return Promise.resolve(); }
    disconnectAsync() { return Promise.resolve(); }
    disposeAsync() { return Promise.resolve(); }
    isConnected() { return usb === "connected" || ble === "connected"; }
    isConnecting() { return !this.isConnected() && (usb === "connecting" || ble === "connecting"); }
}

class HostLinkWrapper implements pxt.packetio.PacketIOWrapper {
    familyID = 0;
    onSerial = (buf: Uint8Array, isStderr: boolean) => { };
    onCustomEvent = (type: string, payload: Uint8Array) => { };
    constructor(public readonly io: HostLinkIO) { }
    // USB wins when both are up: it is what the host flashes over.
    get icon() {
        return usb !== "disconnected" && !(usb === "connecting" && ble === "connected")
            ? "icon usb" : "icon bluetooth";
    }
    isConnected() { return this.io.isConnected(); }
    isConnecting() { return this.io.isConnecting(); }
    reconnectAsync() { return Promise.resolve(); }
    disconnectAsync() { return Promise.resolve(); }
    sendCustomEventAsync(type: string, payload: Uint8Array) { return Promise.resolve(); }
    // Never reached: in controller=2 pxt deploys through the host.
    reflashAsync(resp: pxtc.CompileResult): Promise<void> {
        return Promise.reject(new Error("the host flashes"));
    }
}

const hostIO = new HostLinkIO();

export function mkPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    return io instanceof HostLinkIO ? new HostLinkWrapper(io) : flash.mkDAPLinkPacketIOWrapper(io);
}

export function initHostLink() {
    if (pxt.shell.getControllerMode() !== pxt.shell.ControllerMode.App) return;
    window.addEventListener("message", ev => {
        const d = ev.data;
        if (ev.source !== window.parent || !d || d.type !== "calliope-connection") return;
        usb = asLink(d.usb);
        ble = asLink(d.ble);
        const any = usb !== "disconnected" || ble !== "disconnected";
        if (any && !pxt.packetio.isActive()) {
            // Set every time: cmds.initAsync resets it on a target change.
            pxt.packetio.mkPacketIOAsync = () => Promise.resolve(hostIO);
            pxt.packetio.initAsync(); // creates the wrapper and redraws
        } else if (any) {
            hostIO.onConnectionChanged(); // invalidates packetio:* and redraws
        } else if (pxt.packetio.isActive()) {
            pxt.packetio.disconnectAsync(); // drops the wrapper and redraws
        }
    });
}

function asLink(v: unknown): Link {
    return v === "connected" || v === "connecting" ? v : "disconnected";
}
