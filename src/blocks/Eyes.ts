import * as PIXI from "pixi.js";
import { Random } from '../core/Random';
import { Colors } from "../core/Colors";
import { Rect } from '../core/Rect';

export class Eyes {
    private size: number;
    view: PIXI.Container;
    constructor(size: number) {
        this.size = size;
        this.view = new PIXI.Container();

        this.init();
    }

    private init() {
        const maxWidth = this.size * .9;
        const maxHeight = this.size * .5;
        const minWidth = this.size * .3;
        const minHeight = this.size * .15;
        const eyeWidth = Random.between(minWidth, maxWidth);
        const eyeHeight = Random.between(minHeight, maxHeight);
        const gap = Random.between(0, Math.min(this.size - eyeWidth, eyeWidth /2)) ;

        const leftEye = new Eye(eyeWidth/2, eyeHeight);
        const rightEye = new Eye(eyeWidth/2, eyeHeight);

        leftEye.view.position.set(this.size/2 - gap/2 - leftEye.view.width / 2, this.size/2);
        rightEye.view.position.set(this.size /2 + gap/2 + rightEye.view.width / 2, this.size/2);

        this.view.addChild(leftEye.view, rightEye.view);
    }
}

export class Eye {
    view: PIXI.Container;
    private rect: Rect; 
    private background: PIXI.Graphics;
    constructor(width: number, height: number) {
        this.rect = new Rect(0, 0, width, height);
        this.view = new PIXI.Container();
        this.background = this.getBackground()
        this.view.addChild(this.background); 
    }

    private getBackground() {
        var g = new PIXI.Graphics()
            .lineStyle(2, Colors.BlueGrey.C900)
            .beginFill(Colors.Yellow.C50)
            .drawEllipse(this.rect.x, this.rect.y, this.rect.width/2, this.rect.height/2)
            .endFill();
        return g;
    }
}