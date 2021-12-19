import config from "./config";
import markup from "./markup";
import extraFunctions from "./extraFunctions";
import {
    getMarkupTable,
    getAliveList,
    getToggleClass,
    getNewAliveList,
    clearTable,
    getCountAliveCells,
    handleButton,
    getActualTable,
    getChangeTable,
    getUpdateTable,
    toEqualArr,
    getInterval
} from "./control";

describe("Functions", () => {
    describe("Changing the table", () => {
        document.body.innerHTML = `<div class="app" id="app"></div>`;
        const app = document.getElementById("app") as HTMLElement;
        app.innerHTML = `<table class="table" id="table"></table>`;
        const table = document.getElementById("table") as HTMLTableElement;
        let arrayAlive = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        getMarkupTable(arrayAlive, table);

        test("Get an array of live cells", () => {
            const rowArray = table.querySelectorAll("tr");
            const colArray = rowArray[2].querySelectorAll("td");
            const cellStyle = colArray[2].classList;
            expect(cellStyle[0]).toEqual(config.classCell);
            expect(cellStyle[1]).toEqual(config.classCellActive);
        });

        test("getPosClick", () => {

        });

        test("getNewAliveList", () => {
            const rowNum = 4;
            const colNum = 2;
            expect(arrayAlive[rowNum][colNum]).toEqual(0);
            const arrayNew = getNewAliveList(arrayAlive, [rowNum, colNum]);
            expect(arrayNew[rowNum][colNum]).toEqual(1);
            const arrayClear = getNewAliveList(arrayAlive, [rowNum, colNum]);
            expect(arrayClear[rowNum][colNum]).toEqual(0);
        });


        describe("Changing the table", () => {
            const rowNum = 1;
            const colNum = 4;
            const rowArray = table.querySelectorAll("tr");
            const colArray = rowArray[rowNum].querySelectorAll("td");
            const cellStyle = colArray[colNum].classList;

            test("getToggleClass", () => {
                expect(cellStyle[rowNum]).toEqual(undefined);
                getToggleClass([rowNum, colNum]);
                expect(cellStyle[rowNum]).toEqual(config.classCellActive);
            });

            test("clearTable", () => {
                expect(cellStyle[rowNum]).toEqual(config.classCellActive);
                clearTable(table);
                expect(cellStyle[rowNum]).toEqual(undefined);
            });

            test("getCountAliveCells", () => {
                clearTable(table);
                getToggleClass([2, 3]);
                getToggleClass([1, 0]);
                getToggleClass([4, 6]);
                const numAlive:number = getCountAliveCells(table);
                expect(numAlive).toEqual(3);
            });
        });

        describe("handleButton", () => {
            markup(app);
            const buttonClear =
                document.getElementById("buttonClear") as HTMLButtonElement;
            test("Change the state of the button to active", () => {
                expect(buttonClear.disabled).toBe(true);
                handleButton(1, buttonClear);
                expect(buttonClear.disabled).toBe(false);
            });

            test("Change the state of the button to inactive", () => {
                expect(buttonClear.disabled).toBe(false);
                handleButton(0, buttonClear);
                expect(buttonClear.disabled).toBe(true);
            });
        });

        describe("getActualTable", () => {
            test("Actual number of rows and columns", () => {
                const sizeTable: number[] = getActualTable(table);
                expect(sizeTable[0]).toEqual(6);
                expect(sizeTable[1]).toEqual(7);
            });
        });

        describe("getChangeTable", () => {
            afterEach(() => {
                arrayAlive = [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
                ];
            });
            test("Increase the number of lines", () => {
                expect(arrayAlive.length).toEqual(6);
                getChangeTable(arrayAlive, 6, 7, 7, true);
                expect(arrayAlive.length).toEqual(7);
            });

            test("Reduce the number of lines", () => {
                expect(arrayAlive.length).toEqual(6);
                getChangeTable(arrayAlive, 6, 7, 5, true);
                expect(arrayAlive.length).toEqual(5);
            });

            test("Increase the number of columns", () => {
                expect(arrayAlive[0].length).toEqual(7);
                getChangeTable(arrayAlive, 6, 7, 8, false);
                expect(arrayAlive[0].length).toEqual(8);
            });

            test("Reduce the number of columns", () => {
                expect(arrayAlive[0].length).toEqual(7);
                getChangeTable(arrayAlive, 6, 7, 6, false);
                expect(arrayAlive[0].length).toEqual(6);
            });
        });

        describe("getUpdateTable", () => {
            test("Table cell update", () => {
                clearTable(table);
                const cellBefore = table.querySelectorAll(
                    `td[data-id-row='2'][data-id-col='1']`
                );
                const cellStyleBefore = cellBefore[0].getAttribute("class");
                expect(cellStyleBefore).toEqual(`${config.classCell}`);
                getUpdateTable(arrayAlive, 6, 7);
                const cellAfter = table.querySelectorAll(
                    `td[data-id-row='2'][data-id-col='1']`
                );
                const classes = cellAfter[0].getAttribute("class").split(" ");
                expect(classes[0]).toEqual(`${config.classCell}`);
                expect(classes[1]).toEqual(`${config.classCellActive}`);
            });
        });
    });

    describe("toEqualArr", () => {
        test("Equal arrays", () => {
            const a1 = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            const a2 = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            const isEqual = toEqualArr(a1, a2);
            expect(isEqual).toBe(true);
        });

        test("Not equal arrays", () => {
            const a1 = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 1, 0]
            ];

            const a2 = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            const isEqual = toEqualArr(a1, a2);
            expect(isEqual).toBe(false);
        });
    });

    describe("getInterval", () => {
        test("convert interval", () => {
            const rangeInitial: number = 3;
            const rangeField =
                document.getElementById("range") as HTMLInputElement;
            expect(rangeField.value).toBe('1');
            rangeField.setAttribute("value", `${rangeInitial}`);
            const rangeValue = getInterval(rangeField);
            expect(rangeField.value).toBe(String(rangeInitial));
            expect(rangeValue).toEqual(rangeInitial * 1000);
        });
    });
    
    describe("getUpdateArray", () => {
        jest.mock('./extraFunctions', () => {
            const originalModule = jest.requireActual('./extraFunctions');
          
            //Mock the default export and named export 'foo'
            return {
              __esModule: true,
              ...originalModule,
              getAliveList: 'mocked foo',
            };
        });
        test("Cell state change", () => {
            const arrayAlive = [
                [0, 1, 0],
                [1, 0, 0],
                [0, 1, 0]
            ];
            // const getAliveList = jest.fn();
            // const counterAroundCell = jest.fn();
            // const setConditionCell = jest.fn();
            //expect(arrayAlive[1][0]).toEqual(1);
            //expect(arrayAlive[1][1]).toEqual(0);
            //const arrayAliveNew = getUpdateArray(arrayAlive, 3, 3);
            //expect(arrayAliveNew[1][0]).toEqual(1);
            //expect(arrayAliveNew[1][1]).toEqual(0);
            //expect(arrayAliveNew[0][1]).toEqual(0);
            //expect(arrayAliveNew[2][1]).toEqual(0);
            // expect(getAliveList).toHaveBeenCalled();
            // expect(counterAroundCell).toHaveBeenCalled();
            // expect(setConditionCell).toHaveBeenCalled();


            expect(getAliveList).toBe('mocked foo');

        })
    });
});