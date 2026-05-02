import { Container, Graphics, Text } from "pixi.js";

export interface AxisHelperOptions {
    length?: number;
    lineWidth?: number;
    showLabels?: boolean;
    xColor?: number;
    yColor?: number;
    labelSize?: number;
    flipY?: boolean;
}

export class AxisHelper extends Container {
    
    private readonly graphics = new Graphics();
    private readonly xLabel: Text;
    private readonly yLabel: Text;

    private readonly length: number;
    private readonly lineWidth: number;
    private readonly showLabels: boolean;
    private readonly xColor: number;
    private readonly yColor: number;
    private readonly labelSize: number;
    private readonly flipY: boolean;

    public constructor(options: AxisHelperOptions = {}) {
        super();

        this.length = options.length ?? 100;
        this.lineWidth = options.lineWidth ?? 2;
        this.showLabels = options.showLabels ?? true;
        this.xColor = options.xColor ?? 0xff3333;
        this.yColor = options.yColor ?? 0x33ff33;
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

    private draw(): void {
        const g = this.graphics;
        const l = this.length;
        const yDirection = this.flipY ? -1 : 1;

        g.clear();

        // X axis
        g.moveTo(0, 0)
            .lineTo(l, 0)
            .stroke({
                color: this.xColor,
                width: this.lineWidth,
            });

        // X arrow
        g.moveTo(l, 0)
            .lineTo(l - 8, -5)
            .moveTo(l, 0)
            .lineTo(l - 8, 5)
            .stroke({
                color: this.xColor,
                width: this.lineWidth,
            });

        // Y axis
        g.moveTo(0, 0)
            .lineTo(0, l * yDirection)
            .stroke({
                color: this.yColor,
                width: this.lineWidth,
            });

        // Y arrow
        g.moveTo(0, l * yDirection)
            .lineTo(-5, (l - 8) * yDirection)
            .moveTo(0, l * yDirection)
            .lineTo(5, (l - 8) * yDirection)
            .stroke({
                color: this.yColor,
                width: this.lineWidth,
            });

        this.xLabel.position.set(l + 6, -this.labelSize / 2);
        this.yLabel.position.set(8, l * yDirection - this.labelSize / 2);
    }
}