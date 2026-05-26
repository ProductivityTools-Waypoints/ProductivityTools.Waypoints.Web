import { Point } from "./point";

export class Route {
    id: number;
    name: string;
    direction: string;
    points: Point[];

    constructor(id: number, name: string, direction: string) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.points = [];
    }
}