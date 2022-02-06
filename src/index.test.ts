import config from "./ts/config";
import markup from "./ts/markup";
import { startApp } from "./index";
import { getAliveList } from "./ts/extraFunctions";

jest.mock("./ts/markup", () => {
    const originalModule = jest.requireActual("./ts/markup");
    return {
      __esModule: true,
      ...originalModule,
      markup: jest.fn(),
    };
});

jest.mock("./ts/extraFunctions", () => {
    const originalModule = jest.requireActual("./ts/extraFunctions");
    return {
      __esModule: true,
      ...originalModule,
      getAliveList: jest.fn(),
    };
});

describe("Start function", () => {
    // document.body.innerHTML = `<div class="app" id="app"></div>`;
    // const app = document.getElementById("app") as HTMLDivElement;
    // const row: number = config.fields[0].value;
    // const col: number = config.fields[1].value;

    test("Markup page", () => {
        // startApp();
        // expect(markup).toHaveBeenCalled();
    });

    test("Buttons", () => {
        // startApp();
        
        // getAliveList.mockImplementation(() => [
        //     [1, 1, 1, 0, 0],
        //     [1, 0, 1, 0, 0],
        //     [1, 1, 1, 0, 0],
        //     [0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0]
        // ]);

        // expect(getAliveList).toHaveBeenCalled();
    });
});