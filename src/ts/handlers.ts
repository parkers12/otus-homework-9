import {
  handlerTableClick,
  getStart,
  getStop,
  getClear,
  getEditField,
} from "./main";

import { getAliveList } from "./extraFunctions";

import { storageArrayAliveSave, getStorageConfig } from "./storage";

const configData = getStorageConfig();

export default function App() {
  const row = configData.valueRows;
  const col = configData.valueCols;
  storageArrayAliveSave(getAliveList(row, col));

  const table = document.getElementById("table") as HTMLTableElement;
  const form = document.getElementById("form") as HTMLElement;
  const rowField = document.getElementById("rowField") as HTMLInputElement;
  const colField = document.getElementById("colField") as HTMLInputElement;
  const buttonStart = document.getElementById(
    "buttonStart"
  ) as HTMLButtonElement;
  const buttonStop = document.getElementById("buttonStop") as HTMLButtonElement;
  const buttonClear = document.getElementById(
    "buttonClear"
  ) as HTMLButtonElement;
  const rangeField = document.getElementById("range") as HTMLInputElement;

  table.addEventListener("click", (event) =>
    handlerTableClick(event, buttonStart, buttonClear)
  );

  buttonStart.addEventListener("click", () =>
    getStart(
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    )
  );

  buttonStop.addEventListener("click", () =>
    getStop(buttonStop, buttonStart, buttonClear, rowField, colField)
  );

  buttonClear.addEventListener("click", () =>
    getClear(buttonStart, buttonClear, row, col)
  );

  form.addEventListener("change", (event) =>
    getEditField(
      event,
      table,
      rowField,
      colField,
      rangeField,
      buttonStart,
      buttonClear
    )
  );
}
