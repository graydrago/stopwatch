import { Player } from "./Player";
import { StopWatch } from "./StopWatch";
import * as utils from "./utils";

import playerStyles from "./assets/css/player.scss";
import stopWatchStyles from "./assets/css/stop_watch.scss";

document.addEventListener("DOMContentLoaded", () => {
    let root = utils.prepareRoot(document.body);
    let timer = new StopWatch(root);
    let player = new Player(root);
    player.timer = timer;
});
