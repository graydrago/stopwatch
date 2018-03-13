import { Timer } from "./Timer";
import * as utils from "./utils";

document.addEventListener("DOMContentLoaded", () => {
    let root = utils.prepareRoot(document.body);
    let timer = new Timer();
    timer.render();
    root.appendChild(timer.dom());
    timer.play();
});
