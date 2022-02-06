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
    getInterval
} from "./control";

const interval: number = config.fields[2].value * 1000;
// const table =
//     document.getElementById(`${config.classTable}`) as HTMLTableElement;
// const rowField =
//     document.getElementById(`${config.fields[0].id}`) as HTMLInputElement;
// const colField =
//     document.getElementById(`${config.fields[1].id}`) as HTMLInputElement;
// const rangeField =
//     document.getElementById(`${config.fields[2].id}`) as HTMLInputElement;
// const buttonStart =
//     document.getElementById(`${config.button[0].id}`) as HTMLButtonElement;
// const buttonStop =
//     document.getElementById(`${config.button[1].id}`) as HTMLButtonElement;
// const buttonClear =
//     document.getElementById(`${config.button[2].id}`) as HTMLButtonElement;

let timerId: any;
let aliveCell: number[][] = [];

export function handlerTableClick(
    event: Event,
    table: HTMLTableElement,
    buttonStart: HTMLButtonElement,
    buttonClear: HTMLButtonElement,
    aliveList: number[][]
): number[][] {
    const coords: string[] = getPosClick(event);
    getToggleClass(coords);
    const numberAlive: number = getCountAliveCells(table);
    handleButton(numberAlive, buttonClear);
    handleButton(numberAlive, buttonStart);
    return getNewAliveList(aliveList, coords);
}   
    
export function getStart(
    arrayAlive: number[][],
    table: HTMLTableElement,
    rangeField: HTMLInputElement,
    buttonStop: HTMLButtonElement,
    buttonStart: HTMLButtonElement,
    buttonClear: HTMLButtonElement,
    row: number,
    col: number
): void {
    function tick(arr: number[][]): void {
        const newInterval: number = getInterval(rangeField);
        let timeInterval: number;

        if(newInterval !== interval) {
            timeInterval = newInterval;
        } else {
            timeInterval = interval;
        }
        aliveCell = getUpdateArray(arr, row, col);
        getUpdateTable(aliveCell, row, col);
        const equalArr: boolean = toEqualArr(arrayAlive, aliveCell);
        if(getCountAliveCells(table) <= 0) {
            clearTimeout(timerId);
            handleButton(0, buttonStop);
        } else if(equalArr) {
            clearTimeout(timerId);
            handleButton(0, buttonStop);
            handleButton(1, buttonStart);
            handleButton(1, buttonClear);
        } else {
            timerId = setTimeout(tick, timeInterval, aliveCell);
        }
    }
    const numberAlive: number = getCountAliveCells(table);
    handleButton(numberAlive, buttonStop);
    handleButton(0, buttonClear);
    handleButton(0, buttonStart);
    setTimeout(tick, interval, arrayAlive);
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
): number[][] {
    clearTable(table);
    const numberAlive: number = getCountAliveCells(table);
    handleButton(numberAlive, buttonClear);
    handleButton(numberAlive, buttonStart);
    return getAliveList(row, col);
}

export function getEditField(
    event: Event,
    arrayAlive: number[][],
    table: HTMLTableElement,
    rowField: HTMLInputElement,
    colField: HTMLInputElement
): void {
    const element = (event.target as HTMLElement).getAttribute("id");
    const [rowActual, colActual] = getActualTable(table);
    if(element === config.fields[0].id) {
        const dataRows = Number(rowField.value);
        aliveCell = getChangeTable(
            arrayAlive, rowActual, colActual, dataRows, true
        );
        getMarkupTable(aliveCell, table);
    } else if(element === config.fields[1].id) {
        const dataCols = Number(colField.value);
        aliveCell = getChangeTable(
            arrayAlive, rowActual, colActual, dataCols, false
        );
        getMarkupTable(aliveCell, table);
    }
}
