import { expect, test } from 'vitest'
import { GameBoard } from './Gameboard'
import { Ship } from './Ship';


test('place ship at 0, 0 horizontally and within length of board', () => {
    let gameboard = new GameBoard(4);
    let placed = gameboard.placeShip(0,0, new Ship(2), false)
    expect(placed).toBeTruthy();
})

test('place ship at 1, 0 horizontally and within length of board', () => {
    let gameboard = new GameBoard(4);
    let placed = gameboard.placeShip(1,0, new Ship(2), false)
    expect(placed).toBeTruthy();
})

test('place ship at 4, 0 horizontally and outside length of board', () => {
    let gameboard = new GameBoard(4);
    let placed = gameboard.placeShip(4,0, new Ship(2), false)
    expect(placed).toBeFalsy();
})

test('place ship at 0, 0 horizontally and ship is longer than board', () => {
    let gameboard = new GameBoard(4);
    let placed = gameboard.placeShip(0,0, new Ship(5), false);
    expect(placed).toBeFalsy();
})

test('place ship at 0, 0, and another ship placed at 0, 0', () => {
    let gameboard = new GameBoard(4);
    gameboard.placeShip(0,0, new Ship(2), false);
    let placed = gameboard.placeShip(0,0, new Ship(2), false);
    expect(placed).toBeFalsy();
})

test('place ship at 0, 0, and another ship placed at 2, 0', () => {
    let gameboard = new GameBoard(4);
    gameboard.placeShip(0,0, new Ship(2), false);
    let placed = gameboard.placeShip(2,0, new Ship(2), false);
    expect(placed).toBeTruthy();
})

test('place ship at 0, 0, and another ship placed at 2, 0', () => {
    let gameboard = new GameBoard(5);
    gameboard.placeShip(2,0, new Ship(2), true);
    let placed = gameboard.placeShip(0,1, new Ship(3), false);
    console.log(gameboard.board);
    expect(placed).toBeFalsy();
})


test('ship hit correctly', () => {
    let gameboard = new GameBoard(4);
    let ship = new Ship(2);
    gameboard.placeShip(0,0, ship, false);
    gameboard.recieveAttack(0,0);
    expect(ship.numHits).toBe(1);
});

test('ship hit sinks', () => {
    let gameboard = new GameBoard(4);
    let ship = new Ship(2);
    gameboard.placeShip(0,0,ship, false);
    gameboard.recieveAttack(1,0);
    expect(gameboard.allSunk()).toBeFalsy();
})

test('ship hit sinks', () => {
    let gameboard = new GameBoard(4);
    let ship = new Ship(2);
    gameboard.placeShip(0,0,ship, false);
    gameboard.recieveAttack(0,0);
    gameboard.recieveAttack(1,0);
    expect(gameboard.allSunk()).toBeTruthy();
})

test('place ship at 0 3 vertically ', ()=> {
    let gameboard = new GameBoard(4);
    let ship = new Ship(2);
    gameboard.placeShip(3,0, ship, true);
    console.log(gameboard);
})
test('place ship at 3 0 vertically and it longer than board', ()=> {
    let gameboard = new GameBoard(4);
    let ship = new Ship(5);
    let placed = gameboard.placeShip(3,0, ship, true);
    expect(placed).toBeFalsy();
})

test('place ship at 3, 2 vertically and it longer than board', ()=> {
    let gameboard = new GameBoard(4);
    let ship = new Ship(3);
    let placed = gameboard.placeShip(3,2, ship, true);
    expect(placed).toBeFalsy();
})

test('place ship at 3 2 vertically and inside board', ()=> {
    let gameboard = new GameBoard(4);
    let ship = new Ship(2);
    let placed = gameboard.placeShip(3,2, ship, true);
    expect(placed).toBeTruthy();
})

test('place ship at 3 2 vertically and longer than board', ()=> {
    let gameboard = new GameBoard(4);
    let ship = new Ship(3);
    let placed = gameboard.placeShip(3,2, ship, true);
    expect(placed).toBeFalsy();
})