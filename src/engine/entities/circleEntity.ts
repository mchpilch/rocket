import { RigidBody2D } from "../physics/bodies/rigidBody2d";
import { CircleView } from "../views/circleView";

export class CircleEntity {
  public readonly body: RigidBody2D;
  public readonly view: CircleView;

  constructor(body: RigidBody2D, view: CircleView) {
    this.body = body;
    this.view = view;
  }

  public resolveTemporaryFloorCollision(): void {  // [TEMP]
    const floorY = 5; // meters
    const circleRadius = this.view.getRadiusMeters(); // meters

    const circleBottomY = this.body.position.y + circleRadius;

    if (circleBottomY > floorY) { 
      this.body.position.y = floorY - circleRadius;
      this.body.velocity.y = 0;
    }
  }

  public updateView(): void {
    this.view.syncFrom(this.body);
  }
}