/**
 * Attribute the bundled core APIs to the "core" package instead of the target's corepkg ("v1").
 *
 * The build stores the API info of the core libraries under libs/<corepkg> (libs/v1, which
 * pulls in core and core-mini-dal) and empties libs/core. When the editor assembles the blocks
 * from this cached info, it tags every symbol of that entry with pkg = pxt.appTarget.corepkg,
 * so "show number" & co. look like they come from the "v1" extension.
 *
 * Copying blocks (pxt-core 13.3+) records the extension of every copied block and refuses
 * the copy when that extension is not a dependency of the project: projects for the
 * Calliope mini 2 and 3 depend on "core" and "v2"/"v3", never on "v1", so copying any core
 * block failed with "The extension 'v1' cannot be copied".
 *
 * Every project depends on "core", so we give libs/core the corepkg symbols that no other
 * bundled package declares. The editor loads libs/core after libs/<corepkg> and the later
 * entry wins, so those symbols are tagged "core". Symbols that another package (v3,
 * core-mini-codal, ...) also declares stay where they are, so the hardware-specific
 * variants still override the v1 ones regardless of the order of the project's dependencies.
 */
export function attributeCoreApisToCorePackage() {
    const bundled = pxt.getBundledApiInfo();
    const corePkgKey = "libs/" + pxt.appTarget.corepkg;
    const coreKey = "libs/core";
    if (!bundled || corePkgKey === coreKey) return;

    const corePkgInfo = bundled[corePkgKey];
    const coreInfo = bundled[coreKey];
    if (!corePkgInfo?.apis?.byQName || !coreInfo?.apis) return;
    // the build gave libs/core symbols of its own: nothing to repair
    if (Object.keys(coreInfo.apis.byQName || {}).length) return;

    const declaredElsewhere: pxt.Map<boolean> = {};
    for (const key of Object.keys(bundled)) {
        if (key === corePkgKey || key === coreKey) continue;
        for (const qName of Object.keys(bundled[key]?.apis?.byQName || {}))
            declaredElsewhere[qName] = true;
    }

    const byQName: pxt.Map<ts.pxtc.SymbolInfo> = {};
    for (const qName of Object.keys(corePkgInfo.apis.byQName)) {
        if (!declaredElsewhere[qName])
            byQName[qName] = corePkgInfo.apis.byQName[qName];
    }

    bundled[coreKey] = {
        ...coreInfo,
        apis: {
            ...coreInfo.apis,
            byQName
        }
    };
}
