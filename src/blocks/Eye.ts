import { Colors } from "../core/Colors";
import { Rect } from '../core/Rect';
import * as PIXI from "pixi.js";
import { Point } from '../core/Point';
const {ShapeInfo, Intersection, Point2D} = require("kld-intersections");
import { Config } from '../Config';

export class Eye {
    get pupilPosition() { return this.pupil.position; }
    view: PIXI.Container;
    private rect: Rect;
    private background: PIXI.Graphics;
    private pupil: PIXI.Graphics;
    private pupilSize: number;
    private looking: PIXI.Graphics;
    private mask: PIXI.Graphics;
    private config: Config;

    constructor(width: number, height: number, pupilSize: number, config: Config) {
        this.pupilSize = pupilSize;
        this.rect = new Rect(0, 0, width, height);
        this.view = new PIXI.Container();
        this.background = this.getBackground();
        this.mask = this.background.clone();
        this.view.mask = this.mask;
        this.pupil = this.getPupil();
        this.looking = new PIXI.Graphics();
        this.view.addChild(this.background, this.pupil, this.mask);
        if (config.debug)
            this.view.addChild(this.looking);
        this.config = config;
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
        var local = this.background.toLocal(at);

        const ellipse = {
            center: new Point2D(0, 0),
            radiusX: this.rect.rx,
            radiusY: this.rect.ry,
        };
        const line = {
            p1: new Point2D(0, 0),
            p2: new Point2D(local.x, local.y)
        }
        const intersections = Intersection.intersectEllipseLine(
            ellipse.center, ellipse.radiusX, ellipse.radiusY,
            line.p1, line.p2
        );

        const point = intersections.points[0];
        if (point)
            this.pupil.position.set(point.x, point.y);
        else
            this.pupil.position.set(local.x, local.y);
        
        if (this.config.debug) {
            this.looking
                .clear()
                .lineStyle(2, Colors.Red.C500)
                .moveTo(0, 0)
                .lineTo(local.x, local.y);
        }

        return { rect: this.rect, ellipse, line, intersections };
    }
}
