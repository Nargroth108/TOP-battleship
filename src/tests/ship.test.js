/* eslint-disable no-undef */
import Ship from "../ship";

test("Return a Ship object with the property length", () => {
  expect(Ship(2)).toHaveProperty("length", 2);
});

test("Return a Ship object with the property hitCount", () => {
  expect(Ship(2)).toHaveProperty("hitCount", 0);
});

test("Return a Ship object with the property sunk", () => {
  expect(Ship(2)).toHaveProperty("sunk", false);
});

test("Return a Ship object with the method hit", () => {
  expect(Ship(2)).toHaveProperty("hit");
});

test("Check if hit method increases hitCount by 1", () => {
  expect(Ship(2).hit()).toBe(1);
});
