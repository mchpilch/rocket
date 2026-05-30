// src/engine/physics/colliders/collider2D.ts

import type { RigidBody2D as RigidBody2D } from "../bodies/rigidBody2D";
// import { Projection } from "../collision/projection"; // todo
import { Vec2 } from "../vec2";

export abstract class Collider2D {

    public constructor(public readonly body: RigidBody2D) { }

    public abstract getVertices(): Vec2[];
    // SAT todo
    // public abstract getAxes(): Vec2[];
    // SAT todo
    // public abstract project(axis: Vec2): Projection; // todo

    public getCenter(): Vec2 {
        return this.body.position.clone();
    }
}

//https://dyn4j.org/2010/01/sat/

// If two convex objects are not penetrating, there exists an axis for which the projection of the objects will not overlap.

// The axes you must test are the normals of each shape’s edges.