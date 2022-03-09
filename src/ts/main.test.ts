import config from "./config";

import {
  handlerTableClick,
  getStart,
  getStop,
  getClear,
  getEditField,
  tick,
  createStorage,
} from "./main";

import { getAliveList, getInterval } from "./extraFunctions";

import {
  getMarkupTable,
  getCountAliveCells,
  handleButton,
  getPosClick,
  getNewAliveList,
  getToggleClass,
  clearTable,
  getUpdateArray,
  getUpdateTable,
  toEqualArr,
  getChangeTable,
  getActualTable,
} from "./control";

import {
  storageArrayAliveSave,
  getStorageArrayAlive,
  getStorageConfig,
  storageConfig,
} from "./storage";

jest.mock("./storage", () => {
  const originalModule = jest.requireActual("./storage");
  return {
    __esModule: true,
    ...originalModule,
    storageArrayAliveSave: jest.fn(),
    getStorageArrayAlive: jest.fn(),
    getStorageConfig: jest.fn(),
    storageConfig: jest.fn(),
  };
});

jest.mock("./control", () => {
  const originalModule = jest.requireActual("./control");
  return {
    __esModule: true,
    ...originalModule,
    getPosClick: jest.fn(),
    getToggleClass: jest.fn(),
    getCountAliveCells: jest.fn(),
    handleButton: jest.fn(),
    getNewAliveList: jest.fn(),
    getUpdateArray: jest.fn(),
    getUpdateTable: jest.fn(),
    toEqualArr: jest.fn(),
    getAliveList: jest.fn(),
    clearTable: jest.fn(),
    getActualTable: jest.fn(),
    getChangeTable: jest.fn(),
    getMarkupTable: jest.fn(),
  };
});

jest.mock("./extraFunctions", () => {
  const originalModule = jest.requireActual("./extraFunctions");
  return {
    __esModule: true,
    ...originalModule,
    getAliveList: jest.fn(),
    getInterval: jest.fn(),
  };
});

jest.useFakeTimers();

describe("Test handlers", () => {
  document.body.innerHTML = `
        <div class="app" id="app">
            <main class="main" id="main">
                <div class="form" id="form">
                    <div class="form-item">
                        <label for="rowField" class="label">Rows</label>
                        <input
                            id="rowField"
                            class="input"
                            type="number"
                            name="rowField"
                            value="5"
                            min="3"
                            max="30"
                            step="1"
                        >
                    </div>
                    <div class="form-item">
                        <label for="colField" class="label">Cols</label>
                        <input
                            id="colField"
                            class="input"
                            type="number"
                            name="colField"
                            value="5"
                            min="3"
                            max="30"
                            step="1"
                        >
                    </div>
                    <div class="form-item">
                        <label for="range" class="label">Speed</label>
                        <input
                            id="range"
                            class="range"
                            type="range"
                            name="tickmarks"
                            value="1"
                            min="1"
                            max="5"
                            step="1"
                            list="tickmarks"
                        >
                        <datalist id="tickmarks">
                            <option value="1" label="1">1</option>
                            <option value="2" label="2">2</option>
                            <option value="3" label="3">3</option>
                            <option value="4" label="4">4</option>
                            <option value="5" label="5">5</option>
                        </datalist>
                    </div>
                </div>
                <table class="table" id="table">
                    <tr class="row">
                        <td class="cell" data-row="0" data-col="0"></td>
                        <td class="cell" data-row="0" data-col="1"></td>
                        <td class="cell" data-row="0" data-col="2"></td>
                        <td class="cell" data-row="0" data-col="3"></td>
                        <td class="cell" data-row="0" data-col="4"></td>
                    </tr>
                    <tr class="row">
                        <td class="cell" data-row="1" data-col="0"></td>
                        <td class="cell" data-row="1" data-col="1"></td>
                        <td class="cell" data-row="1" data-col="2"></td>
                        <td class="cell" data-row="1" data-col="3"></td>
                        <td class="cell" data-row="1" data-col="4"></td>
                    </tr>
                    <tr class="row">
                        <td class="cell" data-row="2" data-col="0"></td>
                        <td class="cell" data-row="2" data-col="1"></td>
                        <td class="cell" data-row="2" data-col="2"></td>
                        <td class="cell" data-row="2" data-col="3"></td>
                        <td class="cell" data-row="2" data-col="4"></td>
                    </tr>
                    <tr class="row">
                        <td class="cell" data-row="3" data-col="0"></td>
                        <td class="cell" data-row="3" data-col="1"></td>
                        <td class="cell" data-row="3" data-col="2"></td>
                        <td class="cell" data-row="3" data-col="3"></td>
                        <td class="cell" data-row="3" data-col="4"></td>
                    </tr>
                    <tr class="row">
                        <td class="cell" data-row="4" data-col="0"></td>
                        <td class="cell" data-row="4" data-col="1"></td>
                        <td class="cell" data-row="4" data-col="2"></td>
                        <td class="cell" data-row="4" data-col="3"></td>
                        <td class="cell" data-row="4" data-col="4"></td>
                    </tr>
                </table>
                <div class="control" id="control">
                    <button
                        type="button"
                        id="buttonStart"
                        class="button"
                        disabled="disabled"
                    >
                        Start
                    </button>
                    <button
                        type="button"
                        id="buttonStop"
                        class="button"
                        disabled="disabled"
                    >
                        Stop
                    </button>
                    <button
                        type="button"
                        id="buttonClear"
                        class="button"
                        disabled="disabled"
                    >
                        Clear
                    </button>
                </div>
            </main>
        </div>
    `;
  const row: number = config.valueRows;
  const col: number = config.valueCols;

  const table = document.getElementById("table") as HTMLTableElement;
  const buttonStart = document.getElementById(
    "buttonStart"
  ) as HTMLButtonElement;
  const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
  const buttonClear = document.getElementById(
    "buttonClear"
  ) as HTMLButtonElement;
  const rowField = document.getElementById("rowField") as HTMLInputElement;
  const colField = document.getElementById("colField") as HTMLInputElement;
  const rangeField = document.getElementById("range") as HTMLInputElement;

  test("Click on a cell table", () => {
    const mEvent: any = {
      target: {
        dataset: {
          row: 0,
          col: 4,
        },
      },
    } as unknown as Event;

    (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    handlerTableClick(mEvent, buttonStart, buttonClear);

    expect(getPosClick).toHaveBeenCalled();
    expect(getToggleClass).toHaveBeenCalled();
    expect(getCountAliveCells).toHaveBeenCalled();
    expect(handleButton).toHaveBeenCalled();
    expect(getNewAliveList).toHaveBeenCalled();
    expect(storageArrayAliveSave).toHaveBeenCalled();
  });

  test("Click on a start button", () => {
    (getInterval as unknown as jest.Mock).mockImplementation(() => 1);
    (getUpdateArray as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    (toEqualArr as unknown as jest.Mock).mockImplementation(() => 1);
    (getCountAliveCells as unknown as jest.Mock).mockImplementation(() => 0);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    jest.runOnlyPendingTimers();

    getStart(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(getStorageConfig).toHaveBeenCalled();
    expect(getCountAliveCells).toHaveBeenCalled();
    expect(handleButton).toHaveBeenCalled();
  });

  test("Click on a stop button", () => {
    getStop(buttonStop, buttonStart, buttonClear, rowField, colField);
    expect(getCountAliveCells).toHaveBeenCalled();
    expect(handleButton).toHaveBeenCalled();
  });

  test("Click on a clear button", () => {
    getClear(buttonStart, buttonClear, row, col);
    expect(clearTable).toHaveBeenCalled();
    expect(getCountAliveCells).toHaveBeenCalled();
    expect(handleButton).toHaveBeenCalled();
    expect(getAliveList).toHaveBeenCalled();
  });

  test("Click on a row field", () => {
    const mEvent: any = {
      target: {
        getAttribute: jest.fn().mockReturnValueOnce("rowField"),
      },
    } as unknown as Event;

    (getActualTable as unknown as jest.Mock).mockImplementation(() => [5, 5]);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    (getChangeTable as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    rowField.value = "6";

    getEditField(
      mEvent,
      table,
      rowField,
      colField,
      rangeField,
      buttonStart,
      buttonClear
    );

    expect(getActualTable).toHaveBeenCalled();
    expect(getStorageConfig).toHaveBeenCalled();
    expect(getChangeTable).toHaveBeenCalled();
    expect(getMarkupTable).toHaveBeenCalled();
    expect(storageConfig).toHaveBeenCalled();
  });

  test("Click on a col field", () => {
    const mEvent: any = {
      target: {
        getAttribute: jest.fn().mockReturnValueOnce("colField"),
      },
    } as unknown as Event;

    (getActualTable as unknown as jest.Mock).mockImplementation(() => [5, 5]);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    (getChangeTable as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);

    colField.value = "6";

    getEditField(
      mEvent,
      table,
      rowField,
      colField,
      rangeField,
      buttonStart,
      buttonClear
    );

    expect(getActualTable).toHaveBeenCalled();
    expect(getStorageConfig).toHaveBeenCalled();
    expect(getChangeTable).toHaveBeenCalled();
    expect(getMarkupTable).toHaveBeenCalled();
    expect(storageConfig).toHaveBeenCalled();
  });

  test("Click on a range field", () => {
    const mEvent: any = {
      target: {
        getAttribute: jest.fn().mockReturnValueOnce("range"),
      },
    } as unknown as Event;

    (getActualTable as unknown as jest.Mock).mockImplementation(() => [5, 5]);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1500,
    }));

    (getCountAliveCells as unknown as jest.Mock).mockImplementation(() => 0);

    (getInterval as unknown as jest.Mock).mockImplementation(() => 500);

    rangeField.value = "5";

    buttonClear.disabled = false;
    buttonStart.disabled = false;

    getEditField(
      mEvent,
      table,
      rowField,
      colField,
      rangeField,
      buttonStart,
      buttonClear
    );

    expect(storageConfig).toHaveBeenCalled();
    expect(handleButton).toHaveBeenCalled();
  });

  test("Click on a range field", () => {
    const mEvent: any = {
      target: {
        getAttribute: jest.fn().mockReturnValueOnce("range"),
      },
    } as unknown as Event;

    (getActualTable as unknown as jest.Mock).mockImplementation(() => [5, 5]);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1500,
    }));

    rangeField.value = "5";

    getEditField(
      mEvent,
      table,
      rowField,
      colField,
      rangeField,
      buttonStart,
      buttonClear
    );

    expect(getInterval).toHaveBeenCalled();
  });

  test("Test function tick", () => {
    (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    (getCountAliveCells as unknown as jest.Mock).mockImplementation(() => 0);

    tick(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(getStorageArrayAlive).toHaveBeenCalled();
    expect(getStorageConfig).toHaveBeenCalled();
    expect(getUpdateArray).toHaveBeenCalled();
    expect(getUpdateTable).toHaveBeenCalled();
    expect(toEqualArr).toHaveBeenCalled();
    expect(getCountAliveCells).toHaveBeenCalled();
  });

  test("Time stop and cell without", () => {
    (getCountAliveCells as unknown as jest.Mock).mockImplementation(() => 1);
    (toEqualArr as unknown as jest.Mock).mockImplementation(() => true);

    tick(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(buttonStart.disabled).toBe(false);
  });

  test("Go new iteration", () => {
    (getCountAliveCells as unknown as jest.Mock).mockImplementation(() => 1);
    (toEqualArr as unknown as jest.Mock).mockImplementation(() => false);

    tick(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(buttonStart.disabled).toBe(false);
  });

  test("New time interval", () => {
    (getInterval as unknown as jest.Mock).mockImplementation(() => 1000);
    tick(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(getUpdateArray).toHaveBeenCalled();
  });

  test("New time interval", () => {
    (getInterval as unknown as jest.Mock).mockImplementation(() => 5000);
    tick(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );

    expect(getUpdateArray).toHaveBeenCalled();
  });

  test("createStorage", () => {
    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => null);
    (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(
      () => null
    );

    createStorage();

    expect(storageConfig).toHaveBeenCalled();
    expect(getStorageArrayAlive).toHaveBeenCalled();
    expect(storageArrayAliveSave).toHaveBeenCalled();
    expect(getAliveList).toHaveBeenCalled();
  });

  test("createStorage", () => {
    localStorage.removeItem("arrayAlive");
    localStorage.removeItem("config");
    const emptyArr = getStorageArrayAlive();
    const emptyConf = JSON.parse(localStorage.getItem("config") as string);
    expect(emptyArr).toBe(null);
    expect(emptyConf).toBe(null);
    const arrayAlive = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    createStorage();

    expect(getStorageConfig).toHaveBeenCalled();
    expect(storageConfig).toHaveBeenCalled();
    expect(getStorageArrayAlive).toHaveBeenCalled();
    expect(storageArrayAliveSave).toHaveBeenCalled();
    expect(getAliveList).toHaveBeenCalled();

    localStorage.setItem("arrayAlive", JSON.stringify(arrayAlive));

    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    createStorage();

    const arr = getStorageArrayAlive();

    expect(arrayAlive).toStrictEqual(arr);
  });

  test("update storage", () => {
    (getStorageConfig as unknown as jest.Mock).mockImplementation(() => ({
      valueRows: 5,
      minRows: 3,
      maxRows: 20,
      stepRows: 1,
      valueCols: 5,
      minCols: 3,
      maxCols: 20,
      stepCols: 1,
      valueRange: 3,
      minRange: 1,
      maxRange: 5,
      stepRange: 1,
      interval: 1000,
    }));

    (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    createStorage();

    expect(storageArrayAliveSave).toHaveBeenCalled();
  });
});
