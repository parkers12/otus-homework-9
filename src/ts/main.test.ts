import config from "./config";

import {
    handlerTableClick,
    getStart,
    getStop,
    getClear,
    getEditField,
    tick
} from "./main";

import { getAliveList } from "./extraFunctions";

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
    getInterval
} from "./control";

import {
    storageArrayAliveSave,
    getStorageArrayAlive
} from "./storage";

jest.mock("./storage", () => {
    const originalModule = jest.requireActual("./storage");
    return {
        __esModule: true,
        ...originalModule,
        storageArrayAliveSave: jest.fn(),
        getStorageArrayAlive: jest.fn(),
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
      getInterval: jest.fn(),
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
    const row: number = config.fields[0].value;
    const col: number = config.fields[1].value;

    const table =
        document.getElementById(`${config.classTable}`) as HTMLTableElement;
    const buttonStart =
        document.getElementById(`${config.button[0].id}`) as HTMLButtonElement;
    const buttonStop =
        document.getElementById(`${config.button[1].id}`) as HTMLButtonElement;
    const buttonClear =
        document.getElementById(`${config.button[2].id}`) as HTMLButtonElement;
    const rowField =
        document.getElementById(`${config.fields[0].id}`) as HTMLInputElement;
    const colField =
        document.getElementById(`${config.fields[1].id}`) as HTMLInputElement;
    const rangeField =
        document.getElementById(`${config.fields[2].id}`) as HTMLInputElement;

    // const aliveList = [
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]
    // ];

    test("Click on a cell table", () => {
        const mEvent: any = {
            target: {
                dataset: {
                    row: 0,
                    col: 4
                }
            },
        } as unknown as Event;

        getStorageArrayAlive.mockImplementation([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]);

        handlerTableClick(
            mEvent,
            table,
            buttonStart,
            buttonClear
        );
        
        expect(getPosClick).toHaveBeenCalled();
        expect(getToggleClass).toHaveBeenCalled();
        expect(getCountAliveCells).toHaveBeenCalled();
        expect(handleButton).toHaveBeenCalled();
        expect(getNewAliveList).toHaveBeenCalled();
        expect(storageArrayAliveSave).toHaveBeenCalled();
    });

    test("Click on a start button", () => {
        const aliveListNew = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        getInterval.mockImplementation(() => 1);
        getUpdateArray.mockImplementation(() => [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]);

        toEqualArr.mockImplementation(() => 1);
        getCountAliveCells.mockImplementation(() => 0);

        jest.runOnlyPendingTimers();
        
        getStart(
            table,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear,
            row,
            col
        );

        expect(getCountAliveCells).toHaveBeenCalled();
        expect(handleButton).toHaveBeenCalled();
    });

    test("Click on a stop button", () => {
        getStop(
            table,
            buttonStop,
            buttonStart,
            buttonClear
        );
        expect(getCountAliveCells).toHaveBeenCalled();
        expect(handleButton).toHaveBeenCalled();
    });

    test("Click on a clear button", () => {
        getClear(
            table,
            buttonStart,
            buttonClear,
            row,
            col
        );
        expect(clearTable).toHaveBeenCalled();
        expect(getCountAliveCells).toHaveBeenCalled();
        expect(handleButton).toHaveBeenCalled();
        expect(getAliveList).toHaveBeenCalled();
    });

    test("Click on a row field", () => {
        const mEvent: any = {
            target: {
                getAttribute: jest.fn()
                    .mockReturnValueOnce(config.fields[0].id),
            },
        } as unknown as Event;
        
        getActualTable.mockImplementation(() => [5, 5]);
        getChangeTable.mockImplementation(() => [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]);

        rowField.value = '6';

        getEditField(
            mEvent,
            table,
            rowField,
            colField
        );
        expect(getActualTable).toHaveBeenCalled();
        expect(getChangeTable).toHaveBeenCalled();
        expect(getMarkupTable).toHaveBeenCalled();
    });

    test("Click on a col field", () => {
        const mEvent: any = {
            target: {
                getAttribute: jest.fn()
                    .mockReturnValueOnce(config.fields[1].id),
            },
        } as unknown as Event;

        getActualTable.mockImplementation(() => [5, 5]);
        getChangeTable.mockImplementation(() => [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]);

        colField.value = '6';

        getEditField(
            mEvent,
            table,
            rowField,
            colField
        );
        expect(getActualTable).toHaveBeenCalled();
        expect(getChangeTable).toHaveBeenCalled();
        expect(getMarkupTable).toHaveBeenCalled();
    });

    test("Test function tick", () => {
        getStorageArrayAlive.mockImplementation(() => [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]);
        
        tick(
            table,
            row,
            col,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear
        );
        expect(getStorageArrayAlive).toHaveBeenCalled();
        expect(getUpdateArray).toHaveBeenCalled();
        expect(getInterval).toHaveBeenCalled();
        expect(getUpdateTable).toHaveBeenCalled();
        expect(toEqualArr).toHaveBeenCalled();
        expect(getCountAliveCells).toHaveBeenCalled();
    });

    test("Time stop and cell without", () => {
        getCountAliveCells.mockImplementation(() => 1);
        toEqualArr.mockImplementation(() => true);

        tick(
            table,
            row,
            col,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear
        );

        expect(buttonStart.disabled).toBe(true);
    });

    test("Go new iteration", () => {
        getCountAliveCells.mockImplementation(() => 1);
        toEqualArr.mockImplementation(() => false);

        tick(
            table,
            row,
            col,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear
        );

        expect(buttonStart.disabled).toBe(true);
    });

    test("New time interval", () => {
        getInterval.mockImplementation(() => 1000);
        tick(
            table,
            row,
            col,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear
        );

        expect(getUpdateArray).toHaveBeenCalled();
    });

    test("New time interval", () => {
        getInterval.mockImplementation(() => 5000);
        tick(
            table,
            row,
            col,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear
        );

        expect(getUpdateArray).toHaveBeenCalled();
    });
});