import { physicsConfig } from "../../configs/physicsConfig";
import { RigidBody2D } from "./rigidBody2d";
import { Vec2 } from "./vec2";


export class PhysicsWorld {

  private bodies: RigidBody2D[] = [];
  private config = physicsConfig;
  // SI units: m/s²
  public gravity = new Vec2(0, this.config.g * 0.25);

  public addBody(body: RigidBody2D): void {
    this.bodies.push(body);
  }

  public step(dt: number): void {
    for (const body of this.bodies) {
      body.velocity.x += this.gravity.x * dt;
      body.velocity.y += this.gravity.y * dt;

      body.position.x += body.velocity.x * dt;
      body.position.y += body.velocity.y * dt;
    //   console.log('xxx body.position.y', body.position.y);
      console.log('xxx body.velocity.y', body.position.y);
      
    }
  }

  // later on add destroy body if y crosses some treshold, 
}