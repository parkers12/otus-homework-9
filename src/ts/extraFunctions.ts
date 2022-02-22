import config from "./config";

import { getStorageArrayAlive } from "./storage";

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

export function counterAroundCell(
  rowCurent: number,
  colCurent: number
): number {
  const aliveCell = getStorageArrayAlive();
  let sum: number = 0;
  let rowStart: number;
  let rowFinish: number;
  let colStart: number;
  let colFinish: number;

  if (rowCurent - 1 < 0) {
    rowStart = 0;
  } else {
    rowStart = rowCurent - 1;
  }

  if (rowCurent + 1 >= config.fields[0].value) {
    rowFinish = config.fields[0].value - 1;
  } else {
    rowFinish = rowCurent + 1;
  }

  if (colCurent - 1 < 0) {
    colStart = 0;
  } else {
    colStart = colCurent - 1;
  }

  if (colCurent + 1 >= config.fields[1].value) {
    colFinish = config.fields[1].value - 1;
  } else {
    colFinish = colCurent + 1;
  }

  for (let i = rowStart; i <= rowFinish; i += 1) {
    for (let j = colStart; j <= colFinish; j += 1) {
      if (i !== rowCurent || j !== colCurent) {
        sum += Number(aliveCell[i][j]);
      }
    }
  }
  return sum;
}

export function setConditionCell(
  arrayCounters: number[][],
  row: number,
  col: number
): number[][] {
  const arrayAlive = getStorageArrayAlive();
  const arrayAliveNew: number[][] = getAliveList(row, col);
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if (arrayAlive[i][j] === 1) {
        if (arrayCounters[i][j] < 2 || arrayCounters[i][j] > 3) {
          arrayAliveNew[i][j] = 0;
        } else {
          arrayAliveNew[i][j] = 1;
        }
      } else if (arrayCounters[i][j] === 3) {
        arrayAliveNew[i][j] = 1;
      }
    }
  }
  return arrayAliveNew;
}
