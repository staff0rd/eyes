import * as PIXI from "pixi.js"
import { Colors } from '../core/Colors';
import { Eyes } from './Eyes';
import { Point } from "../core/Point";
import { Config } from "../Config";

export class Face {
    view: PIXI.Container;
    private size: number;
    private eyes: Eyes;
    private config: Config;

    constructor(size: number, config: Config) {
        this.size = size;
        this.config = config;
        this.view = new PIXI.Container();
        this.initBackground();
        this.initEyes();
    }

    private initEyes() {
        this.eyes = new Eyes(this.size, this.config);
        this.eyes.view.position.y = this.size / 2;
        this.eyes.view.pivot.y = this.size / 2;
        const mask = this.getMask();
        this.view.mask = mask;
        this.view.addChild(mask, this.eyes.view);
    }

    private getMask() {
        return new PIXI.Graphics()
        .beginFill(Colors.Black)
        .drawRect(0, 0, this.size, this.size);
    }

    private initBackground() {
        const g = new PIXI.Graphics();
        g.beginFill(Colors.BlueGrey.C600)
            .drawRect(0, 0, this.size, this.size)
            .endFill();
        this.view.addChild(g);
    }

    look(at: PIXI.Point) {
        this.eyes.look(at);
    }
}