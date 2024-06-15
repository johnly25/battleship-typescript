import { Ship } from "./Ship";

export class GameBoard {
    board: Map<string, Ship>;
    length: number;  //[new SHip (3),new SHip (3)]]
    numMissed: number;
    ships: Set<Ship>;
    hits: Set<string>;
    missed: Set<string>;

    constructor(length: number) {
        this.board = new Map<string, Ship>;
        this.length = length;
        this.numMissed = 0;
        this.missed = new Set<string>;
        this.hits = new Set<string>;
        this.ships = new Set<Ship>
    }

    placeShip(x: number, y: number, ship: Ship, vertical: boolean) {
        if (!this.checkValidPlacement(x, y, ship, vertical)) {
            return false;
        } else {
            if (vertical) {
                for (let i = 0; i < ship.getLength(); i++) {
                    this.board.set(this.coordToString(x, y + i), ship);
                }
            } else {
                for (let i = 0; i < ship.getLength(); i++) {
                    this.board.set(this.coordToString(x + i, y), ship);
                }
            }
            this.ships.add(ship);
            return true;
        }
    }

    coordToString(x: number, y: number) {
        return x + ',' + y;
    }

    checkValidPlacement(x: number, y: number, ship: Ship, vertical: boolean) {
        return !this.checkOutofBounds(x, y, ship, vertical) && !this.checkTaken(x, y, ship, vertical);
    }

    checkOutofBounds(x: number, y: number, ship: Ship, vertical: boolean) {
        if (vertical) {
            return !(ship.getLength() + y <= this.length);
        } else {
            return !(ship.getLength() + x <= this.length);
        }
    }

    checkTaken(x: number, y: number, ship: Ship, vertical: boolean) {
        if (vertical) {
            for (let i = 0; i < ship.getLength(); i++) {
                let key = this.coordToString(x, y + i);
                if (this.board.has(key)) {
                    return true
                }
            }
        } else {
            for (let i = 0; i < ship.getLength(); i++) {
                let key = this.coordToString(x + i, y);
                if (this.board.has(key)) {
                    return true
                }
            }
        }
        return false
    }

    recieveAttack(x: number, y: number) {
        let key = this.coordToString(x, y);
        if (this.board.has(key)) {
            this.board.get(key)?.hit();
            this.board.delete(key);
            this.hits.add(key);
        } else {
            this.missed.add(key);
        }
    }

    allSunk() {
        return this.board.size == 0;
    }
}