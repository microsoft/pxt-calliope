
export function patchBlocks(pkgTargetVersion: string, dom: Element) {

    // is this a old script?
    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "5.0.0") >= 0) return;

    // Motor Names mapping
    pxt.U.toArray(dom.querySelectorAll('field[name="motor"]'))
    .forEach(node => {
        const motorValue = node.textContent.trim();
        switch (motorValue) {
            case 'Motor.A':
                node.textContent = 'Motor.M0';
                break;
            case 'Motor.B':
                node.textContent = 'Motor.M1';
                break;
            case 'Motor.AB':
                node.textContent = 'Motor.M0_M1';
                break;
            // Add additional cases if needed for other motor values
        }
    });

     // Sound level mapping
     pxt.U.toArray(dom.querySelectorAll('block[type=device_get_sound_level]'))
         .forEach(node => {
             node.setAttribute('type', 'soundLevel');
         });



    // is this a old script?
    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "4.0.20") >= 0) return;
    // button and pin pressed/released blocks
/*
    <block type="device_button_event" x="354" y="30">
        <field name="NAME">Button.A</field>
    </block>
    <block type="device_pin_event" x="610" y="33">
        <field name="name">TouchPin.P0</field>
    </block>
    <block type="device_pin_released" x="361" y="158">
        <field name="NAME">TouchPin.P1</field>
    </block>

    converts to

    <block type="device_button_selected_event" x="35" y="429">
        <field name="NAME">Button.B</field>
        <value name="eventType">
            <shadow type="control_button_event_value">
                <field name="id">ButtonEvent.Click</field>
            </shadow>
        </value>
    </block>
    <block type="device_pin_custom_event" x="368" y="428">
        <field name="NAME">TouchPin.P2</field>
        <value name="eventType">
            <shadow type="control_button_event_value">
                <field name="id">ButtonEvent.Up</field>
            </shadow>
        </value>
    </block>
*/
const inputNodes = pxt.U.toArray(dom.querySelectorAll("block[type=device_button_event]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_pin_event]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_pin_released]")))
        inputNodes.forEach(node => {
            const nodeType = node.getAttribute("type");
            if(nodeType === "device_button_event") {
                node.setAttribute("type", "device_button_selected_event");
            } else {
                node.setAttribute("type", "device_pin_custom_event");
            }
            // fix lowercase 'name'in device_pin_event
            if(nodeType === "device_pin_event") {
                node.querySelectorAll("field[name=name]")[0].setAttribute("name", "NAME")
            }
            const valueNode = node.ownerDocument.createElement("value");
            valueNode.setAttribute("name", "eventType")

            const shadowNode = node.ownerDocument.createElement("shadow");
            shadowNode.setAttribute("type", "control_button_event_value")

            const fieldNode = node.ownerDocument.createElement("field");
            fieldNode.setAttribute("name", "id")

            if(nodeType === "device_button_event") {
                fieldNode.textContent = "ButtonEvent.Click";
            } else if(nodeType === "device_pin_released") {
                fieldNode.textContent = "ButtonEvent.Up";
            } else {
                fieldNode.textContent = "ButtonEvent.Down";
            }

            shadowNode.prepend(fieldNode)
            valueNode.prepend(shadowNode)
            node.prepend(valueNode)

        });



// loudness
    /*
    <block type="loudness" />

    converts to

    <block type="soundLevel" />
    */
    const loudnessNodes = pxt.U.toArray(dom.querySelectorAll("block[type=loudness]"))
    loudnessNodes.forEach(node => {
        node.setAttribute("type", "soundLevel");
    });

    // rgbw to rgb block
    const rgbwNodes = pxt.U.toArray(dom.querySelectorAll("block[type=core_rgbw]"))
    rgbwNodes.forEach(node => {
        node.setAttribute("type", "core_rgb");
        node.querySelectorAll("value[name=white]")[0].remove();
    }); 

    // arrow blocks
    /*
<block type="basic_show_arrow">
    <value name="i">
        <shadow type="device_arrow">
            <field name="arrow">ArrowNames.North</field>
        </shadow>
    </value>
</block>

    converts to

<block type="basic_show_icon">
    <mutation xmlns="http://www.w3.org/1999/xhtml" _expanded="0" _input_init="false"></mutation>
    <field name="i">IconNames.ArrowNorth</field>
</block>
    */
const arrowNodes = pxt.U.toArray(dom.querySelectorAll("block[type=basic_show_arrow]"))
arrowNodes.forEach(node => {
    node.setAttribute("type", "basic_show_icon");
    const arrowNode = node.querySelectorAll("value[name=i]")[0]
    const iconName = "IconNames.Arrow" + arrowNode.querySelectorAll("field[name=arrow]")[0].textContent.split('.')[1];
    
    const iconNode = node.ownerDocument.createElement("field");
    iconNode.setAttribute("name", "i")
    iconNode.textContent  = iconName;

    const mutationNode = node.ownerDocument.createElement("mutation");
    // mutationNode.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    mutationNode.setAttribute("_expanded", "0")
    mutationNode.setAttribute("_input_init", "false")

    node.prepend(iconNode)
    node.prepend(mutationNode)
    node.removeChild(arrowNode);
});

    // arrow icons
    /*
<block type="builtin_arrow_image">
    <field name="i">ArrowNames.East</field>
</block>

    converts to

<block type="builtin_image">
    <field name="i">IconNames.ArrowEast</field>
</block>
    */
const arrowImageNodes = pxt.U.toArray(dom.querySelectorAll("block[type=builtin_arrow_image]"))
arrowImageNodes.forEach(node => {
    node.setAttribute("type", "builtin_image");
    const arrowNode = node.querySelectorAll("field[name=i]")[0];
    arrowNode.textContent  = "IconNames.Arrow" + arrowNode.textContent.split('.')[1];
});

    // LEDs
/**
 *       <block type="device_show_leds">
    <field name="LED00">FALSE</field>
    <field name="LED10">FALSE</field>
    <field name="LED20">FALSE</field>
    <field name="LED30">FALSE</field>
    <field name="LED40">FALSE</field>
    <field name="LED01">FALSE</field>
    <field name="LED11">FALSE</field>
    <field name="LED21">FALSE</field>
    <field name="LED31">TRUE</field>
    <field name="LED41">FALSE</field>
    <field name="LED02">FALSE</field>
    <field name="LED12">FALSE</field>
    <field name="LED22">FALSE</field>
    <field name="LED32">FALSE</field>
    <field name="LED42">FALSE</field>
    <field name="LED03">FALSE</field>
    <field name="LED13">TRUE</field>
    <field name="LED23">FALSE</field>
    <field name="LED33">FALSE</field>
    <field name="LED43">FALSE</field>
    <field name="LED04">FALSE</field>
    <field name="LED14">FALSE</field>
    <field name="LED24">FALSE</field>
    <field name="LED34">FALSE</field>
    <field name="LED44">FALSE</field>
  </block>

  to
<block type="device_show_leds">
    <field name="LEDS">`
    # # # # #
    . . . . #
    . . . . .
    . . . . #
    . . . . #
    `
    </field>
  </block>
 */


    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "5.0.12") <= 0) {

        // Eighth note misspelling
        /*
        <block type="basic_show_icon">
            <field name="i">IconNames.EigthNote</field>
        </block>

        converts to

        <block type="basic_show_icon">
            <field name="i">IconNames.EighthNote</field>
        </block>
        */
        pxt.U.toArray(dom.querySelectorAll("block[type=basic_show_icon]>field[name=i]"))
            .filter(node => node.textContent === "IconNames.EigthNote")
            .forEach(node => node.textContent = "IconNames.EighthNote");

        // Italian translation error
        /*
        <shadow type="device_note">
            <field name="note">466</field>
        </shadow>

        converts to

        <shadow type="device_note">
            <field name="name">466</field>
        </shadow>
        */
        pxt.U.toArray(dom.querySelectorAll("shadow[type=device_note]>field[name=note]"))
            .forEach(node => node.setAttribute("name", "name"));
    }

    // is this a old script?
    if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "1.0.0") >= 0) return;

    // showleds
    const nodes = pxt.U.toArray(dom.querySelectorAll("block[type=device_show_leds]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_build_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_build_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("block[type=device_build_big_image]")))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_build_big_image]")));
    nodes.forEach(node => {
        // don't rewrite if already upgraded, eg. field LEDS already present
        if (pxt.U.toArray(node.children).filter(child => child.tagName == "field" && "LEDS" == child.getAttribute("name"))[0])
            return;
        // read LEDxx value and assmebly into a new field
        const leds: string[][] = [[], [], [], [], []];
        pxt.U.toArray(node.children)
            .filter(child => child.tagName == "field" && /^LED\d+$/.test(child.getAttribute("name")))
            .forEach(lednode => {
                let n = lednode.getAttribute("name");
                let col = parseInt(n[3]);
                let row = parseInt(n[4]);
                leds[row][col] = lednode.textContent  == "TRUE" ? "#" : ".";
                // remove node
                node.removeChild(lednode);
            });
        // add new field
        const f = node.ownerDocument.createElement("field");
        f.setAttribute("name", "LEDS");
        const s = '`\n' + leds.map(row => row.join('')).join('\n') + '\n`';
        f.appendChild(node.ownerDocument.createTextNode(s));
        node.insertBefore(f, null);
    });



    // radio
    /*
<block type="radio_on_packet" x="174" y="120">
<mutation callbackproperties="receivedNumber" renamemap="{}"></mutation>
<field name="receivedNumber">receivedNumber</field>
</block>
<block type="radio_on_packet" disabled="true" x="127" y="263">
<mutation callbackproperties="receivedString,receivedNumber" renamemap="{&quot;receivedString&quot;:&quot;name&quot;,&quot;receivedNumber&quot;:&quot;value&quot;}"></mutation>
<field name="receivedString">name</field>
<field name="receivedNumber">value</field>
</block>
<block type="radio_on_packet" disabled="true" x="162" y="420">
<mutation callbackproperties="receivedString" renamemap="{}"></mutation>
<field name="receivedString">receivedString</field>
</block>

converts to

<block type="radio_on_number" x="196" y="208">
<field name="HANDLER_receivedNumber" id="DCy(W;1)*jLWQUpoy4Mm" variabletype="">receivedNumber</field>
</block>
<block type="radio_on_value" x="134" y="408">
<field name="HANDLER_name" id="*d-Jm^MJXO]Djs(dTR*?" variabletype="">name</field>
<field name="HANDLER_value" id="A6HQjH[k^X43o3h775+G" variabletype="">value</field>
</block>
<block type="radio_on_string" x="165" y="583">
<field name="HANDLER_receivedString" id="V9KsE!h$(iO?%W:[32CV" variabletype="">receivedString</field>
</block>
*/
    const varids: pxt.Map<string> = {};

    function addField(node: Element, renameMap: pxt.Map<string>, name: string) {
        const f = node.ownerDocument.createElement("field");
        f.setAttribute("name", "HANDLER_" + name)
        f.setAttribute("id", varids[renameMap[name] || name]);
        f.appendChild(node.ownerDocument.createTextNode(name));
        node.appendChild(f);
    }

    pxt.U.toArray(dom.querySelectorAll("variable")).forEach(node => varids[node.textContent] = node.getAttribute("id"));
    pxt.U.toArray(dom.querySelectorAll("block[type=radio_on_packet]"))
        .forEach(node => {
            const mutation = node.querySelector("mutation");
            if (!mutation) return;
            const renameMap = JSON.parse(node.getAttribute("renamemap") || "{}");
            const props = mutation.getAttribute("callbackproperties");

            if (props) {
                const parts = props.split(",");

                // It's tempting to generate radio_on_number if parts.length === 0 but
                // that would create a variable named "receivedNumber" and possibly shadow
                // an existing variable in the user's program. It's safer to stick to the
                // old block.
                if (parts.length === 1) {
                    if (parts[0] === "receivedNumber") {
                        node.setAttribute("type", "radio_on_number");
                        node.removeChild(node.querySelector("field[name=receivedNumber]"));
                        addField(node, renameMap, "receivedNumber");
                    }
                    else if (parts[0] === "receivedString") {
                        node.setAttribute("type", "radio_on_string");
                        node.removeChild(node.querySelector("field[name=receivedString]"));
                        addField(node, renameMap, "receivedString");
                    }
                    else {
                        return;
                    }
                    node.removeChild(mutation);
                }
                else if (parts.length === 2 && parts.indexOf("receivedNumber") !== -1 && parts.indexOf("receivedString") !== -1) {
                    node.setAttribute("type", "radio_on_value");
                    node.removeChild(node.querySelector("field[name=receivedNumber]"));
                    node.removeChild(node.querySelector("field[name=receivedString]"));
                    addField(node, renameMap, "name");
                    addField(node, renameMap, "value");
                    node.removeChild(mutation);
                }
            }
        })


    // device_random now refers to randomRange() so we need to add the missing lower bound argument
    pxt.U.toArray(dom.querySelectorAll("block[type=device_random]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=device_random]")))
        .forEach(node => {
            if (getValue(node, "min")) return;
            const v = node.ownerDocument.createElement("value");
            v.setAttribute("name", "min");
            addNumberShadow(v);
            node.appendChild(v);
        });

    /*
    <block type="math_arithmetic">
        <field name="OP">DIVIDE</field>
        <value name="A">
            <shadow type="math_number"><field name="NUM">0</field></shadow>
            <block type="math_number"><field name="NUM">2</field></block>
        </value>
        <value name="B">
            <shadow type="math_number"><field name="NUM">1</field></shadow>
            <block type="math_number"><field name="NUM">3</field></block>
        </value>
    </block>
    */
    pxt.U.toArray(dom.querySelectorAll("block[type=math_arithmetic]"))
        .concat(pxt.U.toArray(dom.querySelectorAll("shadow[type=math_arithmetic]")))
        .forEach(node => {
            const op = getField(node, "OP");
            if (!op || op.textContent.trim() !== "DIVIDE") return;

            // Convert to integer division
            /*
            <block type="math_js_op">
                <mutation op-type="infix"></mutation>
                <field name="OP">idiv</field>
                <value name="ARG0">
                    <shadow type="math_number"><field name="NUM">0</field></shadow>
                </value>
                <value name="ARG1">
                    <shadow type="math_number"><field name="NUM">0</field></shadow>
                </value>
            </block>
            */

            node.setAttribute("type", "math_js_op");
            op.textContent = "idiv";

            const mutation = node.ownerDocument.createElement("mutation");
            mutation.setAttribute("op-type", "infix");
            // mutation has to be first or Blockly will drop the second argument
            node.insertBefore(mutation, node.firstChild);

            const a = getValue(node, "A");
            if (a) a.setAttribute("name", "ARG0");

            const b = getValue(node, "B");
            if (b) b.setAttribute("name", "ARG1");
        });

    renameField(dom, "math_number_minmax", "NUM", "SLIDER");
    renameField(dom, "device_note", "note", "name");
}

function renameField(dom: Element, blockType: string, oldName: string, newName: string) {
    pxt.U.toArray(dom.querySelectorAll(`block[type=${blockType}]`))
        .concat(pxt.U.toArray(dom.querySelectorAll(`shadow[type=${blockType}]`)))
        .forEach(node => {
            const thefield = getField(node, oldName);
            if (thefield) {
                thefield.setAttribute("name", newName);
            }
        });
}


function getField(parent: Element, name: string) {
    return getFieldOrValue(parent, name, true);
}

function getValue(parent: Element, name: string) {
    return getFieldOrValue(parent, name, false);
}

function getFieldOrValue(parent: Element, name: string, isField: boolean) {
    const nodeType = isField ? "field" : "value";
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children.item(i);
        if (child.tagName === nodeType && child.getAttribute("name") === name) {
            return child;
        }
    }
    return undefined;
}

function addNumberShadow(valueNode: Element) {
    const s = valueNode.ownerDocument.createElement("shadow");
    s.setAttribute("type", "math_number");

    const f = valueNode.ownerDocument.createElement("field");
    f.setAttribute("name", "NUM");
    f.textContent = "0";

    s.appendChild(f);
    valueNode.appendChild(s);
}
