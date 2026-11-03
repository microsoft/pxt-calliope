/// <reference path="../node_modules/pxt-core/localtypings/pxtblockly.d.ts"/>

const pxtblockly = pxt.blocks.requirePxtBlockly()

/**
 * Feed names of the linked IoT dashboard, offered in the IoT extension's feed
 * field (Amerlander/pxt-calliope-iot, block iot_feed_name).
 *
 * The extension's feed field is pxt's "autocomplete" editor with the key
 * "iotfeed": its list holds the feed names the program already uses. What the
 * program cannot know is which feeds the dashboard has. Whoever does know —
 * the IoT simulator panel (a simx frame inside this editor) or Calliope
 * Campus (the page embedding the editor) — posts them here:
 *
 *   window.postMessage({ type: "calliope-iot-feeds", feeds: ["temp", "licht"] }, "*")
 *
 * Each sender keeps its own list, and a message replaces only that sender's
 * list: Campus knows every feed of the dashboard, the panel only those that
 * carry values, and neither may wipe out the other. The field offers the union.
 * A sender's list goes with its frame (a simulator panel that was closed).
 * The names are suggestions only; typing any other name stays possible, and
 * nothing is written into the project.
 *
 * Done by extending FieldAutoComplete instead of registering an own field
 * editor: an editor without this code (an older target, plain pxt) then shows
 * the plain autocomplete instead of breaking the block, and the key check
 * leaves every other autocomplete field (datalogger columns) untouched.
 *
 * The same goes for the IoT project in the connect block (block iot_project,
 * key "iotproject", extension v0.5.0). Its value is the reference Campus
 * writes ("<slug>:R-…:W-…"), which says nothing to a child, so Campus posts
 * the user's IoT projects with their names:
 *
 *   window.postMessage({ type: "calliope-iot-projects",
 *       projects: [{ name: "Wetterstation", ref: "akah8btwbypc:R-…:W-…" }] }, "*")
 *
 * With a list the field shows the name of the project whose slug the value
 * starts with (the bare slug for one it does not know, never the tokens), and
 * a click opens the list rather than a text box: picking a project writes its
 * reference. Without a list the field stays the plain text field.
 */
const FEED_KEY = "iotfeed"
const MESSAGE_TYPE = "calliope-iot-feeds"
const MAX_FEEDS = 200
// The rule Campus applies to feed keys.
const FEED_NAME = /^[a-z0-9_-]{1,40}$/i

const PROJECT_KEY = "iotproject"
const PROJECTS_MESSAGE_TYPE = "calliope-iot-projects"
const MAX_PROJECTS = 200

type IotProject = { name: string, ref: string }

const feedsBySender = new Map<MessageEventSource, string[]>()
const projectsBySender = new Map<MessageEventSource, IotProject[]>()
// The project fields that rendered, so a list that arrives later can draw
// them again. pxtblockly does not hand out the workspace.
const projectFields = new Set<any>()

export function initIotFeedOptions() {
    const FieldAutoComplete = (pxtblockly as any).FieldAutoComplete
    const proto = FieldAutoComplete && FieldAutoComplete.prototype
    if (!proto || proto.__iotFeedOptions) return
    proto.__iotFeedOptions = true

    const getOptions = proto.getOptions
    proto.getOptions = function (): [string, string][] {
        if (this.getKey() === PROJECT_KEY) return projectOptions(this.getValue())
        const options: [string, string][] = getOptions.call(this)
        if (this.getKey() !== FEED_KEY) return options
        const merged = options.slice()
        for (const feed of senderFeeds()) {
            if (!merged.some(o => o[0] === feed)) merged.push([feed, feed])
        }
        merged.sort((a, b) => a[0].localeCompare(b[0]))
        return merged
    }

    // The name instead of the reference. getText_ is what Blockly renders;
    // getDisplayText_ (FieldAutoComplete's options and description) follows
    // the same rule.
    const getText = proto.getText_
    proto.getText_ = function (): string {
        if (!showsProjectName(this)) return getText.call(this)
        return projectLabel(this.getValue())
    }
    const getDisplayText = proto.getDisplayText_
    proto.getDisplayText_ = function (): string {
        if (this.getKey() === PROJECT_KEY) projectFields.add(this)
        if (!showsProjectName(this)) return getDisplayText.call(this)
        return projectLabel(this.getValue())
    }

    // A list looks like one: the dropdown arrow, and no quotes around the
    // name (FieldAutoComplete draws a text field's quotes and no arrow).
    // Decided when the field is first drawn, so it holds before a list arrived.
    const base = Object.getPrototypeOf(proto)
    const initView = proto.initView
    proto.initView = function (): void {
        if (this.getKey() !== PROJECT_KEY) return initView.call(this)
        base.initView.call(this)
    }
    const createSVGArrow = proto.createSVGArrow
    proto.createSVGArrow = function (): void {
        if (this.getKey() !== PROJECT_KEY) return createSVGArrow.call(this)
        base.createSVGArrow.call(this)
    }

    // A list, not a text box: nobody types a token by hand.
    const showEditor = proto.showEditor_
    proto.showEditor_ = function (e?: Event, quietInput?: boolean): void {
        if (!showsProjectName(this)) return showEditor.call(this, e, quietInput)
        this.showDropdown_(e)
    }

    window.addEventListener("message", onMessage)
}

/** A project field while somebody posted projects. Without a list it stays the text field. */
function showsProjectName(field: any): boolean {
    return field.getKey() === PROJECT_KEY && senderProjects().length > 0
}

/** The union of every live sender's list. Senders whose frame is gone drop out. */
function senderFeeds(): string[] {
    const all: string[] = []
    feedsBySender.forEach((feeds, sender) => {
        if (!isTrustedSource(sender)) {
            feedsBySender.delete(sender)
            return
        }
        for (const feed of feeds) if (all.indexOf(feed) < 0) all.push(feed)
    })
    return all
}

function senderProjects(): IotProject[] {
    const all: IotProject[] = []
    projectsBySender.forEach((projects, sender) => {
        if (!isTrustedSource(sender)) {
            projectsBySender.delete(sender)
            return
        }
        for (const project of projects) {
            if (!all.some(p => p.ref === project.ref)) all.push(project)
        }
    })
    return all
}

/** The slug a reference starts with: its first part that is not a token. */
function refSlug(ref: string): string {
    for (const raw of String(ref || "").split(":")) {
        const part = raw.trim()
        if (!part) continue
        const upper = part.toUpperCase()
        if (upper.indexOf("R-") === 0 || upper.indexOf("W-") === 0) continue
        return part.toLowerCase()
    }
    return ""
}

/** The project a value means: the same reference, else the same slug (tokens rotated, or none). */
function findProject(ref: string): IotProject | undefined {
    const value = String(ref || "").trim()
    if (!value) return undefined
    const projects = senderProjects()
    const exact = projects.filter(p => p.ref === value)[0]
    if (exact) return exact
    const slug = refSlug(value)
    return slug ? projects.filter(p => refSlug(p.ref) === slug)[0] : undefined
}

/** What the field shows: the project's name, else the bare slug, never a token. */
function projectLabel(ref: string): string {
    const project = findProject(ref)
    return project ? project.name : refSlug(ref)
}

/**
 * The posted projects by name. A value that belongs to none of them
 * (somebody else's project) stays in the list as its first entry, so opening
 * the list and closing it again cannot lose it.
 */
function projectOptions(current: string): [string, string][] {
    const options: [string, string][] = senderProjects().map(p => [p.name, p.ref] as [string, string])
    options.sort((a, b) => a[0].localeCompare(b[0]))
    const value = String(current || "").trim()
    if (value && !findProject(value)) options.unshift([refSlug(value) || value, value])
    return options
}

function onMessage(ev: MessageEvent) {
    const data = ev.data
    if (!data || !isTrustedSource(ev.source)) return
    if (data.type === PROJECTS_MESSAGE_TYPE && Array.isArray(data.projects)) onProjects(ev.source, data.projects)
    if (data.type === MESSAGE_TYPE && Array.isArray(data.feeds)) onFeeds(ev.source, data.feeds)
}

function onFeeds(source: MessageEventSource, list: any[]) {
    const feeds: string[] = []
    for (const raw of list) {
        const feed = typeof raw === "string" ? raw.trim() : ""
        if (FEED_NAME.test(feed) && feeds.indexOf(feed) < 0) feeds.push(feed)
        if (feeds.length >= MAX_FEEDS) break
    }
    if (feeds.length) feedsBySender.set(source, feeds)
    else feedsBySender.delete(source)
}

function onProjects(source: MessageEventSource, list: any[]) {
    const projects: IotProject[] = []
    for (const raw of list) {
        const name = raw && typeof raw.name === "string" ? raw.name.trim() : ""
        const ref = raw && typeof raw.ref === "string" ? raw.ref.trim() : ""
        if (!name || !ref || projects.some(p => p.ref === ref)) continue
        projects.push({ name, ref })
        if (projects.length >= MAX_PROJECTS) break
    }
    if (projects.length) projectsBySender.set(source, projects)
    else projectsBySender.delete(source)
    rerenderProjectFields()
}

/** The list usually arrives after the blocks rendered: draw the project fields again. */
function rerenderProjectFields() {
    projectFields.forEach(field => {
        const block = field.getSourceBlock && field.getSourceBlock()
        if (!block || block.disposed) {
            projectFields.delete(field)
            return
        }
        field.forceRerender()
    })
}

// The page embedding the editor (Campus) or a frame of the editor itself (the
// simulator panel). Not any window that happens to hold a reference to us.
function isTrustedSource(source: MessageEventSource | null): boolean {
    if (!source) return false
    if (window.parent !== window && source === window.parent) return true
    const frames = document.getElementsByTagName("iframe")
    for (let i = 0; i < frames.length; i++) {
        if (frames[i].contentWindow === source) return true
    }
    return false
}
