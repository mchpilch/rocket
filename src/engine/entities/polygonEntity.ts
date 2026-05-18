import { RigidBody2D } from "../physics/bodies/rigidBody2d";
import { PolygonView } from "../views/polygonView";

export class PolygonEntity {
  public readonly body: RigidBody2D;
  public readonly view: PolygonView;

  constructor(body: RigidBody2D, view: PolygonView) {
    this.body = body;
    this.view = view;
  }

  public resolveTemporaryFloorCollision(): void {  // [TEMP]
    const floorY = 5; // meters
    const boxHalfHeight = this.view.getRadiusMeters(); 

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