import { Colors } from "../core/Colors";
import { Rect } from '../core/Rect';
import * as PIXI from "pixi.js";
import { Random } from '../core/Random';

export class Eye {
    view: PIXI.Container;
    private rect: Rect;
    private background: PIXI.Graphics;
    private pupil: PIXI.Graphics;
    private pupilSize: number;
    constructor(width: number, height: number, pupilSize: number) {
        this.pupilSize = pupilSize;
        this.rect = new Rect(0, 0, width, height);
        this.view = new PIXI.Container();
        this.background = this.getBackground();
        this.pupil = this.getPupil();
        this.view.addChild(this.background, this.pupil);
    }

    private getPupil() {
        return new PIXI.Graphics()
            .beginFill(Colors.BlueGrey.C800)
            .drawEllipse(this.rect.x, this.rect.y, this.rect.width / 2 * this.pupilSize, this.rect.height /2 * this.pupilSize);
    }

    private getBackground() {
        var g = new PIXI.Graphics()
            .lineStyle(2, Colors.BlueGrey.C900)
            .beginFill(Colors.Yellow.C50)
            .drawEllipse(this.rect.x, this.rect.y, this.rect.width / 2, this.rect.height / 2)
            .endFill();
        return g;
    }
}
