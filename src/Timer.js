import { assert, assertNumber } from "./utils";

export class Timer {
    constructor(config = {}) {
        this.__value = config.value || 0;
        this.__maxValue = config.maxValue || 60;
        this.__root = null;
        this.__arrow = null;
        this.__play = false;
        this.__size = 100;
        this.__halfSize = this.__size / 2;
        this.__stopInterval = 1000;
        assertNumber(this.__value, "[Timer.constructor] \"value\"");
        assertNumber(this.__maxValue, "[Timer.constructor] \"value\"");
    }


    play() {
        let time_buffer = 0;
        let time_start = null;
        let hs = this.__halfSize;
        let anim = (timestamp) => {
            if (time_start === null) {
                time_start = timestamp;
                requestAnimationFrame(anim);
                return;
            }
            if (this.__play) {
                time_buffer += timestamp - time_start;
                time_start = timestamp;
                if (time_buffer >= this.__stopInterval) {
                    time_buffer = 0;
                    let angle = 360 * this.__value / this.__maxValue;
                    this.__set_attrs(this.__arrow, {
                        transform: `rotate(${angle} ${hs} ${hs})`
                    });
                    this.__value += 1;
                }
                requestAnimationFrame(anim);
            }
        };

        this.__play = true;
        requestAnimationFrame(anim);
    }


    pause() {
        this.__play = false;
    }
    

    stop() {
        this.pause();
        this.__value = 0;
    }


    render() {
        this.__render();
    }


    dom() {
        assert(this.__root !== null, "[Timer.dom] you must call Timer.render() first");
        return this.__root;
    }

    
    set value(v) {
        assertNumber(v, "[Timer.constructor] \"value\"");
        this.__value = v % this.__maxValue;
    }


    get value() {
        return this.__value;
    }


    __render() {
        let size = 100;
        let half_size = size / 2;

        let root = this.__svg("svg");
        this.__set_attrs(root, { viewBox: `0 0 ${size} ${size}` });

        let clockFace = this.__svg("circle");
        this.__set_attrs(clockFace, {
            cx: half_size,
            cy: half_size,
            r: half_size - 3,
            fill: "none",
            stroke: "black",
            strokeWidth: "3",
        });

        let circle = this.__svg("circle");
        this.__set_attrs(circle, {
            cx: half_size,
            cy: half_size,
            r: 3,
            fill: "black",
            stroke: "none",
            strokeWidth: "0",
        });

        let arrow = this.__svg("line");
        this.__set_attrs(arrow, {
            x1: half_size,
            y1: half_size,
            x2: half_size,
            y2: half_size - 40,
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


    __update() {
    }


    __svg(tag) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }


    __set_attrs(elem, attrs) {
        for (let a in attrs) {
            let transformed = a;
            if (!Timer.SvgTransformExceptions.includes(a)) {
                transformed = a.replace(Timer.TestCapitalCase, (v) => `-${v.toLowerCase()}`);
            }
            elem.setAttribute(transformed, attrs[a]);
        }
    }
}


Timer.TestCapitalCase = /[A-Z]/;
Timer.SvgTransformExceptions = ["viewBox"];
