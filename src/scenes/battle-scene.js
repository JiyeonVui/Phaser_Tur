import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../../assets/asset-key.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEY } from "./scene-key.js";

export class BattleScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENE_KEY.BATTLE_SCENE,
            active: true,
        });
        console.log(SCENE_KEY.BATTLE_SCENE);
    }

    init(){
        
    }

    create(){
        console.log('create');
        this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0);
        

        // render out monster images
        this.add.image(768,144, MONSTER_ASSET_KEYS.CARNODUSK,0);
        this.add.image(256,316, MONSTER_ASSET_KEYS.IGUANIGNITE,0).setFlipX(true);
        // note setDepth is used to set the order of the images
    
        // render out health bar images

        const playerMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.IGUANIGNITE, {
            color: '#7E3D3F',
            fontSize: '32px',    
            fontStyle: 'bold',
        })
        this.add.container(556,318, [
            this.add
                .image(0,0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
                .setOrigin(0),
            playerMonsterName,
            this.#createHealthBar(34,34, 360), 
            this.add.text(
                playerMonsterName.width + 35,
                23,
                'L5',
                {
                    color: '#ED474B',
                    fontSize: '28px',
                }
            ), 
            this.add.text(30,55, 'HP', {
                color: '#FF6505',
                fontSize: '24px',
                fontStyle: 'italic',
            }),
            this.add.text(443,80,'25/25',{
                color: '#7E3D3F',
                fontSize: '16px',
                fontStyle: 'italic',
            }).setOrigin(1,0),
        ]);

        const enemyMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.CARNODUSK, {
            color: '#7E3D3F',
            fontSize: '32px',    
            fontStyle: 'bold',
        })
        this.add.container(0,0, [
            this.add
                .image(0,0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
                .setOrigin(0)
                .setScale(1,0.8),
            enemyMonsterName,
            this.#createHealthBar(34,34, 360), 
            this.add.text(
                enemyMonsterName.width + 35,
                23,
                'L5',
                {
                    color: '#ED474B',
                    fontSize: '28px',
                }
            ), 
            this.add.text(30,55, 'HP', {
                color: '#FF6505',
                fontSize: '24px',
                fontStyle: 'italic',
            }),
            this.add.text(443,80,'25/25',{
                color: '#7E3D3F',
                fontSize: '16px',
                fontStyle: 'italic',
            }).setOrigin(1,0),
        ]);
    }

    // create a health bar
    #createHealthBar(x, y, value) {

        const scaleY = 0.7

        const leftcap = this.add.image(x,y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP).setOrigin(0,0.5).setScale(1,scaleY);
        const middle = this.add.image(leftcap.x + leftcap.width , y, HEALTH_BAR_ASSET_KEYS.MIDDLE).setOrigin(0,0.5).setScale(1,scaleY);
        middle.displayWidth = value;

        
        const rightcap = this.add.image(middle.x  + middle.displayWidth , y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP).setOrigin(0,0.5).setScale(1,scaleY);    

        return this.add.container(x, y, [leftcap, middle,rightcap]);
    }

}