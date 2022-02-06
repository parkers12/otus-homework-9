import "./styles/styles.scss";
import config from "./ts/config";
import markup from "./ts/markup";
import {
    handlerTableClick,
    getStart,
    getStop,
    getClear,
    getEditField
} from "./ts/main";
import { getAliveList } from "./ts/extraFunctions";

export function startApp() {
    const app = document.getElementById("app") as HTMLDivElement;
    markup(app);

    const row: number = config.fields[0].value;
    const col: number = config.fields[1].value;
    const aliveList: number[][] = getAliveList(row, col);

    const table =
        document.getElementById(`${config.classTable}`) as HTMLTableElement;
    const form =
        document.getElementById(`${config.classForm}`) as HTMLElement;
    const rowField =
        document.getElementById(`${config.fields[0].id}`) as HTMLInputElement;
    const colField =
        document.getElementById(`${config.fields[1].id}`) as HTMLInputElement;
    const buttonStart =
        document.getElementById(`${config.button[0].id}`) as HTMLButtonElement;
    const buttonStop =
        document.getElementById(`${config.button[1].id}`) as HTMLButtonElement;
    const buttonClear =
        document.getElementById(`${config.button[2].id}`) as HTMLButtonElement;
    const rangeField =
        document.getElementById(`${config.fields[2].id}`) as HTMLInputElement;

    table.addEventListener(
        "click",
        () => handlerTableClick(
            event,
            table,
            buttonStart,
            buttonClear,
            aliveList
        )
    );

    buttonStart.addEventListener(
        "click",
        () => getStart(
            aliveList,
            table,
            rangeField,
            buttonStop,
            buttonStart,
            buttonClear,
            row,
            col
        )
    );

    buttonStop.addEventListener(
        "click",
        () => getStop(
            table,
            buttonStop,
            buttonStart,
            buttonClear
        )
    );

    buttonClear.addEventListener(
        "click",
        () => getClear(
            table,
            buttonStart,
            buttonClear,
            row,
            col
        )
    );

    form.addEventListener(
        "change", () => getEditField(
            event,
            aliveList,
            table,
            rowField,
            colField
        )
    );
}

document.addEventListener("DOMContentLoaded", startApp);
