export class Vec2 {
    
    public x: number;
    public y: number;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vec2): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public scale(s: number): this {
        this.x *= s;
        this.y *= s;
        return this;
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
}