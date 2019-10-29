import * as PIXI from "pixi.js"
import { Colors } from '../core/Colors';
import { Eyes } from './Eyes';

export class Face {
    view: PIXI.Container;
    private size: number;
    private eyes: Eyes;
    constructor(size: number) {
        this.size = size;
        this.view = new PIXI.Container();
        this.initBackground();
        this.initEyes();
    }

    initEyes() {
        this.eyes = new Eyes(this.size);
        this.eyes.view.position.y = this.size / 2;
        this.eyes.view.pivot.y = this.size / 2;
        const mask = this.getMask();
        this.view.mask = mask;
        this.view.addChild(mask, this.eyes.view);
    }

    getMask() {
        return new PIXI.Graphics()
        .beginFill(Colors.Black)
        .drawRect(0, 0, this.size, this.size);
    }

    initBackground() {
        const g = new PIXI.Graphics();
        g.beginFill(Colors.BlueGrey.C600)
            .drawRect(0, 0, this.size, this.size)
            .endFill();
        this.view.addChild(g);
    }
}