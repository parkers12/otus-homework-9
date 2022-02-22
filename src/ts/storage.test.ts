import { storageArrayAliveSave, getStorageArrayAlive } from "./storage";

describe("Test storage", () => {
  test("Missing data in config", () => {
    const arrayAlive = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    storageArrayAliveSave(arrayAlive);
    const arr = JSON.parse(localStorage.getItem("arrayAlive") as string);
    expect(arr).toStrictEqual(arrayAlive);
  });

  test("Missing data in config", () => {
    const arrayAlive = [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ];
    localStorage.setItem("arrayAlive", JSON.stringify(arrayAlive));
    const arr = getStorageArrayAlive();
    expect(arrayAlive).toStrictEqual(arr);
  });
});
