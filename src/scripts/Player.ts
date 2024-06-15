import { GameBoard } from "./Gameboard"

export class Player {
    gameboard: GameBoard;
    name: string;
    
    constructor(length: number, name: string){
        this.gameboard = new GameBoard(length);
        this.name = name;
    }
}