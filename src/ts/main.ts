import config from "./config";
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
  getInterval,
} from "./control";

import { storageArrayAliveSave, getStorageArrayAlive } from "./storage";

const interval: number = config.fields[2].value * 1000;
let timerId: any;
let aliveCell: number[][] = [];

export function handlerTableClick(
  event: Event,
  table: HTMLTableElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement
): void {
  const coords: string[] = getPosClick(event);
  getToggleClass(coords);
  const numberAlive: number = getCountAliveCells(table);
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
  const aliveListNew = getNewAliveList(coords);
  storageArrayAliveSave(aliveListNew);
}

export function tick(
  table: HTMLTableElement,
  row: number,
  col: number,
  rangeField: HTMLInputElement,
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement
): void {
  const arr = getStorageArrayAlive();
  const newInterval: number = getInterval(rangeField);
  let timeInterval: number;

  if (newInterval !== interval) {
    timeInterval = newInterval;
  } else {
    timeInterval = interval;
  }
  aliveCell = getUpdateArray(row, col);
  getUpdateTable(row, col);
  storageArrayAliveSave(aliveCell);
  const equalArr: boolean = toEqualArr(arr, aliveCell);
  if (getCountAliveCells(table) <= 0) {
    clearTimeout(timerId);
    getAliveList(row, col);
    handleButton(0, buttonStop);
  } else if (equalArr) {
    clearTimeout(timerId);
    getAliveList(row, col);
    handleButton(0, buttonStop);
    handleButton(1, buttonStart);
    handleButton(1, buttonClear);
  } else {
    timerId = setTimeout(
      tick,
      timeInterval,
      table,
      row,
      col,
      rangeField,
      buttonStop,
      buttonStart,
      buttonClear
    );
  }
}

export function getStart(
  table: HTMLTableElement,
  rangeField: HTMLInputElement,
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  row: number,
  col: number
): void {
  const numberAlive: number = getCountAliveCells(table);
  handleButton(numberAlive, buttonStop);
  handleButton(0, buttonClear);
  handleButton(0, buttonStart);
  setTimeout(
    tick,
    interval,
    table,
    row,
    col,
    rangeField,
    buttonStop,
    buttonStart,
    buttonClear
  );
}

export function getStop(
  table: HTMLTableElement,
  buttonStop: HTMLButtonElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement
): void {
  const numberAlive: number = getCountAliveCells(table);
  clearTimeout(timerId);
  handleButton(0, buttonStop);
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
}

export function getClear(
  table: HTMLTableElement,
  buttonStart: HTMLButtonElement,
  buttonClear: HTMLButtonElement,
  row: number,
  col: number
): void {
  clearTable(table);
  const numberAlive: number = getCountAliveCells(table);
  handleButton(numberAlive, buttonClear);
  handleButton(numberAlive, buttonStart);
  storageArrayAliveSave(getAliveList(row, col));
}

export function getEditField(
  event: Event,
  table: HTMLTableElement,
  rowField: HTMLInputElement,
  colField: HTMLInputElement
): void {
  const element = (event.target as HTMLElement).getAttribute("id");
  const [rowActual, colActual] = getActualTable(table);
  if (element === config.fields[0].id) {
    const dataRows = Number(rowField.value);
    aliveCell = getChangeTable(rowActual, colActual, dataRows, true);
    getMarkupTable(aliveCell, table);
  } else if (element === config.fields[1].id) {
    const dataCols = Number(colField.value);
    aliveCell = getChangeTable(rowActual, colActual, dataCols, false);
    getMarkupTable(aliveCell, table);
  }
}
