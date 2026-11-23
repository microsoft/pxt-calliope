/**
 * Attribute the bundled core APIs to the packages that declare them instead of the target's
 * corepkg ("v1").
 *
 * The build stores the API info of the core libraries under libs/<corepkg>: libs/v1 holds the
 * symbols of its dependencies core and core-mini-dal, whose own entries are left empty. When
 * the editor assembles the blocks from this cached info, it tags every symbol of that entry
 * with pkg = pxt.appTarget.corepkg, so "show number" & co. look like they come from the "v1"
 * extension.
 *
 * Copying blocks (pxt-core 13.3+) records the extension of every copied block and refuses
 * the copy when that extension is not a dependency of the project: projects for the
 * Calliope mini 2 and 3 never depend on "v1", so copying any core block failed with
 * "The extension 'v1' cannot be copied".
 *
 * The editor merges the corepkg entry first, then the entries of the project's dependencies,
 * and a later entry wins. So we fill the empty entries of the corepkg's dependencies with the
 * corepkg symbols they declare (found in their bundled sources):
 * - symbols of a variant package (core-mini-dal) go to its entry: mini 1 and 2 projects load
 *   it and record it as the source, mini 3 projects don't load it, so its symbols keep
 *   failing to copy there, as they would fail to compile;
 * - symbols of "core", which every project depends on, go to the core entry, unless another
 *   bundled package (v3, core-mini-codal, ...) declares them too: core may load after those,
 *   and must not replace their hardware-specific variant;
 * - a symbol whose declaration we cannot place in exactly one package stays where it was.
 */
export function attributeCoreApisToDeclaringPackages() {
    const bundled = pxt.getBundledApiInfo();
    const corePkgName = pxt.appTarget.corepkg;
    const corePkgInfo = bundled?.["libs/" + corePkgName];
    const corePkgConfig = readConfig(corePkgName);
    if (!corePkgInfo?.apis?.byQName || !corePkgConfig) return;

    // the corepkg's dependencies whose cached API info the build left empty
    const owners = Object.keys(corePkgConfig.dependencies || {})
        .filter(name => name !== corePkgName
            && bundled["libs/" + name]?.apis
            && !Object.keys(bundled["libs/" + name].apis.byQName || {}).length
            && pxt.appTarget.bundledpkgs[name]);
    if (!owners.length) return;
    const declared = owners.map(name => ({ name, names: declaredNames(name) }));

    const declaredElsewhere: pxt.Map<boolean> = {};
    for (const key of Object.keys(bundled)) {
        if (key === "libs/" + corePkgName) continue;
        for (const qName of Object.keys(bundled[key]?.apis?.byQName || {}))
            declaredElsewhere[qName] = true;
    }

    const attributed: pxt.Map<pxt.Map<ts.pxtc.SymbolInfo>> = {};
    for (const qName of Object.keys(corePkgInfo.apis.byQName)) {
        const owner = declaringPackage(qName, declared);
        if (owner === undefined) continue;
        // core symbols may load after the hardware-specific packages: keep their overrides
        if (owner === "core" && declaredElsewhere[qName]) continue;
        (attributed[owner] || (attributed[owner] = {}))[qName] = corePkgInfo.apis.byQName[qName];
    }

    for (const name of Object.keys(attributed)) {
        const info = bundled["libs/" + name];
        bundled["libs/" + name] = {
            ...info,
            apis: {
                ...info.apis,
                byQName: attributed[name]
            }
        };
    }
}

/**
 * The package that declares the symbol: the first segment of the qualified name (from the
 * outside in) that one package declares, e.g. "MotorCommand" for "MotorCommand.Coast".
 * Namespaces are not declarations here, as several packages add to the same one. A symbol
 * that no package declares as such (a namespace, a built-in type) belongs to "core" when core
 * is among the packages; a segment declared by several packages leaves the owner unknown.
 */
function declaringPackage(qName: string, declared: { name: string, names: pxt.Map<boolean> }[]): string | undefined {
    for (const segment of qName.split(".")) {
        const declaring = declared.filter(d => d.names[segment]);
        if (declaring.length === 1) return declaring[0].name;
        if (declaring.length > 1) return undefined;
    }
    return declared.some(d => d.name === "core") ? "core" : undefined;
}

const DECLARATION = /\b(?:function|let|var|class|interface|type|(?:const\s+)?enum|const)\s+([A-Za-z_$][\w$]*)/g;

/** Names declared (functions, variables, classes, enums, ...) in a bundled package's TypeScript sources. */
function declaredNames(pkgName: string): pxt.Map<boolean> {
    const names: pxt.Map<boolean> = {};
    const files = pxt.appTarget.bundledpkgs[pkgName] || {};
    for (const fileName of Object.keys(files)) {
        if (!/\.ts$/.test(fileName)) continue;
        const source = files[fileName]
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\/\/.*$/gm, "");
        DECLARATION.lastIndex = 0;
        let match: RegExpExecArray;
        while ((match = DECLARATION.exec(source)))
            names[match[1]] = true;
    }
    return names;
}

function readConfig(pkgName: string): pxt.PackageConfig | undefined {
    const config = pxt.appTarget.bundledpkgs[pkgName]?.[pxt.CONFIG_NAME];
    return config ? pxt.Util.jsonTryParse(config) : undefined;
}
