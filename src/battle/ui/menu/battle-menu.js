import Phaser from "../../../lib/phaser.js";
import { MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../../../assets/asset-key.js";
import { DIRECTION } from "../../../Common/direction.js";
import { exhausiveGuard } from "../../../utils/guard.js";
/**
 * @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions
 */
/**@enum {BattleMenuOptions} */
const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    SWITCH: 'SWITCH',
    ITEM: 'ITEM',
    FLEE: 'FLEE',
});

const battleUITextStyle = Object.freeze({
    color: 'black',
    fontSize: '30px',
    fontsStyle: 'bold', 
});

const BATTLE_MENU_CURSOR_POSITION = Object.freeze({
    FIGHT: {x: 42, y: 38},
    SWITCH: {x: 228, y: 38},
    ITEM: {x: 42, y: 86},
    FLEE: {x: 228, y: 86},
});

export class BattleMenu{
    /**@type {Phaser.Scene} */
    #scene;
    /**@type {Phaser.GameObjects.Container} */
    #mainBattleMenuContainerGameObject;
    /**@type {Phaser.GameObjects.Container} */
    #moveSelectionSubBattleContainerGameObject; 
    /**@type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine1;
    /**@type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine2;
    /**@type {Phaser.GameObjects.Image} */
    #mainBattleMenuCursorPhaserImageGameObject;
    /**@type {Phaser.GameObjects.Image} */
    #attackBattleMenuCursorPhaserImageGameObject;
    /**@type {BattleMenuOptions} */
    #selectedBattleMenuOption;

    constructor(scene){
        this.#scene = scene;
        this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.#createMainInfoPane();
        this.#createMainBattleMenu();
        this.#createMonsterAttackSubMenu();
    }

    showMainBattleMenu(){
        this.#battleTextGameObjectLine1.setText('What should');
        this.#mainBattleMenuContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);
        this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.FIGHT.x, BATTLE_MENU_CURSOR_POSITION.FIGHT.y);
    }

    hideMainBattleMenu(){
        this.#mainBattleMenuContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu(){
        this.#moveSelectionSubBattleContainerGameObject.setAlpha(1);
    }

    hideMonsterAttackSubMenu(){
        this.#moveSelectionSubBattleContainerGameObject.setAlpha(0);
    }

    /**
     * @param {import('../../../Common/direction.js').Direction|'OK'|'CANCEL'} input
     */
    handlePlayerInput(input){
        console.log(input)
        if(input === 'OK'){
            this.hideMainBattleMenu();
            this.showMonsterAttackSubMenu();
            return
        }
        if(input === 'CANCEL') {
            this.hideMonsterAttackSubMenu();
            this.showMainBattleMenu();
            return;
        }
        this.#updateSelectedBattleMenuOptionFromInput(input);
        this.#moveMainBattleMenuCursor();
    }

    #createMainBattleMenu(){

        this.#battleTextGameObjectLine1 = this.#scene.add.text(
            20, 
            468, 
            'What should', 
            battleUITextStyle
        );

        this.#battleTextGameObjectLine2 = this.#scene.add.text(
            20, 
            512,  
            `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next ?` , 
            battleUITextStyle
        );

        this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add.
            image(42, 38, UI_ASSET_KEYS.CURSOR, 0).
            setOrigin(0.5).
            setScale(2.5);

        this.#mainBattleMenuContainerGameObject = this.#scene.add.container(520,448,[
            this.#createMainInfoSubPane(),
            this.#scene.add.text(55,22, BATTLE_MENU_OPTIONS.FIGHT, battleUITextStyle),
            this.#scene.add.text(240,22, BATTLE_MENU_OPTIONS.SWITCH, battleUITextStyle),
            this.#scene.add.text(55,70, BATTLE_MENU_OPTIONS.ITEM, battleUITextStyle),
            this.#scene.add.text(240,70, BATTLE_MENU_OPTIONS.FLEE, battleUITextStyle),
            this.#mainBattleMenuCursorPhaserImageGameObject,
        ])

        this.hideMainBattleMenu();
    }

    #createMonsterAttackSubMenu(){

        this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add.
            image(42,38, UI_ASSET_KEYS.CURSOR, 0).
            setOrigin(0.5).
            setScale(2.5);

        this.#moveSelectionSubBattleContainerGameObject = this.#scene.add.container(0,448,[
            this.#scene.add.text(55,22, 'Slash', battleUITextStyle),
            this.#scene.add.text(240,22, 'growl', battleUITextStyle),
            this.#scene.add.text(55,70, '-', battleUITextStyle),
            this.#scene.add.text(240,70, '-', battleUITextStyle),
            this.#attackBattleMenuCursorPhaserImageGameObject,
        ])
        this.hideMonsterAttackSubMenu();
    }

    #createMainInfoPane(){
        const padding = 4;
        const rectHeight = 124;
        this.#scene.add.rectangle(
                padding, 
                this.#scene.scale.height - rectHeight - padding, 
                this.#scene.scale.width - padding * 2, 
                rectHeight, 
                0xede4f3, 
                1
            )
            .setOrigin(0)
            .setStrokeStyle(8, 0xe4434a,1);
    }

    #createMainInfoSubPane(){
        const rectWidth = 500;
        const rectHeight = 124;

        return this.#scene.add.rectangle(
            0,0,rectWidth,rectHeight,0xede4f3,1)
            .setOrigin(0)
            .setStrokeStyle(8, 0x905ac2,1);

    }
    /**
     * @param {import('../../../Common/direction.js').Direction} direction
     */
    #updateSelectedBattleMenuOptionFromInput(direction){
        if(this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT){
            switch (direction){
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                    return;
                case DIRECTION.UP:
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhausiveGuard(direction);
            }
            return;
        }

        if(this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH){
            switch (direction){
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                    return;
                case DIRECTION.UP:
                    return;
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                    return;
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhausiveGuard(direction);
            }
            return;
        }

        if(this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM){
            switch (direction){
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                    return;
                case DIRECTION.LEFT:
                    return;
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhausiveGuard(direction);
            }
            return;
        }

        if(this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE){
            switch (direction){
                case DIRECTION.DOWN:
                    return;
                case DIRECTION.UP:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                    return;
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                    return;
                case DIRECTION.RIGHT:
                    return;
                case DIRECTION.NONE:
                    return;
                default:
                    exhausiveGuard(direction);
            }
            return;
        }
    }
    #moveMainBattleMenuCursor(){
        switch(this.#selectedBattleMenuOption){
            case BATTLE_MENU_OPTIONS.FIGHT:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.FIGHT.x, BATTLE_MENU_CURSOR_POSITION.FIGHT.y);
                return;
            case BATTLE_MENU_OPTIONS.SWITCH:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.SWITCH.x, BATTLE_MENU_CURSOR_POSITION.SWITCH.y);
                return;
            case BATTLE_MENU_OPTIONS.ITEM:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.ITEM.x, BATTLE_MENU_CURSOR_POSITION.ITEM.y);
                return;
            case BATTLE_MENU_OPTIONS.FLEE:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.FLEE.x, BATTLE_MENU_CURSOR_POSITION.FLEE.y);
                return;    
            default:
                exhausiveGuard(this.#selectedBattleMenuOption);
        }
    }
}