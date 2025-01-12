import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../assets/asset-key.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEY } from "./scene-key.js";

export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENE_KEY.PRELOAD_SCENE,
            active: true,
        });
        console.log(SCENE_KEY.PRELOAD_SCENE);
    }

    init(){
        console.log('init');
    }

    preload(){
        console.log('preload');
        const monsterTamerAssetPath = 'assets/images/monster-tamer/';
        const kenneyAssetPath = 'assets/images/kenneys-assets/';

        this.load.image(
            BATTLE_BACKGROUND_ASSET_KEYS.FOREST,
            `${monsterTamerAssetPath}battle-backgrounds/forest-background.png`
        )

        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
            `${kenneyAssetPath}ui-space-expansion/custom-ui.png`
        )

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
            `${kenneyAssetPath}ui-space-expansion/barHorizontal_green_right.png`
        )

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.MIDDLE,
            `${kenneyAssetPath}ui-space-expansion/barHorizontal_green_mid.png`
        )

        this.load.image(
            HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
            `${kenneyAssetPath}ui-space-expansion/barHorizontal_green_left.png`
        )

        this.load.image(
            MONSTER_ASSET_KEYS.CARNODUSK,
            `${monsterTamerAssetPath}monsters/carnodusk.png`
        )

        this.load.image(
            MONSTER_ASSET_KEYS.IGUANIGNITE,
            `${monsterTamerAssetPath}monsters/iguanignite.png`
        )

        this.load.image(
            UI_ASSET_KEYS.CURSOR,
            `${monsterTamerAssetPath}ui/cursor.png`
        )
    }

    create(){
        this.scene.start(SCENE_KEY.BATTLE_SCENE);
    }

    update(){
        console.log('update');
    }
}