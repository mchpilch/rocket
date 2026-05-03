export class UnitConverter {
    
    constructor(private readonly pixelsPerMeter: number) { }

    public metersToPixels(value: number): number {
        return value * this.pixelsPerMeter;
    }

    public pixelsToMeters(value: number): number {
        return value / this.pixelsPerMeter;
    }
}