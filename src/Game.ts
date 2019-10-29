import * as PIXI from "pixi.js";
import { Config } from './Config';
import { Analytics } from "./core/Analytics";
import { Face } from './blocks/Face';

export class Game {
    private pixi: PIXI.Application;
    private interactionHitBox: PIXI.Graphics;
    private config: Config;
    private stage: PIXI.Container;

    constructor(config: Config, pixi: PIXI.Application) {
        this.pixi = pixi;
        this.config = config;

        this.initInteraction();
        
        this.stage = new PIXI.Container();
        this.pixi.stage.addChild(this.stage);

        window.onresize = () => {
            this.pixi.view.width = window.innerWidth;
            this.pixi.view.height = window.innerHeight;
            this.interactionHitBox.width = window.innerWidth;
            this.interactionHitBox.height = window.innerHeight;
        }
    }

    initInteraction() {
        this.pixi.stage.interactive =true;
        this.interactionHitBox = new PIXI.Graphics();
        this.interactionHitBox.beginFill();
        this.interactionHitBox.drawRect(0, 0, 1, 1);
        this.interactionHitBox.endFill();
        this.interactionHitBox.width = window.innerWidth;
        this.interactionHitBox.height = window.innerHeight;
        this.interactionHitBox.interactive = true;
        this.interactionHitBox.on('pointertap', () => this.init());
        this.interactionHitBox.alpha = 0;
        this.pixi.stage.addChild(this.interactionHitBox);
    }

    init() {
        Analytics.buttonClick("rengenerate");
        const margin = 3;
        const size = 100;
        for (let y = 0; y < window.innerHeight; y+= margin + size)
        for (let x = 0; x < window.innerWidth; x+= margin + size) {
            const face = new Face(size);
            face.view.position.set(x, y);
            this.stage.addChild(face.view);
        }
    }

    draw() {
    }
}