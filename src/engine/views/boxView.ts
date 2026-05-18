import { Graphics } from "pixi.js";
import { UnitConverter } from "../utils/unitConverter";
import { RigidBody2D } from "../physics/bodies/rigidBody2d";

export class BoxView {

  public readonly graphics: Graphics;
  private widthMeters: number;
  private heightMeters: number;

  constructor(
    widthMeters: number,
    heightMeters: number,
    private readonly unitConverter: UnitConverter
  ) {
    this.widthMeters = widthMeters;
    this.heightMeters = heightMeters;
    const widthPx = this.unitConverter.metersToPixels(widthMeters);
    const heightPx = this.unitConverter.metersToPixels(heightMeters);

    this.graphics = new Graphics()
      .rect(-widthPx / 2, -heightPx / 2, widthPx, heightPx)
      // .fill(0xff0000)
      .stroke({
        width: 2,
        color: 0xff0000,
      });
      console.log('xxx BoxView created with widthMeters:', widthMeters, 'heightMeters:', heightMeters);
  }

  public syncFrom(body: RigidBody2D): void {
    this.graphics.position.set(
      this.unitConverter.metersToPixels(body.position.x),
      this.unitConverter.metersToPixels(body.position.y)
    );
  }

  public getWidthMeters(): number {
    return this.widthMeters;
  }

  public getHeightMeters(): number {
    return this.heightMeters;
  }
}