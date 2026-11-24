namespace pxsim.control {

    // Reported by control.hardwareVersion(); Calliope mini v3 simulator identifies as "3".
    export function _hardwareVersion() {
        return board().hardwareVersion >= 3 ? "3" : "2";
    }

    // control.simulatorBoardVersion(): the revision is applied in DalBoard.initAsync from the
    // tracked compile-time argument, before the board is drawn; nothing to do at runtime.
    export function simulatorBoardVersion(version: string) { }

}