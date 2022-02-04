import "./styles/styles.scss";
import config from "./ts/config";
import markup from "./ts/markup";
import { getAliveList } from "./ts/extraFunctions";
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
} from "./ts/control";

const row: number = config.fields[0].value;
const col: number = config.fields[1].value;
const interval: number = config.fields[2].value * 1000;

function startApp() {
    const app = document.getElementById("app") as HTMLElement;
    markup(app);

    const aliveList: number[][] = getAliveList(row, col);
    const table = document.getElementById("table") as HTMLTableElement;

    const buttonStart =
        document.getElementById(`${config.button[0].id}`) as HTMLButtonElement;
    const buttonStop =
        document.getElementById(`${config.button[1].id}`) as HTMLButtonElement;
    const buttonClear =
        document.getElementById(`${config.button[2].id}`) as HTMLButtonElement;
    const form = document.getElementById("form") as HTMLElement;
    const rowField = document.getElementById("rowField") as HTMLInputElement;
    const colField = document.getElementById("colField") as HTMLInputElement;
    const rangeField = document.getElementById("range") as HTMLInputElement;

    let timerId: any;
    let aliveCell: number[][] = [];

    function handlerTableClick(event: Event): number[][] {
        const coords: string[] = getPosClick(event);
        getToggleClass(coords);
        const numberAlive: number = getCountAliveCells(table);
        handleButton(numberAlive, buttonClear);
        handleButton(numberAlive, buttonStart);
        return getNewAliveList(aliveList, coords);
    }   
    
    function getStart(arrayAlive: number[][]): void {
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

    function getStop(): void {
        const numberAlive: number = getCountAliveCells(table);
        clearTimeout(timerId);
        handleButton(0, buttonStop);
        handleButton(numberAlive, buttonClear);
        handleButton(numberAlive, buttonStart);
    }

    function getClear(): number[][] {
        clearTable(table);
        const numberAlive: number = getCountAliveCells(table);
        handleButton(numberAlive, buttonClear);
        handleButton(numberAlive, buttonStart);
        return getAliveList(row, col);
    }

    function getEditField(event: any, arrayAlive: number[][]): void {
        const element = event.target.getAttribute("id");
        const [rowActual, colActual] = getActualTable(table);
        if(element === "rowField") {
            const dataRows = Number(rowField.value);
            aliveCell = getChangeTable(
                arrayAlive, rowActual, colActual, dataRows, true
            );
            console.log(aliveCell);
            getMarkupTable(aliveCell, table);
        } else if(element === "colField") {
            const dataCols = Number(colField.value);
            aliveCell = getChangeTable(
                arrayAlive, rowActual, colActual, dataCols, false
            );
            getMarkupTable(aliveCell, table);
        }
    }

    table.addEventListener("click", handlerTableClick);
    buttonStart.addEventListener("click", () => getStart(aliveList));
    buttonStop.addEventListener("click", getStop);
    buttonClear.addEventListener("click", getClear);
    form.addEventListener("change", () => getEditField(event, aliveList));
}

document.addEventListener("DOMContentLoaded", startApp);