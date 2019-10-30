import { Colors } from "../core/Colors";
import { Rect } from '../core/Rect';
import * as PIXI from "pixi.js";
import { Point } from '../core/Point';
const {ShapeInfo, Intersection} = require("kld-intersections");

export class Eye {
    get pupilPosition() { return this.pupil.position; }
    view: PIXI.Container;
    private rect: Rect;
    private background: PIXI.Graphics;
    private pupil: PIXI.Graphics;
    private pupilSize: number;
    private looking: PIXI.Graphics;
    private mask: PIXI.Graphics;
    constructor(width: number, height: number, pupilSize: number) {
        this.pupilSize = pupilSize;
        this.rect = new Rect(0, 0, width, height);
        this.view = new PIXI.Container();
        this.background = this.getBackground();
        this.mask = this.background.clone();
        this.view.mask = this.mask;
        this.pupil = this.getPupil();
        this.looking = new PIXI.Graphics();
        this.view.addChild(this.background, this.pupil, this.mask);
    }

    set(lookAt: Point) {
        this.pupil.position.set(lookAt.x, lookAt.y);
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
    look(at: PIXI.Point) {
        var local = this.pupil.toLocal(at);
        const ellipse = ShapeInfo.ellipse([this.rect.x, this.rect.y, this.rect.width/3, this.rect.height/3]);
        const line = ShapeInfo.line([0, 0, local.x, local.y]);
        const intersections = Intersection.intersect(ellipse, line);
        const point = intersections.points[0];
        if (point)
            this.pupil.position.set(point.x, point.y);

        this.looking
            .clear()
            .lineStyle(2, Colors.Red.C500)
            .moveTo(0, 0)
            .lineTo(local.x, local.y);
    }
}
