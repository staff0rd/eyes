import * as PIXI from "pixi.js"
import { Colors } from '../core/Colors';

export class Face {
    view: PIXI.Container;
    size: number;
    constructor(size: number) {
        this.size = size;
        this.view = new PIXI.Container();
        this.initBackground();
    }

    initBackground() {
        const g = new PIXI.Graphics();
        g.beginFill(Colors.BlueGrey.C600)
            .drawRect(0, 0, this.size, this.size)
            .endFill();
        this.view.addChild(g);
    }
}