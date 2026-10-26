export const POINT_TYPES = ['Food', 'Gas', 'Limit', 'MOP', 'Gates'] as const;
export type PointType = typeof POINT_TYPES[number];

export class Point {
    name: string;
    odometer: number | null;
    distance: number;//from the previous point
    comment: string;
    types?: string[] | null; // null for points without a category (GraphQL returns null)
    cumulativeDistnace:number;//cumulative from chosen point
    
    constructor(name: string, odometer: number | null, distance: number, comment: string, types: string[] | null = null) {
        this.name = name;
        this.odometer = odometer;
        this.distance = distance;
        this.comment=comment;
        this.types = types ? [...types] : [];
        this.cumulativeDistnace=0;
    }
}