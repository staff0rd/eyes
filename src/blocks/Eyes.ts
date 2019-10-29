import * as PIXI from "pixi.js";
import { Random } from '../core/Random';
import { Eye } from "./Eye";
import { Point } from '../core/Point';

export class Eyes {
    private size: number;
    view: PIXI.Container;
    private leftEye: Eye;
    private rightEye: Eye;
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

        const pupilSize = Random.between(2, 8) / 10;

        this.leftEye = new Eye(eyeWidth/2, eyeHeight, pupilSize);
        this.rightEye = new Eye(eyeWidth/2, eyeHeight, pupilSize);

        this.leftEye.view.position.set(this.size/2 - gap/2 - this.leftEye.view.width / 2, this.size/2);
        this.rightEye.view.position.set(this.size /2 + gap/2 + this.rightEye.view.width / 2, this.size/2);

        this.view.addChild(this.leftEye.view, this.rightEye.view);
    }

    look(at: PIXI.Point) {
        this.leftEye.look(at);
        this.rightEye.look(at);
    }
}
