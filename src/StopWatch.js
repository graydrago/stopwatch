import { assert, assertNumber } from "./utils";

export class StopWatch {
    constructor(parent) {
        assert(parent instanceof HTMLElement, "[StopWatch.constructor] parent must be an instance of HTMLElement");

        this.__value = 0;
        this.__maxValue = 1000 * 60;
        this.__root = null;
        this.__arrow = null;
        this.__play = false;
        this.__size = 100;
        this.__halfSize = this.__size / 2;
        this.__timeStart = null;
        this.__handle_play = this.__handle_play.bind(this);

        this.__render();
        parent.appendChild(this.dom());
    }


    /**
     * Start incrementing counter and animation
     */
    play() {
        this.__play = true;
        requestAnimationFrame(this.__handle_play);
    }


    /**
     * Pause incrementing counter and animation
     */
    pause() {
        this.__play = false;
    }
    

    /**
     * Reset counter to zero and return the arrow to start position
     */
    stop() {
        this.pause();
        this.__value = 0;
        this.__update();
    }


    dom() {
        return this.__root;
    }


    /**
     * Set new value for the counter and update the view of the element
     * @param {number} v - milliseconds
     */
    set value(v) {
        assertNumber(v, "[StopWatch.constructor] \"value\"");
        if (v === this.__value) return;
        this.__value = v;
        this.__update();
    }


    /**
     * Get current value of the counter
     * @return {number} counter in milliseconds
     */
    get value() {
        return this.__value;
    }


    __render() {
        let size = 100;
        let hs = this.__halfSize;

        let root = this.__svg_create("svg");
        root.classList.add("stop-watch");
        this.__svg_set_attrs(root, { viewBox: `0 0 ${size} ${size}` });

        let clockFace = this.__svg_create("circle");
        this.__svg_set_attrs(clockFace, {
            cx: hs,
            cy: hs,
            r: hs - 3,
            fill: "none",
            stroke: "black",
            strokeWidth: "3",
        });

        let circle = this.__svg_create("circle");
        this.__svg_set_attrs(circle, {
            cx: hs,
            cy: hs,
            r: 3,
            fill: "black",
            stroke: "none",
            strokeWidth: "0",
        });

        let arrow = this.__svg_create("line");
        this.__svg_set_attrs(arrow, {
            x1: hs,
            y1: hs,
            x2: hs,
            y2: hs - hs * 0.8,
            strokeLinecap: "round",
            stroke: "black",
            strokeWidth: "3",
        });

        root.appendChild(clockFace);
        root.appendChild(arrow);
        root.appendChild(circle);

        this.__root = root;
        this.__arrow = arrow;
    }


    __handle_play(timestamp) {
        if (this.__timeStart === null) {
            this.__timeStart = timestamp;
            requestAnimationFrame(this.__handle_play);
            return;
        }

        if (this.__play) {
            this.__value += timestamp - this.__timeStart;
            this.__timeStart = timestamp;
            this.__update();
            requestAnimationFrame(this.__handle_play);
        } else {
            this.__timeStart = null;
        }
    }


    __update() {
        let angle = 360 * this.__value / this.__maxValue;
        let hs = this.__halfSize;
        this.__svg_set_attrs(this.__arrow, {
            transform: `rotate(${angle} ${hs} ${hs})`
        });
    }


    __svg_create(tag) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }


    __svg_set_attrs(elem, attrs) {
        for (let a in attrs) {
            let transformed = a;
            if (!StopWatch.SvgTransformExceptions.includes(a)) {
                transformed = a.replace(StopWatch.TestCapitalCase, (v) => `-${v.toLowerCase()}`);
            }
            elem.setAttribute(transformed, attrs[a]);
        }
    }
}

StopWatch.TestCapitalCase = /[A-Z]/;
StopWatch.SvgTransformExceptions = ["viewBox"];
