import { Game } from "./Game";
export class DomController {
    game: Game;
    players: string[] = ['Player 1', 'Player 2'];

    constructor() {
        this.game = new Game(this.players[0], this.players[1]);
    }

    setup() {
        this.placeShip(this.players[0], 0, 0, 2, false);
        this.placeShip(this.players[1], 3, 0, 2, true);
        this.createStatus();
        this.updateStatus();
        this.setupBoards();
        this.showShips(this.players[0]);
        this.showShips(this.players[1]);
    }

    showShips(player: string) {
        let ships;
        if (player == this.players[0]) {
            ships = this.game.players.get(this.players[1])?.gameboard.board.keys()
        } else {
            ships = this.game.players.get(this.players[0])?.gameboard.board.keys()
        }
        for (var key of ships!) {
            const x = this.stringToCoord(key)[0],
                y = this.stringToCoord(key)[1];
            const query = '.gameboard[data-player=\"' + player + '"]' + ' td[data-x="' + x + '"]' + '[data-y="' + y + '"]';
            let cell = document.querySelector(query);
            cell?.classList.add('show-ship');
        }
    }

    stringToCoord(str: string) {
        const coord = str.split(',');
        return coord;
    }

    placeShip(player: string, x: number, y: number, length: number, vertical: boolean) {
        this.game.placeShip(player, x, y, length, vertical);
    }

    setupBoards() {
        this.createPlayerContainer(this.players[0]);
        this.createGameTitle(this.players[0]);
        this.createGrid(this.players[0]);
        this.createPlayerContainer(this.players[1]);
        this.createGameTitle(this.players[1]);
        this.createGrid(this.players[1]);

        this.setupListeners();
    }

    createStatus() {
        const app = document.getElementById('app');
        const status = document.createElement('div');
        // status.textContent = 'status';
        app?.append(status);
        status.classList.add('status');
    }

    createPlayerContainer(player: string) {
        const app = document.getElementById('app');
        const gameboard = document.createElement('div');
        gameboard.dataset.player = player;
        app?.append(gameboard);
        gameboard?.classList.add('gameboard');
    }

    createGrid(player: string) {
        const gameboard = (document.querySelector('.gameboard[data-player="' + player + '"]') as HTMLElement);
        gameboard?.classList.add('gameboard');
        const table = document.createElement('table');
        for (let j = this.game.size - 1; j >= 0; j--) {
            const tr = document.createElement('tr');
            for (let i = 0; i < this.game.size; i++) {
                const td = document.createElement('td');
                td.dataset.player = player;
                td.dataset.x = String(i);
                td.dataset.y = String(j);
                tr.append(td);
            }
            table.append(tr);
        }
        gameboard?.append(table);
    }

    createGameTitle(player: string) {
        const gameboard = (document.querySelector('.gameboard[data-player="' + player + '"]') as HTMLElement);
        gameboard.dataset.player = player;
        const title = document.createElement('div');
        title.textContent = player + '\'s board';
        gameboard?.appendChild(title);
    }

    setupListeners() {
        const cells = document.querySelectorAll('.gameboard[data-player]' + " td");
        cells.forEach((elem) => {
            elem.addEventListener("click", (e) => this.sendMove(e));
        });
    }

    updateStatus() {
        let status = document.querySelector('.status');
        if (status) status.textContent = this.game.getStatus();
    }

    updateBoards() {
        this.game.players.forEach((player) => {
            console.log(player.name);
            console.log(player.gameboard.missed);
            
            player.gameboard.missed.forEach((key) => {
                const x = this.stringToCoord(key)[0]
                const y = this.stringToCoord(key)[1]
                if(player.name == this.players[0]) {
                    this.updateCell(this.players[1], x, y, 'missed')
                } else {
                    this.updateCell(this.players[0], x, y, 'missed')
                }
            })

            player.gameboard.hits.forEach((key) => {
                const x = this.stringToCoord(key)[0]
                const y = this.stringToCoord(key)[1]
                if(player.name == this.players[0]) {
                    this.updateCell(this.players[1], x, y, 'hit');
                } else {
                    this.updateCell(this.players[0], x, y, 'hit');
                }
            })
        })
    }

    updateCell(player: string, x: string, y: string, className: string) {
        const cell = document.querySelector('.gameboard[data-player="' + player + '"] td[data-x="' + x + '"][data-y="' + y + '"]');
        cell?.classList.add(className);
        console.log(cell);
        console.log(player, x, y);
    }

    sendMove(e: any) {
        if (!this.game.getGameOver()) {
            const player = e.currentTarget.dataset.player;
            const x = e.currentTarget.dataset.x;
            const y = e.currentTarget.dataset.y;
            console.log(player, x, y)
            this.game.updateMove(player, x, y);
            this.updateStatus();
            this.updateBoards();
        }
   
    }
}


