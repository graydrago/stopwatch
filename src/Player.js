import { assert, div } from "./utils";
import { playIcon, pauseIcon, stopIcon} from "./icons";

export class Player {
    constructor(parent) {
        assert(parent instanceof HTMLElement, "[Player.constructor] parent must be an instance of HTMLElement");

        this.__playableObject = null;
        this.__root = null;
        this.__buttonPlay = null;
        this.__buttonPause = null;
        this.__buttonStop = null;

        this.__render();
        parent.appendChild(this.dom());
    }


    dom() {
        return this.__root;
    }


    set timer(v) {
        assert(v.play, "[Player.timer] object must have play() method");
        assert(v.stop, "[Player.timer] object must have stop() method");
        assert(v.pause, "[Player.timer] object must have pause() method");

        if (this.__playableObject) {
            this.__playableObject.stop();
        }
        this.__playableObject = v;
    }
    

    get timer() {
        return this.__playableObject;
    }


    __render() {
        let root = div("player");
        let control = div("player-control");
        let buttonPlay = div("player-control-button");
        let buttonPause = div("player-control-button");
        let buttonStop = div("player-control-button");

        buttonPlay.innerHTML = playIcon;
        buttonPause.innerHTML = pauseIcon;
        buttonStop.innerHTML = stopIcon;

        root.appendChild(control);

        control.appendChild(buttonPlay);
        control.appendChild(buttonPause);
        control.appendChild(buttonStop);

        buttonPlay.addEventListener("click", () => {
            if (buttonPlay.classList.contains("pushed")) return;
            this.__playableObject.play();
            buttonPlay.classList.add("pushed");
            buttonPause.classList.remove("pushed");
            let value = this.__playableObject.value;
            console.log(`Play button has been clicked: ${value}`);
        });

        buttonPause.addEventListener("click", () => {
            if (buttonPause.classList.contains("pushed")) return;
            this.__playableObject.pause();
            buttonPlay.classList.remove("pushed");
            buttonPause.classList.add("pushed");
            let value = this.__playableObject.value;
            console.log(`Pause button has been clicked: ${value}`);
        });

        buttonStop.addEventListener("click", () => {
            buttonPlay.classList.remove("pushed");
            buttonPause.classList.remove("pushed");
            let value = this.__playableObject.value;
            console.log(`Stop button has been clicked: ${value}`);
            this.__playableObject.stop();
        });

        this.__root = root;
        this.__buttonPlay = buttonPlay;
        this.__buttonStop = buttonStop;
        this.__buttonPause = buttonPause;
    }
}
