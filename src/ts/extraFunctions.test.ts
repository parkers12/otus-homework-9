import {
  getAliveList,
  counterAroundCell,
  setConditionCell,
} from "./extraFunctions";

import { getStorageArrayAlive } from "./storage";

jest.mock("./storage", () => {
  const originalModule = jest.requireActual("./storage");
  return {
    __esModule: true,
    ...originalModule,
    storageArrayAliveSave: jest.fn(),
    getStorageArrayAlive: jest.fn(),
  };
});

describe("getAliveList", () => {
  test("Get an array of live cells", () => {
    const rowNum = 5;
    const colNum = 7;
    const array: number[][] = getAliveList(rowNum, colNum);
    expect(array.length).toEqual(rowNum);
    expect(array[0].length).toEqual(colNum);
  });
});

describe("counterAroundCell", () => {
  test("Count the number of living neighbors at zero", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 1);
    expect(sum).toEqual(0);
  });

  test("Count the number of living neighbors in cell 1, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 1);
    expect(sum).toEqual(3);
  });

  test("Count the number of living neighbors in cell 1, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 1);
    expect(sum).toEqual(8);
  });

  test("Count the number of living neighbors in cell 0, 0", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(0, 0);
    expect(sum).toEqual(2);
  });

  test("Count the number of living neighbors in cell 0, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(0, 1);
    expect(sum).toEqual(2);
  });

  test("Count the number of living neighbors in cell 1, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 1);
    expect(sum).toEqual(2);
  });

  test("Count the number of living neighbors in cell 1, 2", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 2);
    expect(sum).toEqual(3);
  });

  test("Count the number of living neighbors in cell 2, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(2, 1);
    expect(sum).toEqual(5);
  });

  test("Count the number of living neighbors in cell 4, 1", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(4, 1);
    expect(sum).toEqual(2);
  });

  test("Count the number of living neighbors in cell 1, 4", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    const sum: number = counterAroundCell(1, 4);
    expect(sum).toEqual(3);
  });
});

describe("setConditionCell", () => {
  test("Cell state change", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    const arrayCounters = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const arrayAlive = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(arrayAlive[0][0]).toEqual(1);
    const arrayAliveNew = setConditionCell(arrayCounters, 3, 3);
    expect(arrayAliveNew[0][0]).toEqual(0);
  });

  test("Cell state change", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ]);

    const arrayCounters = [
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0],
    ];

    const arrayAlive = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
    expect(arrayAlive[1][1]).toEqual(1);
    const arrayAliveNew = setConditionCell(arrayCounters, 3, 3);
    expect(arrayAliveNew[1][1]).toEqual(1);
  });

  test("Cell state change", () => {
    getStorageArrayAlive.mockImplementation(() => [
      [0, 1, 0],
      [1, 0, 0],
      [0, 1, 0],
    ]);

    const arrayCounters = [
      [0, 0, 0],
      [0, 3, 0],
      [0, 0, 0],
    ];

    const arrayAlive = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 1, 0],
    ];
    expect(arrayAlive[1][1]).toEqual(0);
    const arrayAliveNew = setConditionCell(arrayCounters, 3, 3);
    expect(arrayAliveNew[1][1]).toEqual(1);
  });
});
