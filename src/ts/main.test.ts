import config from "./config";

import {
    handlerTableClick,
    getStart,
    getStop,
    getClear,
    getEditField
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

jest.useFakeTimers();

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

describe("Test handlers", () => {
    document.body.innerHTML = `
            <div class="app" id="app">
                <input
                    id="rowField"
                    class="input"
                    name="rowField"
                    value="5"
                >
                <input
                    id="colField"
                    class="input"
                    name="colField"
                    value="5"
                >
            </div>`;
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

    const aliveList = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    test("Click on a cell table", () => {
        const mEvent: any = {
            target: {
                dataset: {
                    row: 0,
                    col: 4
                }
            },
        } as unknown as Event;

        handlerTableClick(
            mEvent,
            table,
            buttonStart,
            buttonClear,
            aliveList
        );
        expect(getPosClick).toHaveBeenCalled();
        expect(getToggleClass).toHaveBeenCalled();
        expect(getCountAliveCells).toHaveBeenCalled();
        expect(handleButton).toHaveBeenCalled();
        expect(getNewAliveList).toHaveBeenCalled();
    });

    test("Click on a start button", () => {
        jest.runAllTimers();
        getStart(
            aliveList,
            table,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear,
            row,
            col
        );
        // expect(getInterval).toHaveBeenCalled();
        // expect(getUpdateArray).toHaveBeenCalled();
        // expect(getUpdateTable).toHaveBeenCalled();
        // expect(toEqualArr).toHaveBeenCalled();
        // expect(getCountAliveCells).toHaveBeenCalled();
        // expect(handleButton).toHaveBeenCalled();
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
            aliveList,
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
            aliveList,
            table,
            rowField,
            colField
        );
        expect(getActualTable).toHaveBeenCalled();
        expect(getChangeTable).toHaveBeenCalled();
        expect(getMarkupTable).toHaveBeenCalled();
    });
});