import config from "./config";

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

export function getAliveList(row: number, col: number): number[][] {
  const aliveListEmpty: number[][] = [];
  for (let i = 0; i < row; i += 1) {
    aliveListEmpty[i] = [];
    for (let j = 0; j < col; j += 1) {
      aliveListEmpty[i][j] = 0;
    }
  }
  return aliveListEmpty;
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
  function counterAroundCell(
    aliveCell: number[][],
    rowCurent: number,
    colCurent: number
  ): number {
    let sum: number = 0;
    let rowStart: number;
    let rowFinish: number;
    let colStart: number;
    let colFinish: number;

    if(rowCurent - 1 < 0) {
      rowStart = 0;
    } else {
      rowStart = rowCurent - 1;
    }

    if(rowCurent + 1 >= config.fields[0].value) {
      rowFinish = config.fields[0].value - 1;
    } else {
      rowFinish = rowCurent + 1;
    }

    if(colCurent - 1 < 0) {
      colStart = 0;
    } else {
      colStart = colCurent - 1;
    }

    if(colCurent + 1 >= config.fields[1].value) {
      colFinish = config.fields[1].value - 1;
    } else {
      colFinish = colCurent + 1;
    }

    for(let i = rowStart; i <= rowFinish; i += 1) {
      for(let j = colStart; j <= colFinish; j += 1) {
        if(i !== rowCurent || j !== colCurent) {
          sum += aliveCell[i][j];
        }
      }
    }
    return sum;
  }

  const arrayAliveNew: number[][] = getAliveList(row, col);

  function setConditionCell(
    arrayCounters: number[][],
    arrayAlive: number[][],
    row: number,
    col: number
  ): number[][] {
    for (let i = 0; i < row; i += 1) {
      for (let j = 0; j < col; j += 1) {
        // console.log(arrayCounters[i][j]);
        if(arrayAlive[i][j] === 1) {
          if(arrayCounters[i][j] < 2 ||
            arrayCounters[i][j] > 3) {
            arrayAliveNew[i][j] = 0;
          } else {
            arrayAliveNew[i][j] = 1;
          }
        } else {
          if(arrayCounters[i][j] === 3) {
            arrayAliveNew[i][j] = 1;
          }
        }
      }
    }
    return arrayAliveNew;
  }

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
