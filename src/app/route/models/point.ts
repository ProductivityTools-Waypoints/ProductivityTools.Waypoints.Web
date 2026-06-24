export class Point {
    name: string;
    odometer: number | null;
    distance: number;//from the previous point
    comment: string;
    cumulativeDistnace:number;//cumulative from chosen point
    
    constructor(name: string, odometer: number | null, distance: number, comment:string) {
        this.name = name;
        this.odometer = odometer;
        this.distance = distance;
        this.comment=comment;
        this.cumulativeDistnace=0;
    }
}