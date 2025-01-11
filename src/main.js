import Phaser from "./lib/phaser.js";
import { PreloadScene } from "./scenes/preload-scene.js";
import { SCENE_KEY } from "./scenes/scene-key.js";

const game = new Phaser.Game({
    parent:'game-container',
});

game.scene.add(SCENE_KEY.PRELOAD_SCENE, PreloadScene);
game.scene.start(SCENE_KEY.PRELOAD_SCENE);