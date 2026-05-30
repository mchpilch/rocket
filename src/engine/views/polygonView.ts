import { Graphics } from "pixi.js";
import { UnitConverter } from "../utils/unitConverter";
import { RigidBody2D } from "../physics/bodies/rigidBody2D";

export class PolygonView {
  public readonly graphics: Graphics;

  constructor(
    private readonly sides: number,
    private readonly radiusMeters: number,
    private readonly unitConverter: UnitConverter
  ) {
    if (sides < 3) {
      throw new Error("PolygonView requires at least 3 sides.");
    }

    const radiusPx = this.unitConverter.metersToPixels(radiusMeters);
    const points: number[] = [];

    for (let i = 0; i < sides; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;

      points.push(
        Math.cos(angle) * radiusPx,
        Math.sin(angle) * radiusPx
      );
    }

    this.graphics = new Graphics()
      .poly(points)
      .stroke({
        width: 2,
        color: 0xff0000,
      });

    console.log(
      "PolygonView created with sides:",
      sides,
      "radiusMeters:",
      radiusMeters
    );
  }

  public syncFrom(body: RigidBody2D): void {
    this.graphics.position.set(
      this.unitConverter.metersToPixels(body.position.x),
      this.unitConverter.metersToPixels(body.position.y)
    );

    // this.graphics.rotation = body.rotation ?? 0; // todo
  }

  public getSides(): number {
    return this.sides;
  }

  public getRadiusMeters(): number {
    return this.radiusMeters;
  }
}