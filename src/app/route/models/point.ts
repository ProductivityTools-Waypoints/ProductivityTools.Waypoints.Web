export class Point {
    name: string;
    odometer: number | null;
    distance: number;
    comment: string;
    constructor(name: string, odometer: number | null, distance: number, comment:string) {
        this.name = name;
        this.odometer = odometer;
        this.distance = distance;
        this.comment=comment;
    }
}