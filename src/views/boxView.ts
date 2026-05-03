import { Graphics } from "pixi.js";
import { UnitConverter } from "../engine/utils/unitConverter";
import { RigidBody2D } from "../engine/physics/rigidBody2d";

export class BoxView {
  public readonly graphics: Graphics;

  constructor(
    widthMeters: number,
    heightMeters: number,
    private readonly unitConverter: UnitConverter
  ) {
    const widthPx = this.unitConverter.metersToPixels(widthMeters);
    const heightPx = this.unitConverter.metersToPixels(heightMeters);

    this.graphics = new Graphics()
      .rect(-widthPx / 2, -heightPx / 2, widthPx, heightPx)
      .fill(0xff0000);
  }

  public syncFrom(body: RigidBody2D): void {
    this.graphics.position.set(
      this.unitConverter.metersToPixels(body.position.x),
      this.unitConverter.metersToPixels(body.position.y)
    );
  }
}