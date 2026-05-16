import { Container, Graphics, Text } from "pixi.js";

export interface AxisHelperOptions {

    lengthMeters?: number;
    pixelsPerMeter?: number;

    lineWidth?: number;
    showLabels?: boolean;
    showMeterTicks?: boolean;
    meterTickEvery?: number;

    xColor?: number;
    yColor?: number;
    labelSize?: number;
    flipY?: boolean;
}

export class AxisHelper extends Container {
    private readonly graphics = new Graphics();

    private readonly xLabel: Text;
    private readonly yLabel: Text;
    private readonly meterLabels: Text[] = [];

    private readonly lengthMeters: number;
    private readonly pixelsPerMeter: number;
    private readonly lineWidth: number;
    private readonly showLabels: boolean;
    private readonly showMeterTicks: boolean;
    private readonly meterTickEvery: number;
    private readonly xColor: number;
    private readonly yColor: number;
    private readonly labelSize: number;
    private readonly flipY: boolean;

    public constructor(options: AxisHelperOptions = {}) {
        super();

        this.lengthMeters = options.lengthMeters ?? 1;
        this.pixelsPerMeter = options.pixelsPerMeter ?? 100;

        this.lineWidth = options.lineWidth ?? 2;
        this.showLabels = options.showLabels ?? true;
        this.showMeterTicks = options.showMeterTicks ?? true;
        this.meterTickEvery = options.meterTickEvery ?? 1;

        this.xColor = options.xColor ?? 0xff1111;
        this.yColor = options.yColor ?? 0x2222ff;
        this.labelSize = options.labelSize ?? 14;
        this.flipY = options.flipY ?? false;

        this.xLabel = new Text({
            text: "X",
            style: {
                fontSize: this.labelSize,
                fill: this.xColor,
            },
        });

        this.yLabel = new Text({
            text: "Y",
            style: {
                fontSize: this.labelSize,
                fill: this.yColor,
            },
        });

        this.addChild(this.graphics);

        if (this.showLabels) {
            this.addChild(this.xLabel, this.yLabel);
        }

        this.draw();
    }

    private metersToPixels(meters: number): number {
        return meters * this.pixelsPerMeter;
    }

    private clearMeterLabels(): void {
        for (const label of this.meterLabels) {
            label.destroy();
        }

        this.meterLabels.length = 0;
    }

    private createMeterLabel(text: string, color: number): Text {
        return new Text({
            text,
            style: {
                fontSize: this.labelSize * 0.75,
                fill: color,
            },
        });
    }

    private draw(): void {
        const g = this.graphics;
        const lengthPx = this.metersToPixels(this.lengthMeters);
        const yDirection = this.flipY ? -1 : 1;

        const arrowSize = 8;
        const tickSize = 5;

        g.clear();
        this.clearMeterLabels();

        // X axis
        g.moveTo(0, 0)
            .lineTo(lengthPx, 0)
            .stroke({
                color: this.xColor,
                width: this.lineWidth,
            });

        // X arrow
        g.moveTo(lengthPx, 0)
            .lineTo(lengthPx - arrowSize, -5)
            .moveTo(lengthPx, 0)
            .lineTo(lengthPx - arrowSize, 5)
            .stroke({
                color: this.xColor,
                width: this.lineWidth,
            });

        // Y axis
        g.moveTo(0, 0)
            .lineTo(0, lengthPx * yDirection)
            .stroke({
                color: this.yColor,
                width: this.lineWidth,
            });

        // Y arrow
        g.moveTo(0, lengthPx * yDirection)
            .lineTo(-5, (lengthPx - arrowSize) * yDirection)
            .moveTo(0, lengthPx * yDirection)
            .lineTo(5, (lengthPx - arrowSize) * yDirection)
            .stroke({
                color: this.yColor,
                width: this.lineWidth,
            });

        if (this.showMeterTicks) {
            for (
                let meters = this.meterTickEvery;
                meters <= this.lengthMeters;
                meters += this.meterTickEvery
            ) {
                const positionPx = this.metersToPixels(meters);
                const labelText = `${meters}m`;

                // X tick
                g.moveTo(positionPx, -tickSize)
                    .lineTo(positionPx, tickSize)
                    .stroke({
                        color: this.xColor,
                        width: this.lineWidth,
                    });

                const xMeterLabel = this.createMeterLabel(labelText, this.xColor);
                xMeterLabel.position.set(positionPx - 8, tickSize + 2);
                this.meterLabels.push(xMeterLabel);
                this.addChild(xMeterLabel);

                // Y tick
                g.moveTo(-tickSize, positionPx * yDirection)
                    .lineTo(tickSize, positionPx * yDirection)
                    .stroke({
                        color: this.yColor,
                        width: this.lineWidth,
                    });

                const yMeterLabel = this.createMeterLabel(labelText, this.yColor);
                yMeterLabel.position.set(
                    tickSize + 2,
                    positionPx * yDirection - this.labelSize * 0.4,
                );
                this.meterLabels.push(yMeterLabel);
                this.addChild(yMeterLabel);
            }
        }

        this.xLabel.position.set(lengthPx + 15, -this.labelSize / 2);
        this.yLabel.position.set(0, lengthPx * yDirection - this.labelSize / 2 + 15);
    }
}