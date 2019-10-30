import { Point } from "./Point";

export class Random {
    static next(max: number) {
        return Math.random() * max;
    }
    static between(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static pick<T>(array: T[]) {
        return array[this.between(0, array.length - 1)];
    }

    static flip() {
        return this.between(0, 1) == 0;
    }

    static pointInCircle(radius: number) {
        const a = Math.random() * 2 * Math.PI;
        const r = radius * Math.sqrt(Math.random())

        return new Point(r * Math.cos(a), r * Math.sin(a));
    }
}