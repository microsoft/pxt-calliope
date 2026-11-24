namespace pxsim {
    // Firefox compatibility shim for pxt-core's AudioContextManager.setListenerPosition().
    //
    // pxt-core does:
    //     const ctx = context();
    //     if (ctx) {
    //         ctx.listener.positionX.setTargetAtTime(x, 0, 0.02);  // + Y, Z
    //     }
    // Firefox's AudioListener has no positionX/positionY/positionZ AudioParams (it implements the
    // deprecated setPosition() instead), so positionX is undefined and the call throws. This runs
    // during the simulator's kill/restart (setListenerPosition(0,0,0)); the uncaught error aborts
    // the restart, leaving the simulator blank on Firefox (Chrome implements positionX, so it's
    // unaffected). Spatial-audio listener positioning is non-essential for this target, so wrap the
    // original and swallow the Firefox error — restart then completes normally.
    if (typeof AudioContextManager !== "undefined" && (AudioContextManager as any).setListenerPosition) {
        const _setListenerPosition = (AudioContextManager as any).setListenerPosition;
        (AudioContextManager as any).setListenerPosition = function (x: number, y: number, z: number) {
            try {
                _setListenerPosition.call(AudioContextManager, x, y, z);
            } catch (e) {
                // Firefox: AudioListener.positionX unavailable — ignore (no spatial audio).
            }
        };
    }
}
