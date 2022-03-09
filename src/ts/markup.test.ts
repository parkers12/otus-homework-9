import markup from "./markup";
import { getAliveList } from "./extraFunctions";
import { getMarkupTable } from "./control";
import { errorMessage } from "./errorMessage";
import { getStorageConfig } from "./storage";

jest.mock("./errorMessage", () => {
  const originalModule = jest.requireActual("./errorMessage");
  return {
    __esModule: true,
    ...originalModule,
    errorMessage: jest.fn(),
  };
});

jest.mock("./storage", () => {
  const originalModule = jest.requireActual("./storage");
  return {
    __esModule: true,
    ...originalModule,
    getStorageConfig: jest.fn(),
  };
});

describe("markup", () => {
  document.body.innerHTML = `<div class="app" id="app"></div>`;
  const app = document.getElementById("app") as HTMLElement;

  (getStorageConfig as unknown as jest.Mock).mockImplementation(() => (
    {
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
    })
  );

  test("Table presence on the page", () => {
    markup(app);

    const table = document.getElementById("table") as HTMLTableElement;

    expect(table !== null).toBe(true);
  });

  describe("markup table", () => {
    const arr: number[][] = getAliveList(7, 12);

    test("Table size", () => {
      markup(app);
      
      expect(arr.length).toBe(7);
      expect(arr[0].length).toBe(12);
    });

    test("Cell attributes", () => {
      markup(app);

      const table = document.getElementById("table") as HTMLTableElement;
      const rowTest = "3";
      const colTest = "2";

      getMarkupTable(arr, table);

      const rowArray = table.querySelectorAll(`tr`);
      const cellArray = rowArray[Number(rowTest)].querySelectorAll(`td`);
      const row = cellArray[Number(colTest)].getAttribute("data-row");
      const cell = cellArray[Number(colTest)].getAttribute("data-col");

      expect(row).toBe(rowTest);
      expect(cell).toBe(colTest);
    });

    test("Cell style", () => {
      markup(app);

      const table = document.getElementById("table") as HTMLTableElement;

      getMarkupTable(arr, table);

      const rowArray = table.querySelectorAll(`tr`);
      const cellArray = rowArray[1].querySelectorAll(`td`);
      const cell = cellArray[1].getAttribute("class");

      expect(cell).toBe("cell");
    });
  });

  describe("markup control", () => {
    test("Inputs", () => {
      markup(app);

      const inputRows = app.querySelectorAll("rowField");
      const colField = app.querySelectorAll("colField");
      const rangeField = app.querySelectorAll("range");

      expect(inputRows[0] !== null).toBe(true);
      expect(colField[0] !== null).toBe(true);
      expect(rangeField[0] !== null).toBe(true);
    });

    test("Buttons", () => {
      markup(app);

      const buttonStart = app.querySelectorAll("buttonStart");
      const buttonStop = app.querySelectorAll("buttonStop");
      const buttonClear = app.querySelectorAll("buttonClear");

      expect(buttonStart[0] !== null).toBe(true);
      expect(buttonStop[0] !== null).toBe(true);
      expect(buttonClear[0] !== null).toBe(true);
    });
  });

  describe("Test errors", () => {
    test("Missing data in config", () => {
      (getStorageConfig as unknown as jest.Mock).mockImplementation(() => (
        {
          valueRows: 2,
          minRows: 1,
          maxRows: 20,
          stepRows: 1,
          valueCols: 1,
          minCols: 1,
          maxCols: 20,
          stepCols: 1,
          valueRange: 3,
          minRange: 1,
          maxRange: 5,
          stepRange: 1,
          interval: 1000,
        })
      );

      markup(app);

      expect(getStorageConfig).toHaveBeenCalled();
      expect(errorMessage).toHaveBeenCalled();
    });
  });
});
