import config from "./config";
import markup from "./markup";
import { getMarkupTable, getAliveList } from "./control";

describe("markup", () => {
    document.body.innerHTML = `<div class="app" id="app"></div>`;
    const app = document.getElementById("app") as HTMLElement;
    markup(app);

    const table = document.getElementById("table") as HTMLTableElement;

    test("Table presence on the page", () => {
        expect(table !== null).toBe(true);
    });

    describe("markup table", () => {
        const arr: number[][] = getAliveList(7, 12);
        test("Table size", () => {
            expect(arr.length).toBe(7);
            expect(arr[0].length).toBe(12);
        });

        test("Cell attributes", () => {
            const rowTest: string = '3';
            const colTest: string = '2';
            getMarkupTable(arr, table);
            const rowArray = table.querySelectorAll(`tr`);
            const cellArray =
                rowArray[Number(rowTest)].querySelectorAll(`td`);
            const row =
                cellArray[Number(colTest)].getAttribute("data-id-row");
            const cell =
                cellArray[Number(colTest)].getAttribute("data-id-col");
            expect(row).toBe(rowTest);
            expect(cell).toBe(colTest);
        });

        test("Cell style", () => {
            getMarkupTable(arr, table);
            const rowArray = table.querySelectorAll(`tr`);
            const cellArray = rowArray[1].querySelectorAll(`td`);
            const cell = cellArray[1].getAttribute("class");
            expect(cell).toBe(config.classCell);
        });
    });

    describe("markup control", () => {
        test("Inputs", () => {
            const inputRows = app.querySelectorAll("rowField");
            const colField = app.querySelectorAll("colField");
            const rangeField = app.querySelectorAll("range");
            expect(inputRows[0] !== null).toBe(true);
            expect(colField[0] !== null).toBe(true);
            expect(rangeField[0] !== null).toBe(true);
        });

        test("Buttons", () => {
            const buttonStart = app.querySelectorAll("buttonStart");
            const buttonStop = app.querySelectorAll("buttonStop");
            const buttonClear = app.querySelectorAll("buttonClear");
            expect(buttonStart[0] !== null).toBe(true);
            expect(buttonStop[0] !== null).toBe(true);
            expect(buttonClear[0] !== null).toBe(true);
        });
    });
});