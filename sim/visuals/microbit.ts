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
            stroke:#fff;
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
            stroke:#ccc;
            stroke-width: 2px;
        }

        .sim-antenna {
            fill-opacity:0.0;
            stroke:#555;
            stroke-width: 4px;
        }

        .sim-text {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:14px;
        fill:#fff;
        pointer-events: none; user-select: none;
        }
        .sim-text.inverted {
            fill:#000;
        }

        .sim-text-pin {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:20px;
        fill:#3cb5b5;
        pointer-events: none;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 2px;
        }

        #rgbledcircle:hover {
            r:8px;
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
    const BOARD_SVG = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
         y="0px" viewBox="0 0 530 530" style="enable-background:new 0 0 530 530;" xml:space="preserve">
    <style type="text/css">
        .st0{fill:#044854;}
        .st1{fill:none;stroke:#989899;stroke-width:0.5;stroke-linecap:square;stroke-miterlimit:10;}
        .st2{fill:none;stroke:#FFFFFF;stroke-width:1.2;stroke-miterlimit:10;}
        .st3{fill:#FFFFFF;}
        .st4{fill:none;stroke:#FFFFFF;stroke-width:0.5;stroke-miterlimit:10;}
        .st5{fill:none;stroke:#FFFFFF;stroke-width:0.6;stroke-linecap:square;stroke-miterlimit:10;}
        .st6{fill:none;stroke:#FFFFFF;stroke-width:0.5;stroke-linecap:round;stroke-miterlimit:10;}
        .st7{fill:none;stroke:#FFFFFF;stroke-width:0.6;stroke-miterlimit:10;}
        .st8{fill:none;stroke:#FFFFFF;stroke-width:0.4;stroke-linecap:round;stroke-linejoin:round;}
        .st9{fill:none;stroke:#FFFFFF;stroke-width:0.6;stroke-linecap:round;stroke-linejoin:round;}
        .st10{fill:none;stroke:#000000;stroke-width:0.4;stroke-miterlimit:10;}
        .st11{fill:#F6C426;}
        .st12{fill:#E0DAAD;}
        .st13{fill:#BCCAC3;}
        .st14{opacity:0.7;fill:#48525F;enable-background:new    ;}
        .st15{fill:#42C9C9;}
        .st16{fill:#E6007D;}
        .st17{fill:#000000;}
    </style>
    <path id="mini_Board" class="st0" d="M552.7,263.2c-0.8-12-8.7-22.4-20.1-26.3c-4.4-1.5-8.8-3.3-13-5.4c-4.6-2.3-9.1-4.9-13.4-7.7
        l0,0c-16.3-10.7-35.1-27.7-55.4-54.2c-29.5-38.6-28.6-86.6-25.7-117c0.8-2.9,1.3-6,1.3-9c0-18.5-15-33.5-33.5-33.5
        c-10.3,0-20.1,4.8-26.4,12.9c-0.2,0.3-0.5,0.6-0.7,0.9C343.1,39.3,319.6,50,295,54.8c-1.9,0.4-3.7,0.8-5.6,1.2l0,0
        c-7.9,1.6-16,2.4-24.1,2.4c-7.8-0.1-15.6-0.9-23.2-2.4c-4.5-0.9-9-2-13.4-3.2h-0.4C202.7,45.3,178.8,32,161.9,21
        c-12.5-13.6-33.7-14.5-47.3-2c-6.9,6.3-10.8,15.3-10.8,24.6c0,0.4,0,0.7,0,1.1c0.2,1.9,0.5,3.8,0.7,5.7l0,0
        c5,47.1-3.1,84.5-21.1,114.5l-2,2.9c-21.2,31-53.8,51.9-77.5,64c-18.3,2.4-31.3,19.1-28.9,37.5C-23,285.6-9.3,298,7.2,298.5h1
        l2.7,1.4l0,0c10.9,5.8,21.2,12.5,31.1,19.9c11.7,10.2,22.5,21.4,32.4,33.4c2.9,3.4,5.6,6.9,8.1,10.6c0,0.1,0,0.1,0,0.2
        c18.3,29.8,26.7,67.1,21.9,114c-0.2,2.4-0.5,4.8-0.8,7.4c0,10.7,5.1,20.8,13.8,27.1l0,0c5.5,4,12.2,6.2,19,6.3
        c5.7-0.2,11.4-1.6,16.5-4h0.1c1.8-1,3.5-2.1,5.1-3.4c10.6-8.1,21.9-15.3,33.8-21.5c2-1,4.1-2,6.1-3c9.8-4.5,20.1-8,30.6-10.4
        c3-0.7,6-1.1,9.1-1.4c2.3-0.1,4.5-0.7,6.6-1.6c2.3-1,4.1-3,4.9-5.4c1.9-5.9,6.2-12.8,15.9-12.8c9.6,0,13.8,6.4,16,12.1
        c0.9,2.5,2.7,4.6,4.9,6.1c1.6,1,3.3,1.6,5.1,1.7c6.4,0.6,17.7,3,37.4,10.4h0.3c13.5,5.9,26.5,13.2,38.6,21.7
        c12,14,33.1,15.5,47.1,3.5c0.5-0.5,1-0.9,1.5-1.4c0.4-0.4,0.7-0.7,1.1-1.1c5.8-6.2,9-14.4,9-22.8c0-3.9-0.7-7.7-2-11.3
        c-2-20.2-1-40.6,2.9-60.5c0-0.1,0-0.3,0-0.4c3.9-16.5,10.3-32.4,18.8-47c21.9-37.4,55.3-56.7,78.5-68l4.3-2
        C542.7,289.5,553.7,278.6,552.7,263.2z M8.1,280.6c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7
        c0,0,0,0,0,0C23.8,273.6,16.8,280.6,8.1,280.6C8.1,280.6,8.1,280.6,8.1,280.6z M137.1,501.2c-8.7,0-15.7-7-15.7-15.7
        c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7l0,0C152.8,494.2,145.8,501.2,137.1,501.2C137.1,501.2,137.1,501.2,137.1,501.2z
         M137.1,59.3c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7C152.8,52.2,145.8,59.2,137.1,59.3L137.1,59.3z
         M392.7,501.2c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7v0C408.4,494.2,401.4,501.2,392.7,501.2
        C392.7,501.2,392.7,501.2,392.7,501.2z M392.7,59.3c-8.7,0-15.7-7-15.7-15.7s7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7v0
        C408.4,52.2,401.4,59.2,392.7,59.3L392.7,59.3z M521,280.6c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7
        C536.6,273.6,529.6,280.6,521,280.6L521,280.6z"/>
    <polyline class="st1" points="149.6,442.6 149.6,449.7 156.3,449.7 "/>
    <polyline class="st1" points="374.8,449.7 381.9,449.7 381.9,443 "/>
    <polyline class="st1" points="216.7,380.7 209.6,380.7 209.6,387.5 "/>
    <polyline class="st1" points="311.5,380.7 318.5,380.7 318.5,387.5 "/>
    <g id="Beschriftungen">
        <line id="_-" class="st2" x1="174.1" y1="49.3" x2="184" y2="49.3"/>
        <g id="_">
            <line class="st2" x1="343.7" y1="49.3" x2="353.6" y2="49.3"/>
            <line class="st2" x1="348.7" y1="44.3" x2="348.7" y2="54.2"/>
        </g>
        <path class="st3" d="M135,163.8h-2.7l-0.6,2h-1.5l2.8-8.8h1.3l2.8,8.8h-1.5L135,163.8z M132.6,162.6h2l-1-3.4L132.6,162.6z"/>
        <path class="st3" d="M143.9,162.5c0,0.5-0.1,1-0.2,1.5c-0.1,0.4-0.3,0.8-0.6,1.1c-0.2,0.3-0.5,0.5-0.9,0.7
            c-0.4,0.1-0.8,0.2-1.2,0.2c-0.4,0-0.8-0.1-1.2-0.2c-0.4-0.1-0.7-0.4-0.9-0.7c-0.3-0.3-0.4-0.7-0.6-1.1c-0.2-0.5-0.2-1-0.2-1.5v-2.1
            c0-0.5,0.1-1,0.2-1.5c0.1-0.4,0.3-0.8,0.6-1.1c0.2-0.3,0.5-0.5,0.9-0.7c0.4-0.1,0.8-0.2,1.2-0.2c0.4,0,0.8,0.1,1.2,0.2
            c0.4,0.1,0.7,0.4,0.9,0.7c0.3,0.3,0.4,0.7,0.6,1.1c0.1,0.5,0.2,1,0.2,1.5V162.5z M139.6,162l2.8-2.1c0-0.5-0.1-0.9-0.4-1.3
            c-0.3-0.3-0.6-0.5-1-0.4c-0.4,0-0.8,0.2-1.1,0.5c-0.3,0.5-0.4,1-0.3,1.5V162z M142.5,161l-2.8,2.1c0,1.2,0.5,1.7,1.4,1.7
            c0.9,0,1.4-0.7,1.4-2V161z"/>
        <path class="st3" d="M35.8,299.2c0,0.5-0.1,1-0.2,1.5c-0.1,0.4-0.3,0.8-0.6,1.1c-0.2,0.3-0.5,0.5-0.9,0.7c-0.4,0.2-0.8,0.2-1.2,0.2
            c-0.4,0-0.8-0.1-1.2-0.2c-0.3-0.1-0.7-0.4-0.9-0.7c-0.3-0.3-0.5-0.7-0.6-1.1c-0.1-0.5-0.2-1-0.2-1.5v-2.1c0-0.5,0.1-1,0.2-1.5
            c0.1-0.4,0.3-0.7,0.6-1.1c0.3-0.3,0.6-0.5,0.9-0.7c0.4-0.2,0.8-0.2,1.2-0.2c0.4,0,0.8,0.1,1.2,0.2c0.3,0.2,0.6,0.4,0.9,0.7
            c0.3,0.3,0.4,0.7,0.6,1.1c0.1,0.5,0.2,1,0.2,1.5V299.2z M31.6,298.7l2.8-2.1c0-0.5-0.1-0.9-0.4-1.3c-0.2-0.3-0.6-0.5-1-0.4
            c-0.4,0-0.8,0.2-1.1,0.5c-0.3,0.5-0.4,1-0.3,1.5V298.7z M34.4,297.8l-2.8,2.1c0,1.2,0.5,1.7,1.4,1.7s1.4-0.7,1.4-2V297.8z"/>
        <path class="st3" d="M180,482h-1.4v-7l-2.2,0.8v-1.3l3.6-1.3l0,0L180,482z"/>
        <path class="st3" d="M352,482h-5.9v-1l2.8-3.1c0.2-0.2,0.4-0.5,0.6-0.7c0.1-0.2,0.3-0.4,0.4-0.6c0.1-0.2,0.2-0.3,0.2-0.5
            c0-0.2,0-0.3,0-0.5c0-0.2,0-0.4,0-0.6c-0.1-0.2-0.2-0.3-0.3-0.4c-0.1-0.1-0.3-0.2-0.4-0.3c-0.2,0-0.4,0-0.5,0
            c-0.4,0-0.8,0.1-1.2,0.4c-0.3,0.3-0.4,0.8-0.4,1.2h-1.4c0-0.4,0.1-0.7,0.2-1.1c0.1-0.3,0.3-0.6,0.6-0.9c0.3-0.3,0.6-0.5,0.9-0.6
            c0.4-0.1,0.8-0.2,1.3-0.2c0.4,0,0.8,0.1,1.2,0.2c0.3,0.1,0.6,0.3,0.8,0.5c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.3,0.2,0.6,0.2,1
            c0,0.3,0,0.5-0.1,0.8c-0.1,0.3-0.2,0.5-0.4,0.8c-0.2,0.3-0.4,0.5-0.6,0.7c-0.2,0.3-0.5,0.5-0.7,0.8l-2,2.1h4.1L352,482z"/>
        <path class="st3" d="M493.7,297.5h0.8c0.2,0,0.5,0,0.7,0c0.2-0.1,0.3-0.2,0.5-0.3c0.1-0.1,0.2-0.3,0.3-0.4c0-0.2,0-0.4,0-0.5
            c0-0.4-0.1-0.7-0.3-1c-0.3-0.3-0.6-0.4-1-0.4c-0.2,0-0.4,0-0.5,0c-0.2,0.1-0.3,0.1-0.4,0.2c-0.1,0.1-0.2,0.3-0.3,0.4
            c0,0.2,0,0.3,0,0.5h-1.4c0-0.3,0.1-0.7,0.2-1c0.1-0.3,0.3-0.6,0.6-0.7c0.3-0.2,0.5-0.4,0.9-0.5c0.4-0.1,0.7-0.2,1.1-0.2
            c0.4,0,0.8,0.1,1.2,0.2c0.3,0.1,0.6,0.3,0.9,0.5c0.3,0.2,0.4,0.5,0.6,0.8c0.1,0.3,0.2,0.7,0.2,1.1c0,0.2,0,0.3,0,0.5
            c-0.1,0.2-0.1,0.4-0.2,0.5c-0.1,0.2-0.2,0.3-0.4,0.5c-0.2,0.2-0.3,0.3-0.6,0.4c0.2,0.1,0.5,0.2,0.7,0.4c0.2,0.1,0.3,0.3,0.4,0.5
            c0.1,0.2,0.2,0.4,0.2,0.6c0,0.2,0,0.4,0,0.6c0,0.4-0.1,0.8-0.2,1.1c-0.1,0.3-0.3,0.6-0.6,0.8c-0.3,0.2-0.6,0.4-0.9,0.5
            c-0.4,0.1-0.8,0.2-1.2,0.2c-0.4,0-0.7,0-1.1-0.1c-0.3-0.1-0.6-0.3-0.9-0.5c-0.3-0.2-0.5-0.5-0.6-0.8c-0.2-0.3-0.3-0.7-0.2-1.1h1.4
            c0,0.2,0,0.4,0.1,0.5c0,0.2,0.1,0.3,0.3,0.4c0.1,0.1,0.3,0.2,0.4,0.3c0.2,0,0.4,0,0.6,0c0.4,0,0.8-0.1,1.1-0.4
            c0.4-0.5,0.5-1.1,0.3-1.7c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.1-0.3-0.2-0.5-0.3c-0.2,0-0.5,0-0.7,0h-0.8L493.7,297.5z"/>
        <path class="st3" d="M386.3,163.8h-2.7l-0.6,2h-1.5l2.8-8.8h1.3l2.8,8.8H387L386.3,163.8z M383.9,162.6h2l-1-3.4L383.9,162.6z"/>
        <path class="st3" d="M393.6,165.9h-1.4v-7l-2.2,0.8v-1.3l3.6-1.3l0,0L393.6,165.9z"/>
    </g>
    <g id="Calliope_mini_Logo">
        <path class="st3" d="M126.3,352.3l-0.7-1.2l1-0.7c0-0.3,0-0.5,0-0.8c-0.1-0.3-0.2-0.6-0.3-0.9c-0.3-0.6-0.9-1.1-1.7-1.2
            c-0.8-0.1-1.6,0.1-2.3,0.6l-0.3,0.1c-0.7,0.4-1.3,1-1.6,1.7c-0.3,0.6-0.3,1.4,0.1,2c0.2,0.3,0.4,0.6,0.6,0.8
            c0.2,0.2,0.5,0.3,0.7,0.4l1.1-0.4l0.7,1.2l-1.6,0.9c-0.6-0.1-1.1-0.3-1.6-0.7c-0.5-0.4-0.9-0.9-1.3-1.5c-0.6-1-0.8-2.2-0.4-3.2
            c0.4-1.1,1.2-2.1,2.3-2.7l0.3-0.1c1-0.6,2.2-0.8,3.4-0.6c1.1,0.2,2.1,1,2.6,2c0.3,0.6,0.5,1.2,0.6,1.9c0.1,0.6,0,1.2-0.2,1.7
            L126.3,352.3z"/>
        <path class="st3" d="M122.8,356.1l0.4,0.5l8.3-1.5l0.9,1.6l-5.5,6.3l0.2,0.6l-1,0.5l-1.5-2.7l1-0.5l0.4,0.5l0.9-1l-1.5-2.6
            l-1.3,0.3l0.2,0.6l-1,0.5l-1.5-2.7L122.8,356.1z M126.8,357.6l1,1.8l2.3-2.4l0,0L126.8,357.6z"/>
        <path class="st3" d="M126.8,365.4l1-0.6l0.7,0.8l5.7-3.3l-0.3-0.9l0.9-0.5l0.5,0.8l0.9,1.6l0.5,0.8l-1,0.6l-0.7-0.8l-5.6,3.2
            l1.3,2.2l1-0.5l0.7,1.2l-2.2,1.3L126.8,365.4z"/>
        <path class="st3" d="M130.8,372.6l1-0.6l0.7,0.8l5.7-3.3l-0.3-0.9l0.9-0.5l0.5,0.8l0.9,1.6l0.5,0.8l-1,0.6l-0.7-0.8l-5.6,3.2
            l1.3,2.2l1-0.5l0.7,1.2l-2.2,1.3L130.8,372.6z"/>
        <path class="st3" d="M142,375.9l1-0.5l1.9,3.3l-1,0.6l-0.7-0.8l-5.7,3.2l0.3,1l-0.9,0.5l-1.9-3.3l1-0.6l0.7,0.8l5.7-3.3L142,375.9z
            "/>
        <path class="st3" d="M145.6,389.4c-1,0.6-2.3,0.9-3.4,0.6c-2.2-0.5-3.6-2.7-3.1-4.9c0-0.1,0.1-0.2,0.1-0.3c0.5-1.1,1.3-2.1,2.4-2.6
            l0,0c1-0.6,2.3-0.9,3.4-0.6c1.1,0.2,2.1,0.9,2.6,1.9c0.6,1,0.7,2.2,0.4,3.3C147.6,387.9,146.7,388.9,145.6,389.4z M144.9,387.7
            c0.7-0.4,1.3-1,1.7-1.7c0.5-1.1,0-2.4-1.1-2.8c-0.2-0.1-0.4-0.2-0.6-0.2c-0.8,0-1.7,0.2-2.4,0.7l0,0c-0.7,0.4-1.3,0.9-1.7,1.7
            c-0.3,0.6-0.3,1.3,0,1.9c0.3,0.6,0.9,1,1.6,1.1C143.2,388.4,144,388.2,144.9,387.7L144.9,387.7z"/>
        <path class="st3" d="M152.5,392.2c0.4,0.7,0.6,1.6,0.5,2.4c-0.4,1.6-2,2.5-3.5,2.1c0,0-0.1,0-0.1,0c-0.8-0.3-1.5-1-1.9-1.8
            l-0.8-1.4l-1.8,1l0.3,0.9l-1,0.5l-1.9-3.3l0.9-0.5l0.7,0.7l5.7-3.3l-0.3-0.9l1-0.6l0.5,0.8L152.5,392.2z M147.9,393l0.8,1.4
            c0.2,0.4,0.5,0.7,0.9,0.8c0.4,0.1,0.8,0,1.1-0.2c0.4-0.2,0.6-0.5,0.7-0.9c0.1-0.4,0-0.8-0.2-1.2l-0.8-1.4L147.9,393z"/>
        <path class="st3" d="M153.3,404l-1.5-2.7l-2.3,1.3l1.4,2.6l1-0.5l0.7,1.2l-2.2,1.2l-3.6-6.3l0.9-0.5l0.7,0.7l5.7-3.2l-0.3-0.9
            l1-0.6l0.5,0.8l3.1,5.4l-2.2,1.3l-0.7-1.2l0.9-0.6l-1.4-2.6l-2,1.1l1.5,2.7L153.3,404z"/>
        <path class="st3" d="M111.5,355.6l-1.4,0.9c0.6,0,1.3,0.1,1.9,0.4c0.6,0.3,1.1,0.8,1.4,1.4c0.3,0.5,0.5,1.1,0.5,1.6
            c0,0.5-0.2,1.1-0.6,1.4c0.6,0,1.1,0.2,1.6,0.5c0.5,0.3,1,0.8,1.3,1.3c0.2,0.4,0.4,0.9,0.5,1.4c0.1,0.4,0,0.9-0.2,1.3
            c-0.2,0.5-0.5,0.9-0.9,1.3c-0.5,0.5-1,0.9-1.6,1.2L104,374l-1.6-2.8l9.9-5.6c0.4-0.2,0.8-0.5,0.9-1c0.1-0.4,0-0.7-0.2-1.1
            c-0.1-0.3-0.4-0.5-0.7-0.7c-0.3-0.1-0.6-0.1-0.9,0l-10.5,5.8l-1.5-2.7l9.9-5.6c0.4-0.2,0.8-0.5,0.9-1c0.1-0.4,0-0.7-0.2-1
            c-0.2-0.3-0.4-0.5-0.7-0.7c-0.3-0.1-0.6-0.1-0.9,0l-10.5,6l-1.6-2.8l13.6-7.7L111.5,355.6z"/>
        <path class="st3" d="M119.6,370l4.1,7.2l-11.1,6.3l2.4,4l-2.4,1.4l-6.4-11.3l2.4-1.4l2.4,4.2l8.6-4.8l-2.4-4.2L119.6,370z
             M125.4,371.9c0.4-0.3,0.9-0.3,1.4-0.2c1,0.4,1.6,1.5,1.5,2.6c-0.3,1-1.4,1.6-2.4,1.3c-0.5-0.2-0.9-0.5-1.2-1
            c-0.3-0.4-0.4-1-0.3-1.5C124.6,372.6,124.9,372.2,125.4,371.9L125.4,371.9z"/>
        <path class="st3" d="M129.6,387.6l-1.8,1.3c0.9,0.1,1.8,0.4,2.6,0.9c0.8,0.5,1.4,1.2,1.9,2c0.4,0.6,0.6,1.3,0.8,2.1
            c0.2,0.7,0.2,1.4,0,2c-0.2,0.7-0.6,1.4-1.1,1.9c-0.7,0.7-1.4,1.3-2.2,1.7l-8.5,4.8l-1.7-3l8.4-4.8c0.5-0.3,0.9-0.6,1.3-1
            c0.3-0.3,0.5-0.7,0.6-1.1c0.1-0.4,0.1-0.8,0-1.1c-0.1-0.4-0.3-0.9-0.5-1.3c-0.3-0.6-0.8-1.1-1.4-1.5c-0.6-0.3-1.2-0.5-1.9-0.5
            l-9.6,5.5l-1.7-3l13.6-7.7L129.6,387.6z"/>
        <path class="st3" d="M136.6,400l4.1,7.2l-11.1,6.3l2.4,4l-2.4,1.4l-6.4-11.3l2.4-1.4l2.4,4.2l8.6-4.8l-2.4-4.2L136.6,400z
             M142.3,402c0.4-0.3,0.9-0.3,1.4-0.2c0.5,0.2,0.9,0.5,1.2,1c0.3,0.5,0.4,1,0.3,1.5c-0.1,0.5-0.5,0.9-0.9,1.1
            c-0.4,0.3-0.9,0.3-1.4,0.2c-0.5-0.2-0.9-0.5-1.2-1c-0.3-0.4-0.4-1-0.3-1.5C141.6,402.6,141.9,402.2,142.3,402L142.3,402z"/>
        <path class="st3" d="M124.8,330.7l-4-7.1c-0.6-1.1-2-1.4-3-0.8l-5.4,3c4.4-2.6,5.9-8.3,3.3-12.7c-2.5-4.3-8-5.8-12.4-3.4l-8.8,5
            l-12.6-5.5c-4.8-2.2-10.6-0.2-12.8,4.7c-1.4,2.9-1.2,6.4,0.5,9.1l1.1,1.9c6.4-2.6,14.8-4.8,21.4-3.7v0.2l4.8,8.5
            c-2.4,6.4-8.7,12.1-14.2,16.3l1.5,2.7c1.7,3,5.5,4.1,8.5,2.4c0,0,0,0,0,0l20.7-11.8l10.5-6c1.1-0.5,1.6-1.8,1.1-2.9
            C124.9,330.9,124.9,330.8,124.8,330.7z M109.1,313.2l3.8,6.7l-4.5,2.6c-1.5,0.8-3.3,0.3-4.1-1.1l-0.8-1.4c-0.8-1.4-0.4-3.3,1.1-4.1
            c0,0,0,0,0.1,0L109.1,313.2z M95.2,319l7.5-0.3l-4.8,5.1L95.2,319z M98,323.9l6.8-1.5l-4.1,6.3L98,323.9z M108.3,330.3l9.9-5.6
            l4.6,8l-9.9,5.6L108.3,330.3z"/>
        <path class="st3" d="M80.4,342.3c0.6-6,6.7-14.1,11.7-20.7l-17.7,10.1L80.4,342.3z"/>
    </g>
    <g id="rotation">
        <circle class="st4" cx="142.7" cy="272.1" r="11"/>
        <line class="st4" x1="139.6" y1="272.1" x2="146.1" y2="272.1"/>
        <line class="st4" x1="142.9" y1="275.4" x2="142.9" y2="268.9"/>
        <path class="st4" d="M142.7,264.3c4.3,0.1,7.8,3.6,7.7,7.9c0,1.5-0.5,2.9-1.3,4.1"/>
        <polygon class="st3" points="151.2,276.6 147.6,277.7 147.7,273.9 	"/>
    </g>
    <g id="cable_usb">
        <path id="cable" class="st4" d="M221.7,80.5v7.8c-0.1,2.8,2.2,5.1,4.9,5.1c0,0,0,0,0,0h1.3c2.7-0.1,4.9-2.4,4.8-5.1V70.8"/>
        <polygon class="st3" points="219.3,82.7 218.4,81.6 218.4,74.6 225.1,74.6 225.1,81.6 224.2,82.7 	"/>
        <path class="st3" d="M219.7,70.8v4h4.1v-4H219.7z M222.5,73.2h-1.6v-1.1h1.5L222.5,73.2z"/>
        <path class="st3" d="M220.6,80.7v4h2.4v-4H220.6z"/>
    </g>
    <g id="micro">
        <line class="st5" x1="360.7" y1="219.1" x2="360.7" y2="222.4"/>
        <path class="st6" d="M368.8,207v3c0,4.3-3.5,7.8-7.8,7.9l0,0c-4.3,0-7.9-3.5-7.9-7.9v-3"/>
        <path class="st6" d="M361,199.7L361,199.7c2.8,0,5.1,2.3,5.1,5.1v4.8c0,2.8-2.3,5.1-5.1,5.1h0c-2.8,0-5.1-2.3-5.1-5.1v-4.8
            C355.9,202,358.2,199.7,361,199.7z"/>
        <line class="st7" x1="355.7" y1="207.2" x2="366.3" y2="207.2"/>
    </g>
    <g id="cable_usb-2">
        <path id="cable-2" class="st4" d="M339.8,68.6h7.8c2.7,0,5,2.2,5,4.9v1.3c0,2.8-2.3,5-5.1,5c0,0,0,0,0,0H330"/>
        <polygon class="st3" points="334.9,68.6 340.7,65.2 340.7,72 	"/>
    </g>
    <g id="rgb">
        <circle class="st8" cx="290.9" cy="319.8" r="7.2"/>
        <circle class="st8" cx="300.1" cy="319.8" r="7.2"/>
        <circle class="st8" cx="295.5" cy="327" r="7.2"/>
        <circle class="st4" cx="290.9" cy="319.8" r="7.2"/>
        <circle class="st4" cx="300.1" cy="319.8" r="7.2"/>
        <circle class="st4" cx="295.5" cy="327" r="7.2"/>
    </g>
    <g id="sound">
        <polyline class="st9" points="386.1,289 386.1,272.1 399.1,270.5 399.1,287.1 	"/>
        <ellipse class="st4" cx="381.7" cy="289.2" rx="4.2" ry="3.3"/>
        <ellipse class="st4" cx="394.8" cy="287.6" rx="4.2" ry="3.3"/>
    </g>
    <g id="battery1">
        <polygon class="st10" points="393.9,396.9 393.9,394.1 395.3,394.1 395.3,391 393.9,391 393.9,388.3 373.4,388.3 373.4,389.5 
            372.9,389.5 372.9,395.6 373.4,395.6 373.4,396.9 	"/>
        <line class="st10" x1="391" y1="392.6" x2="387.5" y2="392.6"/>
        <line class="st10" x1="389.3" y1="390.8" x2="389.3" y2="394.3"/>
        <line class="st10" x1="377.5" y1="390.8" x2="377.5" y2="394.3"/>
        <polygon class="st4" points="393.9,396.9 393.9,394.1 395.3,394.1 395.3,391 393.9,391 393.9,388.3 373.4,388.3 373.4,389.5 
            372.9,389.5 372.9,395.6 373.4,395.6 373.4,396.9 	"/>
        <line class="st4" x1="391" y1="392.6" x2="387.5" y2="392.6"/>
        <line class="st4" x1="389.3" y1="390.8" x2="389.3" y2="394.3"/>
        <line class="st4" x1="377.5" y1="390.8" x2="377.5" y2="394.3"/>
    </g>
    <g id="component">
        <path class="st4" d="M207.9,351.6h13.7c0.7,0,1.3,0.6,1.3,1.3v13.6c0,0.7-0.6,1.3-1.3,1.3h-13.7c-0.7,0-1.3-0.6-1.3-1.3v-13.6
            C206.6,352.2,207.2,351.6,207.9,351.6z"/>
        <line class="st4" x1="211.1" y1="367.9" x2="211.1" y2="371.2"/>
        <line class="st4" x1="214.8" y1="368" x2="214.8" y2="371.2"/>
        <line class="st4" x1="218.5" y1="368" x2="218.5" y2="371.2"/>
        <line class="st4" x1="211.1" y1="348.2" x2="211.1" y2="351.4"/>
        <line class="st4" x1="214.8" y1="348.2" x2="214.8" y2="351.4"/>
        <line class="st4" x1="218.5" y1="348.2" x2="218.5" y2="351.4"/>
        <line class="st4" x1="226.3" y1="356" x2="223.1" y2="356"/>
        <line class="st4" x1="226.3" y1="359.7" x2="223.1" y2="359.7"/>
        <line class="st4" x1="226.3" y1="363.4" x2="223.1" y2="363.4"/>
        <line class="st4" x1="206.5" y1="356" x2="203.3" y2="356"/>
        <line class="st4" x1="206.5" y1="359.7" x2="203.3" y2="359.7"/>
        <line class="st4" x1="206.5" y1="363.3" x2="203.3" y2="363.3"/>
    </g>
    <g id="weitere_Boardelemente">
        <rect x="348.9" y="89" width="25" height="30.6"/>
        <rect x="163.4" y="366.3" class="st3" width="19.6" height="17.6"/>
        <rect x="324.2" y="309.8" class="st11" width="28.6" height="50.6"/>
    </g>
    <g id="Mikrofon">
        <rect id="MIC_Box" x="351.8" y="169.8" class="st11" width="19.4" height="11.5"/>
        <circle id="MIC" cx="356.9" cy="174.6" r="2"/>
    </g>
    <g id="Batterie">
        <path class="st12" d="M450.1,346.2L431,392.8c-0.7,1.8-2.7,2.6-4.5,1.9l-54.3-22.3l3.3-8.1l13.1,5.8l16.1-36.6l-14-6.2l3.3-7.9
            l54.3,22.3c1.7,0.7,2.6,2.7,1.9,4.4C450.2,346.1,450.1,346.2,450.1,346.2z"/>
    </g>
    <g id="Prozessor">
        <rect x="169.5" y="315.8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -181.7598 231.924)" width="39.2" height="39.2"/>
    </g>
    <g id="Lagesensor-2">
        <rect x="371" y="193.5" width="15.7" height="9.8"/>
    </g>
    <g id="Lagesensor">
        <rect x="130.6" y="241" width="24.1" height="14.1"/>
    </g>
    <g id="Lautsprecher">
        
            <rect id="SPKR" x="406.8" y="264.9" transform="matrix(0.3512 -0.9363 0.9363 0.3512 8.6765 597.592)" width="57.4" height="55.3"/>
    </g>
    <g id="USB">
        <path class="st13" d="M288.4,55.2V90c0,1.9-1.5,3.4-3.4,3.4h-41.1c-1.9,0-3.4-1.5-3.4-3.4v0V55.2h0.6c7.6,1.5,15.4,2.4,23.2,2.4
            C272.4,57.6,280.5,56.8,288.4,55.2L288.4,55.2z"/>
    </g>
    <g id="RESET">
        <path id="RESET_Box" class="st13" d="M313.7,64.8h7.8c1.9,0,3.4,1.5,3.4,3.4v13.2c0,1.9-1.5,3.4-3.4,3.4h-7.8
            c-1.9,0-3.4-1.5-3.4-3.4V68.2C310.3,66.3,311.8,64.8,313.7,64.8z"/>
        <path id="RESET_BUTTON" class="st3" d="M317.6,66.7L317.6,66.7c2.6,0,4.7,2.1,4.7,4.7v6.9c0,2.6-2.1,4.7-4.7,4.7h0
            c-2.6,0-4.7-2.1-4.7-4.7v-6.9C312.9,68.8,315,66.7,317.6,66.7z"/>
    </g>
    <g id="USB_READ-WRITE">
        <rect x="156" y="144.8" class="st3" width="5.7" height="10.2"/>
        <circle id="IF_LED" class="st13" cx="158.9" cy="149.9" r="2.3"/>
    </g>
    <g id="RGB_LED">
        <rect id="rgbled" x="252.9" y="310.9" class="st3" width="25.6" height="25.6"/>
        <circle id="rgbledcircle" class="st14" cx="265.7" cy="323.7" r="9.9"/>
    </g>
    <g id="Grove_A1_rechts">
        
            <rect id="G_A0_Box" x="410.1" y="125.9" transform="matrix(0.8253 -0.5647 0.5647 0.8253 -14.851 264.9654)" class="st3" width="21.4" height="61.3"/>
        <circle id="G_A1_GND" class="st13" cx="433.7" cy="174.6" r="2.3"/>
        <circle id="G_A1_VCC" class="st13" cx="425.1" cy="162.5" r="2.3"/>
        <circle id="G_A1_TX" class="st13" cx="416.5" cy="150.4" r="2.3"/>
        <circle id="G_A1_RX" class="st13" cx="407.9" cy="138.4" r="2.3"/>
    </g>
    <g id="Grove_A0_links">
        
            <rect id="G_A0_Box" x="79.5" y="145" transform="matrix(0.5647 -0.8253 0.8253 0.5647 -80.6002 158.6518)" class="st3" width="61.3" height="21.4"/>
        <circle id="G_A0_SCL" class="st13" cx="97.2" cy="173.8" r="2.3"/>
        <circle id="G_A0_SDA" class="st13" cx="105.8" cy="161.8" r="2.3"/>
        <circle id="G_A0_VCC" class="st13" cx="114.4" cy="149.7" r="2.3"/>
        <circle id="G_A0_GND" class="st13" cx="123" cy="137.6" r="2.3"/>
    </g>
    <g id="Button_A">
        <path class="st3" d="M93.8,238.5l35.8-13.5c14.3-6.7,0.4-36.2-13.9-29.4l-26.1,8.9L93.8,238.5z"/>
        
            <rect x="52.1" y="234.4" transform="matrix(0.458 -0.8889 0.8889 0.458 -179.261 180.5087)" class="st11" width="12.6" height="5.6"/>
        
            <rect x="76.9" y="247.2" transform="matrix(0.458 -0.8889 0.8889 0.458 -177.1878 209.4386)" class="st11" width="12.6" height="5.6"/>
        
            <rect x="74.8" y="190.2" transform="matrix(0.458 -0.8889 0.8889 0.458 -127.6192 176.7504)" class="st11" width="12.6" height="5.6"/>
        
            <rect x="99.6" y="203" transform="matrix(0.458 -0.8889 0.8889 0.458 -125.5228 205.6922)" class="st11" width="12.6" height="5.6"/>
        <path class="st0" d="M113.9,216l1.2-0.2l5.2-14.9h3.5l5.2,14.9l1.2,0.2v2.1h-5.8V216l1.2-0.2l-0.7-2.4h-5.6l-0.7,2.4l1.2,0.2v2.1
            h-5.8V216z M120.1,211h3.9l-1.9-6.1l0,0L120.1,211z"/>
        
            <rect id="BTN_A_BOX" x="63.1" y="202.8" transform="matrix(0.458 -0.8889 0.8889 0.458 -152.4652 192.5796)" class="st13" width="37.1" height="37.1"/>
        <circle cx="100.3" cy="215.5" r="3.8"/>
        <circle cx="76.2" cy="203" r="3.8"/>
        <circle cx="88.3" cy="239.7" r="3.8"/>
        <circle cx="64.2" cy="227.2" r="3.8"/>
        <circle id="BTN_A" class="st15" cx="82.2" cy="221.6" r="11.6"/>
    </g>
    <g id="Button_B">
        <path class="st3" d="M435.4,238.5L399.6,225c-14.3-6.7-0.4-36.2,13.9-29.4l26.1,8.9L435.4,238.5z"/>
        
            <rect x="467.9" y="230.9" transform="matrix(0.8889 -0.458 0.458 0.8889 -56.3827 241.9587)" class="st11" width="5.6" height="12.6"/>
        
            <rect x="443.1" y="243.7" transform="matrix(0.8889 -0.458 0.458 0.8889 -64.9822 232.0261)" class="st11" width="5.6" height="12.6"/>
        
            <rect x="445.2" y="186.7" transform="matrix(0.8889 -0.458 0.458 0.8889 -38.6651 226.6277)" class="st11" width="5.6" height="12.6"/>
        
            <rect x="420.4" y="199.5" transform="matrix(0.8889 -0.458 0.458 0.8889 -47.2486 216.6963)" class="st11" width="5.6" height="12.6"/>
        <path class="st0" d="M407,201c1.7-0.1,3.4,0.3,4.8,1.2c1.1,0.8,1.8,2.1,1.7,3.5c0,0.8-0.2,1.5-0.6,2.1c-0.5,0.6-1.1,1.1-1.8,1.4
            c1,0.1,1.8,0.7,2.4,1.4c0.5,0.7,0.8,1.5,0.8,2.4c0.1,1.4-0.5,2.8-1.6,3.7c-1.3,0.9-3,1.4-4.6,1.3h-8.4v-2.1l1.8-0.4v-12.3l-1.8-0.3
            v-2.1h7.6L407,201z M404.6,208.2h2.4c0.7,0.1,1.5-0.1,2.1-0.6c0.5-0.4,0.8-1,0.7-1.6c0.1-0.7-0.2-1.3-0.7-1.8
            c-0.7-0.4-1.4-0.6-2.2-0.6h-2.4L404.6,208.2z M404.6,210.6v4.8h3.2c0.7,0,1.5-0.2,2.1-0.6c0.5-0.4,0.8-1.1,0.7-1.8
            c0-0.7-0.2-1.4-0.6-1.9c-0.5-0.5-1.2-0.7-1.9-0.7L404.6,210.6z"/>
        
            <rect id="BTN_B_BOX" x="428.9" y="202.8" transform="matrix(0.8889 -0.458 0.458 0.8889 -51.6828 229.5172)" class="st13" width="37.1" height="37.1"/>
        <circle cx="428.9" cy="215.5" r="3.8"/>
        <circle cx="452.9" cy="203" r="3.8"/>
        <circle cx="440.9" cy="239.7" r="3.8"/>
        <circle cx="464.9" cy="227.2" r="3.8"/>
        
            <ellipse id="BTN_B" transform="matrix(0.1602 -0.9871 0.9871 0.1602 157.3084 627.5282)" class="st16" cx="447.4" cy="221.3" rx="11.6" ry="11.6"/>
    </g>

    <rect id="LED_0_0" x="210.7" y="146.2" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_1_0" x="236.8" y="146.2" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_2_0" x="262.7" y="146.2" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_3_0" x="288.7" y="146.2" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_4_0" x="314.6" y="146.2" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_0_1" x="210.7" y="171.7" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_1_1" x="236.8" y="171.7" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_2_1" x="262.7" y="171.7" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_3_1" x="288.7" y="171.7" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_4_1" x="314.6" y="171.7" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_0_2" x="210.7" y="197" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_1_2" x="236.8" y="197" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_2_2" x="262.7" y="197" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_3_2" x="288.7" y="197" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_4_2" x="314.6" y="197" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_0_3" x="210.7" y="222.5" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_1_3" x="236.8" y="222.5" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_2_3" x="262.7" y="222.5" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_3_3" x="288.7" y="222.5" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_4_3" x="314.6" y="222.5" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_0_4" x="210.7" y="247.8" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_1_4" x="236.8" y="247.8" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_2_4" x="262.7" y="247.8" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_3_4" x="288.7" y="247.8" class="st6" width="5.1" height="12.9"/>
    <rect id="LED_4_4" x="314.6" y="247.8" class="st6" width="5.1" height="12.9"/>

    <g id="PINS">
        <g id="C_GND4">
            <circle class="st11" cx="370.8" cy="422" r="5.2"/>
            <circle class="st17" cx="370.8" cy="422" r="2.2"/>
        </g>
        <g id="C_VCC2">
            <circle class="st11" cx="370.8" cy="439.6" r="5.2"/>
            <circle class="st17" cx="370.8" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P19">
            <circle class="st11" cx="353.3" cy="422" r="5.2"/>
            <circle class="st17" cx="353.3" cy="422" r="2.2"/>
        </g>
        <g id="C_P18">
            <circle class="st11" cx="353.3" cy="439.6" r="5.2"/>
            <circle class="st17" cx="353.3" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P17">
            <circle class="st11" cx="335.7" cy="422" r="5.2"/>
            <circle class="st17" cx="335.7" cy="422" r="2.2"/>
        </g>
        <g id="C_P16">
            <circle class="st11" cx="335.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="335.7" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P15">
            <circle class="st11" cx="318.2" cy="422" r="5.2"/>
            <circle class="st17" cx="318.2" cy="422" r="2.2"/>
        </g>
        <g id="C_P14">
            <circle class="st11" cx="318.2" cy="439.6" r="5.2"/>
            <circle class="st17" cx="318.2" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P13">
            <circle class="st11" cx="300.7" cy="422" r="5.2"/>
            <circle class="st17" cx="300.7" cy="422" r="2.2"/>
        </g>
        <g id="C_P12">
            <circle class="st11" cx="300.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="300.7" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P11">
            <circle class="st11" cx="283.2" cy="422" r="5.2"/>
            <circle class="st17" cx="283.2" cy="422" r="2.2"/>
        </g>
        <g id="C_P10">
            <circle class="st11" cx="283.2" cy="439.6" r="5.2"/>
            <circle class="st17" cx="283.2" cy="439.6" r="2.2"/>
        </g>
        <g id="C_GND3">
            <circle class="st11" cx="265.7" cy="422" r="5.2"/>
            <circle class="st17" cx="265.7" cy="422" r="2.2"/>
        </g>
        <g id="C_GND2">
            <circle class="st11" cx="265.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="265.7" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P9">
            <circle class="st11" cx="248.2" cy="422" r="5.2"/>
            <circle class="st17" cx="248.2" cy="422" r="2.2"/>
        </g>
        <g id="C_P8">
            <circle class="st11" cx="248.2" cy="439.6" r="5.2"/>
            <circle class="st17" cx="248.2" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P7">
            <circle class="st11" cx="230.7" cy="422" r="5.2"/>
            <circle class="st17" cx="230.7" cy="422" r="2.2"/>
        </g>
        <g id="C_P6">
            <circle class="st11" cx="230.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="230.7" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P5">
            <circle class="st11" cx="213.2" cy="422" r="5.2"/>
            <circle class="st17" cx="213.2" cy="422" r="2.2"/>
        </g>
        <g id="C_P4">
            <circle class="st11" cx="213.2" cy="439.6" r="5.2"/>
            <circle class="st17" cx="213.2" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P3">
            <circle class="st11" cx="195.7" cy="422" r="5.2"/>
            <circle class="st17" cx="195.7" cy="422" r="2.2"/>
        </g>
        <g id="C_P2">
            <circle class="st11" cx="195.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="195.7" cy="439.6" r="2.2"/>
        </g>
        <g id="C_P1">
            <circle class="st11" cx="178.2" cy="422" r="5.2"/>
            <circle class="st17" cx="178.2" cy="422" r="2.2"/>
        </g>
        <g id="C_P0">
            <circle class="st11" cx="178.2" cy="439.6" r="5.2"/>
            <circle class="st17" cx="178.2" cy="439.6" r="2.2"/>
        </g>
        <g id="C_VCC1">
            <circle class="st11" cx="160.7" cy="422" r="5.2"/>
            <circle class="st17" cx="160.7" cy="422" r="2.2"/>
        </g>
        <g id="C_GND1">
            <circle class="st11" cx="160.7" cy="439.6" r="5.2"/>
            <circle class="st17" cx="160.7" cy="439.6" r="2.2"/>
        </g>
    </g>
    <g id="Motor_Pins">
        <g id="M_GND3">
            <circle class="st11" cx="304.8" cy="389.3" r="5.2"/>
            <circle class="st17" cx="304.8" cy="389.3" r="2.2"/>
        </g>
        <g id="M_VM">
            <circle class="st11" cx="288.4" cy="391.7" r="5.2"/>
            <circle class="st17" cx="288.4" cy="391.7" r="2.2"/>
        </g>
        <g id="M_GND2">
            <circle class="st11" cx="272.1" cy="389.3" r="5.2"/>
            <circle class="st17" cx="272.1" cy="389.3" r="2.2"/>
        </g>
        <g id="M_OUT2">
            <circle class="st11" cx="255.8" cy="391.7" r="5.2"/>
            <circle class="st17" cx="255.8" cy="391.7" r="2.2"/>
        </g>
        <g id="M_OUT1">
            <circle class="st11" cx="239.4" cy="389.3" r="5.2"/>
            <circle class="st17" cx="239.4" cy="389.3" r="2.2"/>
        </g>
        <g id="M_GND1">
            <circle class="st11" cx="223.1" cy="391.7" r="5.2"/>
            <circle class="st17" cx="223.1" cy="391.7" r="2.2"/>
        </g>
    </g>
    <g id="EDGE_PINS">
        <path id="EDGE_P3" class="st11" d="M520.9,231.4c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5
            c18.5,0,33.5-14.9,33.5-33.4c0.1-18.5-14.9-33.5-33.3-33.6C521,231.4,521,231.4,520.9,231.4z M520.9,280.6c-8.7,0-15.7-7-15.7-15.7
            c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7c0,0,0,0,0,0C536.6,273.5,529.6,280.6,520.9,280.6
            C520.9,280.6,520.9,280.6,520.9,280.6L520.9,280.6z"/>
        <path id="EDGE_P2" class="st11" d="M392.7,452c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5c18.5,0,33.5-15,33.5-33.5
            c0,0,0,0,0,0C426.2,467,411.2,452,392.7,452C392.7,452,392.7,452,392.7,452z M392.7,501.1c-8.7,0-15.7-7-15.7-15.7
            c0-8.7,7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7c0,0,0,0,0,0c0.1,8.7-6.9,15.7-15.6,15.8C392.8,501.2,392.7,501.2,392.7,501.1
            L392.7,501.1z"/>
        <path id="EDGE_P1" class="st11" d="M137.1,452c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5c18.5,0,33.5-15,33.5-33.5
            c0,0,0,0,0,0C170.6,467,155.6,452,137.1,452L137.1,452z M137.1,501.1c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7
            c8.7,0,15.7,7,15.7,15.7c0,0,0,0,0,0c0.1,8.7-6.9,15.7-15.6,15.8C137.2,501.2,137.1,501.2,137.1,501.1L137.1,501.1z"/>
        <path id="EDGE_P0" class="st11" d="M8.1,231.4c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5c18.4,0,33.4-14.9,33.5-33.4
            c0.1-18.5-14.9-33.5-33.3-33.6C8.2,231.4,8.1,231.4,8.1,231.4z M8.1,280.6c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7
            c8.7,0,15.7,7,15.7,15.7c0,0,0,0,0,0C23.8,273.5,16.8,280.6,8.1,280.6C8.1,280.6,8.1,280.6,8.1,280.6L8.1,280.6z"/>
        <path id="EDGE_VCC" class="st11" d="M392.7,10c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5c18.5,0,33.5-15,33.5-33.5
            c0,0,0,0,0,0C426.2,25,411.2,10,392.7,10L392.7,10z M392.7,59.2c-8.7,0-15.7-7-15.7-15.7s7-15.7,15.7-15.7c8.7,0,15.7,7,15.7,15.7
            c0,0,0,0,0,0C408.4,52.1,401.4,59.2,392.7,59.2C392.7,59.2,392.7,59.2,392.7,59.2z"/>
        <path id="EDGE_GND" class="st11" d="M137.1,10c-18.5,0-33.5,15-33.5,33.5c0,18.5,15,33.5,33.5,33.5c18.5,0,33.5-15,33.5-33.5
            c0,0,0,0,0,0C170.6,25,155.6,10,137.1,10L137.1,10z M137.1,59.2c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7
            c8.7,0,15.7,7,15.7,15.7c0,0,0,0,0,0C152.8,52.1,145.8,59.2,137.1,59.2C137.1,59.2,137.1,59.2,137.1,59.2z"/>
    </g>
    </svg>`;

    const pinNames = [
        "BTN_A", "BTN_B",
        "EDGE_P0", "EDGE_P1", "EDGE_P2", "EDGE_P3", "EDGE_GND", "EDGE_VCC",
        "C_GND1", "C_GND2", "C_GND3", "C_GND4", "C_VCC1", "C_VCC2",
        "C_P0", "C_P2", "C_P4", "C_P6", "C_P8", "C_P10", "C_P12", "C_P14", "C_P16", "C_P18",
        "C_P1", "C_P3", "C_P5", "C_P7", "C_P9", "C_P11", "C_P13", "C_P15", "C_P17", "C_P19",
        "M_GND1", "M_GND2", "M_GND3", "M_OUT1", "M_OUT2", "M_VM",
        "G_A0_GND", "G_A0_VCC", "G_A0_SDA", "G_A0_SCL",
        "G_A1_RX", "G_A1_TX", "G_A1_VCC", "G_A1_GND"
    ];
    const pinTitles = [
        "Button A", "Button B",
        "P0", "P1, ANALOG IN", "P2, ANALOG IN", "P3", "GND", "+3v3",
        "GND", "GND", "GND", "GND", "+3v3", "+3v3",
        "C0", "C2", "C4", "C6", "C8", "C10", "C12", "C14", "C16", "C18",
        "C1", "C3", "C5", "C7", "C9", "C11", "C13", "C15", "C17", "C19",
        "GND", "GND", "GND", "MOTOR B", "MOTOR A", "MOTOR VM",
        "GND", "+3v3", "C18, I2C - SDA", "C19, I2C - SCL",
        "C16, Serial - RX", "C17, Serial - TX", "+3v3", "GND"
    ];
    const MB_WIDTH = 530;
    const MB_HEIGHT = 530;
    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUps: string[];
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
            pin: "#EFDA48",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff5555",
            ledOff: "#e0e1e2",
            buttonOuter: "#979797",
            buttonUps: ["#186A8C", "#D82E50"],
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
        private pinTexts:{ [key: number]: SVGTextElement };
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
        private rgbLed: SVGElement;
        private pinNmToCoord: Map<Coord> = {
			"EXT_PWR": [
				92.30997467041016,
				-42.92474937438965
			],
			"SPKR": [
				106.44635391235352,
				-16.370698928833008
			],
			"BTN_A": [
				93.8138427734375,
				56.631452560424805
			],
			"BTN_B": [
				204.92835235595703,
				56.631452560424805
			],
			// rings
			"EDGE_P0": [
				56.002254486083984,
				95.43130111694336
			],
			"EDGE_P1": [
				103.00893783569336,
				175.82388305664062
			],
			"EDGE_P2": [
				195.90512084960938,
				175.3082733154297
			],
			"EDGE_P3": [
				241.79466247558594,
				95.3883285522461
			],
			"EDGE_GND": [
				103.00893783569336,
				14.86682915687561
			],
			"EDGE_VCC": [
				195.64733123779297,
				14.86682915687561
			],
			"C_GND1": [
				113.1493148803711,
				159.83989715576172
			],
			"C_GND2": [
				150.27342987060547,
				159.83989715576172
			],
			"C_GND3": [
				150.27342987060547,
				153.5666275024414
			],
			"C_GND4": [
				187.39752960205078,
				153.5666275024414
			],
			"C_VCC1": [
				187.39752960205078,
				159.83989715576172
			],
			"C_VCC2": [
				113.1922836303711,
				153.5666275024414
			],
			"C_P0": [
				119.33667373657227,
				159.83989715576172
			],			
			"C_P2": [
				125.52401733398438,
				159.83989715576172
			],
			"C_P4": [
				131.71136474609375,
				159.83989715576172
			],
			"C_P6": [
				137.89871978759766,
				159.83989715576172
			],
			"C_P8": [
				144.08607482910156,
				159.83989715576172
			],
			"C_P10": [
				156.46077728271484,
				159.83989715576172
			],
			"C_P12": [
				162.64812469482422,
				159.83989715576172
			],
			"C_P14": [
				168.83545684814453,
				159.83989715576172
			],
			"C_P16": [
				175.02281951904297,
				159.83989715576172
			],
			"C_P20": [
				181.2101821899414,
				159.83989715576172
			],
			"C_P1": [
				119.379638671875,
				153.5666275024414
			],
			"C_P3": [
				125.56698226928711,
				153.5666275024414
			],
			"C_P5": [
				131.71136474609375,
				153.5666275024414
			],
			"C_P7": [
				137.89871978759766,
				153.5666275024414
			],
			"C_P9": [
				144.08607482910156,
				153.5666275024414
			],
			"C_P11": [
				156.46077728271484,
				153.5666275024414
			],
			"C_P13": [
				162.64812469482422,
				153.5666275024414
			],
			"C_P15": [
				168.83545684814453,
				153.5666275024414
			],
			"C_P21": [
				175.02281951904297,
				153.5666275024414
			],
			"C_P19": [
				181.2101821899414,
				153.5666275024414
			],
			"M_GND1": [
				137.89871978759766,
				141.70752716064453
			],
			"M_GND2": [
				156.46077728271484,
				141.70752716064453
            ],
            "M_GND3": [
				168.83547210693360,
				141.70752716064453
			],
			"M_OUT1": [
				144.08607482910156,
				141.70752716064453
			],
			"M_OUT2": [
				150.27342987060547,
				141.70752716064453
			],
			"M_VM": [
				162.64812469482422,
				141.70752716064453
			],
			"G_A0_GND": [
				82.47036743164062,
				72.35763549804688
			],
			"G_A0_VCC": [
				78.34546279907227,
				76.3106689453125
			],
			"G_A0_SDA": [
				74.65023803710938,
				80.00588989257812
			],
			"G_A0_SCL": [
				70.43940734863281,
				84.21672821044922
			],
			"G_A1_RX": [
				216.52963256835938,
				71.4982795715332
			],
			"G_A1_TX": [
				220.65453338623047,
				75.53724670410156
			],
			"G_A1_VCC": [
				224.34976959228516,
				79.23247528076172
			],
			"G_A1_GND": [
				228.56060028076172,
				83.44330978393555
			]
		};

        constructor(public props: IBoardProps) {
            this.buildDom();
            if (props && props.wireframe)
                U.addClass(this.element, "sim-wireframe");

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
            return 10;
        }

        private recordPinCoords() {
			pinNames.forEach((nm, i) => {
				const p = this.pins[i];
				const r = p.getBoundingClientRect();
                this.pinNmToCoord[nm] = [r.left + r.width / 2, r.top + r.height / 2];
            });
			console.log(JSON.stringify(this.pinNmToCoord, null, 2))
        }

        private updateTheme() {
            let theme = this.props.theme;

            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
            svg.fill(this.buttons[0], theme.buttonUps[0]);
            svg.fill(this.buttons[1], theme.buttonUps[1]);
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
                svg.fill(this.buttons[index], btn.pressed ? (btn.virtual ? theme.virtualButtonDown : theme.buttonDown) : (btn.virtual ? theme.virtualButtonUp : theme.buttonUps[index]));
            });

            if (state.ledMatrixState.disabled) {
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    sel.style.opacity = "0";
                })
            } else {
                const bw = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw
                const img = state.ledMatrixState.image;
                const br = state.ledMatrixState.brigthness != undefined ? state.ledMatrixState.brigthness : 255;
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    let imgbr = bw ? (img.data[i] > 0 ? br : 0) : img.data[i];
                    // correct brightness
                    const opacity = imgbr > 0 ? imgbr / 255 * 155 + 100 : 0;
                    const transfrom = imgbr > 0 ? imgbr / 255 * 0.4 + 0.6 : 0;
                    sel.style.opacity = (opacity / 255) + "";
                    if (transfrom > 0) {
                        (sel.style as any).transformBox = 'fill-box';
                        sel.style.transformOrigin = '50% 50%';
                        sel.style.transform = `scale(${transfrom})`;
                    }
                })
            }
            this.updatePins();
            this.updateTilt();
            this.updateHeading();
            this.updateLightLevel();
            this.updateTemperature();
            this.updateButtonAB();
            this.updateGestures();
            this.updateRgbLed();
			this.updateSpeaker();

            if (!runtime || runtime.dead) U.addClass(this.element, "grayscale");
            else U.removeClass(this.element, "grayscale");
        }

        private updateRgbLed() {
            let state = this.board;
            if (state.rgbLedState) {
                if (!this.rgbLed)
                    this.rgbLed = this.element.getElementById("rgbledcircle") as SVGCircleElement;
                const c = state.rgbLedState;
                const b = c & 0xFF;
                const g = (c >> 8) & 0xFF;
                const r = (c >> 16) & 0xFF;
                const w = (c >> 24) & 0xFF;
                const ch = `rgba(${r}, ${g}, ${b}, 1)`;
                svg.fill(this.rgbLed, ch);
            } else if (this.rgbLed) {
                svg.fill(this.rgbLed, 'white');
            }
        }

		private updateSpeaker() {
            let state = this.board;
			if (state.speakerState.frequency) {
				
			} else {

			}			
		}

        private updateGestures() {
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeButton) {
                let shake = this.mkBtn(26, MB_HEIGHT - 45);
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
                let shakeText = svg.child(shake.outer, "text", { x: 15, y: MB_HEIGHT - 10, class: "sim-text inverted" }) as SVGTextElement;
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
            let text = this.pinTexts[pin.id];
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
				const ty = MB_HEIGHT - 180;
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer",
                    x: 28,
                    y: ty,
                    width: 10,
                    height: 80,
                    rx: 5, ry: 5,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", {
					class: 'sim-text',
					x: 48, y: ty + 78
				}) as SVGTextElement;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (cur.y - ty - 5) / 70))
                        state.thermometerState.temperature = Math.floor(tmax - t * (tmax - tmin));
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
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 160.8, cy: 150.9, r: 4 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private lastAntennaFlash: number = 0;
        public flashAntenna() {
            if (!this.antenna) {
                let ax = 480;
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
				const cx = 30;
                const cy = 45;
                const r = 20;
                this.lightLevelButton = svg.child(this.g, "circle", {
                    cx: `${cx}px`, cy: `${cy}px`, r: `${r}px`,
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
                this.lightLevelText = svg.child(this.g, "text", { x: cx - r - 7, y: cy + r + 8, text: '', class: 'sim-text inverted' }) as SVGTextElement;
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

            const x = state.accelerometerState.accelerometer.getX();
            const y = -state.accelerometerState.accelerometer.getY();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);

            this.element.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            
            this.element.style.perspectiveOrigin = "50% 50% 50%";
            this.element.style.perspective = "30em";
        }

        private buildDom() {
			this.element = new DOMParser().parseFromString(BOARD_SVG, "image/svg+xml").querySelector("svg") as SVGSVGElement;
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
            const left = Number(this.element.getElementById("LED_0_0").getAttribute("x"));
            const top = Number(this.element.getElementById("LED_0_0").getAttribute("y"));
            const ledoffw = Number(this.element.getElementById("LED_1_0").getAttribute("x"))-left;
            const ledoffh = Number(this.element.getElementById("LED_0_1").getAttribute("y"))-top;
            const ledw = 5.1;
            const ledh = 12.9;
            for (let i = 0; i < 5; ++i) {
                let ledtop = i * ledoffh + top;
                for (let j = 0; j < 5; ++j) {
                    let ledleft = j * ledoffw + left;
                    let k = i * 5 + j;
                    this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: ledw, height: ledh }));
                    this.leds.push(svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 1, y: ledtop - 1, width: ledw + 2, height: ledh + 2, rx: 2, ry: 2, title: `(${j},${i})` }));
                }
            }

            // https://www.microbit.co.uk/device/pins
            // P0, P1, P2
            this.pins = pinNames.map(n => {
				let p = this.element.getElementById(n) as SVGElement;
				if(!p) console.log("missing "+n);
				U.addClass(p, "sim-pin");
				return p;
			});

            this.pins.forEach((p, i) => svg.hydrate(p, { title: pinTitles[i] }));

            this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            })

            this.pinTexts = { 
                [DigitalPin.P0]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: -20, y: 340 }),
                [DigitalPin.P1]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: 50, y: 495 }),
                [DigitalPin.P2]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: 450, y: 495 }),
                [DigitalPin.P3]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: 500, y: 340 })
            }

            // BTN A, B
            const btnids = ["BTN_A", "BTN_B"];
            this.buttonsOuter = btnids.map(n => this.element.getElementById(n + "_BOX") as SVGElement);
            this.buttonsOuter.forEach(b => U.addClass(b, "sim-button-outer"));
            this.buttons = btnids.map(n => this.element.getElementById(n) as SVGElement);
            this.buttons.forEach(b => U.addClass(b, "sim-button"));

            // BTN A+B
            const outerBtn = (left: number, top: number) => {
                const button = this.mkBtn(left, top);
                this.buttonsOuter.push(button.outer);
                this.buttons.push(button.inner);

                return button;
            }

            let ab = outerBtn(69, MB_HEIGHT - 45);
            let abtext = svg.child(ab.outer, "text", { x: 67, y: MB_HEIGHT - 10, class: "sim-text inverted" }) as SVGTextElement;
            abtext.textContent = "A+B";
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
            (<any>this.buttons[2]).style.visibility = "hidden";
        }

        private mkBtn(left: number, top: number): { outer: SVGElement, inner: SVGElement } {
            const btnr = 2;
            const btnw = 20;
            const btnn = 1.6;
            const btnnm = 2;
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

                let bbox = this.element.getBoundingClientRect();
                let ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                let ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);

                let x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                let y = - Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
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
                        U.addClass(svgpin, "touched");
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
                        U.removeClass(svgpin, "touched");
                        this.updatePin(pin, index);
                        return false;
                    });
            })
            this.pins.slice(0, 2).forEach((btn, index) => {
                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = true;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                }));
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
                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = true;
                    svg.fill(this.buttons[index], this.props.theme.buttonDown);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                }));
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUps[index]);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUps[index]);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
            })
            pointerEvents.down.forEach(evid => this.buttonsOuter[2].addEventListener(evid, ev => {
                let state = this.board;
                stateButtons[0].pressed = true;
                stateButtons[1].pressed = true;
                stateButtons[2].pressed = true;
                svg.fill(this.buttons[0], this.props.theme.buttonDown);
                svg.fill(this.buttons[1], this.props.theme.buttonDown);
                svg.fill(this.buttons[2], this.props.theme.buttonDown);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
            }));
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUps[0]);
                svg.fill(this.buttons[1], this.props.theme.buttonUps[1]);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUps[0]);
                svg.fill(this.buttons[1], this.props.theme.buttonUps[1]);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);

                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            })
        }
    }
}