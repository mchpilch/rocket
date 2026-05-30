import { Vec2 } from "../vec2";

export class LineSegment2D {

    public readonly start = new Vec2();
    public readonly end = new Vec2();

    // collider: Collider2D;

    constructor(params: { x1: number; y1: number; x2: number; y2: number }) {
        this.start.set(params.x1, params.y1);
        this.end.set(params.x2, params.y2);
    }
}