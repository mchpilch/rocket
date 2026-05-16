import { physicsConfig } from "../../configs/physicsConfig";
import { RigidBody2D } from "./bodies/rigidBody2d";
import { Vec2 } from "./vec2";


export class PhysicsWorld {

  private bodies: RigidBody2D[] = [];
  private config = physicsConfig;

  public gravity = new Vec2(0, this.config.g * this.config.gravityScale);

  public addBody(body: RigidBody2D): void {
    this.bodies.push(body);
  }
  // dt = 0.0167 seconds ≈ 16.7 ms ≈ 60 FPS // make it leter independent of fps somehow
  public step(dt: number): void {
    for (const body of this.bodies) {
      body.velocity.x += this.gravity.x * dt;
      body.velocity.y += this.gravity.y * dt;

      body.position.x += body.velocity.x * dt;
      body.position.y += body.velocity.y * dt;
    //   console.log('xxx body.position.y', body.position.y);
      // console.log('xxx body.velocity.y', body.position.y);
      console.log('xxx dt', dt);
      
    }
  }

  // later on add destroy body if y crosses some treshold, 
}