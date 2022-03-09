import {
  getMarkupTable,
  getPosClick,
  getToggleClass,
  getNewAliveList,
  clearTable,
  getCountAliveCells,
  handleButton,
  handleInput,
  getActualTable,
  getChangeTable,
  getUpdateTable,
  getUpdateArray,
  toEqualArr,
  getInterval,
} from "./control";

import { storageArrayAliveSave, getStorageArrayAlive } from "./storage";

jest.mock("./storage", () => {
  const originalModule = jest.requireActual("./storage");
  return {
    __esModule: true,
    ...originalModule,
    storageArrayAliveSave: jest.fn(),
    getStorageArrayAlive: jest.fn(),
  };
});

describe("Test functions", () => {
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

  const table = document.getElementById("table") as HTMLTableElement;

  describe("Changing the table", () => {
    const arrayAlive = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    getMarkupTable(arrayAlive, table);

    const rowArray = table.querySelectorAll("tr");

    test("Get an array of live cells", () => {
      const rowNum = 2;
      const colNum = 2;
      const colArray = rowArray[rowNum].querySelectorAll("td");
      const cellStyle = colArray[colNum].classList;
      expect(cellStyle[0]).toEqual("cell");
      expect(cellStyle[1]).toEqual("cell_alive");
    });

    test("Get coordinates click", () => {
      const rowNum = "2";
      const colNum = "2";
      const mEvent: any = {
        target: table.rows[rowNum].cells[colNum],
      } as unknown as Event;

      const res = getPosClick(mEvent);
      expect(res).toStrictEqual([rowNum, colNum]);
    });

    test("Get new list", () => {
      (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);

      const rowNum = "4";
      const colNum = "2";

      expect(arrayAlive[rowNum][colNum]).toEqual(0);

      const arrayNew = getNewAliveList([rowNum, colNum]);

      (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ]);

      expect(arrayNew[rowNum][colNum]).toEqual(1);

      const arrayClear = getNewAliveList([rowNum, colNum]);

      expect(arrayClear[rowNum][colNum]).toEqual(0);
    });

    test("Change class in cell", () => {
      const rowNum = "1";
      const colNum = "4";

      const colArray = rowArray[rowNum].cells;
      const cellStyle = colArray[colNum].classList;

      expect(cellStyle[rowNum]).toEqual(undefined);

      getToggleClass([rowNum, colNum]);

      expect(cellStyle[rowNum]).toEqual("cell_alive");
    });

    test("clearTable", () => {
      const rowNum = "1";
      const colNum = "4";

      const colArray = rowArray[rowNum].cells;
      const cellStyle = colArray[colNum].classList;

      expect(cellStyle[rowNum]).toEqual("cell_alive");

      clearTable();

      expect(cellStyle[rowNum]).toEqual(undefined);
    });

    test("getCountAliveCells", () => {
      clearTable();

      getToggleClass(["2", "3"]);
      getToggleClass(["1", "0"]);
      getToggleClass(["3", "4"]);

      const numAlive: number = getCountAliveCells();

      expect(numAlive).toEqual(3);
    });

    describe("handleButton", () => {
      const buttonClear = document.getElementById(
        "buttonClear"
      ) as HTMLButtonElement;

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

    describe("handleInput", () => {
      const colField = document.getElementById("colField") as HTMLInputElement;

      test("Change the state of the input to active", () => {
        expect(colField.disabled).toBe(false);
        handleInput(true, colField);
        expect(colField.disabled).toBe(true);
      });

      test("Change the state of the input to inactive", () => {
        expect(colField.disabled).toBe(true);
        handleInput(false, colField);
        expect(colField.disabled).toBe(false);
      });
    });

    describe("getActualTable", () => {
      test("Actual number of rows and columns", () => {
        const sizeTable: number[] = getActualTable(table);
        expect(sizeTable[0]).toEqual(5);
        expect(sizeTable[1]).toEqual(5);
      });
    });

    describe("getChangeTable", () => {
      test("Increase the number of lines", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        expect(arrBefore.length).toEqual(5);
        getChangeTable(5, 5, 6, true);
        expect(getStorageArrayAlive).toHaveBeenCalled();
        expect(storageArrayAliveSave).toHaveBeenCalled();
        expect(arrAfter.length).toEqual(6);
      });

      test("Reduce the number of lines", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        expect(arrBefore.length).toEqual(6);
        getChangeTable(6, 5, 5, true);
        expect(arrAfter.length).toEqual(5);
      });

      test("Increase the number of columns", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ];

        expect(arrBefore[0].length).toEqual(5);
        getChangeTable(5, 5, 6, false);
        expect(arrAfter[0].length).toEqual(6);
      });

      test("Reduce the number of columns", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        expect(arrBefore[0].length).toEqual(6);
        getChangeTable(5, 6, 5, false);
        expect(arrAfter[0].length).toEqual(5);
      });

      test("Num of rows is less than the given one", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        expect(arrBefore.length).toEqual(5);
        getChangeTable(5, 5, 0, true);
        expect(arrAfter.length).toEqual(3);
      });

      test("Number of rows is greater than the given one", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        expect(arrBefore.length).toEqual(5);
        getChangeTable(5, 5, 50, true);
        expect(arrAfter.length).toEqual(20);
      });

      test("Num of cols is less than the given one", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ];

        expect(arrBefore[0].length).toEqual(5);
        getChangeTable(5, 5, 0, false);
        expect(arrAfter[0].length).toEqual(3);
      });

      test("Number of rows is greater than the given one", () => {
        const arrBefore = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];

        const arrAfter = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        expect(arrBefore[0].length).toEqual(5);
        getChangeTable(5, 5, 50, false);
        expect(arrAfter[0].length).toEqual(20);
      });
    });

    describe("getUpdateTable", () => {
      test("Table cell update", () => {
        (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(
          () => [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ]
        );
        const rowNum = 2;
        const colNum = 2;

        clearTable();

        const cellBefore = table.querySelectorAll(
          `td[data-row='${rowNum}'][data-col='${colNum}']`
        );
        const cellStyleBefore = cellBefore[0].getAttribute("class");

        expect(cellStyleBefore).toEqual("cell");

        getUpdateTable(5, 5);

        const cellAfter = table.querySelectorAll(
          `td[data-row='${rowNum}'][data-col='${colNum}']`
        );
        const classes = cellAfter[0].getAttribute("class")!.split(" ");

        expect(classes[0]).toEqual("cell");
        expect(classes[1]).toEqual("cell_alive");
      });
    });
  });

  describe("toEqualArr", () => {
    test("Equal arrays", () => {
      const array1 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const array2 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const isEqual = toEqualArr(array1, array2);

      expect(isEqual).toBe(true);
    });

    test("Not equal arrays", () => {
      const array1 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0],
      ];

      const array2 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const isEqual = toEqualArr(array1, array2);

      expect(isEqual).toBe(false);
    });
  });

  describe("getInterval", () => {
    test("convert interval", () => {
      const rangeInitial = 1;
      const rangeField = document.getElementById("range") as HTMLInputElement;

      expect(rangeField.value).toBe("1");

      rangeField.setAttribute("value", `${rangeInitial}`);
      const rangeValue = getInterval();

      expect(rangeField.value).toBe(String(rangeInitial));
      expect(rangeValue).toEqual(rangeInitial * 1000);
    });
  });

  describe("getUpdateArray", () => {
    test("Cell state change", () => {
      (getStorageArrayAlive as unknown as jest.Mock).mockImplementation(() => [
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);

      const arrayAliveAfter = [
        [0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const defaultExportResult = getUpdateArray(5, 5);

      expect(defaultExportResult).toEqual(arrayAliveAfter);
    });
  });
});
