export class Point {
    name: string;
    odometer: number | null;
    distance: number;
    constructor(name: string, odometer: number | null, distance: number) {
        this.name = name;
        this.odometer = odometer;
        this.distance = distance;
    }
}