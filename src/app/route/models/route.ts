import { Point } from "./point";

export class Route {
    id: string;
    name: string;
    direction: string;
    points: Point[];

    constructor(id: string, name: string, direction: string) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.points = [];
    }
}

export class RouteInput {
    id: string;
    name: string;
    direction: string;
    points: Point[];

    constructor(id: string, name: string, direction: string) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.points = [];
    }
}