import { Graphics } from "pixi.js";
import { UnitConverter } from "../utils/unitConverter";
import { RigidBody2D } from "../physics/bodies/rigidBody2D";

export class CircleView {

    public readonly graphics: Graphics;
    private radiusMeters: number;

    constructor(
        radiusMeters: number,
        private readonly unitConverter: UnitConverter
    ) {
        this.radiusMeters = radiusMeters;
        const radiusPx = this.unitConverter.metersToPixels(radiusMeters);

        this.graphics = new Graphics()
            .circle(0, 0, radiusPx)
            .stroke({ width: 2, color: 0xff0000 }); // visible rendering
    }

    public syncFrom(body: RigidBody2D): void {
        this.graphics.position.set(
            this.unitConverter.metersToPixels(body.position.x),
            this.unitConverter.metersToPixels(body.position.y)
        );
    }

    public getRadiusMeters(): number {
        return this.radiusMeters;
    }
}