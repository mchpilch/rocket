import { RigidBody2D } from "../physics/bodies/rigidBody2d";
import { BoxView } from "../views/boxView";

export class BoxEntity {
  public readonly body: RigidBody2D;
  public readonly view: BoxView;

  constructor(body: RigidBody2D, view: BoxView) {
    this.body = body;
    this.view = view;
  }

  public resolveTemporaryFloorCollision(): void {  // [TEMP]
    const floorY = 5; // meters
    const boxHalfHeight = this.view.getHeightMeters() / 2; // meters

    const boxBottomY = this.body.position.y + boxHalfHeight;

    if (boxBottomY > floorY) { 
      this.body.position.y = floorY - boxHalfHeight;
      this.body.velocity.y = 0;
    }
  }

  public updateView(): void {
    this.view.syncFrom(this.body);
  }
}