var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../localtypings/blockly.d.ts'/>
/// <reference path="../built/pxtlib.d.ts" />
///////////////////////////////////////////////////////////////////////////////
//                A compiler from Blocky to TouchDevelop                     //
///////////////////////////////////////////////////////////////////////////////
var B = Blockly;
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks) {
        (function (NT) {
            NT[NT["Prefix"] = 0] = "Prefix";
            NT[NT["Infix"] = 1] = "Infix";
            NT[NT["Block"] = 2] = "Block";
            NT[NT["NewLine"] = 3] = "NewLine";
        })(blocks.NT || (blocks.NT = {}));
        var NT = blocks.NT;
        var MAX_COMMENT_LINE_LENGTH = 50;
        var reservedWords = ["break", "case", "catch", "class", "const", "continue", "debugger",
            "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally",
            "for", "function", "if", "import", "in", "instanceof", "new", "null", "return",
            "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while",
            "with"];
        var placeholders = {};
        function stringLit(s) {
            if (s.length > 20 && /\n/.test(s))
                return "`" + s.replace(/[\\`${}]/g, function (f) { return "\\" + f; }) + "`";
            else
                return JSON.stringify(s);
        }
        function mkNode(tp, pref, children) {
            return {
                type: tp,
                op: pref,
                children: children
            };
        }
        function mkNewLine() {
            return mkNode(NT.NewLine, "", []);
        }
        function mkPrefix(pref, children) {
            return mkNode(NT.Prefix, pref, children);
        }
        function mkInfix(child0, op, child1) {
            return mkNode(NT.Infix, op, [child0, child1]);
        }
        function mkText(s) {
            return mkPrefix(s, []);
        }
        blocks.mkText = mkText;
        function mkBlock(nodes) {
            return mkNode(NT.Block, "", nodes);
        }
        function mkGroup(nodes) {
            return mkPrefix("", nodes);
        }
        blocks.mkGroup = mkGroup;
        function mkStmt() {
            var nodes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                nodes[_i - 0] = arguments[_i];
            }
            nodes.push(mkNewLine());
            return mkGroup(nodes);
        }
        function mkCommaSep(nodes, externalInputs) {
            var r = [];
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var n = nodes_1[_i];
                if (externalInputs) {
                    if (r.length > 0)
                        r.push(mkText(","));
                    r.push(mkNewLine());
                }
                else if (r.length > 0) {
                    r.push(mkText(", "));
                }
                r.push(n);
            }
            if (externalInputs)
                r.push(mkNewLine());
            return mkGroup(r);
        }
        // A series of utility functions for constructing various J* AST nodes.
        var Helpers;
        (function (Helpers) {
            function mkArrayLiteral(args) {
                return mkGroup([
                    mkText("["),
                    mkCommaSep(args, false),
                    mkText("]")
                ]);
            }
            Helpers.mkArrayLiteral = mkArrayLiteral;
            function mkNumberLiteral(x) {
                return mkText(x.toString());
            }
            Helpers.mkNumberLiteral = mkNumberLiteral;
            function mkBooleanLiteral(x) {
                return mkText(x ? "true" : "false");
            }
            Helpers.mkBooleanLiteral = mkBooleanLiteral;
            function mkStringLiteral(x) {
                return mkText(stringLit(x));
            }
            Helpers.mkStringLiteral = mkStringLiteral;
            function mkPropertyAccess(name, thisArg) {
                return mkGroup([
                    mkInfix(thisArg, ".", mkText(name)),
                ]);
            }
            Helpers.mkPropertyAccess = mkPropertyAccess;
            function mkCall(name, args, externalInputs, method) {
                if (method === void 0) { method = false; }
                if (method)
                    return mkGroup([
                        mkInfix(args[0], ".", mkText(name)),
                        mkText("("),
                        mkCommaSep(args.slice(1), externalInputs),
                        mkText(")")
                    ]);
                else
                    return mkGroup([
                        mkText(name),
                        mkText("("),
                        mkCommaSep(args, externalInputs),
                        mkText(")")
                    ]);
            }
            Helpers.mkCall = mkCall;
            // Call function [name] from the standard device library with arguments
            // [args].
            function stdCall(name, args, externalInputs) {
                return mkCall(name, args, externalInputs);
            }
            Helpers.stdCall = stdCall;
            // Call extension method [name] on the first argument
            function extensionCall(name, args, externalInputs) {
                return mkCall(name, args, externalInputs, true);
            }
            Helpers.extensionCall = extensionCall;
            // Call function [name] from the specified [namespace] in the micro:bit
            // library.
            function namespaceCall(namespace, name, args, externalInputs) {
                return mkCall(namespace + "." + name, args, externalInputs);
            }
            Helpers.namespaceCall = namespaceCall;
            function mathCall(name, args) {
                return namespaceCall("Math", name, args, false);
            }
            Helpers.mathCall = mathCall;
            function mkGlobalRef(name) {
                return mkText(name);
            }
            Helpers.mkGlobalRef = mkGlobalRef;
            function mkSimpleCall(p, args) {
                assert(args.length == 2);
                return mkInfix(args[0], p, args[1]);
            }
            Helpers.mkSimpleCall = mkSimpleCall;
            function mkWhile(condition, body) {
                return mkGroup([
                    mkText("while ("),
                    condition,
                    mkText(")"),
                    mkBlock(body)
                ]);
            }
            Helpers.mkWhile = mkWhile;
            function mkComment(text) {
                return mkStmt(mkText("// " + text));
            }
            Helpers.mkComment = mkComment;
            function mkAssign(x, e) {
                return mkStmt(mkSimpleCall("=", [x, e]));
            }
            Helpers.mkAssign = mkAssign;
            function mkParenthesizedExpression(expression) {
                return mkGroup([
                    mkText("("),
                    expression,
                    mkText(")")
                ]);
            }
            Helpers.mkParenthesizedExpression = mkParenthesizedExpression;
        })(Helpers || (Helpers = {}));
        var H = Helpers;
        ///////////////////////////////////////////////////////////////////////////////
        // Miscellaneous utility functions
        ///////////////////////////////////////////////////////////////////////////////
        // Mutate [a1] in place and append to it the elements from [a2].
        function append(a1, a2) {
            a1.push.apply(a1, a2);
        }
        // A few wrappers for basic Block operations that throw errors when compilation
        // is not possible. (The outer code catches these and highlights the relevant
        // block.)
        // Internal error (in our code). Compilation shouldn't proceed.
        function assert(x) {
            if (!x)
                throw new Error("Assertion failure");
        }
        function throwBlockError(msg, block) {
            var e = new Error(msg);
            e.block = block;
            throw e;
        }
        ///////////////////////////////////////////////////////////////////////////////
        // Types
        //
        // We slap a very simple type system on top of Blockly. This is needed to ensure
        // we generate valid TouchDevelop code (otherwise compilation from TD to C++
        // would not work).
        ///////////////////////////////////////////////////////////////////////////////
        // There are several layers of abstraction for the type system.
        // - Block are annotated with a string return type, and a string type for their
        //   input blocks (see blocks-custom.js). We use that as the reference semantics
        //   for the blocks.
        // - In this "type system", we use the enum Type. Using an enum rules out more
        //   mistakes.
        // - When emitting code, we target the "TouchDevelop types".
        //
        // Type inference / checking is done as follows. First, we try to assign a type
        // to all variables. We do this by examining all variable assignments and
        // figuring out the type from the right-hand side. There's a fixpoint computation
        // (see [mkEnv]). Then, we propagate down the expected type when doing code
        // generation; when generating code for a variable dereference, if the expected
        // type doesn't match the inferred type, it's an error. If the type was
        // undetermined as of yet, the type of the variable becomes the expected type.
        var Point = (function () {
            function Point(link, type) {
                this.link = link;
                this.type = type;
            }
            return Point;
        }());
        blocks.Point = Point;
        function find(p) {
            if (p.link)
                return find(p.link);
            else
                return p;
        }
        function union(p1, p2) {
            var _p1 = find(p1);
            var _p2 = find(p2);
            assert(_p1.link == null && _p2.link == null);
            if (_p1 == _p2)
                return;
            var t = unify(_p1.type, _p2.type);
            p1.link = _p2;
            p1.type = null;
            p2.type = t;
        }
        // Ground types.
        function mkPoint(t) {
            return new Point(null, t);
        }
        var pNumber = mkPoint("number");
        var pBoolean = mkPoint("boolean");
        var pString = mkPoint("string");
        var pUnit = mkPoint("void");
        function ground(t) {
            if (!t)
                return mkPoint(t);
            switch (t.toLowerCase()) {
                case "number": return pNumber;
                case "boolean": return pBoolean;
                case "string": return pString;
                case "void": return pUnit;
                default:
                    // Unification variable.
                    return mkPoint(t);
            }
        }
        ///////////////////////////////////////////////////////////////////////////////
        // Type inference
        //
        // Expressions are now directly compiled as a tree. This requires knowing, for
        // each property ref, the right value for its [parent] property.
        ///////////////////////////////////////////////////////////////////////////////
        // Infers the expected type of an expression by looking at the untranslated
        // block and figuring out, from the look of it, what type of expression it
        // holds.
        function returnType(e, b) {
            assert(b != null);
            if (b.type == "placeholder" || b.type === pxtc.TS_OUTPUT_TYPE)
                return find(b.p);
            if (b.type == "variables_get")
                return find(lookup(e, escapeVarName(b.getFieldValue("VAR"), e)).type);
            assert(!b.outputConnection || b.outputConnection.check_ && b.outputConnection.check_.length > 0);
            if (!b.outputConnection)
                return ground(pUnit.type);
            return ground(b.outputConnection.check_[0]);
        }
        // Basic type unification routine; easy, because there's no structural types.
        function unify(t1, t2) {
            if (t1 == null)
                return t2;
            else if (t2 == null)
                return t1;
            else if (t1 == t2)
                return t1;
            else
                throw new Error("cannot mix " + t1 + " with " + t2);
        }
        function mkPlaceholderBlock(e) {
            // XXX define a proper placeholder block type
            return {
                type: "placeholder",
                p: mkPoint(null),
                workspace: e.workspace,
            };
        }
        function attachPlaceholderIf(e, b, n) {
            // Ugly hack to keep track of the type we want there.
            var target = b.getInputTargetBlock(n);
            if (!target) {
                if (!placeholders[b.id]) {
                    placeholders[b.id] = {};
                }
                placeholders[b.id][n] = mkPlaceholderBlock(e);
            }
            else if (target.type === pxtc.TS_OUTPUT_TYPE && !(target.p)) {
                target.p = mkPoint(null);
            }
        }
        function getInputTargetBlock(b, n) {
            var res = b.getInputTargetBlock(n);
            if (!res) {
                return placeholders[b.id] && placeholders[b.id][n];
            }
            else {
                return res;
            }
        }
        function removeAllPlaceholders() {
            placeholders = {};
        }
        // Unify the *return* type of the parameter [n] of block [b] with point [p].
        function unionParam(e, b, n, p) {
            try {
                attachPlaceholderIf(e, b, n);
                union(returnType(e, getInputTargetBlock(b, n)), p);
            }
            catch (e) {
                throwBlockError("The parameter " + n + " of this block is of the wrong type. More precisely: " + e, b);
            }
        }
        function infer(e, w) {
            w.getAllBlocks().filter(function (b) { return !b.disabled; }).forEach(function (b) {
                try {
                    switch (b.type) {
                        case "math_op2":
                            unionParam(e, b, "x", ground(pNumber.type));
                            unionParam(e, b, "y", ground(pNumber.type));
                            break;
                        case "math_op3":
                            unionParam(e, b, "x", ground(pNumber.type));
                            break;
                        case "math_arithmetic":
                        case "logic_compare":
                            switch (b.getFieldValue("OP")) {
                                case "ADD":
                                case "MINUS":
                                case "MULTIPLY":
                                case "DIVIDE":
                                case "LT":
                                case "LTE":
                                case "GT":
                                case "GTE":
                                case "POWER":
                                    unionParam(e, b, "A", ground(pNumber.type));
                                    unionParam(e, b, "B", ground(pNumber.type));
                                    break;
                                case "AND":
                                case "OR":
                                    unionParam(e, b, "A", ground(pBoolean.type));
                                    unionParam(e, b, "B", ground(pBoolean.type));
                                    break;
                                case "EQ":
                                case "NEQ":
                                    attachPlaceholderIf(e, b, "A");
                                    attachPlaceholderIf(e, b, "B");
                                    var p1_1 = returnType(e, getInputTargetBlock(b, "A"));
                                    var p2 = returnType(e, getInputTargetBlock(b, "B"));
                                    try {
                                        union(p1_1, p2);
                                    }
                                    catch (e) {
                                        throwBlockError("Comparing objects of different types", b);
                                    }
                                    var t = find(p1_1).type;
                                    if (t != pString.type && t != pBoolean.type && t != pNumber.type && t != null)
                                        throwBlockError("I can only compare strings, booleans and numbers", b);
                                    break;
                            }
                            break;
                        case "logic_operation":
                            unionParam(e, b, "A", ground(pBoolean.type));
                            unionParam(e, b, "B", ground(pBoolean.type));
                            break;
                        case "logic_negate":
                            unionParam(e, b, "BOOL", ground(pBoolean.type));
                            break;
                        case "controls_if":
                            for (var i = 0; i <= b.elseifCount_; ++i)
                                unionParam(e, b, "IF" + i, ground(pBoolean.type));
                            break;
                        case "controls_simple_for":
                            unionParam(e, b, "TO", ground(pNumber.type));
                            break;
                        case "variables_set":
                        case "variables_change":
                            var x = escapeVarName(b.getFieldValue("VAR"), e);
                            var p1 = lookup(e, x).type;
                            attachPlaceholderIf(e, b, "VALUE");
                            var rhs = getInputTargetBlock(b, "VALUE");
                            if (rhs) {
                                var tr = returnType(e, rhs);
                                try {
                                    union(p1, tr);
                                }
                                catch (e) {
                                    throwBlockError("Assigning a value of the wrong type to variable " + x, b);
                                }
                            }
                            break;
                        case "controls_repeat_ext":
                            unionParam(e, b, "TIMES", ground(pNumber.type));
                            break;
                        case "device_while":
                            unionParam(e, b, "COND", ground(pBoolean.type));
                            break;
                        default:
                            if (b.type in e.stdCallTable) {
                                e.stdCallTable[b.type].args.forEach(function (p) {
                                    if (p.field && !b.getFieldValue(p.field)) {
                                        var i = b.inputList.filter(function (i) { return i.name == p.field; })[0];
                                        // This will throw if someone modified blocks-custom.js and forgot to add
                                        // [setCheck]s in the block definition. This is intentional and MUST be
                                        // fixed.
                                        var t = i.connection.check_[0];
                                        unionParam(e, b, p.field, ground(t));
                                    }
                                });
                            }
                    }
                }
                catch (err) {
                    var be = err.block || b;
                    be.setWarningText(err + "");
                    e.errors.push(be);
                }
            });
            // Last pass: if some variable has no type (because it was never used or
            // assigned to), just unify it with int...
            e.bindings.forEach(function (b) {
                if (find(b.type).type == null)
                    union(b.type, ground(pNumber.type));
            });
        }
        ///////////////////////////////////////////////////////////////////////////////
        // Expressions
        //
        // Expressions are now directly compiled as a tree. This requires knowing, for
        // each property ref, the right value for its [parent] property.
        ///////////////////////////////////////////////////////////////////////////////
        function extractNumber(b) {
            var v = b.getFieldValue("NUM");
            var parsed = parseFloat(v);
            checkNumber(parsed);
            return parsed;
        }
        function checkNumber(n) {
            if (n === Infinity || n === NaN) {
                pxt.U.userError(lf("Number entered is either too large or too small"));
            }
        }
        function extractTsExpression(e, b, comments) {
            return mkText(b.getFieldValue("EXPRESSION"));
        }
        function compileNumber(e, b, comments) {
            return H.mkNumberLiteral(extractNumber(b));
        }
        var opToTok = {
            // POWER gets a special treatment because there's no operator for it in
            // TouchDevelop
            "ADD": "+",
            "MINUS": "-",
            "MULTIPLY": "*",
            "DIVIDE": "/",
            "LT": "<",
            "LTE": "<=",
            "GT": ">",
            "GTE": ">=",
            "AND": "&&",
            "OR": "||",
            "EQ": "==",
            "NEQ": "!=",
        };
        function compileArithmetic(e, b, comments) {
            var bOp = b.getFieldValue("OP");
            var left = getInputTargetBlock(b, "A");
            var right = getInputTargetBlock(b, "B");
            var args = [compileExpression(e, left, comments), compileExpression(e, right, comments)];
            var t = returnType(e, left).type;
            if (t == pString.type) {
                if (bOp == "EQ")
                    return H.mkSimpleCall("==", args);
                else if (bOp == "NEQ")
                    return H.mkSimpleCall("!=", args);
            }
            else if (t == pBoolean.type)
                return H.mkSimpleCall(opToTok[bOp], args);
            // Compilation of math operators.
            if (bOp == "POWER")
                return H.mathCall("pow", args);
            else {
                assert(bOp in opToTok);
                return H.mkSimpleCall(opToTok[bOp], args);
            }
        }
        function compileModulo(e, b, comments) {
            var left = getInputTargetBlock(b, "DIVIDEND");
            var right = getInputTargetBlock(b, "DIVISOR");
            var args = [compileExpression(e, left, comments), compileExpression(e, right, comments)];
            return H.mkSimpleCall("%", args);
        }
        function compileMathOp2(e, b, comments) {
            var op = b.getFieldValue("op");
            var x = compileExpression(e, getInputTargetBlock(b, "x"), comments);
            var y = compileExpression(e, getInputTargetBlock(b, "y"), comments);
            return H.mathCall(op, [x, y]);
        }
        function compileMathOp3(e, b, comments) {
            var x = compileExpression(e, getInputTargetBlock(b, "x"), comments);
            return H.mathCall("abs", [x]);
        }
        function compileText(e, b, comments) {
            return H.mkStringLiteral(b.getFieldValue("TEXT"));
        }
        function compileTextJoin(e, b, comments) {
            var last;
            var i = 0;
            while (true) {
                var val = getInputTargetBlock(b, "ADD" + i);
                i++;
                if (!val) {
                    if (i < b.inputList.length) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                var compiled = compileExpression(e, val, comments);
                if (!last) {
                    if (val.type.indexOf("text") === 0) {
                        last = compiled;
                    }
                    else {
                        // If we don't start with a string, then the TS won't match
                        // the implied semantics of the blocks
                        last = H.mkSimpleCall("+", [H.mkStringLiteral(""), compiled]);
                    }
                }
                else {
                    last = H.mkSimpleCall("+", [last, compiled]);
                }
            }
            if (!last) {
                return H.mkStringLiteral("");
            }
            return last;
        }
        function compileBoolean(e, b, comments) {
            return H.mkBooleanLiteral(b.getFieldValue("BOOL") == "TRUE");
        }
        function compileNot(e, b, comments) {
            var expr = compileExpression(e, getInputTargetBlock(b, "BOOL"), comments);
            return mkPrefix("!", [H.mkParenthesizedExpression(expr)]);
        }
        function extractNumberLit(e) {
            if (e.type != NT.Prefix || !/^-?\d+$/.test(e.op))
                return null;
            var parsed = parseInt(e.op);
            checkNumber(parsed);
            return parsed;
        }
        function compileRandom(e, b, comments) {
            var expr = compileExpression(e, getInputTargetBlock(b, "limit"), comments);
            var v = extractNumberLit(expr);
            if (v != null)
                return H.mathCall("random", [H.mkNumberLiteral(v + 1)]);
            else
                return H.mathCall("random", [H.mkSimpleCall(opToTok["ADD"], [expr, H.mkNumberLiteral(1)])]);
        }
        function compileCreateList(e, b, comments) {
            // collect argument
            var args = b.inputList.map(function (input) { return input.connection && input.connection.targetBlock() ? compileExpression(e, input.connection.targetBlock(), comments) : undefined; })
                .filter(function (e) { return !!e; });
            // we need at least 1 element to determine the type...
            if (args.length < 0)
                pxt.U.userError(lf("The list must have at least one element"));
            return H.mkArrayLiteral(args);
        }
        function defaultValueForType(t) {
            if (t.type == null) {
                union(t, ground(pNumber.type));
                t = find(t);
            }
            switch (t.type) {
                case "boolean":
                    return H.mkBooleanLiteral(false);
                case "number":
                    return H.mkNumberLiteral(0);
                case "string":
                    return H.mkStringLiteral("");
                default:
                    return mkText("null");
            }
        }
        // [t] is the expected type; we assume that we never null block children
        // (because placeholder blocks have been inserted by the type-checking phase
        // whenever a block was actually missing).
        function compileExpression(e, b, comments) {
            assert(b != null);
            maybeAddComment(b, comments);
            var expr;
            if (b.disabled || b.type == "placeholder")
                expr = defaultValueForType(returnType(e, b));
            else
                switch (b.type) {
                    case "math_number":
                        expr = compileNumber(e, b, comments);
                        break;
                    case "math_number_minmax":
                        expr = compileNumber(e, b, comments);
                        break;
                    case "math_op2":
                        expr = compileMathOp2(e, b, comments);
                        break;
                    case "math_op3":
                        expr = compileMathOp3(e, b, comments);
                        break;
                    case "device_random":
                        expr = compileRandom(e, b, comments);
                        break;
                    case "math_arithmetic":
                    case "logic_compare":
                    case "logic_operation":
                        expr = compileArithmetic(e, b, comments);
                        break;
                    case "math_modulo":
                        expr = compileModulo(e, b, comments);
                        break;
                    case "logic_boolean":
                        expr = compileBoolean(e, b, comments);
                        break;
                    case "logic_negate":
                        expr = compileNot(e, b, comments);
                        break;
                    case "variables_get":
                        expr = compileVariableGet(e, b);
                        break;
                    case "text":
                        expr = compileText(e, b, comments);
                        break;
                    case "text_join":
                        expr = compileTextJoin(e, b, comments);
                        break;
                    case "lists_create_with":
                        expr = compileCreateList(e, b, comments);
                        break;
                    case pxtc.TS_OUTPUT_TYPE:
                        expr = extractTsExpression(e, b, comments);
                        break;
                    default:
                        var call = e.stdCallTable[b.type];
                        if (call) {
                            if (call.imageLiteral)
                                expr = compileImage(e, b, call.imageLiteral, call.namespace, call.f, call.args.map(function (ar) { return compileArgument(e, b, ar, comments); }));
                            else
                                expr = compileStdCall(e, b, call, comments);
                        }
                        else {
                            pxt.reportError("blocks", "unabled compile expression", { "details": b.type });
                            expr = defaultValueForType(returnType(e, b));
                        }
                        break;
                }
            expr.id = b.id;
            return expr;
        }
        blocks.compileExpression = compileExpression;
        (function (VarUsage) {
            VarUsage[VarUsage["Unknown"] = 0] = "Unknown";
            VarUsage[VarUsage["Read"] = 1] = "Read";
            VarUsage[VarUsage["Assign"] = 2] = "Assign";
        })(blocks.VarUsage || (blocks.VarUsage = {}));
        var VarUsage = blocks.VarUsage;
        function isCompiledAsLocalVariable(b) {
            return b.declaredInLocalScope && !b.mustBeGlobal;
        }
        function extend(e, x, t) {
            assert(lookup(e, x) == null);
            return {
                workspace: e.workspace,
                bindings: [{ name: x, type: ground(t), declaredInLocalScope: 0 }].concat(e.bindings),
                stdCallTable: e.stdCallTable,
                errors: e.errors,
                renames: e.renames
            };
        }
        function lookup(e, n) {
            for (var i = 0; i < e.bindings.length; ++i)
                if (e.bindings[i].name == n)
                    return e.bindings[i];
            return null;
        }
        function fresh(e, s) {
            var i = 0;
            var unique = s;
            while (lookup(e, unique) != null)
                unique = s + i++;
            return unique;
        }
        function emptyEnv(w) {
            return {
                workspace: w,
                bindings: [],
                stdCallTable: {},
                errors: [],
                renames: {
                    oldToNew: {},
                    takenNames: {}
                }
            };
        }
        ;
        ///////////////////////////////////////////////////////////////////////////////
        // Statements
        ///////////////////////////////////////////////////////////////////////////////
        function compileControlsIf(e, b, comments) {
            var stmts = [];
            // Notice the <= (if there's no else-if, we still compile the primary if).
            for (var i = 0; i <= b.elseifCount_; ++i) {
                var cond = compileExpression(e, getInputTargetBlock(b, "IF" + i), comments);
                var thenBranch = compileStatements(e, getInputTargetBlock(b, "DO" + i));
                var startNode = mkText("if (");
                if (i > 0) {
                    startNode = mkText("else if (");
                    startNode.glueToBlock = true;
                }
                append(stmts, [
                    startNode,
                    cond,
                    mkText(")"),
                    thenBranch
                ]);
            }
            if (b.elseCount_) {
                var elseNode = mkText("else");
                elseNode.glueToBlock = true;
                append(stmts, [
                    elseNode,
                    compileStatements(e, getInputTargetBlock(b, "ELSE"))
                ]);
            }
            return stmts;
        }
        function compileControlsFor(e, b, comments) {
            var bVar = escapeVarName(b.getFieldValue("VAR"), e);
            var bTo = getInputTargetBlock(b, "TO");
            var bDo = getInputTargetBlock(b, "DO");
            var bBy = getInputTargetBlock(b, "BY");
            var bFrom = getInputTargetBlock(b, "FROM");
            var incOne = !bBy || (bBy.type.match(/^math_number/) && extractNumber(bBy) == 1);
            var binding = lookup(e, bVar);
            assert(binding.declaredInLocalScope > 0);
            return [
                mkText("for (let " + bVar + " = "),
                bFrom ? compileExpression(e, bFrom, comments) : mkText("0"),
                mkText("; "),
                mkInfix(mkText(bVar), "<=", compileExpression(e, bTo, comments)),
                mkText("; "),
                incOne ? mkText(bVar + "++") : mkInfix(mkText(bVar), "+=", compileExpression(e, bBy, comments)),
                mkText(")"),
                compileStatements(e, bDo)
            ];
        }
        function compileControlsRepeat(e, b, comments) {
            var bound = compileExpression(e, getInputTargetBlock(b, "TIMES"), comments);
            var body = compileStatements(e, getInputTargetBlock(b, "DO"));
            var valid = function (x) { return !lookup(e, x); };
            var name = "i";
            for (var i = 0; !valid(name); i++)
                name = "i" + i;
            return [
                mkText("for (let " + name + " = 0; "),
                mkInfix(mkText(name), "<", bound),
                mkText("; " + name + "++)"),
                body
            ];
        }
        function compileWhile(e, b, comments) {
            var cond = compileExpression(e, getInputTargetBlock(b, "COND"), comments);
            var body = compileStatements(e, getInputTargetBlock(b, "DO"));
            return [
                mkText("while ("),
                cond,
                mkText(")"),
                body
            ];
        }
        function compileForever(e, b) {
            var bBody = getInputTargetBlock(b, "HANDLER");
            var body = compileStatements(e, bBody);
            return mkCallWithCallback(e, "basic", "forever", [], body);
        }
        // convert to javascript friendly name
        function escapeVarName(name, e) {
            if (!name)
                return '_';
            if (e.renames.oldToNew[name]) {
                return e.renames.oldToNew[name];
            }
            var n = name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_$]/g, function (a) {
                return ts.isIdentifierPart(a.charCodeAt(0), ts.ScriptTarget.ES5) ? a : "";
            });
            if (!n || !ts.isIdentifierStart(n.charCodeAt(0), ts.ScriptTarget.ES5)) {
                n = "_" + n;
            }
            if (e.renames.takenNames[n]) {
                var i = 2;
                while (e.renames.takenNames[n + i]) {
                    i++;
                }
                n += i;
            }
            e.renames.oldToNew[name] = n;
            e.renames.takenNames[n] = true;
            return n;
        }
        blocks.escapeVarName = escapeVarName;
        function compileVariableGet(e, b) {
            var name = escapeVarName(b.getFieldValue("VAR"), e);
            var binding = lookup(e, name);
            if (!binding.assigned)
                binding.assigned = VarUsage.Read;
            assert(binding != null && binding.type != null);
            return mkText(name);
        }
        function compileSet(e, b, comments) {
            var bVar = escapeVarName(b.getFieldValue("VAR"), e);
            var bExpr = getInputTargetBlock(b, "VALUE");
            var binding = lookup(e, bVar);
            var isDef = false;
            if (!binding.assigned)
                if (b.getSurroundParent()) {
                    // need to define this variable in the top-scope
                    binding.assigned = VarUsage.Read;
                }
                else {
                    binding.assigned = VarUsage.Assign;
                    isDef = true;
                }
            var expr = compileExpression(e, bExpr, comments);
            return mkStmt(mkText(isDef ? "let " : ""), mkText(bVar + " = "), expr);
        }
        function compileChange(e, b, comments) {
            var bVar = escapeVarName(b.getFieldValue("VAR"), e);
            var bExpr = getInputTargetBlock(b, "VALUE");
            var binding = lookup(e, bVar);
            if (!binding.assigned)
                binding.assigned = VarUsage.Read;
            var expr = compileExpression(e, bExpr, comments);
            var ref = mkText(bVar);
            return mkStmt(mkInfix(ref, "+=", expr));
        }
        function eventArgs(call) {
            return call.args.map(function (ar) { return ar.field; }).filter(function (ar) { return !!ar; });
        }
        function compileCall(e, b, comments) {
            var call = e.stdCallTable[b.type];
            if (call.imageLiteral)
                return mkStmt(compileImage(e, b, call.imageLiteral, call.namespace, call.f, call.args.map(function (ar) { return compileArgument(e, b, ar, comments); })));
            else if (call.hasHandler)
                return compileEvent(e, b, call, eventArgs(call), call.namespace, comments);
            else
                return mkStmt(compileStdCall(e, b, e.stdCallTable[b.type], comments));
        }
        function compileArgument(e, b, p, comments) {
            var lit = p.literal;
            if (lit)
                return lit instanceof String ? H.mkStringLiteral(lit) : H.mkNumberLiteral(lit);
            var f = b.getFieldValue(p.field);
            if (f)
                return mkText(f);
            else
                return compileExpression(e, getInputTargetBlock(b, p.field), comments);
        }
        function compileStdCall(e, b, func, comments) {
            var args;
            if (isMutatingBlock(b) && b.mutation.getMutationType() === blocks.MutatorTypes.RestParameterMutator) {
                args = b.mutation.compileMutation(e, comments).children;
            }
            else {
                args = func.args.map(function (p) { return compileArgument(e, b, p, comments); });
            }
            var externalInputs = !b.getInputsInline();
            if (func.isIdentity)
                return args[0];
            else if (func.property) {
                return H.mkPropertyAccess(func.f, args[0]);
            }
            else if (func.isExtensionMethod) {
                if (func.attrs.defaultInstance) {
                    var instance = void 0;
                    if (isMutatingBlock(b) && b.mutation.getMutationType() === blocks.MutatorTypes.DefaultInstanceMutator) {
                        instance = b.mutation.compileMutation(e, comments);
                    }
                    if (instance) {
                        args.unshift(instance);
                    }
                    else {
                        args.unshift(mkText(func.attrs.defaultInstance));
                    }
                }
                return H.extensionCall(func.f, args, externalInputs);
            }
            else if (func.namespace) {
                return H.namespaceCall(func.namespace, func.f, args, externalInputs);
            }
            else {
                return H.stdCall(func.f, args, externalInputs);
            }
        }
        function compileStdBlock(e, b, f, comments) {
            return mkStmt(compileStdCall(e, b, f, comments));
        }
        function mkCallWithCallback(e, n, f, args, body, argumentDeclaration, isExtension) {
            if (isExtension === void 0) { isExtension = false; }
            body.noFinalNewline = true;
            var callback;
            if (argumentDeclaration) {
                callback = mkGroup([argumentDeclaration, body]);
            }
            else {
                callback = mkGroup([mkText("() =>"), body]);
            }
            if (isExtension)
                return mkStmt(H.extensionCall(f, args.concat([callback]), false));
            else
                return mkStmt(H.namespaceCall(n, f, args.concat([callback]), false));
        }
        function compileArg(e, b, arg, comments) {
            // b.getFieldValue may be string, numbers
            var argb = getInputTargetBlock(b, arg);
            if (argb)
                return compileExpression(e, argb, comments);
            return mkText(b.getFieldValue(arg));
        }
        function compileStartEvent(e, b) {
            var bBody = getInputTargetBlock(b, "HANDLER");
            var body = compileStatements(e, bBody);
            return body;
        }
        function compileEvent(e, b, stdfun, args, ns, comments) {
            var compiledArgs = args.map(function (arg) { return compileArg(e, b, arg, comments); });
            var bBody = getInputTargetBlock(b, "HANDLER");
            var body = compileStatements(e, bBody);
            var argumentDeclaration;
            if (isMutatingBlock(b) && b.mutation.getMutationType() === blocks.MutatorTypes.ObjectDestructuringMutator) {
                argumentDeclaration = b.mutation.compileMutation(e, comments);
            }
            return mkCallWithCallback(e, ns, stdfun.f, compiledArgs, body, argumentDeclaration, stdfun.isExtensionMethod);
        }
        function isMutatingBlock(b) {
            return !!b.mutation;
        }
        function compileImage(e, b, frames, n, f, args) {
            args = args === undefined ? [] : args;
            var state = "\n";
            var rows = 5;
            var columns = frames * 5;
            for (var i = 0; i < rows; ++i) {
                for (var j = 0; j < columns; ++j) {
                    if (j > 0)
                        state += ' ';
                    state += /TRUE/.test(b.getFieldValue("LED" + j + i)) ? "#" : ".";
                }
                state += '\n';
            }
            var lit = H.mkStringLiteral(state);
            lit.canIndentInside = true;
            return H.namespaceCall(n, f, [lit].concat(args), false);
        }
        function compileStatementBlock(e, b) {
            var r;
            var comments = [];
            maybeAddComment(b, comments);
            switch (b.type) {
                case 'controls_if':
                    r = compileControlsIf(e, b, comments);
                    break;
                case 'controls_for':
                case 'controls_simple_for':
                    r = compileControlsFor(e, b, comments);
                    break;
                case 'variables_set':
                    r = [compileSet(e, b, comments)];
                    break;
                case 'variables_change':
                    r = [compileChange(e, b, comments)];
                    break;
                case 'controls_repeat_ext':
                    r = compileControlsRepeat(e, b, comments);
                    break;
                case 'device_while':
                    r = compileWhile(e, b, comments);
                    break;
                case ts.pxtc.ON_START_TYPE:
                    r = compileStartEvent(e, b).children;
                    break;
                case pxtc.TS_STATEMENT_TYPE:
                    r = compileTypescriptBlock(e, b);
                    break;
                default:
                    var call = e.stdCallTable[b.type];
                    if (call)
                        r = [compileCall(e, b, comments)];
                    else
                        r = [mkStmt(compileExpression(e, b, comments))];
                    break;
            }
            var l = r[r.length - 1];
            if (l)
                l.id = b.id;
            if (comments.length) {
                addCommentNodes(comments, r);
            }
            return r;
        }
        function compileStatements(e, b) {
            var stmts = [];
            while (b) {
                if (!b.disabled)
                    append(stmts, compileStatementBlock(e, b));
                b = b.getNextBlock();
            }
            return mkBlock(stmts);
        }
        function compileTypescriptBlock(e, b) {
            var res = [];
            var i = 0;
            while (true) {
                var value = b.getFieldValue("LINE" + i);
                i++;
                if (value !== null) {
                    res.push(mkText(value + "\n"));
                    var declaredVars = b.declaredVariables;
                    if (declaredVars) {
                        var varNames = declaredVars.split(",");
                        varNames.forEach(function (n) {
                            var existing = lookup(e, n);
                            if (existing) {
                                existing.assigned = VarUsage.Assign;
                                existing.mustBeGlobal = false;
                            }
                            else {
                                e.bindings.push({
                                    name: n,
                                    type: mkPoint(null),
                                    assigned: VarUsage.Assign,
                                    declaredInLocalScope: 1,
                                    mustBeGlobal: false
                                });
                            }
                        });
                    }
                }
                else {
                    break;
                }
            }
            return res;
        }
        // This function creates an empty environment where type inference has NOT yet
        // been performed.
        // - All variables have been assigned an initial [Point] in the union-find.
        // - Variables have been marked to indicate if they are compatible with the
        //   TouchDevelop for-loop model.
        function mkEnv(w, blockInfo, skipVariables) {
            // The to-be-returned environment.
            var e = emptyEnv(w);
            // append functions in stdcalltable
            if (blockInfo)
                blockInfo.blocks
                    .forEach(function (fn) {
                    if (e.stdCallTable[fn.attributes.blockId]) {
                        pxt.reportError("blocks", "function already defined", { "details": fn.attributes.blockId });
                        return;
                    }
                    var fieldMap = pxt.blocks.parameterNames(fn);
                    var instance = fn.kind == pxtc.SymbolKind.Method || fn.kind == pxtc.SymbolKind.Property;
                    var args = (fn.parameters || []).map(function (p) {
                        if (fieldMap[p.name] && fieldMap[p.name].name)
                            return { field: fieldMap[p.name].name };
                        else
                            return null;
                    }).filter(function (a) { return !!a; });
                    if (instance && !fn.attributes.defaultInstance) {
                        args.unshift({
                            field: fieldMap["this"].name
                        });
                    }
                    e.stdCallTable[fn.attributes.blockId] = {
                        namespace: fn.namespace,
                        f: fn.name,
                        args: args,
                        attrs: fn.attributes,
                        isExtensionMethod: instance,
                        imageLiteral: fn.attributes.imageLiteral,
                        hasHandler: fn.parameters && fn.parameters.some(function (p) { return (p.type == "() => void" || !!p.properties); }),
                        property: !fn.parameters,
                        isIdentity: fn.attributes.shim == "TD_ID"
                    };
                });
            if (skipVariables)
                return e;
            var variableIsScoped = function (b, name) {
                if (!b)
                    return false;
                else if ((b.type == "controls_for" || b.type == "controls_simple_for")
                    && escapeVarName(b.getFieldValue("VAR"), e) == name)
                    return true;
                else if (isMutatingBlock(b) && b.mutation.isDeclaredByMutation(name))
                    return true;
                else
                    return variableIsScoped(b.getSurroundParent(), name);
            };
            function trackLocalDeclaration(name, type) {
                // It's ok for two loops to share the same variable.
                if (lookup(e, name) == null)
                    e = extend(e, name, type);
                lookup(e, name).declaredInLocalScope++;
                // If multiple loops share the same
                // variable, that means there's potential race conditions in concurrent
                // code, so faithfully compile this as a global variable.
                if (lookup(e, name).declaredInLocalScope > 1)
                    lookup(e, name).mustBeGlobal = true;
            }
            // collect local variables.
            w.getAllBlocks().filter(function (b) { return !b.disabled; }).forEach(function (b) {
                if (b.type == "controls_for" || b.type == "controls_simple_for") {
                    var x = escapeVarName(b.getFieldValue("VAR"), e);
                    trackLocalDeclaration(x, pNumber.type);
                }
                else if (isMutatingBlock(b)) {
                    var declarations = b.mutation.getDeclaredVariables();
                    if (declarations) {
                        for (var varName in declarations) {
                            trackLocalDeclaration(escapeVarName(varName, e), declarations[varName]);
                        }
                    }
                }
            });
            // determine for-loop compatibility: for each get or
            // set block, 1) make sure that the variable is bound, then 2) mark the variable if needed.
            w.getAllBlocks().filter(function (b) { return !b.disabled; }).forEach(function (b) {
                if (b.type == "variables_get" || b.type == "variables_set" || b.type == "variables_change") {
                    var x = escapeVarName(b.getFieldValue("VAR"), e);
                    if (lookup(e, x) == null)
                        e = extend(e, x, null);
                    var binding = lookup(e, x);
                    if (binding.declaredInLocalScope && !variableIsScoped(b, x))
                        // loop index is read outside the loop.
                        binding.mustBeGlobal = true;
                }
            });
            return e;
        }
        blocks.mkEnv = mkEnv;
        function compileBlock(b, blockInfo) {
            var w = b.workspace;
            var e = mkEnv(w, blockInfo);
            infer(e, w);
            var compiled = compileStatementBlock(e, b);
            removeAllPlaceholders();
            return tdASTtoTS(compiled);
        }
        blocks.compileBlock = compileBlock;
        function compileWorkspace(w, blockInfo) {
            try {
                var e_1 = mkEnv(w, blockInfo);
                infer(e_1, w);
                var stmtsMain_1 = [];
                // all compiled top level blocks are event, move on start to bottom
                var topblocks = w.getTopBlocks(true).sort(function (a, b) {
                    return (a.type == ts.pxtc.ON_START_TYPE ? 1 : 0) - (b.type == ts.pxtc.ON_START_TYPE ? 1 : 0);
                });
                updateDisabledBlocks(e_1, w.getAllBlocks(), topblocks);
                topblocks.forEach(function (b) {
                    if (b.type == ts.pxtc.ON_START_TYPE)
                        append(stmtsMain_1, compileStartEvent(e_1, b).children);
                    else {
                        var compiled = compileStatements(e_1, b);
                        if (compiled.type == NT.Block)
                            append(stmtsMain_1, compiled.children);
                        else
                            stmtsMain_1.push(compiled);
                    }
                });
                // All variables in this script are compiled as locals within main unless loop or previsouly assigned
                var stmtsVariables = e_1.bindings.filter(function (b) { return !isCompiledAsLocalVariable(b) && b.assigned != VarUsage.Assign; })
                    .map(function (b) {
                    // let btype = find(b.type);
                    // Not sure we need the type here - is is always number or boolean?
                    var defl = defaultValueForType(find(b.type));
                    var tp = "";
                    if (defl.op == "null") {
                        var tpname = find(b.type).type;
                        var tpinfo = blockInfo.apis.byQName[tpname];
                        if (tpinfo && tpinfo.attributes.autoCreate)
                            defl = mkText(tpinfo.attributes.autoCreate + "()");
                        else
                            tp = ": " + tpname;
                    }
                    return mkStmt(mkText("let " + b.name + tp + " = "), defl);
                });
                return stmtsVariables.concat(stmtsMain_1);
            }
            finally {
                removeAllPlaceholders();
            }
            return []; // unreachable
        }
        function callKey(e, b) {
            if (b.type == ts.pxtc.ON_START_TYPE)
                return JSON.stringify({ name: ts.pxtc.ON_START_TYPE });
            var call = e.stdCallTable[b.type];
            if (call) {
                // detect if same event is registered already
                var compiledArgs = eventArgs(call).map(function (arg) { return compileArg(e, b, arg, []); });
                var key = JSON.stringify({ name: call.f, ns: call.namespace, compiledArgs: compiledArgs })
                    .replace(/"id"\s*:\s*"[^"]+"/g, ''); // remove blockly ids
                return key;
            }
            return undefined;
        }
        blocks.callKey = callKey;
        function updateDisabledBlocks(e, allBlocks, topBlocks) {
            // unset disabled
            allBlocks.forEach(function (b) { return b.setDisabled(false); });
            // update top blocks
            var events = {};
            function flagDuplicate(key, block) {
                var otherEvent = events[key];
                if (otherEvent) {
                    // another block is already registered
                    block.setDisabled(true);
                }
                else {
                    block.setDisabled(false);
                    events[key] = block;
                }
            }
            topBlocks.forEach(function (b) {
                var call = e.stdCallTable[b.type];
                // multiple calls allowed
                if (b.type == ts.pxtc.ON_START_TYPE)
                    flagDuplicate(ts.pxtc.ON_START_TYPE, b);
                else if (call && call.attrs.blockAllowMultiple)
                    return;
                else if (call && call.hasHandler) {
                    // compute key that identifies event call
                    // detect if same event is registered already
                    var key = callKey(e, b);
                    flagDuplicate(key, b);
                }
                else {
                    // all non-events are disabled
                    var t = b;
                    while (t) {
                        t.setDisabled(true);
                        t = t.getNextBlock();
                    }
                }
            });
        }
        function findBlockId(sourceMap, loc) {
            if (!loc)
                return undefined;
            for (var i = 0; i < sourceMap.length; ++i) {
                var chunk = sourceMap[i];
                if (chunk.start <= loc.start && chunk.end >= loc.start + loc.length)
                    return chunk.id;
            }
            return undefined;
        }
        blocks.findBlockId = findBlockId;
        function compile(b, blockInfo) {
            return tdASTtoTS(compileWorkspace(b, blockInfo));
        }
        blocks.compile = compile;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
        var infixPriTable = {
            // 0 = comma/sequence
            // 1 = spread (...)
            // 2 = yield, yield*
            // 3 = assignment
            "=": 3,
            "+=": 3,
            "-=": 3,
            // 4 = conditional (?:)
            "||": 5,
            "&&": 6,
            "|": 7,
            "^": 8,
            "&": 9,
            // 10 = equality
            "==": 10,
            "!=": 10,
            "===": 10,
            "!==": 10,
            // 11 = comparison (excludes in, instanceof)
            "<": 11,
            ">": 11,
            "<=": 11,
            ">=": 11,
            // 12 = bitise shift
            ">>": 12,
            ">>>": 12,
            "<<": 12,
            "+": 13,
            "-": 13,
            "*": 14,
            "/": 14,
            "%": 14,
            "!": 15,
            ".": 18,
        };
        function tdASTtoTS(app) {
            var sourceMap = [];
            var output = "";
            var indent = "";
            var variables = [{}];
            function flatten(e0) {
                function rec(e, outPrio) {
                    if (e.type != NT.Infix) {
                        for (var _i = 0, _a = e.children; _i < _a.length; _i++) {
                            var c = _a[_i];
                            rec(c, -1);
                        }
                        return;
                    }
                    var r = [];
                    function pushOp(c) {
                        r.push(mkText(c));
                    }
                    var infixPri = pxt.U.lookup(infixPriTable, e.op);
                    if (infixPri == null)
                        pxt.U.oops("bad infix op: " + e.op);
                    if (infixPri < outPrio)
                        pushOp("(");
                    if (e.children.length == 1) {
                        pushOp(e.op);
                        rec(e.children[0], infixPri);
                    }
                    else {
                        var bindLeft = infixPri != 3 && e.op != "**";
                        var letType = undefined;
                        /*
                        if (e.name == "=" && e.args[0].nodeType == 'localRef') {
                            let varloc = <TDev.AST.Json.JLocalRef>e.args[0];
                            let varname = varloc.name;
                            if (!variables[variables.length - 1][varname]) {
                                variables[variables.length - 1][varname] = "1";
                                pushOp("let")
                                letType = varloc.type as any as string;
                            }
                        }
                        */
                        rec(e.children[0], bindLeft ? infixPri : infixPri + 0.1);
                        r.push(e.children[0]);
                        if (letType && letType != "number") {
                            pushOp(": ");
                            pushOp(letType);
                        }
                        if (e.op == ".")
                            pushOp(".");
                        else
                            pushOp(" " + e.op + " ");
                        rec(e.children[1], !bindLeft ? infixPri : infixPri + 0.1);
                        r.push(e.children[1]);
                    }
                    if (infixPri < outPrio)
                        pushOp(")");
                    e.type = NT.Prefix;
                    e.op = "";
                    e.children = r;
                }
                rec(e0, -1);
            }
            var root = mkGroup(app);
            flatten(root);
            emit(root);
            // never return empty string - TS compiler service thinks it's an error
            if (!output)
                output += "\n";
            // outformat
            output = pxtc.format(output, 1).formatted;
            return {
                source: output,
                sourceMap: sourceMap
            };
            function emit(n) {
                if (n.glueToBlock) {
                    removeLastIndent();
                    output += " ";
                }
                var start = output.length;
                switch (n.type) {
                    case NT.Infix:
                        pxt.U.oops("no infix should be left");
                        break;
                    case NT.NewLine:
                        output += "\n" + indent;
                        break;
                    case NT.Block:
                        block(n);
                        break;
                    case NT.Prefix:
                        if (n.canIndentInside)
                            output += n.op.replace(/\n/g, "\n" + indent + "    ");
                        else
                            output += n.op;
                        n.children.forEach(emit);
                        break;
                    default:
                        break;
                }
                var end = output.length;
                if (n.id && start != end) {
                    sourceMap.push({ id: n.id, start: start, end: end });
                }
            }
            function write(s) {
                output += s.replace(/\n/g, "\n" + indent);
            }
            function removeLastIndent() {
                output = output.replace(/\n *$/, "");
            }
            function block(n) {
                var finalNl = n.noFinalNewline ? "" : "\n";
                if (n.children.length == 0) {
                    write(" {\n\t\n}" + finalNl);
                    return;
                }
                var vars = pxt.U.clone(variables[variables.length - 1] || {});
                variables.push(vars);
                indent += "    ";
                write(" {\n");
                for (var _i = 0, _a = n.children; _i < _a.length; _i++) {
                    var nn = _a[_i];
                    emit(nn);
                }
                indent = indent.slice(4);
                removeLastIndent();
                write("\n}" + finalNl);
                variables.pop();
            }
        }
        function maybeAddComment(b, comments) {
            if (b.comment) {
                if ((typeof b.comment) === "string") {
                    comments.push(b.comment);
                }
                else {
                    comments.push(b.comment.getText());
                }
            }
        }
        function addCommentNodes(comments, r) {
            var commentNodes = [];
            var paragraphs = [];
            for (var _i = 0, comments_1 = comments; _i < comments_1.length; _i++) {
                var comment = comments_1[_i];
                for (var _a = 0, _b = comment.split("\n"); _a < _b.length; _a++) {
                    var paragraph = _b[_a];
                    paragraphs.push(paragraph);
                }
            }
            for (var i = 0; i < paragraphs.length; i++) {
                // Wrap paragraph lines
                var words = paragraphs[i].split(/\s/);
                var currentLine = void 0;
                for (var _c = 0, words_1 = words; _c < words_1.length; _c++) {
                    var word = words_1[_c];
                    if (!currentLine) {
                        currentLine = word;
                    }
                    else if (currentLine.length + word.length > MAX_COMMENT_LINE_LENGTH) {
                        commentNodes.push(mkText("// " + currentLine));
                        commentNodes.push(mkNewLine());
                        currentLine = word;
                    }
                    else {
                        currentLine += " " + word;
                    }
                }
                if (currentLine) {
                    commentNodes.push(mkText("// " + currentLine));
                    commentNodes.push(mkNewLine());
                }
                // The decompiler expects an empty comment line between paragraphs
                if (i !== paragraphs.length - 1) {
                    commentNodes.push(mkText("//"));
                    commentNodes.push(mkNewLine());
                }
            }
            for (var _d = 0, _e = commentNodes.reverse(); _d < _e.length; _d++) {
                var commentNode = _e[_d];
                r.unshift(commentNode);
            }
        }
        function endsWith(text, suffix) {
            if (text.length < suffix.length) {
                return false;
            }
            return text.substr(text.length - suffix.length) === suffix;
        }
        function isReservedWord(str) {
            return reservedWords.indexOf(str) !== -1;
        }
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
///<reference path='../localtypings/blockly.d.ts'/>
/// <reference path="../built/pxtlib.d.ts" />
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks_1) {
        function saveWorkspaceXml(ws) {
            var xml = Blockly.Xml.workspaceToDom(ws);
            var text = Blockly.Xml.domToPrettyText(xml);
            return text;
        }
        blocks_1.saveWorkspaceXml = saveWorkspaceXml;
        /**
         * Loads the xml into a off-screen workspace (not suitable for size computations)
         */
        function loadWorkspaceXml(xml, skipReport) {
            if (skipReport === void 0) { skipReport = false; }
            var workspace = new Blockly.Workspace();
            try {
                var dom = Blockly.Xml.textToDom(xml);
                Blockly.Xml.domToWorkspace(dom, workspace);
                return workspace;
            }
            catch (e) {
                if (!skipReport)
                    pxt.reportException(e);
                return null;
            }
        }
        blocks_1.loadWorkspaceXml = loadWorkspaceXml;
        function patchFloatingBlocks(dom, info) {
            var onstart = dom.querySelector("block[type=" + ts.pxtc.ON_START_TYPE + "]");
            if (onstart) {
                onstart.removeAttribute("deletable");
                return;
            }
            var newnodes = [];
            var blocks = {};
            info.blocks.forEach(function (b) { return blocks[b.attributes.blockId] = b; });
            // walk top level blocks
            var node = dom.firstElementChild;
            var insertNode = undefined;
            while (node) {
                var nextNode = node.nextElementSibling;
                // does this block is disable or have s nested statement block?
                var nodeType = node.getAttribute("type");
                if (!node.getAttribute("disabled") && !node.querySelector("statement")
                    && (pxt.blocks.buildinBlockStatements[nodeType] ||
                        (blocks[nodeType] && blocks[nodeType].retType == "void" && !blocks_1.hasArrowFunction(blocks[nodeType])))) {
                    // old block, needs to be wrapped in onstart
                    if (!insertNode) {
                        insertNode = dom.ownerDocument.createElement("statement");
                        insertNode.setAttribute("name", "HANDLER");
                        if (!onstart) {
                            onstart = dom.ownerDocument.createElement("block");
                            onstart.setAttribute("type", ts.pxtc.ON_START_TYPE);
                            newnodes.push(onstart);
                        }
                        onstart.appendChild(insertNode);
                        insertNode.appendChild(node);
                        node.removeAttribute("x");
                        node.removeAttribute("y");
                        insertNode = node;
                    }
                    else {
                        // event, add nested statement
                        var next = dom.ownerDocument.createElement("next");
                        next.appendChild(node);
                        insertNode.appendChild(next);
                        node.removeAttribute("x");
                        node.removeAttribute("y");
                        insertNode = node;
                    }
                }
                node = nextNode;
            }
            newnodes.forEach(function (n) { return dom.appendChild(n); });
        }
        function importXml(xml, info, skipReport) {
            if (skipReport === void 0) { skipReport = false; }
            try {
                var parser = new DOMParser();
                var doc_1 = parser.parseFromString(xml, "application/xml");
                // patch block types
                var upgrades = (pxt.appTarget.compile && pxt.appTarget.compile.upgrades)
                    ? pxt.appTarget.compile.upgrades.filter(function (up) { return up.type == "blockId"; })
                    : [];
                upgrades.forEach(function (up) { return Object.keys(up.map).forEach(function (type) {
                    pxt.Util.toArray(doc_1.querySelectorAll("block[type=" + type + "]"))
                        .forEach(function (blockNode) {
                        blockNode.setAttribute("type", up.map[type]);
                        pxt.debug("patched block " + type + " -> " + up.map[type]);
                    });
                }); });
                // build upgrade map
                var enums = {};
                for (var k in info.apis.byQName) {
                    var api = info.apis.byQName[k];
                    if (api.kind == pxtc.SymbolKind.EnumMember)
                        enums[api.namespace + '.' + (api.attributes.blockImportId || api.attributes.block || api.attributes.blockId || api.name)]
                            = api.namespace + '.' + api.name;
                }
                // walk through blocks and patch enums
                var blocks_2 = doc_1.getElementsByTagName("block");
                for (var i = 0; i < blocks_2.length; ++i)
                    patchBlock(info, enums, blocks_2[i]);
                // patch floating blocks
                patchFloatingBlocks(doc_1.documentElement, info);
                // serialize and return
                return new XMLSerializer().serializeToString(doc_1);
            }
            catch (e) {
                if (!skipReport)
                    pxt.reportException(e);
                return xml;
            }
        }
        blocks_1.importXml = importXml;
        function patchBlock(info, enums, block) {
            var type = block.getAttribute("type");
            var b = Blockly.Blocks[type];
            var symbol = blocks_1.blockSymbol(type);
            if (!symbol || !b)
                return;
            var params = blocks_1.parameterNames(symbol);
            symbol.parameters.forEach(function (p, i) {
                var ptype = info.apis.byQName[p.type];
                if (ptype && ptype.kind == pxtc.SymbolKind.Enum) {
                    var field = block.querySelector("field[name=" + params[p.name].name + "]");
                    if (field) {
                        var en = enums[ptype.name + '.' + field.textContent];
                        if (en)
                            field.textContent = en;
                    }
                }
            });
        }
        /**
         * Convert blockly hue to rgb
         */
        function convertColour(colour) {
            var hue = parseInt(colour);
            if (!isNaN(hue)) {
                return Blockly.hueToRgb(hue);
            }
            return colour;
        }
        blocks_1.convertColour = convertColour;
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks_3) {
        var layout;
        (function (layout) {
            function patchBlocksFromOldWorkspace(blockInfo, oldWs, newXml) {
                var newWs = pxt.blocks.loadWorkspaceXml(newXml, true);
                // position blocks
                alignBlocks(blockInfo, oldWs, newWs);
                // inject disabled blocks
                return injectDisabledBlocks(oldWs, newWs);
            }
            layout.patchBlocksFromOldWorkspace = patchBlocksFromOldWorkspace;
            function injectDisabledBlocks(oldWs, newWs) {
                var oldDom = Blockly.Xml.workspaceToDom(oldWs);
                var newDom = Blockly.Xml.workspaceToDom(newWs);
                pxt.Util.toArray(oldDom.childNodes)
                    .filter(function (n) { return n.nodeType == Node.ELEMENT_NODE && n.localName == "block" && n.getAttribute("disabled") == "true"; })
                    .forEach(function (n) { return newDom.appendChild(newDom.ownerDocument.importNode(n, true)); });
                var updatedXml = Blockly.Xml.domToPrettyText(newDom);
                return updatedXml;
            }
            function alignBlocks(blockInfo, oldWs, newWs) {
                var env;
                var newBlocks; // support for multiple events with similar name
                oldWs.getTopBlocks(false).filter(function (ob) { return !ob.disabled; })
                    .forEach(function (ob) {
                    var otp = ob.xy_;
                    if (otp && otp.x != 0 && otp.y != 0) {
                        if (!env) {
                            env = pxt.blocks.mkEnv(oldWs, blockInfo, true);
                            newBlocks = {};
                            newWs.getTopBlocks(false).forEach(function (b) {
                                var nkey = pxt.blocks.callKey(env, b);
                                var nbs = newBlocks[nkey] || [];
                                nbs.push(b);
                                newBlocks[nkey] = nbs;
                            });
                        }
                        var oldKey = pxt.blocks.callKey(env, ob);
                        var newBlock = (newBlocks[oldKey] || []).shift();
                        if (newBlock)
                            newBlock.xy_ = otp.clone();
                    }
                });
            }
            function verticalAlign(ws, emPixels) {
                var blocks = ws.getTopBlocks(true);
                var y = 0;
                blocks.forEach(function (block) {
                    block.moveBy(0, y);
                    y += block.getHeightWidth().height;
                    y += emPixels; //buffer            
                });
            }
            layout.verticalAlign = verticalAlign;
            ;
            function shuffle(ws, ratio) {
                var blocks = ws.getAllBlocks().filter(function (b) { return !b.isShadow_; });
                // unplug all blocks
                blocks.forEach(function (b) { return b.unplug(); });
                // TODO: better layout
                // randomize order
                fisherYates(blocks);
                // apply layout
                flowBlocks(blocks, ratio);
            }
            layout.shuffle = shuffle;
            function flow(ws, ratio) {
                flowBlocks(ws.getTopBlocks(true), ratio);
            }
            layout.flow = flow;
            function screenshotAsync(ws) {
                return toPngAsync(ws);
            }
            layout.screenshotAsync = screenshotAsync;
            function toPngAsync(ws) {
                var sg = toSvg(ws);
                if (!sg)
                    return Promise.resolve(undefined);
                return toPngAsyncInternal(sg.width, sg.height, sg.xml);
            }
            layout.toPngAsync = toPngAsync;
            function svgToPngAsync(svg, customCss, x, y, width, height) {
                var sg = toSvgInternal(svg, customCss, x, y, width, height);
                if (!sg)
                    return Promise.resolve(undefined);
                return toPngAsyncInternal(sg.width, sg.height, sg.xml);
            }
            layout.svgToPngAsync = svgToPngAsync;
            function toPngAsyncInternal(width, height, data) {
                return new Promise(function (resolve, reject) {
                    var cvs = document.createElement("canvas"), ctx = cvs.getContext("2d");
                    var img = new Image;
                    cvs.width = width;
                    cvs.height = height;
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0, width, height);
                        var canvasdata = cvs.toDataURL("image/png");
                        resolve(canvasdata);
                    };
                    img.onerror = function (ev) {
                        pxt.reportError("blocks", "blocks screenshot failed");
                        resolve(undefined);
                    };
                    img.src = data;
                });
            }
            function toSvg(ws) {
                if (!ws)
                    return undefined;
                var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
                var sg = ws.svgBlockCanvas_.cloneNode(true);
                var customCss = "\n.blocklyMainBackground {\n    stroke:none !important;\n}\n\n.blocklyTreeLabel, .blocklyText, .blocklyHtmlInput {\n    font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;   \n}\n\n.rtl .blocklyText {\n    text-align:right;\n}\n\n.blocklyTreeLabel {\n    font-size:1.25rem !important;\n}\n\n.blocklyCheckbox {\n    fill: #ff3030 !important;\n    text-shadow: 0px 0px 6px #f00;\n    font-size: 17pt !important;\n}";
                return toSvgInternal(sg, customCss, bbox.x, bbox.y, bbox.width, bbox.height);
            }
            layout.toSvg = toSvg;
            function toSvgInternal(sg, customCss, x, y, width, height) {
                if (!sg.childNodes[0])
                    return undefined;
                sg.removeAttribute("width");
                sg.removeAttribute("height");
                sg.removeAttribute("transform");
                var xsg = new DOMParser().parseFromString("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"" + width + "\" height=\"" + height + "\" viewBox=\"" + x + " " + y + " " + width + " " + height + "\">\n            " + new XMLSerializer().serializeToString(sg) + "\n            </svg>", "image/svg+xml");
                var cssLink = xsg.createElementNS("http://www.w3.org/1999/xhtml", "style");
                // CSS may contain <, > which need to be stored in CDATA section
                cssLink.appendChild(xsg.createCDATASection(Blockly.Css.CONTENT.join('') + '\n\n' + customCss + '\n\n'));
                xsg.documentElement.insertBefore(cssLink, xsg.documentElement.firstElementChild);
                var xml = new XMLSerializer().serializeToString(xsg);
                var data = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
                return { width: width, height: height, xml: data };
            }
            function flowBlocks(blocks, ratio) {
                if (ratio === void 0) { ratio = 1.62; }
                var gap = 16;
                var marginx = 20;
                var marginy = 20;
                // compute total block surface and infer width
                var surface = 0;
                for (var _i = 0, blocks_4 = blocks; _i < blocks_4.length; _i++) {
                    var block = blocks_4[_i];
                    var s = block.getHeightWidth();
                    surface += s.width * s.height;
                }
                var maxx = Math.sqrt(surface) * ratio;
                var insertx = marginx;
                var inserty = marginy;
                var endy = 0;
                for (var _a = 0, blocks_5 = blocks; _a < blocks_5.length; _a++) {
                    var block = blocks_5[_a];
                    var r = block.getBoundingRectangle();
                    var s = block.getHeightWidth();
                    // move block to insertion point
                    block.moveBy(insertx - r.topLeft.x, inserty - r.topLeft.y);
                    insertx += s.width + gap;
                    endy = Math.max(endy, inserty + s.height + gap);
                    if (insertx > maxx) {
                        insertx = marginx;
                        inserty = endy;
                    }
                }
            }
            function robertJenkins() {
                var seed = 0x2F6E2B1;
                return function () {
                    // https://gist.github.com/mathiasbynens/5670917
                    // Robert Jenkins’ 32 bit integer hash function
                    seed = ((seed + 0x7ED55D16) + (seed << 12)) & 0xFFFFFFFF;
                    seed = ((seed ^ 0xC761C23C) ^ (seed >>> 19)) & 0xFFFFFFFF;
                    seed = ((seed + 0x165667B1) + (seed << 5)) & 0xFFFFFFFF;
                    seed = ((seed + 0xD3A2646C) ^ (seed << 9)) & 0xFFFFFFFF;
                    seed = ((seed + 0xFD7046C5) + (seed << 3)) & 0xFFFFFFFF;
                    seed = ((seed ^ 0xB55A4F09) ^ (seed >>> 16)) & 0xFFFFFFFF;
                    return (seed & 0xFFFFFFF) / 0x10000000;
                };
            }
            function fisherYates(myArray) {
                var i = myArray.length;
                if (i == 0)
                    return;
                // TODO: seeded random
                var rnd = robertJenkins();
                while (--i) {
                    var j = Math.floor(rnd() * (i + 1));
                    var tempi = myArray[i];
                    var tempj = myArray[j];
                    myArray[i] = tempj;
                    myArray[j] = tempi;
                }
            }
        })(layout = blocks_3.layout || (blocks_3.layout = {}));
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
/// <reference path="../localtypings/blockly.d.ts" />
/// <reference path="../built/pxtlib.d.ts" />
var Util = pxt.Util;
var lf = Util.lf;
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks_6) {
        blocks_6.blockColors = {
            loops: '#107c10',
            logic: '#006970',
            math: '#712672',
            images: '#5C2D91',
            variables: '#A80000',
            text: '#996600',
            lists: '#D83B01'
        };
        var typeDefaults = {
            "string": {
                field: "TEXT",
                block: "text",
                defaultValue: ""
            },
            "number": {
                field: "NUM",
                block: "math_number",
                defaultValue: "0"
            },
            "boolean": {
                field: "BOOL",
                block: "logic_boolean",
                defaultValue: "false"
            }
        };
        var usedBlocks = {};
        var updateUsedBlocks = false;
        // list of built-in blocks, should be touched.
        var builtinBlocks = {};
        Object.keys(Blockly.Blocks)
            .forEach(function (k) { return builtinBlocks[k] = { block: Blockly.Blocks[k] }; });
        blocks_6.buildinBlockStatements = {
            "controls_if": true,
            "controls_for": true,
            "controls_simple_for": true,
            "controls_repeat_ext": true,
            "variables_set": true,
            "variables_change": true,
            "device_while": true
        };
        var cachedBlocks = {};
        var searchElementCache = {};
        function blockSymbol(type) {
            var b = cachedBlocks[type];
            return b ? b.fn : undefined;
        }
        blocks_6.blockSymbol = blockSymbol;
        function createShadowValue(name, type, v, shadowType) {
            if (v && v.slice(0, 1) == "\"")
                v = JSON.parse(v);
            if (type == "number" && shadowType == "value") {
                var field = document.createElement("field");
                field.setAttribute("name", name);
                field.appendChild(document.createTextNode("0"));
                return field;
            }
            var value = document.createElement("value");
            value.setAttribute("name", name);
            var shadow = document.createElement(shadowType == "variables_get" ? "block" : "shadow");
            value.appendChild(shadow);
            var typeInfo = typeDefaults[type];
            shadow.setAttribute("type", shadowType || typeInfo && typeInfo.block || type);
            if (typeInfo) {
                var field = document.createElement("field");
                shadow.appendChild(field);
                field.setAttribute("name", shadowType == "variables_get" ? "VAR" : typeInfo.field);
                var value_1;
                if (type == "boolean") {
                    value_1 = document.createTextNode((v || typeInfo.defaultValue).toUpperCase());
                }
                else {
                    value_1 = document.createTextNode(v || typeInfo.defaultValue);
                }
                field.appendChild(value_1);
            }
            return value;
        }
        function createToolboxBlock(info, fn, attrNames) {
            //
            // toolbox update
            //
            var block = document.createElement("block");
            block.setAttribute("type", fn.attributes.blockId);
            if (fn.attributes.blockGap)
                block.setAttribute("gap", fn.attributes.blockGap);
            if ((fn.kind == pxtc.SymbolKind.Method || fn.kind == pxtc.SymbolKind.Property)
                && attrNames["this"]) {
                var attr = attrNames["this"];
                block.appendChild(createShadowValue(attr.name, attr.type, attr.shadowValue || attr.name, attr.shadowType || "variables_get"));
            }
            if (fn.parameters) {
                fn.parameters.filter(function (pr) { return !!attrNames[pr.name].name &&
                    (/^(string|number|boolean)$/.test(attrNames[pr.name].type)
                        || !!attrNames[pr.name].shadowType
                        || !!attrNames[pr.name].shadowValue); })
                    .forEach(function (pr) {
                    var attr = attrNames[pr.name];
                    var shadowValue;
                    if (pr.options && pr.options['min'] && pr.options['max']) {
                        shadowValue = createShadowValue(attr.name, attr.type, attr.shadowValue, 'math_number_minmax');
                        var container = document.createElement('mutation');
                        container.setAttribute('min', pr.options['min'].value);
                        container.setAttribute('max', pr.options['max'].value);
                        shadowValue.firstChild.appendChild(container);
                    }
                    else {
                        shadowValue = createShadowValue(attr.name, attr.type, attr.shadowValue, attr.shadowType);
                    }
                    block.appendChild(shadowValue);
                });
            }
            searchElementCache[fn.attributes.blockId] = block.cloneNode(true);
            return block;
        }
        function createCategoryElement(name, nameid, weight, colour, iconClass) {
            var result = document.createElement("category");
            result.setAttribute("name", name);
            result.setAttribute("nameid", nameid.toLowerCase());
            result.setAttribute("weight", weight.toString());
            if (colour) {
                result.setAttribute("colour", colour);
            }
            if (iconClass) {
                result.setAttribute("iconclass", iconClass);
                result.setAttribute("expandedclass", iconClass);
            }
            return result;
        }
        function injectToolbox(tb, info, fn, block, showCategories) {
            // identity function are just a trick to get an enum drop down in the block
            // while allowing the parameter to be a number
            if (fn.attributes.blockHidden)
                return;
            if (!fn.attributes.deprecated) {
                var ns = (fn.attributes.blockNamespace || fn.namespace).split('.')[0];
                var nsn = info.apis.byQName[ns];
                if (nsn)
                    ns = nsn.attributes.block || ns;
                var catName = ts.pxtc.blocksCategory(fn);
                var category_1 = categoryElement(tb, catName);
                if (showCategories) {
                    if (!category_1) {
                        var categories = getChildCategories(tb);
                        var parentCategoryList = tb;
                        pxt.debug('toolbox: adding category ' + ns);
                        var nsWeight = (nsn ? nsn.attributes.weight : 50) || 50;
                        var locCatName = (nsn ? nsn.attributes.block : "") || catName;
                        category_1 = createCategoryElement(locCatName, catName, nsWeight);
                        if (nsn && nsn.attributes.color) {
                            category_1.setAttribute("colour", nsn.attributes.color);
                        }
                        else if (blocks_6.blockColors[ns]) {
                            category_1.setAttribute("colour", blocks_6.blockColors[ns].toString());
                        }
                        if (nsn && nsn.attributes.icon) {
                            var nsnIconClassName = ("blocklyTreeIcon" + nsn.name.toLowerCase()).replace(/\s/g, '');
                            appendToolboxIconCss(nsnIconClassName, nsn.attributes.icon);
                            category_1.setAttribute("iconclass", nsnIconClassName);
                            category_1.setAttribute("expandedclass", nsnIconClassName);
                        }
                        else {
                            category_1.setAttribute("iconclass", "blocklyTreeIconDefault");
                            category_1.setAttribute("expandedclass", "blocklyTreeIconDefault");
                        }
                        if (nsn && nsn.attributes.advanced) {
                            parentCategoryList = getOrAddSubcategoryByWeight(tb, pxt.Util.lf("{id:category}Advanced"), "Advanced", 1, "#3c3c3c", 'blocklyTreeIconadvanced');
                            categories = getChildCategories(parentCategoryList);
                        }
                        // Insert the category based on weight
                        var ci = 0;
                        for (ci = 0; ci < categories.length; ++ci) {
                            var cat = categories[ci];
                            if (parseInt(cat.getAttribute("weight") || "50") < nsWeight) {
                                parentCategoryList.insertBefore(category_1, cat);
                                break;
                            }
                        }
                        if (ci == categories.length)
                            parentCategoryList.appendChild(category_1);
                    }
                    if (fn.attributes.advanced) {
                        category_1 = getOrAddSubcategoryByWeight(category_1, lf("More"), "More", 1, category_1.getAttribute("colour"), 'blocklyTreeIconmore');
                    }
                    else if (fn.attributes.subcategory) {
                        var sub = fn.attributes.subcategory;
                        var all = nsn.attributes.subcategories;
                        if (all && all.indexOf(sub) !== -1) {
                            // Respect the weights given by the package
                            var weight = 10000 - all.indexOf(sub);
                            category_1 = getOrAddSubcategoryByWeight(category_1, sub, sub, weight, category_1.getAttribute("colour"), 'blocklyTreeIconmore');
                        }
                        else {
                            // If no weight is specified, insert alphabetically after the weighted subcategories but above "More"
                            category_1 = getOrAddSubcategoryByName(category_1, sub, sub, category_1.getAttribute("colour"), 'blocklyTreeIconmore');
                        }
                    }
                }
                if (fn.attributes.mutateDefaults) {
                    var mutationValues = fn.attributes.mutateDefaults.split(";");
                    mutationValues.forEach(function (mutation) {
                        var mutatedBlock = block.cloneNode(true);
                        blocks_6.mutateToolboxBlock(mutatedBlock, fn.attributes.mutate, mutation);
                        if (showCategories) {
                            category_1.appendChild(mutatedBlock);
                        }
                        else {
                            tb.appendChild(mutatedBlock);
                        }
                    });
                }
                else {
                    if (showCategories) {
                        category_1.appendChild(block);
                        injectToolboxIconCss();
                    }
                    else {
                        tb.appendChild(block);
                    }
                }
            }
        }
        var toolboxStyle;
        var toolboxStyleBuffer = '';
        function appendToolboxIconCss(className, i) {
            if (toolboxStyleBuffer.indexOf(className) > -1)
                return;
            var icon = pxt.Util.unicodeToChar(i);
            toolboxStyleBuffer += "\n            .blocklyTreeIcon." + className + "::before {\n                content: \"" + icon + "\";\n            }\n        ";
        }
        blocks_6.appendToolboxIconCss = appendToolboxIconCss;
        function injectToolboxIconCss() {
            if (!toolboxStyle) {
                toolboxStyle = document.createElement('style');
                toolboxStyle.id = "blocklyToolboxIcons";
                toolboxStyle.type = 'text/css';
                var head = document.head || document.getElementsByTagName('head')[0];
                head.appendChild(toolboxStyle);
            }
            if (toolboxStyle.sheet) {
                toolboxStyle.textContent = toolboxStyleBuffer;
            }
            else {
                toolboxStyle.appendChild(document.createTextNode(toolboxStyleBuffer));
            }
        }
        blocks_6.injectToolboxIconCss = injectToolboxIconCss;
        var iconCanvasCache = {};
        function iconToFieldImage(c) {
            var url = iconCanvasCache[c];
            if (!url) {
                var canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = 'white';
                ctx.font = "56px Icons";
                ctx.textAlign = "center";
                ctx.fillText(c, canvas.width / 2, 56);
                url = iconCanvasCache[c] = canvas.toDataURL();
            }
            return new Blockly.FieldImage(url, 16, 16, '');
        }
        function getChildCategories(parent) {
            var elements = parent.querySelectorAll("category");
            var result = [];
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].parentNode === parent) {
                    result.push(elements[i]);
                }
            }
            return result;
        }
        function getOrAddSubcategoryByWeight(parent, name, nameid, weight, colour, iconClass) {
            var existing = parent.querySelector("category[nameid=\"" + nameid.toLowerCase() + "\"]");
            if (existing) {
                return existing;
            }
            var newCategory = createCategoryElement(name, nameid, weight, colour, iconClass);
            var siblings = parent.querySelectorAll("category");
            var ci = 0;
            for (ci = 0; ci < siblings.length; ++ci) {
                var cat = siblings[ci];
                if (parseInt(cat.getAttribute("weight") || "50") < weight) {
                    parent.insertBefore(newCategory, cat);
                    break;
                }
            }
            if (ci == siblings.length)
                parent.appendChild(newCategory);
            return newCategory;
        }
        function getOrAddSubcategoryByName(parent, name, nameid, colour, iconClass) {
            var existing = parent.querySelector("category[nameid=\"" + nameid.toLowerCase() + "\"]");
            if (existing) {
                return existing;
            }
            var newCategory = createCategoryElement(name, nameid, 100, colour, iconClass);
            var siblings = parent.querySelectorAll("category");
            var filtered = [];
            var ci = 0;
            var inserted = false;
            var last = undefined;
            for (ci = 0; ci < siblings.length; ++ci) {
                var cat = siblings[ci];
                var sibWeight = parseInt(cat.getAttribute("weight") || "50");
                if (sibWeight >= 1000) {
                    continue;
                }
                else if (sibWeight === 1) {
                    last = cat;
                    break;
                }
                filtered.push(cat);
                if (!inserted && cat.getAttribute("name").localeCompare(name) >= 0) {
                    parent.insertBefore(newCategory, cat);
                    filtered.splice(filtered.length - 1, 0, newCategory);
                    inserted = true;
                }
            }
            if (!inserted) {
                filtered.push(newCategory);
                if (last) {
                    parent.insertBefore(newCategory, last);
                }
                else {
                    parent.appendChild(newCategory);
                }
            }
            filtered.forEach(function (e, i) {
                e.setAttribute("weight", (200 - i).toString());
            });
            return newCategory;
        }
        function injectBlockDefinition(info, fn, attrNames, blockXml) {
            var id = fn.attributes.blockId;
            if (builtinBlocks[id]) {
                pxt.reportError("blocks", 'trying to override builtin block', { "details": id });
                return false;
            }
            var hash = JSON.stringify(fn);
            if (cachedBlocks[id] && cachedBlocks[id].hash == hash) {
                return true;
            }
            if (Blockly.Blocks[fn.attributes.blockId]) {
                console.error("duplicate block definition: " + id);
                return false;
            }
            var cachedBlock = {
                hash: hash,
                fn: fn,
                block: {
                    codeCard: mkCard(fn, blockXml),
                    init: function () { initBlock(this, info, fn, attrNames); }
                }
            };
            cachedBlocks[id] = cachedBlock;
            Blockly.Blocks[id] = cachedBlock.block;
            return true;
        }
        function initField(i, ni, fn, ns, pre, right, type, nsinfo) {
            if (ni == 0) {
                var icon = ns && ns.attributes.icon ? ns.attributes.icon : null;
                if (icon)
                    i.appendField(iconToFieldImage(icon));
            }
            if (pre)
                i.appendField(pre);
            if (right)
                i.setAlign(Blockly.ALIGN_RIGHT);
            // ignore generic types
            if (type && type != "T")
                i.setCheck(type);
            return i;
        }
        function cleanOuterHTML(el) {
            // remove IE11 junk
            return el.outerHTML.replace(/^<\?[^>]*>/, '');
        }
        function mkCard(fn, blockXml) {
            return {
                name: fn.namespace + '.' + fn.name,
                shortName: fn.name,
                description: fn.attributes.jsDoc,
                url: fn.attributes.help ? 'reference/' + fn.attributes.help.replace(/^\//, '') : undefined,
                blocksXml: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">" + cleanOuterHTML(blockXml) + "</xml>",
            };
        }
        function isSubtype(apis, specific, general) {
            if (specific == general)
                return true;
            var inf = apis.byQName[specific];
            if (inf && inf.extendsTypes)
                return inf.extendsTypes.indexOf(general) >= 0;
            return false;
        }
        function initBlock(block, info, fn, attrNames) {
            var ns = (fn.attributes.blockNamespace || fn.namespace).split('.')[0];
            var instance = fn.kind == pxtc.SymbolKind.Method || fn.kind == pxtc.SymbolKind.Property;
            var nsinfo = info.apis.byQName[ns];
            var color = fn.attributes.color
                || (nsinfo ? nsinfo.attributes.color : undefined)
                || blocks_6.blockColors[ns.toLowerCase()]
                || 255;
            if (fn.attributes.help)
                block.setHelpUrl("/reference/" + fn.attributes.help.replace(/^\//, ''));
            block.setTooltip(fn.attributes.jsDoc);
            block.setColour(color);
            blocks_6.parseFields(fn.attributes.block).map(function (field) {
                var i;
                if (!field.p) {
                    i = initField(block.appendDummyInput(), field.ni, fn, nsinfo, field.n);
                }
                else {
                    // find argument
                    var pre = field.pre;
                    var p_1 = field.p;
                    var n = Object.keys(attrNames).filter(function (k) { return attrNames[k].name == p_1; })[0];
                    if (!n) {
                        console.error("block " + fn.attributes.blockId + ": unkown parameter " + p_1);
                        return;
                    }
                    var pr_1 = attrNames[n];
                    var typeInfo_1 = pxt.U.lookup(info.apis.byQName, pr_1.type);
                    var isEnum_1 = typeInfo_1 && typeInfo_1.kind == pxtc.SymbolKind.Enum;
                    var isFixed = typeInfo_1 && !!typeInfo_1.attributes.fixedInstances;
                    if (isEnum_1 || isFixed) {
                        var syms = pxt.Util.values(info.apis.byQName)
                            .filter(function (e) {
                            return isEnum_1 ? e.namespace == pr_1.type
                                : (e.kind == pxtc.SymbolKind.Variable
                                    && e.attributes.fixedInstance
                                    && isSubtype(info.apis, e.retType, typeInfo_1.qName));
                        });
                        if (syms.length == 0) {
                            console.error("no instances of " + typeInfo_1.qName + " found");
                        }
                        var dd = syms.map(function (v) {
                            var k = v.attributes.block || v.attributes.blockId || v.name;
                            return [
                                v.attributes.blockImage ? {
                                    src: pxt.webConfig.targetCdnUrl + ("blocks/" + v.namespace.toLowerCase() + "/" + v.name.toLowerCase() + ".png"),
                                    alt: k,
                                    width: 32,
                                    height: 32
                                } : k,
                                v.namespace + "." + v.name
                            ];
                        });
                        i = initField(block.appendDummyInput(), field.ni, fn, nsinfo, pre, true);
                        // if a value is provided, move it first
                        if (pr_1.shadowValue)
                            dd.sort(function (v1, v2) { return v1[1] == pr_1.shadowValue ? -1 : v2[1] == pr_1.shadowValue ? 1 : 0; });
                        var noteValidator = function (text) {
                            if (text === null) {
                                return null;
                            }
                            text = String(text);
                            var n = parseFloat(text || '0');
                            if (isNaN(n) || n < 0) {
                                // Invalid number.
                                return null;
                            }
                            // Get the value in range.
                            return String(Math.round(Number(text)));
                        };
                        if (fn.attributes.blockFieldEditor == "note_editor")
                            i.appendField(new Blockly.FieldNote("262", color, noteValidator), attrNames[n].name);
                        else if (fn.attributes.blockFieldEditor == "FieldGridPicker") {
                            var params = fn.attributes.blockFieldEditorParams;
                            i.appendField(new Blockly.FieldGridPicker(dd, color, params), attrNames[n].name);
                        }
                        else
                            i.appendField(new Blockly.FieldDropdown(dd), attrNames[n].name);
                    }
                    else if (instance && n == "this") {
                        if (!fn.attributes.defaultInstance) {
                            i = initField(block.appendValueInput(p_1), field.ni, fn, nsinfo, pre, true, pr_1.type);
                        }
                    }
                    else if (pr_1.type == "number") {
                        if (pr_1.shadowType && pr_1.shadowType == "value") {
                            i = block.appendDummyInput();
                            if (pre)
                                i.appendField(pre);
                            i.appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), p_1);
                        }
                        else
                            i = initField(block.appendValueInput(p_1), field.ni, fn, nsinfo, pre, true, "Number");
                    }
                    else if (pr_1.type == "boolean") {
                        i = initField(block.appendValueInput(p_1), field.ni, fn, nsinfo, pre, true, "Boolean");
                    }
                    else if (pr_1.type == "string") {
                        i = initField(block.appendValueInput(p_1), field.ni, fn, nsinfo, pre, true, "String");
                    }
                    else {
                        i = initField(block.appendValueInput(p_1), field.ni, fn, nsinfo, pre, true, pr_1.type);
                    }
                }
            });
            if (fn.attributes.mutate) {
                blocks_6.addMutation(block, fn, fn.attributes.mutate);
            }
            else if (fn.attributes.defaultInstance) {
                blocks_6.addMutation(block, fn, blocks_6.MutatorTypes.DefaultInstanceMutator);
            }
            var body = fn.parameters ? fn.parameters.filter(function (pr) { return pr.type == "() => void"; })[0] : undefined;
            if (body) {
                block.appendStatementInput("HANDLER")
                    .setCheck("null");
            }
            if (fn.attributes.imageLiteral) {
                for (var r = 0; r < 5; ++r) {
                    var ri = block.appendDummyInput();
                    for (var c = 0; c < fn.attributes.imageLiteral * 5; ++c) {
                        if (c > 0 && c % 5 == 0)
                            ri.appendField("  ");
                        else if (c > 0)
                            ri.appendField(" ");
                        ri.appendField(new Blockly.FieldCheckbox("FALSE"), "LED" + c + r);
                    }
                }
            }
            block.setInputsInline(!fn.attributes.blockExternalInputs && fn.parameters.length < 4 && !fn.attributes.imageLiteral);
            switch (fn.retType) {
                case "number":
                    block.setOutput(true, "Number");
                    break;
                case "string":
                    block.setOutput(true, "String");
                    break;
                case "boolean":
                    block.setOutput(true, "Boolean");
                    break;
                case "void": break; // do nothing
                //TODO
                default: block.setOutput(true, fn.retType);
            }
            // hook up/down if return value is void
            var hasHandlers = hasArrowFunction(fn);
            block.setPreviousStatement(!hasHandlers && fn.retType == "void");
            block.setNextStatement(!hasHandlers && fn.retType == "void");
            block.setTooltip(fn.attributes.jsDoc);
        }
        function hasArrowFunction(fn) {
            var r = fn.parameters
                ? fn.parameters.filter(function (pr) { return /^\([^\)]*\)\s*=>/.test(pr.type); })[0]
                : undefined;
            return !!r;
        }
        blocks_6.hasArrowFunction = hasArrowFunction;
        function removeCategory(tb, name) {
            var e = categoryElement(tb, name);
            if (e && e.parentNode)
                e.parentNode.removeChild(e);
        }
        function createToolbox(blockInfo, toolbox, showCategories, blockSubset) {
            if (showCategories === void 0) { showCategories = true; }
            init();
            // create new toolbox and update block definitions
            var tb = toolbox ? toolbox.cloneNode(true) : undefined;
            blockInfo.blocks.sort(function (f1, f2) {
                var ns1 = blockInfo.apis.byQName[f1.attributes.blockNamespace || f1.namespace.split('.')[0]];
                var ns2 = blockInfo.apis.byQName[f2.attributes.blockNamespace || f2.namespace.split('.')[0]];
                if (ns1 && !ns2)
                    return -1;
                if (ns2 && !ns1)
                    return 1;
                var c = 0;
                if (ns1 && ns2) {
                    c = (ns2.attributes.weight || 50) - (ns1.attributes.weight || 50);
                    if (c != 0)
                        return c;
                }
                c = (f2.attributes.weight || 50) - (f1.attributes.weight || 50);
                return c;
            });
            searchElementCache = {};
            var currentBlocks = {};
            var dbg = pxt.options.debug;
            // create new toolbox and update block definitions
            blockInfo.blocks
                .filter(function (fn) { return !tb || !tb.querySelector("block[type='" + fn.attributes.blockId + "']"); })
                .forEach(function (fn) {
                if (fn.attributes.blockBuiltin) {
                    pxt.Util.assert(!!builtinBlocks[fn.attributes.blockId]);
                    builtinBlocks[fn.attributes.blockId].symbol = fn;
                }
                else {
                    var pnames = blocks_6.parameterNames(fn);
                    var block = createToolboxBlock(blockInfo, fn, pnames);
                    if (injectBlockDefinition(blockInfo, fn, pnames, block)) {
                        if (tb && (!fn.attributes.debug || dbg))
                            injectToolbox(tb, blockInfo, fn, block, showCategories);
                        currentBlocks[fn.attributes.blockId] = 1;
                    }
                }
            });
            // remove unused blocks
            Object
                .keys(cachedBlocks).filter(function (k) { return !currentBlocks[k]; })
                .forEach(function (k) { return removeBlock(cachedBlocks[k].fn); });
            // add extra blocks
            if (tb && pxt.appTarget.runtime) {
                var extraBlocks = pxt.appTarget.runtime.extraBlocks || [];
                extraBlocks.push({
                    namespace: pxt.appTarget.runtime.onStartNamespace || "loops",
                    weight: pxt.appTarget.runtime.onStartWeight || 10,
                    type: ts.pxtc.ON_START_TYPE
                });
                extraBlocks.forEach(function (eb) {
                    var el = document.createElement("block");
                    el.setAttribute("type", eb.type);
                    el.setAttribute("weight", (eb.weight || 50).toString());
                    if (eb.gap)
                        el.setAttribute("gap", eb.gap.toString());
                    if (eb.fields) {
                        for (var f in eb.fields) {
                            var fe = document.createElement("field");
                            fe.setAttribute("name", f);
                            fe.appendChild(document.createTextNode(eb.fields[f]));
                            el.appendChild(fe);
                        }
                    }
                    if (showCategories) {
                        var cat = categoryElement(tb, eb.namespace);
                        if (cat) {
                            cat.appendChild(el);
                        }
                        else {
                            console.error("trying to add block " + eb.type + " to unknown category " + eb.namespace);
                        }
                    }
                    else {
                        tb.appendChild(el);
                    }
                });
            }
            if (tb && showCategories) {
                // remove unused categories
                var config = pxt.appTarget.runtime || {};
                if (!config.mathBlocks)
                    removeCategory(tb, "Math");
                if (!config.textBlocks)
                    removeCategory(tb, "Text");
                if (!config.listsBlocks)
                    removeCategory(tb, "Lists");
                if (!config.variablesBlocks)
                    removeCategory(tb, "Variables");
                if (!config.logicBlocks)
                    removeCategory(tb, "Logic");
                if (!config.loopsBlocks)
                    removeCategory(tb, "Loops");
                // Load localized names for default categories
                var cats = tb.querySelectorAll('category');
                var removeAdvanced = false;
                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].getAttribute('name') === "Advanced" && cats[i].childElementCount === 0) {
                        removeAdvanced = true;
                    }
                    else {
                        cats[i].setAttribute('name', pxt.Util.rlf("{id:category}" + cats[i].getAttribute('name'), []));
                    }
                }
                if (removeAdvanced) {
                    removeCategory(tb, "Advanced");
                }
            }
            // Do not remove this comment.
            // These are used for category names.
            // lf("{id:category}Loops")
            // lf("{id:category}Logic")
            // lf("{id:category}Variables")
            // lf("{id:category}Lists")
            // lf("{id:category}Text")
            // lf("{id:category}Math")
            // lf("{id:category}Advanced")
            // lf("{id:category}More\u2026")
            // update shadow types
            if (tb) {
                $(tb).find('shadow:empty').each(function (i, shadow) {
                    var type = shadow.getAttribute('type');
                    var b = $(tb).find("block[type=\"" + type + "\"]")[0];
                    if (b)
                        shadow.innerHTML = b.innerHTML;
                });
            }
            // Add the "Add package" category
            if (tb && showCategories && pxt.appTarget.cloud && pxt.appTarget.cloud.packages) {
                getOrAddSubcategoryByWeight(tb, pxt.Util.lf("{id:category}Add Package"), "Add Package", 1, "#717171", 'blocklyTreeIconaddpackage');
            }
            // Filter the blocks
            if (blockSubset) {
                var keepcategories = {};
                var categories = tb.querySelectorAll("category");
                var blocks_7 = tb.querySelectorAll("block");
                for (var bi = 0; bi < blocks_7.length; ++bi) {
                    var blk = blocks_7.item(bi);
                    var type = blk.getAttribute("type");
                    var catName = blk.parentNode.getAttribute("name");
                    var sticky = blk.getAttribute("sticky");
                    if (!blockSubset[type] && !sticky) {
                        blk.parentNode.removeChild(blk);
                    }
                    else {
                        keepcategories[catName] = 1;
                        if (type.indexOf("variables") == 0) {
                            keepcategories["Variables"] = 1;
                        }
                    }
                }
                if (showCategories) {
                    for (var ci = 0; ci < categories.length; ++ci) {
                        var cat = categories.item(ci);
                        var catName = cat.getAttribute("name");
                        if (!keepcategories[catName] && catName != pxt.Util.lf("{id:category}Advanced")) {
                            cat.parentNode.removeChild(cat);
                        }
                    }
                }
            }
            if (tb) {
                usedBlocks = {};
                var blocks_8 = tb.querySelectorAll("block");
                for (var i = 0; i < blocks_8.length; i++) {
                    usedBlocks[blocks_8.item(i).getAttribute("type")] = true;
                }
                updateUsedBlocks = true;
            }
            return tb;
        }
        blocks_6.createToolbox = createToolbox;
        function initBlocks(blockInfo, toolbox, showCategories, blockSubset) {
            if (showCategories === void 0) { showCategories = true; }
            init();
            initTooltip(blockInfo);
            var tb = createToolbox(blockInfo, toolbox, showCategories, blockSubset);
            // add trash icon to toolbox
            if (!$('#blocklyTrashIcon').length) {
                var trashDiv = document.createElement('div');
                trashDiv.id = "blocklyTrashIcon";
                trashDiv.style.opacity = '0';
                trashDiv.style.display = 'none';
                var trashIcon = document.createElement('i');
                trashIcon.className = 'trash icon';
                trashDiv.appendChild(trashIcon);
                $('.blocklyToolboxDiv').append(trashDiv);
            }
            return tb;
        }
        blocks_6.initBlocks = initBlocks;
        function initSearch(workspace, tb, searchAsync, updateToolbox) {
            var blocklySearchInputField = document.getElementById('blocklySearchInputField');
            var blocklySearchInput = document.getElementById('blocklySearchInput');
            var origClassName = 'ui fluid icon input';
            if (!blocklySearchInput) {
                var blocklySearchArea = document.createElement('div');
                blocklySearchArea.id = 'blocklySearchArea';
                blocklySearchInput = document.createElement('div');
                blocklySearchInput.id = 'blocklySearchInput';
                blocklySearchInput.className = origClassName;
                blocklySearchInputField = document.createElement('input');
                blocklySearchInputField.type = 'text';
                blocklySearchInputField.placeholder = lf("Search...");
                blocklySearchInputField.id = 'blocklySearchInputField';
                blocklySearchInputField.className = 'blocklySearchInputField';
                // Append to dom
                var blocklySearchInputIcon = document.createElement('i');
                blocklySearchInputIcon.className = 'search icon';
                blocklySearchInput.appendChild(blocklySearchInputField);
                blocklySearchInput.appendChild(blocklySearchInputIcon);
                blocklySearchArea.appendChild(blocklySearchInput);
                $('.blocklyToolboxDiv').prepend(blocklySearchArea);
            }
            pxt.blocks.cachedSearchTb = tb;
            var searchHandler = pxt.Util.debounce(function () {
                var searchField = $('.blocklySearchInputField');
                var searchFor = searchField.val().toLowerCase();
                blocklySearchInput.className += ' loading';
                if (searchFor != '') {
                    pxt.tickEvent("blocks.search");
                    var searchTb_1 = tb ? tb.cloneNode(true) : undefined;
                    var catName = 'Search';
                    var category_2 = categoryElement(searchTb_1, catName);
                    if (!category_2) {
                        var categories = getChildCategories(searchTb_1);
                        var parentCategoryList = searchTb_1;
                        var nsWeight = 101; // Show search category on top
                        var locCatName = lf("Search");
                        category_2 = createCategoryElement(locCatName, catName, nsWeight);
                        category_2.setAttribute("expanded", 'true');
                        category_2.setAttribute("colour", '#000');
                        category_2.setAttribute("iconclass", 'blocklyTreeIconsearch');
                        category_2.setAttribute("expandedclass", 'blocklyTreeIconsearch');
                        // Insert the category based on weight
                        var ci = 0;
                        for (ci = 0; ci < categories.length; ++ci) {
                            var cat = categories[ci];
                            if (parseInt(cat.getAttribute("weight") || "50") < nsWeight) {
                                parentCategoryList.insertBefore(category_2, cat);
                                break;
                            }
                        }
                        if (ci == categories.length)
                            parentCategoryList.appendChild(category_2);
                    }
                    searchAsync({ term: searchFor, subset: updateUsedBlocks ? usedBlocks : undefined }).then(function (blocks) {
                        updateUsedBlocks = false;
                        if (!blocks)
                            return;
                        if (blocks.length == 0) {
                            var label = goog.dom.createDom('label');
                            label.setAttribute('text', lf("No search results..."));
                            category_2.appendChild(label);
                            return;
                        }
                        blocks.forEach(function (info) {
                            if (tb) {
                                var type = info.id;
                                var block = searchElementCache[type];
                                if (!block) {
                                    block = (searchElementCache[type] = tb.querySelector("block[type=\"" + type + "\"]").cloneNode(true));
                                }
                                if (block) {
                                    category_2.appendChild(block);
                                }
                            }
                        });
                    }).finally(function () {
                        if (tb) {
                            updateToolbox(searchTb_1);
                            blocklySearchInput.className = origClassName;
                        }
                    });
                }
                else {
                    // Clearing search
                    updateToolbox(pxt.blocks.cachedSearchTb);
                    blocklySearchInput.className = origClassName;
                }
                // Search
            }, 700, false);
            blocklySearchInputField.oninput = searchHandler;
            blocklySearchInputField.onchange = searchHandler;
            blocklySearchInputField.onfocus = function () { return blocklySearchInputField.select(); };
            pxt.BrowserUtils.isTouchEnabled() ?
                blocklySearchInputField.ontouchstart = searchHandler
                : blocklySearchInputField.onclick = searchHandler;
        }
        blocks_6.initSearch = initSearch;
        function categoryElement(tb, nameid) {
            return tb ? tb.querySelector("category[nameid=\"" + nameid.toLowerCase() + "\"]") : undefined;
        }
        function cleanBlocks() {
            pxt.debug('removing all custom blocks');
            for (var b in cachedBlocks)
                removeBlock(cachedBlocks[b].fn);
        }
        blocks_6.cleanBlocks = cleanBlocks;
        function removeBlock(fn) {
            delete Blockly.Blocks[fn.attributes.blockId];
            delete cachedBlocks[fn.attributes.blockId];
        }
        var blocklyInitialized = false;
        function init() {
            if (blocklyInitialized)
                return;
            blocklyInitialized = true;
            goog.provide('Blockly.Blocks.device');
            goog.require('Blockly.Blocks');
            if (window.navigator.pointerEnabled) {
                Blockly.bindEvent_.TOUCH_MAP = {
                    mousedown: 'pointerdown',
                    mousemove: 'pointermove',
                    mouseup: 'pointerup'
                };
                document.body.style.touchAction = 'none';
            }
            Blockly.FieldCheckbox.CHECK_CHAR = '■';
            Blockly.BlockSvg.START_HAT = !!pxt.appTarget.appTheme.blockHats;
            initContextMenu();
            initOnStart();
            initMath();
            initVariables();
            initLoops();
            initLogic();
            initText();
            initDrag();
        }
        function setBuiltinHelpInfo(block, id) {
            var info = pxt.blocks.helpResources()[id];
            setHelpResources(block, id, info.name, info.tooltip, info.url, String(blocks_6.blockColors[info.category]));
        }
        function installBuiltinHelpInfo(id) {
            var info = pxt.blocks.helpResources()[id];
            installHelpResources(id, info.name, info.tooltip, info.url, String(blocks_6.blockColors[info.category]));
        }
        function setHelpResources(block, id, name, tooltip, url, colour) {
            if (tooltip)
                block.setTooltip(tooltip);
            if (url)
                block.setHelpUrl(url);
            if (colour)
                block.setColour(colour);
            var tb = document.getElementById('blocklyToolboxDefinition');
            var xml = tb ? tb.querySelector("category block[type~='" + id + "']") : undefined;
            block.codeCard = {
                header: name,
                name: name,
                software: 1,
                description: goog.isFunction(tooltip) ? tooltip(block) : tooltip,
                blocksXml: xml ? ("<xml xmlns=\"http://www.w3.org/1999/xhtml\">" + (cleanOuterHTML(xml) || "<block type=\"" + id + "\"></block>") + "</xml>") : undefined,
                url: url
            };
        }
        function installHelpResources(id, name, tooltip, url, colour) {
            var block = Blockly.Blocks[id];
            var old = block.init;
            if (!old)
                return;
            block.init = function () {
                old.call(this);
                var block = this;
                setHelpResources(this, id, name, tooltip, url, colour);
            };
        }
        function initLoops() {
            var msg = Blockly.Msg;
            // builtin controls_repeat_ext
            msg.CONTROLS_REPEAT_TITLE = lf("repeat %1 times");
            msg.CONTROLS_REPEAT_INPUT_DO = lf("{id:repeat}do");
            installBuiltinHelpInfo('controls_repeat_ext');
            // pxt device_while
            Blockly.Blocks['device_while'] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("while %1"),
                        "args0": [
                            {
                                "type": "input_value",
                                "name": "COND",
                                "check": "Boolean"
                            }
                        ],
                        "previousStatement": null,
                        "nextStatement": null,
                        "colour": blocks_6.blockColors['loops']
                    });
                    this.appendStatementInput("DO")
                        .appendField(lf("{id:while}do"));
                    setBuiltinHelpInfo(this, 'device_while');
                }
            };
            // pxt controls_simple_for
            Blockly.Blocks['controls_simple_for'] = {
                /**
                 * Block for 'for' loop.
                 * @this Blockly.Block
                 */
                init: function () {
                    this.jsonInit({
                        "message0": lf("for %1 from 0 to %2"),
                        "args0": [
                            {
                                "type": "field_variable",
                                "name": "VAR",
                                "variable": lf("{id:var}index")
                            },
                            {
                                "type": "input_value",
                                "name": "TO",
                                "check": "Number"
                            }
                        ],
                        "previousStatement": null,
                        "nextStatement": null,
                        "colour": blocks_6.blockColors['loops'],
                        "inputsInline": true
                    });
                    this.appendStatementInput('DO')
                        .appendField(lf("{id:for}do"));
                    var info = pxt.blocks.helpResources()['controls_simple_for'];
                    var thisBlock = this;
                    setHelpResources(this, 'controls_simple_for', info.name, function () {
                        return lf("Have the variable '{0}' take on the values from 0 to the end number, counting by 1, and do the specified blocks.", thisBlock.getFieldValue('VAR'));
                    }, info.url, String(blocks_6.blockColors['loops']));
                },
                /**
                 * Return all variables referenced by this block.
                 * @return {!Array.<string>} List of variable names.
                 * @this Blockly.Block
                 */
                getVars: function () {
                    return [this.getFieldValue('VAR')];
                },
                /**
                 * Notification that a variable is renaming.
                 * If the name matches one of this block's variables, rename it.
                 * @param {string} oldName Previous name of variable.
                 * @param {string} newName Renamed variable.
                 * @this Blockly.Block
                 */
                renameVar: function (oldName, newName) {
                    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                        this.setFieldValue(newName, 'VAR');
                    }
                },
                /**
                 * Add menu option to create getter block for loop variable.
                 * @param {!Array} options List of menu options to add to.
                 * @this Blockly.Block
                 */
                customContextMenu: function (options) {
                    if (!this.isCollapsed()) {
                        var option = { enabled: true };
                        var name_1 = this.getFieldValue('VAR');
                        option.text = lf("Create 'get {0}'", name_1);
                        var xmlField = goog.dom.createDom('field', null, name_1);
                        xmlField.setAttribute('name', 'VAR');
                        var xmlBlock = goog.dom.createDom('block', null, xmlField);
                        xmlBlock.setAttribute('type', 'variables_get');
                        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                        options.push(option);
                    }
                }
            };
        }
        blocks_6.onShowContextMenu = undefined;
        /**
         * The following patch to blockly is to add the Trash icon on top of the toolbox,
         * the trash icon should only show when a user drags a block that is already in the workspace.
         */
        function initDrag() {
            var calculateDistance = function (elemBounds, mouseX) {
                return Math.floor(mouseX - (elemBounds.left + (elemBounds.width / 2)));
            };
            /**
             * Track a drag of an object on this workspace.
             * @param {!Event} e Mouse move event.
             * @return {!goog.math.Coordinate} New location of object.
             */
            var moveDrag = Blockly.WorkspaceSvg.prototype.moveDrag;
            Blockly.WorkspaceSvg.prototype.moveDrag = function (e) {
                var blocklyTreeRoot = document.getElementsByClassName('blocklyTreeRoot')[0];
                var trashIcon = document.getElementById("blocklyTrashIcon");
                if (blocklyTreeRoot && trashIcon) {
                    var distance = calculateDistance(blocklyTreeRoot.getBoundingClientRect(), e.clientX);
                    if (distance < 200) {
                        var opacity = distance / 200;
                        trashIcon.style.opacity = "" + (1 - opacity);
                        trashIcon.style.display = 'block';
                        blocklyTreeRoot.style.opacity = "" + opacity;
                    }
                    else {
                        trashIcon.style.display = 'none';
                        blocklyTreeRoot.style.opacity = '1';
                    }
                }
                return moveDrag.call(this, e);
            };
            /**
             * Stop binding to the global mouseup and mousemove events.
             * @private
             */
            var terminateDrag_ = Blockly.terminateDrag_;
            Blockly.terminateDrag_ = function () {
                var blocklyTreeRoot = document.getElementsByClassName('blocklyTreeRoot')[0];
                var trashIcon = document.getElementById("blocklyTrashIcon");
                if (trashIcon) {
                    trashIcon.style.display = 'none';
                    blocklyTreeRoot.style.opacity = '1';
                }
                terminateDrag_.call(this);
            };
        }
        function initContextMenu() {
            // Translate the context menu for blocks.
            var msg = Blockly.Msg;
            msg.DUPLICATE_BLOCK = lf("{id:block}Duplicate");
            msg.REMOVE_COMMENT = lf("Remove Comment");
            msg.ADD_COMMENT = lf("Add Comment");
            msg.EXTERNAL_INPUTS = lf("External Inputs");
            msg.INLINE_INPUTS = lf("Inline Inputs");
            msg.EXPAND_BLOCK = lf("Expand Block");
            msg.COLLAPSE_BLOCK = lf("Collapse Block");
            msg.ENABLE_BLOCK = lf("Enable Block");
            msg.DISABLE_BLOCK = lf("Disable Block");
            msg.DELETE_BLOCK = lf("Delete Block");
            msg.DELETE_X_BLOCKS = lf("Delete %1 Blocks");
            msg.HELP = lf("Help");
            /**
             * Show the context menu for the workspace.
             * @param {!Event} e Mouse event.
             * @private
             */
            Blockly.WorkspaceSvg.prototype.showContextMenu_ = function (e) {
                var _this = this;
                if (this.options.readOnly || this.isFlyout) {
                    return;
                }
                var menuOptions = [];
                var topBlocks = this.getTopBlocks(true);
                var eventGroup = Blockly.utils.genUid();
                // Add a little animation to collapsing and expanding.
                var DELAY = 10;
                if (this.options.collapse) {
                    var hasCollapsedBlocks = false;
                    var hasExpandedBlocks = false;
                    for (var i = 0; i < topBlocks.length; i++) {
                        var block = topBlocks[i];
                        while (block) {
                            if (block.isCollapsed()) {
                                hasCollapsedBlocks = true;
                            }
                            else {
                                hasExpandedBlocks = true;
                            }
                            block = block.getNextBlock();
                        }
                    }
                    /**
                     * Option to collapse or expand top blocks.
                     * @param {boolean} shouldCollapse Whether a block should collapse.
                     * @private
                     */
                    var toggleOption_1 = function (shouldCollapse) {
                        var ms = 0;
                        for (var i = 0; i < topBlocks.length; i++) {
                            var block = topBlocks[i];
                            while (block) {
                                setTimeout(block.setCollapsed.bind(block, shouldCollapse), ms);
                                block = block.getNextBlock();
                                ms += DELAY;
                            }
                        }
                    };
                    // Option to collapse top blocks.
                    var collapseOption = { enabled: hasExpandedBlocks };
                    collapseOption.text = lf("Collapse Block");
                    collapseOption.callback = function () {
                        pxt.tickEvent("blocks.context.collapse");
                        toggleOption_1(true);
                    };
                    menuOptions.push(collapseOption);
                    // Option to expand top blocks.
                    var expandOption = { enabled: hasCollapsedBlocks };
                    expandOption.text = lf("Expand Block");
                    expandOption.callback = function () {
                        pxt.tickEvent("blocks.context.expand");
                        toggleOption_1(false);
                    };
                    menuOptions.push(expandOption);
                }
                // Option to delete all blocks.
                // Count the number of blocks that are deletable.
                var deleteList = [];
                function addDeletableBlocks(block) {
                    if (block.isDeletable()) {
                        deleteList = deleteList.concat(block.getDescendants());
                    }
                    else {
                        var children = block.getChildren();
                        for (var i = 0; i < children.length; i++) {
                            addDeletableBlocks(children[i]);
                        }
                    }
                }
                for (var i = 0; i < topBlocks.length; i++) {
                    addDeletableBlocks(topBlocks[i]);
                }
                function deleteNext() {
                    Blockly.Events.setGroup(eventGroup);
                    var block = deleteList.shift();
                    if (block) {
                        if (block.workspace) {
                            block.dispose(false, true);
                            setTimeout(deleteNext, DELAY);
                        }
                        else {
                            deleteNext();
                        }
                    }
                    Blockly.Events.setGroup(false);
                }
                var deleteOption = {
                    text: deleteList.length == 1 ? lf("Delete Block") :
                        lf("Delete {0} Blocks", deleteList.length),
                    enabled: deleteList.length > 0,
                    callback: function () {
                        pxt.tickEvent("blocks.context.delete");
                        if (deleteList.length < 2 ||
                            window.confirm(lf("Delete all {0} blocks?", deleteList.length))) {
                            deleteNext();
                        }
                    }
                };
                menuOptions.push(deleteOption);
                var formatCodeOption = {
                    text: lf("Format Code"),
                    enabled: true,
                    callback: function () {
                        pxt.tickEvent("blocks.context.format");
                        pxt.blocks.layout.flow(_this);
                    }
                };
                menuOptions.push(formatCodeOption);
                var shuffleOption = {
                    text: lf("Shuffle Blocks"),
                    enabled: topBlocks.length > 0,
                    callback: function () {
                        pxt.tickEvent("blocks.context.shuffle");
                        pxt.blocks.layout.shuffle(_this, 1);
                    }
                };
                // TODO: temporarily removing shuffle blocks option until we have a better way of surfacing it to content creators
                //menuOptions.push(shuffleOption);
                var screenshotOption = {
                    text: lf("Download Screenshot"),
                    enabled: topBlocks.length > 0,
                    callback: function () {
                        pxt.tickEvent("blocks.context.screenshot");
                        pxt.blocks.layout.screenshotAsync(_this)
                            .done(function (uri) {
                            if (pxt.BrowserUtils.isSafari())
                                uri = uri.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
                            pxt.BrowserUtils.browserDownloadDataUri(uri, (pxt.appTarget.nickname || pxt.appTarget.id) + "-" + lf("screenshot") + ".png");
                        });
                    }
                };
                menuOptions.push(screenshotOption);
                // custom options...
                if (blocks_6.onShowContextMenu)
                    blocks_6.onShowContextMenu(this, menuOptions);
                Blockly.ContextMenu.show(e, menuOptions, this.RTL);
            };
            // We override Blockly's category mouse event handler so that only one
            // category can be expanded at a time. Also prevent categories from toggling
            // once openend.
            Blockly.Toolbox.TreeNode.prototype.onMouseDown = function (a) {
                // Expand icon.
                var that = this;
                if (!that.isSelected()) {
                    // Collapse the currently selected node and its parent nodes
                    collapseMoreCategory(that.getTree().getSelectedItem(), that);
                }
                if (that.hasChildren() && that.isUserCollapsible_) {
                    // If this is a category of categories, we want to toggle when clicked
                    if (that.getChildCount() > 1) {
                        that.toggle();
                        if (that.isSelected()) {
                            that.getTree().setSelectedItem(null);
                        }
                        else {
                            that.select();
                        }
                    }
                    else {
                        // If this category has 1 or less children, don't bother toggling; we always want "More..." to show
                        if (that.isSelected()) {
                            collapseMoreCategory(that.getTree().getSelectedItem(), that);
                            that.getTree().setSelectedItem(null);
                        }
                        else {
                            that.setExpanded(true);
                            that.select();
                        }
                    }
                }
                else if (that.isSelected()) {
                    that.getTree().setSelectedItem(null);
                }
                else {
                    that.select();
                }
                that.updateRow();
            };
            // We also must override this handler to handle the case where no category is selected (e.g. clicking outside the toolbox)
            var oldSetSelectedItem = Blockly.Toolbox.TreeControl.prototype.setSelectedItem;
            var editor = this;
            Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function (a) {
                var that = this;
                var toolbox = that.toolbox_;
                if (a == that.selectedItem_ || a == toolbox.tree_) {
                    return;
                }
                if (a === null) {
                    collapseMoreCategory(that.selectedItem_);
                    editor.lastInvertedCategory = that.selectedItem_;
                }
                oldSetSelectedItem.call(that, a);
            };
            // Fix highlighting bug in edge
            Blockly.Flyout.prototype.addBlockListeners_ = function (root, block, rect) {
                this.listeners_.push(Blockly.bindEventWithChecks_(root, 'mousedown', null, this.blockMouseDown_(block)));
                this.listeners_.push(Blockly.bindEventWithChecks_(rect, 'mousedown', null, this.blockMouseDown_(block)));
                this.listeners_.push(Blockly.bindEvent_(root, 'mouseover', block, select));
                this.listeners_.push(Blockly.bindEvent_(rect, 'mouseover', block, select));
                var that = this;
                function select() {
                    if (that._selectedItem && that._selectedItem.svgGroup_) {
                        that._selectedItem.removeSelect();
                    }
                    that._selectedItem = block;
                    that._selectedItem.addSelect();
                }
            };
        }
        function collapseMoreCategory(cat, child) {
            while (cat) {
                // Only collapse categories that have a single child (e.g. "More...")
                if (cat.getChildCount() === 1 && cat.isUserCollapsible_ && cat != child && (!child || !isChild(child, cat))) {
                    cat.setExpanded(false);
                    cat.updateRow();
                }
                cat = cat.getParent();
            }
        }
        function isChild(child, parent) {
            var myParent = child.getParent();
            if (myParent) {
                return myParent === parent || isChild(myParent, parent);
            }
            return false;
        }
        function initOnStart() {
            // pxt math_op2
            Blockly.Blocks[ts.pxtc.ON_START_TYPE] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("on start %1 %2"),
                        "args0": [
                            {
                                "type": "input_dummy"
                            },
                            {
                                "type": "input_statement",
                                "name": "HANDLER"
                            }
                        ],
                        "colour": (pxt.appTarget.runtime ? pxt.appTarget.runtime.onStartColor : '') || blocks_6.blockColors['loops']
                    });
                    setHelpResources(this, ts.pxtc.ON_START_TYPE, lf("on start event"), lf("Run code when the program starts"), '/blocks/on-start', String((pxt.appTarget.runtime ? pxt.appTarget.runtime.onStartColor : '') || blocks_6.blockColors['loops']));
                }
            };
            Blockly.Blocks[pxtc.TS_STATEMENT_TYPE] = {
                init: function () {
                    var _this = this;
                    var that = this;
                    that.setColour("#717171");
                    that.setPreviousStatement(true);
                    that.setNextStatement(true);
                    this.domToMutation = function (element) {
                        var n = parseInt(element.getAttribute("numlines"));
                        _this.declaredVariables = element.getAttribute("declaredvars");
                        for (var i = 0; i < n; i++) {
                            var line = element.getAttribute("line" + i);
                            that.appendDummyInput().appendField(line, "LINE" + i);
                        }
                    };
                    this.mutationToDom = function () {
                        var mutation = document.createElement("mutation");
                        var i = 0;
                        while (true) {
                            var val = that.getFieldValue("LINE" + i);
                            if (val === null) {
                                break;
                            }
                            mutation.setAttribute("line" + i, val);
                            i++;
                        }
                        mutation.setAttribute("numlines", i.toString());
                        if (_this.declaredVariables) {
                            mutation.setAttribute("declaredvars", _this.declaredVariables);
                        }
                        return mutation;
                    };
                    that.setEditable(false);
                    setHelpResources(this, pxtc.TS_STATEMENT_TYPE, lf("JavaScript statement"), lf("A JavaScript statement that could not be converted to blocks"), '/blocks/javascript-blocks', '#717171');
                }
            };
            Blockly.Blocks[pxtc.TS_OUTPUT_TYPE] = {
                init: function () {
                    this.jsonInit({
                        "colour": "#717171",
                        "message0": "%1",
                        "args0": [
                            {
                                "type": "field_input",
                                "name": "EXPRESSION",
                                "text": ""
                            }
                        ]
                    });
                    this.setPreviousStatement(false);
                    this.setNextStatement(false);
                    this.setOutput(true);
                    this.setEditable(false);
                    setHelpResources(this, pxtc.TS_OUTPUT_TYPE, lf("JavaScript expression"), lf("A JavaScript expression that could not be converted to blocks"), '/blocks/javascript-blocks', "#717171");
                }
            };
        }
        function initMath() {
            // pxt math_op2
            Blockly.Blocks['math_op2'] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("%1 of %2 and %3"),
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "op",
                                "options": [
                                    [lf("{id:op}min"), "min"],
                                    [lf("{id:op}max"), "max"]
                                ]
                            },
                            {
                                "type": "input_value",
                                "name": "x",
                                "check": "Number"
                            },
                            {
                                "type": "input_value",
                                "name": "y",
                                "check": "Number"
                            }
                        ],
                        "inputsInline": true,
                        "output": "Number",
                        "colour": blocks_6.blockColors['math']
                    });
                    var thisBlock = this;
                    var info = pxt.blocks.helpResources()['math_op2'];
                    setHelpResources(this, 'math_op2', info.name, function () {
                        return thisBlock.getFieldValue('op') == 'min' ? lf("smaller value of 2 numbers") : lf("larger value of 2 numbers");
                    }, info.url, String(blocks_6.blockColors[info.category]));
                }
            };
            // pxt math_op3
            Blockly.Blocks['math_op3'] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("absolute of %1"),
                        "args0": [
                            {
                                "type": "input_value",
                                "name": "x",
                                "check": "Number"
                            }
                        ],
                        "inputsInline": true,
                        "output": "Number",
                        "colour": blocks_6.blockColors['math']
                    });
                    setBuiltinHelpInfo(this, 'math_op3');
                }
            };
            // pxt device_random
            Blockly.Blocks['device_random'] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("pick random 0 to %1"),
                        "args0": [
                            {
                                "type": "input_value",
                                "name": "limit",
                                "check": "Number"
                            }
                        ],
                        "inputsInline": true,
                        "output": "Number",
                        "colour": blocks_6.blockColors['math']
                    });
                    setBuiltinHelpInfo(this, 'device_random');
                }
            };
            // builtin math_number
            //XXX Integer validation needed.
            var mInfo = pxt.blocks.helpResources()['math_number'];
            installHelpResources('math_number', mInfo.name, (pxt.appTarget.compile && pxt.appTarget.compile.floatingPoint) ? lf("a decimal number") : lf("an integer number"), mInfo.url, String(blocks_6.blockColors[mInfo.category]));
            // builtin math_number_minmax
            //XXX Integer validation needed.
            var mMInfo = blocks_6.helpResources()['math_number_minmax'];
            installHelpResources('math_number_minmax', mMInfo.name, (pxt.appTarget.compile && pxt.appTarget.compile.floatingPoint) ? lf("a decimal number") : lf("an integer number"), mMInfo.url, String(blocks_6.blockColors[mMInfo.category]));
            // builtin math_arithmetic
            var msg = Blockly.Msg;
            msg.MATH_ADDITION_SYMBOL = lf("{id:op}+");
            msg.MATH_SUBTRACTION_SYMBOL = lf("{id:op}-");
            msg.MATH_MULTIPLICATION_SYMBOL = lf("{id:op}×");
            msg.MATH_DIVISION_SYMBOL = lf("{id:op}÷");
            msg.MATH_POWER_SYMBOL = lf("{id:op}^");
            var TOOLTIPS = {
                'ADD': lf("Return the sum of the two numbers."),
                'MINUS': lf("Return the difference of the two numbers."),
                'MULTIPLY': lf("Return the product of the two numbers."),
                'DIVIDE': lf("Return the quotient of the two numbers."),
                'POWER': lf("Return the first number raised to the power of the second number."),
            };
            var aInfo = pxt.blocks.helpResources()['math_arithmetic'];
            installHelpResources('math_arithmetic', aInfo.name, function (block) {
                return TOOLTIPS[block.getFieldValue('OP')];
            }, aInfo.url, String(blocks_6.blockColors[aInfo.category]));
            // builtin math_modulo
            msg.MATH_MODULO_TITLE = lf("remainder of %1 ÷ %2");
            installBuiltinHelpInfo('math_modulo');
        }
        function initVariables() {
            var varname = lf("{id:var}item");
            Blockly.Variables.flyoutCategory = function (workspace) {
                var xmlList = [];
                var button = goog.dom.createDom('button');
                button.setAttribute('text', lf("Make a Variable"));
                button.setAttribute('callbackKey', 'CREATE_VARIABLE');
                workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
                    Blockly.Variables.createVariable(button.getTargetWorkspace());
                });
                xmlList.push(button);
                var variableList = Blockly.Variables.allVariables(workspace);
                variableList.sort(goog.string.caseInsensitiveCompare);
                // In addition to the user's variables, we also want to display the default
                // variable name at the top.  We also don't want this duplicated if the
                // user has created a variable of the same name.
                goog.array.remove(variableList, varname);
                variableList.unshift(varname);
                // variables getters first
                for (var i = 0; i < variableList.length; i++) {
                    // <block type="variables_get" gap="24">
                    //   <field name="VAR">item</field>
                    // </block>
                    var block = goog.dom.createDom('block');
                    block.setAttribute('type', 'variables_get');
                    block.setAttribute('gap', '8');
                    block.setAttribute('colour', String(blocks_6.blockColors['variables']));
                    var field = goog.dom.createDom('field', null, variableList[i]);
                    field.setAttribute('name', 'VAR');
                    block.appendChild(field);
                    xmlList.push(block);
                }
                xmlList[xmlList.length - 1].setAttribute('gap', '24');
                for (var i = 0; i < Math.min(1, variableList.length); i++) {
                    {
                        // <block type="variables_set" gap="8">
                        //   <field name="VAR">item</field>
                        // </block>
                        var block = goog.dom.createDom('block');
                        block.setAttribute('type', 'variables_set');
                        block.setAttribute('gap', '8');
                        {
                            var field = goog.dom.createDom('field', null, variableList[i]);
                            field.setAttribute('name', 'VAR');
                            block.appendChild(field);
                        }
                        {
                            var value = goog.dom.createDom('value');
                            value.setAttribute('name', 'VALUE');
                            var shadow = goog.dom.createDom('shadow');
                            shadow.setAttribute("type", "math_number");
                            value.appendChild(shadow);
                            var field = goog.dom.createDom('field');
                            field.setAttribute('name', 'NUM');
                            field.appendChild(document.createTextNode("0"));
                            shadow.appendChild(field);
                            block.appendChild(value);
                        }
                        xmlList.push(block);
                    }
                    {
                        // <block type="variables_get" gap="24">
                        //   <field name="VAR">item</field>
                        // </block>
                        var block = goog.dom.createDom('block');
                        block.setAttribute('type', 'variables_change');
                        block.setAttribute('gap', '24');
                        var value = goog.dom.createDom('value');
                        value.setAttribute('name', 'VALUE');
                        var shadow = goog.dom.createDom('shadow');
                        shadow.setAttribute("type", "math_number");
                        value.appendChild(shadow);
                        var field = goog.dom.createDom('field');
                        field.setAttribute('name', 'NUM');
                        field.appendChild(document.createTextNode("1"));
                        shadow.appendChild(field);
                        block.appendChild(value);
                        xmlList.push(block);
                    }
                }
                return xmlList;
            };
            // builtin variables_get
            var msg = Blockly.Msg;
            msg.VARIABLES_GET_CREATE_SET = lf("Create 'set %1'");
            installBuiltinHelpInfo('variables_get');
            // builtin variables_set
            msg.VARIABLES_SET = lf("set %1 to %2");
            msg.VARIABLES_DEFAULT_NAME = varname;
            //XXX Do not translate the default variable name.
            //XXX Variable names with Unicode character are harmful at this point.
            msg.VARIABLES_SET_CREATE_GET = lf("Create 'get %1'");
            installBuiltinHelpInfo('variables_set');
            // pxt variables_change
            Blockly.Blocks['variables_change'] = {
                init: function () {
                    this.jsonInit({
                        "message0": lf("change %1 by %2"),
                        "args0": [
                            {
                                "type": "field_variable",
                                "name": "VAR",
                                "variable": varname
                            },
                            {
                                "type": "input_value",
                                "name": "VALUE",
                                "check": "Number"
                            }
                        ],
                        "inputsInline": true,
                        "previousStatement": null,
                        "nextStatement": null,
                        "colour": blocks_6.blockColors['variables']
                    });
                    setBuiltinHelpInfo(this, 'variables_change');
                }
            };
        }
        function initLogic() {
            var msg = Blockly.Msg;
            // builtin controls_if
            msg.CONTROLS_IF_MSG_IF = lf("{id:logic}if");
            msg.CONTROLS_IF_MSG_THEN = lf("{id:logic}then");
            msg.CONTROLS_IF_MSG_ELSE = lf("{id:logic}else");
            msg.CONTROLS_IF_MSG_ELSEIF = lf("{id:logic}else if");
            msg.CONTROLS_IF_TOOLTIP_1 = lf("If a value is true, then do some statements.");
            msg.CONTROLS_IF_TOOLTIP_2 = lf("If a value is true, then do the first block of statements. Otherwise, do the second block of statements.");
            msg.CONTROLS_IF_TOOLTIP_3 = lf("If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements.");
            msg.CONTROLS_IF_TOOLTIP_4 = lf("If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements. If none of the values are true, do the last block of statements.");
            installBuiltinHelpInfo('controls_if');
            // builtin logic_compare
            msg.LOGIC_COMPARE_TOOLTIP_EQ = lf("Return true if both inputs equal each other.");
            msg.LOGIC_COMPARE_TOOLTIP_NEQ = lf("Return true if both inputs are not equal to each other.");
            msg.LOGIC_COMPARE_TOOLTIP_LT = lf("Return true if the first input is smaller than the second input.");
            msg.LOGIC_COMPARE_TOOLTIP_LTE = lf("Return true if the first input is smaller than or equal to the second input.");
            msg.LOGIC_COMPARE_TOOLTIP_GT = lf("Return true if the first input is greater than the second input.");
            msg.LOGIC_COMPARE_TOOLTIP_GTE = lf("Return true if the first input is greater than or equal to the second input.");
            installBuiltinHelpInfo('logic_compare');
            // builtin logic_operation
            msg.LOGIC_OPERATION_AND = lf("{id:op}and");
            msg.LOGIC_OPERATION_OR = lf("{id:op}or");
            msg.LOGIC_OPERATION_TOOLTIP_AND = lf("Return true if both inputs are true."),
                msg.LOGIC_OPERATION_TOOLTIP_OR = lf("Return true if at least one of the inputs is true."),
                installBuiltinHelpInfo('logic_operation');
            // builtin logic_negate
            msg.LOGIC_NEGATE_TITLE = lf("not %1");
            installBuiltinHelpInfo('logic_negate');
            // builtin logic_boolean
            msg.LOGIC_BOOLEAN_TRUE = lf("{id:boolean}true");
            msg.LOGIC_BOOLEAN_FALSE = lf("{id:boolean}false");
            installBuiltinHelpInfo('logic_boolean');
        }
        function initText() {
            // builtin text
            installBuiltinHelpInfo('text');
            // builtin text_length and text_join
            var msg = Blockly.Msg;
            msg.TEXT_LENGTH_TITLE = lf("length of %1");
            msg.TEXT_JOIN_TITLE_CREATEWITH = lf("join");
            installBuiltinHelpInfo('text_length');
            installBuiltinHelpInfo('text_join');
        }
        function initTooltip(blockInfo) {
            var renderTip = function (el) {
                var tip = el.tooltip;
                while (goog.isFunction(tip)) {
                    tip = tip(el);
                }
                return tip;
            };
            // TODO: update this when pulling new blockly
            /**
             * Create the tooltip and show it.
             * @private
             */
            Blockly.Tooltip.show_ = function () {
                Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_;
                if (!Blockly.Tooltip.DIV) {
                    return;
                }
                // Erase all existing text.
                goog.dom.removeChildren(/** @type {!Element} */ (Blockly.Tooltip.DIV));
                // Get the new text.
                var card = Blockly.Tooltip.element_.codeCard;
                if (card) {
                    var cardEl = pxt.docs.codeCard.render({
                        header: renderTip(Blockly.Tooltip.element_),
                        typeScript: pxt.blocks.compileBlock(Blockly.Tooltip.element_, blockInfo).source
                    });
                    Blockly.Tooltip.DIV.appendChild(cardEl);
                }
                else {
                    var tip = renderTip(Blockly.Tooltip.element_);
                    tip = Blockly.utils.wrap(tip, Blockly.Tooltip.LIMIT);
                    // Create new text, line by line.
                    var lines = tip.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        var div = document.createElement('div');
                        div.appendChild(document.createTextNode(lines[i]));
                        Blockly.Tooltip.DIV.appendChild(div);
                    }
                }
                var rtl = Blockly.Tooltip.element_.RTL;
                var windowSize = goog.dom.getViewportSize();
                // Display the tooltip.
                Blockly.Tooltip.DIV.style.direction = rtl ? 'rtl' : 'ltr';
                Blockly.Tooltip.DIV.style.display = 'block';
                Blockly.Tooltip.visible = true;
                // Move the tooltip to just below the cursor.
                var anchorX = Blockly.Tooltip.lastX_;
                if (rtl) {
                    anchorX -= Blockly.Tooltip.OFFSET_X + Blockly.Tooltip.DIV.offsetWidth;
                }
                else {
                    anchorX += Blockly.Tooltip.OFFSET_X;
                }
                var anchorY = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;
                if (anchorY + Blockly.Tooltip.DIV.offsetHeight >
                    windowSize.height + window.scrollY) {
                    // Falling off the bottom of the screen; shift the tooltip up.
                    anchorY -= Blockly.Tooltip.DIV.offsetHeight + 2 * Blockly.Tooltip.OFFSET_Y;
                }
                if (rtl) {
                    // Prevent falling off left edge in RTL mode.
                    anchorX = Math.max(Blockly.Tooltip.MARGINS - window.scrollX, anchorX);
                }
                else {
                    if (anchorX + Blockly.Tooltip.DIV.offsetWidth >
                        windowSize.width + window.scrollX - 2 * Blockly.Tooltip.MARGINS) {
                        // Falling off the right edge of the screen;
                        // clamp the tooltip on the edge.
                        anchorX = windowSize.width - Blockly.Tooltip.DIV.offsetWidth -
                            2 * Blockly.Tooltip.MARGINS;
                    }
                }
                Blockly.Tooltip.DIV.style.top = anchorY + 'px';
                Blockly.Tooltip.DIV.style.left = anchorX + 'px';
            };
        }
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks) {
        var MutatorTypes;
        (function (MutatorTypes) {
            MutatorTypes.ObjectDestructuringMutator = "objectdestructuring";
            MutatorTypes.RestParameterMutator = "restparameter";
            MutatorTypes.DefaultInstanceMutator = "defaultinstance";
        })(MutatorTypes = blocks.MutatorTypes || (blocks.MutatorTypes = {}));
        function addMutation(b, info, mutationType) {
            var m;
            switch (mutationType) {
                case MutatorTypes.ObjectDestructuringMutator:
                    if (!info.parameters || info.parameters.length < 1) {
                        console.error("Destructuring mutations require at least one parameter");
                    }
                    else {
                        var found = false;
                        for (var _i = 0, _a = info.parameters; _i < _a.length; _i++) {
                            var param = _a[_i];
                            if (param.type.indexOf("=>") !== -1) {
                                if (!param.properties || param.properties.length === 0) {
                                    console.error("Destructuring mutations only supported for functions with an event parameter that has multiple properties");
                                    return;
                                }
                                found = true;
                            }
                        }
                        if (!found) {
                            console.error("Destructuring mutations must have an event parameter");
                            return;
                        }
                    }
                    m = new DestructuringMutator(b, info);
                    break;
                case MutatorTypes.RestParameterMutator:
                    m = new ArrayMutator(b, info);
                    break;
                case MutatorTypes.DefaultInstanceMutator:
                    m = new DefaultInstanceMutator(b, info);
                    break;
                default:
                    console.warn("Ignoring unknown mutation type: " + mutationType);
                    return;
            }
            b.mutationToDom = m.mutationToDom.bind(m);
            b.domToMutation = m.domToMutation.bind(m);
            b.compose = m.compose.bind(m);
            b.decompose = m.decompose.bind(m);
            b.mutation = m;
        }
        blocks.addMutation = addMutation;
        function mutateToolboxBlock(block, mutationType, mutation) {
            var mutationElement = document.createElement("mutation");
            switch (mutationType) {
                case MutatorTypes.ObjectDestructuringMutator:
                    mutationElement.setAttribute(DestructuringMutator.propertiesAttributeName, mutation);
                    break;
                case MutatorTypes.RestParameterMutator:
                    mutationElement.setAttribute(ArrayMutator.countAttributeName, mutation);
                    break;
                case MutatorTypes.DefaultInstanceMutator:
                    mutationElement.setAttribute(DefaultInstanceMutator.attributeName, mutation);
                default:
                    console.warn("Ignoring unknown mutation type: " + mutationType);
                    return;
            }
            block.appendChild(mutationElement);
        }
        blocks.mutateToolboxBlock = mutateToolboxBlock;
        var MutatorHelper = (function () {
            function MutatorHelper(b, info) {
                this.info = info;
                this.block = b;
                this.topBlockType = this.block.type + "_mutator";
                var subBlocks = this.getSubBlockNames();
                this.initializeMutatorTopBlock();
                this.initializeMutatorSubBlocks(subBlocks);
                var mutatorToolboxTypes = subBlocks.map(function (s) { return s.type; });
                this.block.setMutator(new Blockly.Mutator(mutatorToolboxTypes));
            }
            // Should be set to modify a block after a mutator dialog is updated
            MutatorHelper.prototype.compose = function (topBlock) {
                var allBlocks = topBlock.getDescendants().map(function (subBlock) {
                    return {
                        type: subBlock.type,
                        name: subBlock.inputList[0].name
                    };
                });
                // Toss the top block
                allBlocks.shift();
                this.updateBlock(allBlocks);
            };
            // Should be set to initialize the workspace inside a mutator dialog and return the top block
            MutatorHelper.prototype.decompose = function (workspace) {
                // Initialize flyout workspace's top block and add sub-blocks based on visible parameters
                var topBlock = workspace.newBlock(this.topBlockType);
                topBlock.initSvg();
                var _loop_1 = function(input) {
                    if (input.name === MutatorHelper.mutatorStatmentInput) {
                        var currentConnection_1 = input.connection;
                        this_1.getVisibleBlockTypes().forEach(function (sub) {
                            var subBlock = workspace.newBlock(sub);
                            subBlock.initSvg();
                            currentConnection_1.connect(subBlock.previousConnection);
                            currentConnection_1 = subBlock.nextConnection;
                        });
                        return "break";
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = topBlock.inputList; _i < _a.length; _i++) {
                    var input = _a[_i];
                    var state_1 = _loop_1(input);
                    if (state_1 === "break") break;
                }
                return topBlock;
            };
            MutatorHelper.prototype.compileMutation = function (e, comments) {
                return undefined;
            };
            MutatorHelper.prototype.getDeclaredVariables = function () {
                return undefined;
            };
            MutatorHelper.prototype.isDeclaredByMutation = function (varName) {
                return false;
            };
            MutatorHelper.prototype.initializeMutatorSubBlock = function (sub, parameter, colour) {
                sub.appendDummyInput(parameter)
                    .appendField(parameter);
                sub.setColour(colour);
                sub.setNextStatement(true);
                sub.setPreviousStatement(true);
            };
            MutatorHelper.prototype.initializeMutatorTopBlock = function () {
                var topBlockTitle = this.info.attributes.mutateText;
                var colour = this.block.getColour();
                Blockly.Blocks[this.topBlockType] = Blockly.Blocks[this.topBlockType] || {
                    init: function () {
                        var top = this;
                        top.appendDummyInput()
                            .appendField(topBlockTitle);
                        top.setColour(colour);
                        top.appendStatementInput(MutatorHelper.mutatorStatmentInput);
                    }
                };
            };
            MutatorHelper.prototype.initializeMutatorSubBlocks = function (subBlocks) {
                var colour = this.block.getColour();
                var initializer = this.initializeMutatorSubBlock.bind(this);
                subBlocks.forEach(function (blockName) {
                    Blockly.Blocks[blockName.type] = Blockly.Blocks[blockName.type] || {
                        init: function () { initializer(this, blockName.name, colour); }
                    };
                });
            };
            MutatorHelper.mutatorStatmentInput = "PROPERTIES";
            MutatorHelper.mutatedVariableInputName = "properties";
            return MutatorHelper;
        }());
        var DestructuringMutator = (function (_super) {
            __extends(DestructuringMutator, _super);
            function DestructuringMutator(b, info) {
                _super.call(this, b, info);
                this.currentlyVisible = [];
                this.parameterRenames = {};
                this.block.appendDummyInput(MutatorHelper.mutatedVariableInputName);
                this.block.appendStatementInput("HANDLER")
                    .setCheck("null");
            }
            DestructuringMutator.prototype.getMutationType = function () {
                return MutatorTypes.ObjectDestructuringMutator;
            };
            DestructuringMutator.prototype.compileMutation = function (e, comments) {
                var _this = this;
                if (!this.info.attributes.mutatePropertyEnum && !this.parameters.length) {
                    return undefined;
                }
                var declarationString = this.parameters.map(function (param) {
                    var declaredName = _this.block.getFieldValue(param);
                    var escapedParam = blocks.escapeVarName(param, e);
                    if (declaredName !== param) {
                        _this.parameterRenames[param] = declaredName;
                        return param + ": " + blocks.escapeVarName(declaredName, e);
                    }
                    return escapedParam;
                }).join(", ");
                var lambdaString = " ({ " + declarationString + " }) => ";
                if (this.info.attributes.mutatePropertyEnum) {
                    return blocks.mkText(" [" + this.parameters.map(function (p) { return (_this.info.attributes.mutatePropertyEnum + "." + p); }).join(", ") + "]," + lambdaString);
                }
                else {
                    return blocks.mkText(lambdaString);
                }
            };
            DestructuringMutator.prototype.getDeclaredVariables = function () {
                var _this = this;
                var result = {};
                this.parameters.forEach(function (param) {
                    result[_this.block.getFieldValue(param)] = _this.parameterTypes[param];
                });
                return result;
            };
            DestructuringMutator.prototype.isDeclaredByMutation = function (varName) {
                var _this = this;
                return this.parameters.some(function (param) { return _this.block.getFieldValue(param) === varName; });
            };
            DestructuringMutator.prototype.mutationToDom = function () {
                var _this = this;
                // Save the parameters that are currently visible to the DOM along with their names
                var mutation = document.createElement("mutation");
                var attr = this.parameters.map(function (param) {
                    var varName = _this.block.getFieldValue(param);
                    if (varName !== param) {
                        _this.parameterRenames[param] = pxt.Util.htmlEscape(varName);
                    }
                    return pxt.Util.htmlEscape(param);
                }).join(",");
                mutation.setAttribute(DestructuringMutator.propertiesAttributeName, attr);
                for (var parameter in this.parameterRenames) {
                    if (parameter === this.parameterRenames[parameter]) {
                        delete this.parameterRenames[parameter];
                    }
                }
                mutation.setAttribute(DestructuringMutator.renameAttributeName, JSON.stringify(this.parameterRenames));
                return mutation;
            };
            DestructuringMutator.prototype.domToMutation = function (xmlElement) {
                var _this = this;
                // Restore visible parameters based on saved DOM
                var savedParameters = xmlElement.getAttribute(DestructuringMutator.propertiesAttributeName);
                if (savedParameters) {
                    var split = savedParameters.split(",");
                    var properties_1 = [];
                    if (this.paramIndex === undefined) {
                        this.paramIndex = this.getParameterIndex();
                    }
                    split.forEach(function (saved) {
                        // Parse the old way of storing renames to maintain backwards compatibility
                        var parts = saved.split(":");
                        if (_this.info.parameters[_this.paramIndex].properties.some(function (p) { return p.name === parts[0]; })) {
                            properties_1.push({
                                property: parts[0],
                                newName: parts[1]
                            });
                        }
                    });
                    this.parameterRenames = undefined;
                    if (xmlElement.hasAttribute(DestructuringMutator.renameAttributeName)) {
                        try {
                            this.parameterRenames = JSON.parse(xmlElement.getAttribute(DestructuringMutator.renameAttributeName));
                        }
                        catch (e) {
                            console.warn("Ignoring invalid rename map in saved block mutation");
                        }
                    }
                    this.parameterRenames = this.parameterRenames || {};
                    // Create the fields for each property with default variable names
                    this.parameters = [];
                    properties_1.forEach(function (prop) {
                        _this.parameters.push(prop.property);
                        if (prop.newName && prop.newName !== prop.property) {
                            _this.parameterRenames[prop.property] === prop.newName;
                        }
                    });
                    this.updateVisibleProperties();
                    // Override any names that the user has changed
                    properties_1.filter(function (p) { return !!p.newName; }).forEach(function (p) { return _this.block.setFieldValue(p.newName, p.property); });
                }
            };
            DestructuringMutator.prototype.updateBlock = function (subBlocks) {
                var _this = this;
                this.parameters = [];
                // Ignore duplicate blocks
                subBlocks.forEach(function (p) {
                    if (_this.parameters.indexOf(p.name) === -1) {
                        _this.parameters.push(p.name);
                    }
                });
                this.updateVisibleProperties();
            };
            DestructuringMutator.prototype.getSubBlockNames = function () {
                var _this = this;
                this.parameters = [];
                this.parameterTypes = {};
                if (this.paramIndex === undefined) {
                    this.paramIndex = this.getParameterIndex();
                }
                return this.info.parameters[this.paramIndex].properties.map(function (property) {
                    // Used when compiling the destructured arguments
                    _this.parameterTypes[property.name] = property.type;
                    return {
                        type: _this.propertyId(property.name),
                        name: property.name
                    };
                });
            };
            DestructuringMutator.prototype.getVisibleBlockTypes = function () {
                var _this = this;
                return this.currentlyVisible.map(function (p) { return _this.propertyId(p); });
            };
            DestructuringMutator.prototype.updateVisibleProperties = function () {
                var _this = this;
                if (pxt.Util.listsEqual(this.currentlyVisible, this.parameters)) {
                    return;
                }
                var dummyInput = this.block.inputList.filter(function (i) { return i.name === MutatorHelper.mutatedVariableInputName; })[0];
                this.currentlyVisible.forEach(function (param) {
                    if (_this.parameters.indexOf(param) === -1) {
                        var name_2 = _this.block.getFieldValue(param);
                        // Persist renames
                        if (name_2 !== param) {
                            _this.parameterRenames[param] = name_2;
                        }
                        dummyInput.removeField(param);
                    }
                });
                this.parameters.forEach(function (param) {
                    if (_this.currentlyVisible.indexOf(param) === -1) {
                        var fieldValue = _this.parameterRenames[param] || param;
                        dummyInput.appendField(new Blockly.FieldVariable(fieldValue), param);
                    }
                });
                this.currentlyVisible = this.parameters;
            };
            DestructuringMutator.prototype.propertyId = function (property) {
                return this.block.type + "_" + property;
            };
            DestructuringMutator.prototype.getParameterIndex = function () {
                for (var i = 0; i < this.info.parameters.length; i++) {
                    if (this.info.parameters[i].type.indexOf("=>") !== -1) {
                        return i;
                    }
                }
                return undefined;
            };
            DestructuringMutator.propertiesAttributeName = "callbackproperties";
            DestructuringMutator.renameAttributeName = "renamemap";
            return DestructuringMutator;
        }(MutatorHelper));
        var ArrayMutator = (function (_super) {
            __extends(ArrayMutator, _super);
            function ArrayMutator() {
                _super.apply(this, arguments);
                this.count = 0;
            }
            ArrayMutator.prototype.getMutationType = function () {
                return MutatorTypes.RestParameterMutator;
            };
            ArrayMutator.prototype.compileMutation = function (e, comments) {
                var values = [];
                this.forEachInput(function (block) { return values.push(blocks.compileExpression(e, block, comments)); });
                return blocks.mkGroup(values);
            };
            ArrayMutator.prototype.mutationToDom = function () {
                var mutation = document.createElement("mutation");
                mutation.setAttribute(ArrayMutator.countAttributeName, this.count.toString());
                return mutation;
            };
            ArrayMutator.prototype.domToMutation = function (xmlElement) {
                var attribute = xmlElement.getAttribute(ArrayMutator.countAttributeName);
                if (attribute) {
                    try {
                        this.count = parseInt(attribute);
                    }
                    catch (e) {
                        return;
                    }
                    for (var i = 0; i < this.count; i++) {
                        this.addNumberField(false, i);
                    }
                }
            };
            ArrayMutator.prototype.updateBlock = function (subBlocks) {
                if (subBlocks) {
                    var diff = Math.abs(this.count - subBlocks.length);
                    if (this.count < subBlocks.length) {
                        for (var i = 0; i < diff; i++)
                            this.addNumberField(true, this.count);
                    }
                    else if (this.count > subBlocks.length) {
                        for (var i = 0; i < diff; i++)
                            this.removeNumberField();
                    }
                }
            };
            ArrayMutator.prototype.getSubBlockNames = function () {
                return [{
                        name: "Value",
                        type: ArrayMutator.entryTypeName
                    }];
            };
            ArrayMutator.prototype.getVisibleBlockTypes = function () {
                var result = [];
                this.forEachInput(function () { return result.push(ArrayMutator.entryTypeName); });
                return result;
            };
            ArrayMutator.prototype.addNumberField = function (isNewField, index) {
                var input = this.block.appendValueInput(ArrayMutator.valueInputPrefix + index).setCheck("Number");
                if (isNewField) {
                    var valueBlock = this.block.workspace.newBlock("math_number");
                    valueBlock.initSvg();
                    valueBlock.setShadow(true);
                    input.connection.connect(valueBlock.outputConnection);
                    this.block.workspace.render();
                    this.count++;
                }
            };
            ArrayMutator.prototype.removeNumberField = function () {
                if (this.count > 0) {
                    this.block.removeInput(ArrayMutator.valueInputPrefix + (this.count - 1));
                }
                this.count--;
            };
            ArrayMutator.prototype.forEachInput = function (cb) {
                for (var i = 0; i < this.count; i++) {
                    cb(this.block.getInputTargetBlock(ArrayMutator.valueInputPrefix + i), i);
                }
            };
            ArrayMutator.countAttributeName = "count";
            ArrayMutator.entryTypeName = "entry";
            ArrayMutator.valueInputPrefix = "value_input_";
            return ArrayMutator;
        }(MutatorHelper));
        var DefaultInstanceMutator = (function (_super) {
            __extends(DefaultInstanceMutator, _super);
            function DefaultInstanceMutator() {
                _super.apply(this, arguments);
                this.showing = false;
            }
            DefaultInstanceMutator.prototype.getMutationType = function () {
                return MutatorTypes.DefaultInstanceMutator;
            };
            DefaultInstanceMutator.prototype.compileMutation = function (e, comments) {
                if (this.showing) {
                    var target = this.block.getInputTargetBlock(DefaultInstanceMutator.instanceInputName);
                    if (target) {
                        return blocks.compileExpression(e, target, comments);
                    }
                }
                return undefined;
            };
            DefaultInstanceMutator.prototype.mutationToDom = function () {
                var mutation = document.createElement("mutation");
                mutation.setAttribute(DefaultInstanceMutator.attributeName, this.showing ? "true" : "false");
                return mutation;
            };
            DefaultInstanceMutator.prototype.domToMutation = function (xmlElement) {
                var attribute = xmlElement.getAttribute(DefaultInstanceMutator.attributeName);
                if (attribute) {
                    this.updateShape(attribute === "true");
                }
                else {
                    this.updateShape(false);
                }
            };
            DefaultInstanceMutator.prototype.updateBlock = function (subBlocks) {
                this.updateShape(!!(subBlocks && subBlocks.length));
            };
            DefaultInstanceMutator.prototype.getSubBlockNames = function () {
                return [{
                        name: "Instance",
                        type: DefaultInstanceMutator.instanceSubBlockType
                    }];
            };
            DefaultInstanceMutator.prototype.getVisibleBlockTypes = function () {
                var result = [];
                if (this.showing) {
                    result.push(DefaultInstanceMutator.instanceSubBlockType);
                }
                return result;
            };
            DefaultInstanceMutator.prototype.updateShape = function (show) {
                if (this.showing !== show) {
                    if (show && !this.block.getInputTargetBlock(DefaultInstanceMutator.instanceInputName)) {
                        this.block.appendValueInput(DefaultInstanceMutator.instanceInputName);
                    }
                    else {
                        this.block.removeInput(DefaultInstanceMutator.instanceInputName);
                    }
                    this.showing = show;
                }
            };
            DefaultInstanceMutator.attributeName = "showing";
            DefaultInstanceMutator.instanceInputName = "__instance__";
            DefaultInstanceMutator.instanceSubBlockType = "instance";
            return DefaultInstanceMutator;
        }(MutatorHelper));
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
/// <reference path="../localtypings/blockly.d.ts" />
/// <reference path="../built/pxtlib.d.ts" />
/// <reference path="../typings/globals/jquery/index.d.ts" />
var pxt;
(function (pxt) {
    var blocks;
    (function (blocks_9) {
        var workspace;
        var blocklyDiv;
        function align(ws, emPixels) {
            var blocks = ws.getTopBlocks(true);
            var y = 0;
            blocks.forEach(function (block) {
                block.moveBy(0, y);
                y += block.getHeightWidth().height;
                y += emPixels; //buffer
            });
        }
        (function (BlockLayout) {
            BlockLayout[BlockLayout["Align"] = 1] = "Align";
            BlockLayout[BlockLayout["Shuffle"] = 2] = "Shuffle";
            BlockLayout[BlockLayout["Clean"] = 3] = "Clean";
            BlockLayout[BlockLayout["Flow"] = 4] = "Flow";
        })(blocks_9.BlockLayout || (blocks_9.BlockLayout = {}));
        var BlockLayout = blocks_9.BlockLayout;
        function render(blocksXml, options) {
            if (options === void 0) { options = { emPixels: 14, layout: BlockLayout.Flow }; }
            if (!workspace) {
                blocklyDiv = document.createElement("div");
                blocklyDiv.style.position = "absolute";
                blocklyDiv.style.top = "0";
                blocklyDiv.style.left = "0";
                blocklyDiv.style.width = "1px";
                blocklyDiv.style.height = "1px";
                document.body.appendChild(blocklyDiv);
                workspace = Blockly.inject(blocklyDiv, {
                    scrollbars: false,
                    readOnly: true,
                    zoom: false,
                    sound: false,
                    media: pxt.webConfig.pxtCdnUrl + "blockly/media/",
                    rtl: pxt.Util.userLanguageRtl()
                });
            }
            workspace.clear();
            try {
                var text = blocksXml || "<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>";
                var xml = Blockly.Xml.textToDom(text);
                Blockly.Xml.domToWorkspace(xml, workspace);
                switch (options.layout) {
                    case BlockLayout.Align:
                        pxt.blocks.layout.verticalAlign(workspace, options.emPixels);
                        break;
                    case BlockLayout.Shuffle:
                        pxt.blocks.layout.shuffle(workspace, options.aspectRatio);
                        break;
                    case BlockLayout.Flow:
                        pxt.blocks.layout.flow(workspace, options.aspectRatio);
                        break;
                    case BlockLayout.Clean:
                        if (workspace.cleanUp_)
                            workspace.cleanUp_();
                        break;
                }
                var metrics = workspace.getMetrics();
                var svg = $(blocklyDiv).find('svg').clone(true, true);
                svg.removeClass("blocklySvg").addClass('blocklyPreview');
                svg.find('.blocklyBlockCanvas,.blocklyBubbleCanvas')
                    .attr('transform', "translate(" + -metrics.contentLeft + ", " + -metrics.contentTop + ") scale(1)");
                svg.find('.blocklyMainBackground').remove();
                svg[0].setAttribute('viewBox', "0 0 " + metrics.contentWidth + " " + metrics.contentHeight);
                svg.removeAttr('width');
                svg.removeAttr('height');
                if (options.emPixels) {
                    svg[0].style.width = (metrics.contentWidth / options.emPixels) + 'em';
                    svg[0].style.height = (metrics.contentHeight / options.emPixels) + 'em';
                }
                return svg[0];
            }
            catch (e) {
                pxt.reportException(e);
                return undefined;
            }
        }
        blocks_9.render = render;
        function blocksMetrics(ws) {
            var blocks = ws.getTopBlocks(false);
            if (!blocks.length)
                return { width: 0, height: 0 };
            var m = undefined;
            blocks.forEach(function (b) {
                var r = b.getBoundingRectangle();
                if (!m)
                    m = { l: r.topLeft.x, r: r.bottomRight.x, t: r.topLeft.y, b: r.bottomRight.y };
                else {
                    m.l = Math.min(m.l, r.topLeft.x);
                    m.r = Math.max(m.r, r.bottomRight.y);
                    m.t = Math.min(m.t, r.topLeft.y);
                    m.b = Math.min(m.b, r.bottomRight.y);
                }
            });
            return {
                width: m.r - m.l,
                height: m.b - m.t
            };
        }
        blocks_9.blocksMetrics = blocksMetrics;
    })(blocks = pxt.blocks || (pxt.blocks = {}));
})(pxt || (pxt = {}));
var pxt;
(function (pxt) {
    var docs;
    (function (docs) {
        var codeCard;
        (function (codeCard) {
            var repeat = pxt.Util.repeatMap;
            function render(card, options) {
                if (options === void 0) { options = {}; }
                var repeat = pxt.Util.repeatMap;
                var color = card.color || "";
                if (!color) {
                    if (card.hardware && !card.software)
                        color = 'black';
                    else if (card.software && !card.hardware)
                        color = 'teal';
                }
                var url = card.url ? /^[^:]+:\/\//.test(card.url) ? card.url : ('/' + card.url.replace(/^\.?\/?/, ''))
                    : undefined;
                var link = !!url;
                var div = function (parent, cls, tag, text) {
                    if (tag === void 0) { tag = "div"; }
                    if (text === void 0) { text = ''; }
                    var d = document.createElement(tag);
                    if (cls)
                        d.className = cls;
                    if (parent)
                        parent.appendChild(d);
                    if (text)
                        d.appendChild(document.createTextNode(text + ''));
                    return d;
                };
                var a = function (parent, href, text, cls) {
                    var d = document.createElement('a');
                    d.className = cls;
                    d.href = href;
                    d.appendChild(document.createTextNode(text));
                    d.target = '_blank';
                    parent.appendChild(d);
                    return d;
                };
                var r = div(null, 'ui card ' + (card.color || '') + (link ? ' link' : ''), link ? "a" : "div");
                if (url)
                    r.href = url;
                if (!options.hideHeader && (card.header || card.blocks || card.javascript || card.hardware || card.software || card.any)) {
                    var h = div(r, "ui content " + (card.responsive ? " tall desktop only" : ""));
                    var hr_1 = div(h, "right floated meta");
                    if (card.any)
                        div(hr_1, "ui grey circular label tiny", "i", card.any > 0 ? card.any : "");
                    repeat(card.blocks, function (k) { return div(hr_1, "puzzle orange icon", "i"); });
                    repeat(card.javascript, function (k) { return div(hr_1, "align left blue icon", "i"); });
                    repeat(card.hardware, function (k) { return div(hr_1, "certificate black icon", "i"); });
                    repeat(card.software, function (k) { return div(hr_1, "square teal icon", "i"); });
                    if (card.header)
                        div(h, 'description', 'span', card.header);
                }
                var img = div(r, "ui image" + (card.responsive ? " tall landscape only" : ""));
                if (card.blocksXml) {
                    var svg = pxt.blocks.render(card.blocksXml);
                    if (!svg) {
                        console.error("failed to render blocks");
                        pxt.debug(card.blocksXml);
                    }
                    else {
                        var holder = div(img, '');
                        holder.setAttribute('style', 'width:100%; min-height:10em');
                        holder.appendChild(svg);
                    }
                }
                if (card.typeScript) {
                    var pre = document.createElement("pre");
                    pre.appendChild(document.createTextNode(card.typeScript));
                    img.appendChild(pre);
                }
                if (card.imageUrl) {
                    var image = document.createElement("img");
                    image.className = "ui image";
                    image.src = card.imageUrl;
                    img.appendChild(image);
                }
                var name = (options.shortName ? card.shortName : '') || card.name;
                if (name || card.description) {
                    var ct = div(r, "ui content");
                    if (name) {
                        if (url && !link)
                            a(ct, url, name, 'header');
                        else
                            div(ct, 'header', 'div', name);
                    }
                    if (card.time) {
                        var meta = div(ct, "ui meta");
                        var m = div(meta, "date", "span");
                        m.appendChild(document.createTextNode(pxt.Util.timeSince(card.time)));
                    }
                    if (card.description) {
                        var descr = div(ct, 'ui description');
                        descr.appendChild(document.createTextNode(card.description.split('.')[0] + '.'));
                    }
                }
                return r;
            }
            codeCard.render = render;
        })(codeCard = docs.codeCard || (docs.codeCard = {}));
    })(docs = pxt.docs || (pxt.docs = {}));
})(pxt || (pxt = {}));
