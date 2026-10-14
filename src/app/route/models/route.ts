import { Point } from "./point";

export class Route {
    id: string;
    source: string;
    route: string;
    destination: string;
    points: Point[];

    constructor(id: string, source: string, route: string, destination: string) {
        this.id = id;
        this.source = source;
        this.route = route;
        this.destination = destination;
        this.points = [];
    }
}

export class RouteInput {
    id: string;
    source: string;
    route: string;
    destination: string;
    points: Point[];

    constructor(id: string, source: string, route: string, destination: string) {
        this.id = id;
        this.source = source;
        this.route = route;
        this.destination = destination;
        this.points = [];
    }
}