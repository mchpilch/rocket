import { Graphics } from "pixi.js";
import { LineSegment2D } from "../physics/bodies/lineSegment2D";
import { UnitConverter } from "../utils/unitConverter";

export class LineView {
    public readonly graphics: Graphics;

    constructor(
        private readonly unitConverter: UnitConverter,
        private readonly color = 0x00ff00,
        private readonly widthPx = 1
    ) {
        this.graphics = new Graphics();
    }

    public syncFrom(line: LineSegment2D): void {
        this.graphics.clear();

        this.graphics
            .moveTo(
                this.unitConverter.metersToPixels(line.start.x),
                this.unitConverter.metersToPixels(line.start.y)
            )
            .lineTo(
                this.unitConverter.metersToPixels(line.end.x),
                this.unitConverter.metersToPixels(line.end.y)
            )
            .stroke({
                color: this.color,
                width: this.widthPx,
            });
    }
}