import config from "./config";

import { getAliveList, getInterval } from "./extraFunctions";

import {
  getMarkupTable,
  getCountAliveCells,
  handleButton,
  handleInput,
  getPosClick,
  getNewAliveList,
  getToggleClass,
  clearTable,
  getUpdateArray,
  getUpdateTable,
  toEqualArr,
  getChangeTable,
  getActualTable,
} from "./control";

import {
  storageArrayAliveSave,
  getStorageArrayAlive,
  storageConfig,
  getStorageConfig,
} from "./storage";

let timerId: number;
let aliveCell: number[][] = [];

export function handlerTableClick(
  event: Event,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement
): void {
  const coords: string[] = getPosClick(event);
  getToggleClass(coords);
  const numberAlive = getCountAliveCells();
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
  const aliveListNew = getNewAliveList(coords);
  storageArrayAliveSave(aliveListNew);
}

export function tick(
  table: HTMLTableElement,
  rangeField: HTMLInputElement,
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  rowField: HTMLInputElement,
  colField: HTMLInputElement
): void {
  const arr = getStorageArrayAlive();
  const configData = getStorageConfig();
  const timeInterval = configData.interval;
  const row = configData.valueRows;
  const col = configData.valueCols;

  aliveCell = getUpdateArray(row, col);
  getUpdateTable(row, col);
  storageArrayAliveSave(aliveCell);
  const equalArr: boolean = toEqualArr(arr, aliveCell);
  if (getCountAliveCells() <= 0) {
    clearTimeout(timerId);
    getAliveList(row, col);
    handleButton(0, buttonStop);
    handleInput(false, rowField);
    handleInput(false, colField);
  } else if (equalArr) {
    clearTimeout(timerId);
    getAliveList(row, col);
    handleButton(0, buttonStop);
    handleButton(1, buttonStart);
    handleButton(1, buttonClear);
    handleInput(false, rowField);
    handleInput(false, colField);
  } else {
    timerId = window.setTimeout(
      tick,
      timeInterval,
      table,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear,
      rowField,
      colField
    );
  }
}

export function getStart(
  table: HTMLTableElement,
  rangeField: HTMLInputElement,
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  rowField: HTMLInputElement,
  colField: HTMLInputElement
): void {
  const configData = getStorageConfig();
  const interval = configData.valueRange;
  const numberAlive: number = getCountAliveCells();
  handleButton(numberAlive, buttonStop);
  handleButton(0, buttonClear);
  handleButton(0, buttonStart);
  handleInput(true, rowField);
  handleInput(true, colField);
  setTimeout(
    tick,
    interval,
    table,
    rangeField,
    buttonStop,
    buttonStart,
    buttonClear,
    rowField,
    colField
  );
}

export function getStop(
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  rowField: HTMLInputElement,
  colField: HTMLInputElement
): void {
  const numberAlive: number = getCountAliveCells();
  clearTimeout(timerId);
  handleButton(0, buttonStop);
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
  handleInput(false, rowField);
  handleInput(false, colField);
}

export function getClear(
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  row: number,
  col: number
): void {
  clearTable();
  const numberAlive: number = getCountAliveCells();
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
  storageArrayAliveSave(getAliveList(row, col));
}

export function getEditField(
  event: Event,
  table: HTMLTableElement,
  rowField: HTMLInputElement,
  colField: HTMLInputElement,
  range: HTMLInputElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement
): void {
  const element = (event.target as HTMLElement).getAttribute("id");
  const [rowActual, colActual] = getActualTable(table);
  let configData = getStorageConfig();
  if (element === "rowField") {
    const dataRows = Number(rowField.value);
    aliveCell = getChangeTable(rowActual, colActual, dataRows, true);
    getMarkupTable(aliveCell, table);
    configData = {
      valueRows: dataRows,
      minRows: configData.minRows,
      maxRows: configData.maxRows,
      stepRows: configData.stepRows,
      valueCols: configData.valueCols,
      minCols: configData.minCols,
      maxCols: configData.maxCols,
      stepCols: configData.stepCols,
      valueRange: configData.valueRange,
      minRange: configData.minRange,
      maxRange: configData.maxRange,
      stepRange: configData.stepRange,
      interval: configData.interval,
    };
  } else if (element === "colField") {
    const dataCols = Number(colField.value);
    aliveCell = getChangeTable(rowActual, colActual, dataCols, false);
    getMarkupTable(aliveCell, table);
    configData = {
      valueRows: configData.valueRows,
      minRows: configData.minRows,
      maxRows: configData.maxRows,
      stepRows: configData.stepRows,
      valueCols: dataCols,
      minCols: configData.minCols,
      maxCols: configData.maxCols,
      stepCols: configData.stepCols,
      valueRange: configData.valueRange,
      minRange: configData.minRange,
      maxRange: configData.maxRange,
      stepRange: configData.stepRange,
      interval: configData.interval,
    };
  } else {
    const intervalData = Number(range.value);
    const intervalValue = getInterval(intervalData);

    configData = {
      valueRows: configData.valueRows,
      minRows: configData.minRows,
      maxRows: configData.maxRows,
      stepRows: configData.stepRows,
      valueCols: configData.valueCols,
      minCols: configData.minCols,
      maxCols: configData.maxCols,
      stepCols: configData.stepCols,
      valueRange: intervalData,
      minRange: configData.minRange,
      maxRange: configData.maxRange,
      stepRange: configData.stepRange,
      interval: intervalValue,
    };
  }
  storageConfig(configData);
  const numberAlive: number = getCountAliveCells();
  if (numberAlive <= 0 && !buttonClear.disabled && !buttonStart.disabled) {
    handleButton(numberAlive, buttonClear);
    handleButton(numberAlive, buttonStart);
  }
}

export function createStorage(): void {
  const configDataActual = getStorageConfig();
  if (configDataActual === null) {
    const configDt = {
      valueRows: config.valueRows,
      minRows: config.minRows,
      maxRows: config.maxRows,
      stepRows: config.stepRows,
      valueCols: config.valueCols,
      minCols: config.minCols,
      maxCols: config.maxCols,
      stepCols: config.stepCols,
      valueRange: config.valueRange,
      minRange: config.minRange,
      maxRange: config.maxRange,
      stepRange: config.stepRange,
      interval: config.interval,
    };
    storageConfig(configDt);
  }

  let aliveStorage = getStorageArrayAlive();
  if (aliveStorage === null) {
    storageArrayAliveSave(getAliveList(config.valueRows, config.valueCols));
    aliveStorage = getStorageArrayAlive();
  }

  if (aliveStorage !== null) {
    const rows = Number(aliveStorage.length);
    const cols = Number(aliveStorage[0].length);

    if (
      rows !== Number(configDataActual.valueRows) ||
      cols !== Number(configDataActual.valueCols)
    ) {
      localStorage.removeItem("arrayAlive");
      const arrayAlive = getAliveList(
        configDataActual.valueRows,
        configDataActual.valueCols
      );
      storageArrayAliveSave(arrayAlive);
    }
  }
}
