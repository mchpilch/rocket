import { RigidBody2D } from "../engine/physics/rigidBody2d";
import { BoxView } from "../views/boxView";

export class BoxEntity {
  public readonly body: RigidBody2D;
  public readonly view: BoxView;

  constructor(body: RigidBody2D, view: BoxView) {
    this.body = body;
    this.view = view;
  }

  public updateView(): void {
    this.view.syncFrom(this.body);
  }
}