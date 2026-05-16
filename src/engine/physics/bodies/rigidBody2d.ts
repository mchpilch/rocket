import { Vec2 } from "../vec2";


export class RigidBody2D {

    public position = new Vec2(); // meters
    public velocity = new Vec2(); // meters / second

    public mass: number;

    // rotation: number; // later
    // angularVelocity: number;
    // collider: Collider2D;

    constructor(params: { x: number; y: number; mass: number }) {

        this.position.set(params.x, params.y);
        this.mass = params.mass;
    }
}