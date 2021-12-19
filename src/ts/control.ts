import config from "./config";
import {
  getAliveList,
  counterAroundCell,
  setConditionCell
} from "./extraFunctions";

export function getMarkupTable(
  arrayAlive: number[][],
  table: HTMLTableElement
): void {
  // eslint-disable-next-line no-param-reassign
  table.innerHTML = "";
  const classes = `${config.classCell} ${config.classCellActive}`.split(" ");
  for(let i = 0; i < arrayAlive.length; i += 1) {
      const tr: HTMLElement = document.createElement("tr");  
      table.appendChild(tr).setAttribute("class", "row");
      for(let j = 0; j < arrayAlive[i].length; j += 1) {
          const td: HTMLElement = document.createElement("td");
          tr.appendChild(td).setAttribute("class", "cell");
          td.setAttribute("data-id-row", `${i}`);
          td.setAttribute("data-id-col", `${j}`);
          if(arrayAlive[i][j] === 1) {
            td.classList.add(...classes);
          }
      }
  }
}

export function getPosClick(event: any): number[] {
  const coordY: number =
    event.target.getAttribute("data-id-row");
  const coordX: number =
    event.target.getAttribute("data-id-col");
  return [coordY, coordX];
}

export function getToggleClass(coords: number[]): void {
  const cell = document.querySelectorAll(
    `td[data-id-row='${coords[0]}'][data-id-col='${coords[1]}']`
  );
  cell[0].classList.toggle(config.classCellActive);
}

export function getNewAliveList(
    array: number[][], coordNew: number[]
  ): number[][] {

  const row: number = Number(coordNew[0]);
  const col: number = Number(coordNew[1]);
  const arrayNew: number[][] = array.slice();

  if(array[row][col]) {
    arrayNew[row][col] = 0;
  } else {
    arrayNew[row][col] = 1;
  }
  return arrayNew;
}

export function clearTable(table: HTMLElement): void {
  const cellsAlive =
    table.querySelectorAll(`.${config.classCellActive}`);
  for(let i = 0; i < cellsAlive.length; i += 1) {
    cellsAlive[i].classList.remove(config.classCellActive);
  }
}

export function getCountAliveCells(table: HTMLElement): number {
  return table.querySelectorAll(`.${config.classCellActive}`).length;
}

export function handleButton(
  numberAlive: number,
  button: HTMLButtonElement
): void {
  if(numberAlive <= 0) {
    // eslint-disable-next-line no-param-reassign
    button.disabled = true;
  } else {
    // eslint-disable-next-line no-param-reassign
    button.disabled = false;
  }
}

export function getUpdateArray(
  arrayAlive: number[][],
  row: number,
  col: number
): number[][]  {
  const counterAliveAround: number[][] = getAliveList(row, col);
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      counterAliveAround[i][j] = counterAroundCell(arrayAlive, i, j);
    }
  }
  return setConditionCell(counterAliveAround, arrayAlive, row, col);
}

export function getUpdateTable(
  arrayAlive: number[][],
  row: number,
  col: number
): void  {
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      const cell = document.querySelectorAll(
        `td[data-id-row='${i}'][data-id-col='${j}']`
      );
      cell[0].classList.remove(config.classCellActive);
      if(arrayAlive[i][j] === 1) {
        cell[0].classList.add(config.classCellActive);
      }
    }
  }
}

export function toEqualArr(a1: number[][], a2: number[][]):boolean {
  return a1.every((v,i) => a1[i].every((v,j) => v === a2[i][j]));
}

export function getChangeTable(
  arrayAlive: number[][],
  row: number,
  col: number,
  newValue: number,
  isRow: boolean
): number[][] {
  if(isRow) {
    if(row > newValue) {
      arrayAlive.splice(-1);
    } else {
      arrayAlive.push([]);
      for(let i = 0; i < col; i += 1) {
        arrayAlive[newValue - 1].push(0);
      }
    }
  } else {
    for(let i = 0; i < row; i += 1) {
      if(col > newValue) {
        arrayAlive[i].splice(-1);
      } else {
        arrayAlive[i].push(0);
      }
    }
  }
    return arrayAlive;
}

export function getActualTable(table: HTMLTableElement): number[] {
  const numRows: number = table.querySelectorAll('tr').length;
  const arrRows = table.querySelectorAll('tr');
  const numCols: number = arrRows[0].querySelectorAll('td').length;
  return [Number(numRows), Number(numCols)];
}

export function getInterval(range: HTMLInputElement): number {
  return Number(range.value) * 1000;
}
