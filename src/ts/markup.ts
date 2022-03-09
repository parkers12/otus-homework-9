import { getAliveList, getInterval } from "./extraFunctions";
import { getMarkupTable } from "./control";
import { getStorageConfig } from "./storage";
import { errorMessage } from "./errorMessage";

function markup(elem: HTMLElement): void {
  const configData = getStorageConfig();

  const wrapper = document.createElement("div") as HTMLDivElement;
  elem.appendChild(wrapper).setAttribute("class", "wrapper");
  const content: HTMLElement | null = document.querySelector(".wrapper")!;

  const header: HTMLElement = document.createElement("header");
  content.appendChild(header).setAttribute("class", "header");

  const title: HTMLElement = document.createElement("h1");
  header.appendChild(title).setAttribute("class", "title");
  title.innerHTML = "Game of Life";

  const main: HTMLElement = document.createElement("main");
  content.appendChild(main).setAttribute("class", "main");

  const footer: HTMLElement = document.createElement("footer");
  elem.appendChild(footer).setAttribute("class", "footer");

  const form: HTMLElement = document.createElement("div");
  main.appendChild(form).setAttribute("class", "form");
  form.setAttribute("id", "form");

  // Row input
  const formItemRows: HTMLElement = document.createElement("div");
  form.appendChild(formItemRows).setAttribute("class", "form-item");

  const rowsField: HTMLElement = document.createElement("input");
  formItemRows.appendChild(rowsField).setAttribute("id", "rowField");
  rowsField.setAttribute("class", "input");
  rowsField.setAttribute("type", "number");

  const rowsLabel: HTMLElement = document.createElement("label");
  formItemRows.appendChild(rowsLabel).setAttribute("for", "rowField");
  rowsLabel.setAttribute("class", "label");
  rowsLabel.innerHTML = "Rows";

  formItemRows.appendChild(rowsField).setAttribute("name", "rowField");
  rowsField.setAttribute("value", String(configData.valueRows));
  rowsField.setAttribute("min", String(configData.minRows));
  rowsField.setAttribute("max", String(configData.maxRows));
  rowsField.setAttribute("step", String(configData.stepRows));
  rowsField.setAttribute("oninput", "replacer(this)");

  // Col input
  const formItemCols: HTMLElement = document.createElement("div");
  form.appendChild(formItemCols).setAttribute("class", "form-item");

  const colField: HTMLElement = document.createElement("input");
  formItemCols.appendChild(colField).setAttribute("id", "colField");
  colField.setAttribute("class", "input");
  colField.setAttribute("type", "number");

  const colsLabel: HTMLElement = document.createElement("label");
  formItemCols.appendChild(colsLabel).setAttribute("for", "colField");
  colsLabel.setAttribute("class", "label");
  colsLabel.innerHTML = "Cols";

  formItemCols.appendChild(colField).setAttribute("name", "colField");
  colField.setAttribute("value", String(configData.valueCols));
  colField.setAttribute("min", String(configData.minCols));
  colField.setAttribute("max", String(configData.maxCols));
  colField.setAttribute("step", String(configData.stepCols));
  colField.setAttribute("oninput", "replacer(this)");

  // Range input
  const formItemRange: HTMLElement = document.createElement("div");
  form.appendChild(formItemRange).setAttribute("class", "form-item");

  const rangeField: HTMLElement = document.createElement("input");
  formItemRange.appendChild(rangeField).setAttribute("id", "range");
  rangeField.setAttribute("class", "range");
  rangeField.setAttribute("type", "range");

  const rangeLabel: HTMLElement = document.createElement("label");
  formItemRange.appendChild(rangeLabel).setAttribute("for", "range");
  rangeLabel.setAttribute("class", "label");
  rangeLabel.innerHTML = "Speed";

  formItemRange.appendChild(rangeField).setAttribute("name", "tickmarks");
  rangeField.setAttribute("value", String(configData.valueRange));
  rangeField.setAttribute("min", String(configData.minRange));
  rangeField.setAttribute("max", String(configData.maxRange));
  rangeField.setAttribute("step", String(configData.stepRange));

  formItemRange.appendChild(rangeField).setAttribute("list", "tickmarks");
  const datalist: HTMLElement = document.createElement("datalist");
  formItemRange.appendChild(datalist).setAttribute("id", "tickmarks");

  for (
    let j = configData.minRange;
    j <= configData.maxRange;
    j += configData.stepRange
  ) {
    const option: HTMLElement = document.createElement("option");
    datalist.appendChild(option).setAttribute("value", String(j));
    option.setAttribute("label", String(j));
    const intervalValue = getInterval(j);
    if (intervalValue === configData.interval) {
      option.setAttribute("selected", "selected");
    }
    option.innerHTML = String(j);
  }

  if (configData.valueRows > 2 || configData.valueCols > 2) {
    const table = document.createElement("table") as HTMLTableElement;
    main.appendChild(table).setAttribute("class", "table");
    table.setAttribute("id", "table");
    table.setAttribute("border", "0");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");
    const aliveList: number[][] = getAliveList(
      configData.valueRows,
      configData.valueCols
    );
    getMarkupTable(aliveList, table);
  } else {
    errorMessage("Error: small input values");
  }

  const control: HTMLElement = document.createElement("div");
  main.appendChild(control).setAttribute("class", "control");
  control.setAttribute("id", "control");

  // Button start
  const buttonStart: HTMLElement = document.createElement("button");
  control.appendChild(buttonStart).setAttribute("type", "button");
  buttonStart.setAttribute("id", "buttonStart");
  buttonStart.setAttribute("class", "button");
  buttonStart.setAttribute("disabled", "disabled");
  buttonStart.innerHTML = "Start";

  // Button stop
  const buttonStop: HTMLElement = document.createElement("button");
  control.appendChild(buttonStop).setAttribute("type", "button");
  buttonStop.setAttribute("id", "buttonStop");
  buttonStop.setAttribute("class", "button");
  buttonStop.setAttribute("disabled", "disabled");
  buttonStop.innerHTML = "Stop";

  // Button clear
  const buttonClear: HTMLElement = document.createElement("button");
  control.appendChild(buttonClear).setAttribute("type", "button");
  buttonClear.setAttribute("id", "buttonClear");
  buttonClear.setAttribute("class", "button");
  buttonClear.setAttribute("disabled", "disabled");
  buttonClear.innerHTML = "Clear";
}

export default markup;
