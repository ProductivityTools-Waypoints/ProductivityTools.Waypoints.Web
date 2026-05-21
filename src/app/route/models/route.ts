export class Route {
    id: number;
    name: string;
    direction: string;
    constructor(id: number, name: string, direction: string) {
        this.id = id;
        this.name = name;
        this.direction = direction;
    }
}