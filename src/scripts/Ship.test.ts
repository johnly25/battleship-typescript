import { expect, test } from 'vitest'
import { Ship } from './Ship';

test('length getter', () => {
    let ship = new Ship(5);
    expect(ship.length).toBe(5);
})

test('length setter', () => {
    let ship = new Ship(5);
    ship.length = 10;
    expect(ship.length).toBe(10);
})


test('ship hit 5 times should sink', () => {
    let ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.IsSunk()).toBeTruthy();
});

test('ship hit 4 times or lower should sink not sink', () => {
    let ship = new Ship(5);
    for (let i = 0; i < ship.getLength() - 1; i++) {
        ship.hit();
    }

    expect(ship.IsSunk()).toBeFalsy();
})