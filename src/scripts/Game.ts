import { Player } from "./Player";
import { Ship } from "./Ship";

export class Game {
    players: Map<string, Player>;
    size: number = 8;
    recievingPlayer: Player;
    playerNames: string[];
    gameOver: boolean;

    constructor(player1: string, player2: string) {
        this.players = new Map<string, Player>([[player1, new Player(this.size, player1)], [player2, new Player(this.size, player2)]])
        this.playerNames = [player1, player2];
        this.recievingPlayer = this.players.get(this.playerNames[1])!;
        this.gameOver = false;
    }

    getStatus() {
        if(!this.gameOver) {
            if(this.recievingPlayer == this.players.get(this.playerNames[1])) {
                return 'Player 1 Turn';
            } else {
                return 'Player 2 Turn';
            }
        } else {
            return 'Game Over! ' + this.recievingPlayer.name + ' Won!'
        }
    }

    getGameOver() {
        return this.gameOver;
    }

    updateMove(player: string, x: number, y: number) {
        if (this.recievingPlayer.name != player && !this.gameOver) {
            this.recievingPlayer.gameboard.recieveAttack(x, y);
            this.checkGameOver();
            this.switchPlayer();
        }
    }

    checkGameOver() {
        this.gameOver = this.recievingPlayer.gameboard.allSunk();
    }

    switchPlayer() {
        if (this.recievingPlayer.name != this.playerNames[0]) {
            this.recievingPlayer = this.players.get(this.playerNames[0])!
        } else {
            this.recievingPlayer = this.players.get(this.playerNames[1])!;
        }
    }

    placeShip(player: string, x: number, y: number, length: number, vertical: boolean) {
        this.players.get(player)!.gameboard.placeShip(x, y, new Ship(length), vertical);
    }

    coordToString(x: number, y: number) {
        return x + ',' + y;
    }
}




