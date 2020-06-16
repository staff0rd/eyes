import * as PIXI from "pixi.js";
import { Random } from '../core/Random';
import { Eye } from "./Eye";
import { Point } from '../core/Point';
import * as gsap from "gsap";
import { Config } from '../Config';

export class Eyes {
    private size: number;
    view: PIXI.Container;
    private leftEye: Eye;
    private rightEye: Eye;
    private timeline: gsap.TimelineMax;
    private debug: PIXI.Text;
    private config: Config;

    constructor(size: number, config: Config) {
        this.size = size;
        this.view = new PIXI.Container();
        if (config.debug) {
            this.debug = new PIXI.Text('Debug', { fontSize: 16 });
        }
        this.config = config;
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

        this.leftEye = new Eye(eyeWidth/2, eyeHeight, pupilSize, this.config);
        this.rightEye = new Eye(eyeWidth/2, eyeHeight, pupilSize, this.config);

        this.leftEye.view.position.set(this.size/2 - gap/2 - this.leftEye.view.width / 2, this.size/2);
        this.rightEye.view.position.set(this.size /2 + gap/2 + this.rightEye.view.width / 2, this.size/2);

        this.view.addChild(this.leftEye.view, this.rightEye.view);
        if (this.debug)
            this.view.addChild(this.debug);

        this.randomizePosition();
    }

    private randomPosition(delay: number) {
        var position = Random.pointInCircle(Math.min(this.leftEye.view.width / 2, this.leftEye.view.height / 2));
        if (delay) {
            this.timeline = new gsap.TimelineMax({ delay: delay, onComplete: () => this.randomizePosition()});
            this.timeline.to(this.leftEye.pupilPosition, 1, { x: position.x, y: position.y}, 0);
            this.timeline.to(this.rightEye.pupilPosition, 1, { x: position.x, y: position.y}, 0);
        } else {
            this.setPosition(position);
            this.randomizePosition();
        }
    }
    randomizePosition(): any {
        this.randomPosition(Random.next(5) + 1)
    }

    private setPosition(position: Point) {
        this.leftEye.set(position);
        this.rightEye.set(position);
    }

    toStringEllipse = ({ ellipse, rect, line, intersections }: any) => {
            
        var result = "" +
        `\n\tellipse: cx: ${ellipse.center.x}, cy: ${ellipse.center.y}, rx: ${ellipse.radiusX}, ry: ${ellipse.radiusY}` +
        `\n\trect: ${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}` +
        `\n\tline: ${line.p1.x}, ${line.p1.y}, ${line.p2.x}, ${line.p2.y}` +
        `\n\tintersect: `;

        if (intersections.points.length)
            result += `${intersections.points[0].x}, ${intersections.points[0].y}`;
        else
            result += "None";
        return result;
    };


    look(at: PIXI.Point) {
        this.timeline && this.timeline.kill();
        const left = this.leftEye.look(at);
        const right = this.rightEye.look(at);
        this.randomizePosition();
        
        if (this.debug) {
            this.debug.text = 
`left: ${this.toStringEllipse(left)}
right: ${this.toStringEllipse(right)}
`;
        }
    }
}
