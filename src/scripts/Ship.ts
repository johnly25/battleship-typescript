export class Ship {
    length: number;
    numHits: number;
    constructor(length: number) {
        this.length = length;
        this.numHits = 0;
    }

    getLength() {
        return this.length;
    }

    hit() {
        this.numHits++;
    }

    IsSunk() {
        return this.numHits >= this.length;
    }
}
