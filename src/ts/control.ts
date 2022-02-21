import config from "./config";
import {
  getAliveList,
  counterAroundCell,
  setConditionCell
} from "./extraFunctions";

import {
  storageArrayAliveSave,
  getStorageArrayAlive
} from "./storage";

export function getMarkupTable(
  arrayAlive: number[][],
  tbl: HTMLTableElement
): void {
  const table = tbl;
  table.innerHTML = "";
  const classes = `${config.classCell} ${config.classCellActive}`.split(" ");
  
  for(let i = 0; i < arrayAlive.length; i += 1) {
      const tr: HTMLElement = document.createElement("tr");  
      table.appendChild(tr).setAttribute("class", "row");
      for(let j = 0; j < arrayAlive[i].length; j += 1) {
          const td: HTMLElement = document.createElement("td");
          tr.appendChild(td).setAttribute("class", "cell");
          td.dataset.row = `${i}`;
          td.dataset.col = `${j}`;
          if(arrayAlive[i][j] === 1) {
            td.classList.add(...classes);
          }
      }
  }
}

export function getPosClick(event: Event): string[] {
  const cell = event.target as HTMLTableCellElement;
  const coordY = cell.dataset.row as string;
  const coordX = cell.dataset.col as string;
  return [coordY, coordX];
}

export function getToggleClass(coords: string[]): void {
  const coordsY = Number(coords[0]);
  const coordsX = Number(coords[1]);
  const cell = document.querySelectorAll(
    `td[data-row='${coordsY}'][data-col='${coordsX}']`
  );
  cell[0].classList.toggle(config.classCellActive);
}

export function getNewAliveList(
    coordNew: string[]
  ): number[][] {
  const array = getStorageArrayAlive();
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
  btn: HTMLButtonElement
): void {
  const button = btn;
  if(numberAlive <= 0) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

export function getUpdateArray(
  row: number,
  col: number
): number[][]  {
  const counterAliveAround: number[][] = getAliveList(row, col);
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      counterAliveAround[i][j] = counterAroundCell(i, j);
    }
  }
  return setConditionCell(counterAliveAround, row, col);
}

export function getUpdateTable(
  row: number,
  col: number
): void  {
  const arrayAlive = getStorageArrayAlive();
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      const cell = document.querySelectorAll(
        `td[data-row='${i}'][data-col='${j}']`
      );
      cell[0].classList.remove(config.classCellActive);
      if(arrayAlive[i][j] === 1) {
        cell[0].classList.add(config.classCellActive);
      }
    }
  }
}

export function toEqualArr(array1: number[][], array2: number[][]):boolean {
  return array1.every(
    (value1,i) => array1[i].every(
      (value2,j) => value2 === array2[i][j]
    )
  );
}

export function getChangeTable(
  row: number,
  col: number,
  newValue: number,
  isRow: boolean
): number[][] {
  const arrayAlive = getStorageArrayAlive();
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
  storageArrayAliveSave(arrayAlive);
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
