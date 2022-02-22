import config from "./config";
import App from "./handlers";
import { handlerTableClick, getStart, getStop, getClear } from "./main";

jest.mock("./main", () => {
  const originalModule = jest.requireActual("./main");
  return {
    __esModule: true,
    ...originalModule,
    handlerTableClick: jest.fn(),
    getStart: jest.fn(),
    getStop: jest.fn(),
    getClear: jest.fn(),
    getEditField: jest.fn(),
  };
});

describe("Handlers application", () => {
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

  const table = document.getElementById(
    `${config.classTable}`
  ) as HTMLTableElement;
  const buttonStart = document.getElementById(
    `${config.button[0].id}`
  ) as HTMLButtonElement;
  const buttonStop = document.getElementById(
    `${config.button[1].id}`
  ) as HTMLButtonElement;
  const buttonClear = document.getElementById(
    `${config.button[2].id}`
  ) as HTMLButtonElement;
  const rangeField = document.getElementById(
    `${config.fields[2].id}`
  ) as HTMLInputElement;

  test("handlerTableClick", () => {
    App();
    table.click();
    expect(handlerTableClick).toHaveBeenCalled();
  });

  test("getStart", () => {
    App();
    buttonStart.disabled = false;
    buttonStart.click();
    expect(getStart).toHaveBeenCalled();
  });

  test("getStop", () => {
    App();
    buttonStop.disabled = false;
    buttonStop.click();
    expect(getStop).toHaveBeenCalled();
  });

  test("getClear", () => {
    App();
    buttonClear.disabled = false;
    buttonClear.click();
    expect(getClear).toHaveBeenCalled();
  });

  test("getEditField", () => {
    App();
    rangeField.stepUp();
    expect(rangeField.value).toBe("2");
  });
});
