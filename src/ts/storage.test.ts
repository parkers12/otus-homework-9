import {
  storageArrayAliveSave,
  getStorageArrayAlive
} from "./storage";

describe("Test storage", () => {
  test("storageArrayAliveSave", () => {
    localStorage.removeItem('arrayAlive');

    const emptyArr = JSON.parse(localStorage.getItem("arrayAlive") as string);

    expect(emptyArr).toBe(null);

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

  test("getStorageArrayAlive", () => {
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
