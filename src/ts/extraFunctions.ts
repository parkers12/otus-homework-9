import config from "./config";
import {
  storageConfig,
  storageArrayAliveSave,
  getStorageArrayAlive,
  getStorageConfig
} from "./storage";

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
  const configData = getStorageConfig();

  let sum = 0;
  let rowStart: number;
  let rowFinish: number;
  let colStart: number;
  let colFinish: number;

  if (rowCurent - 1 < 0) {
    rowStart = 0;
  } else {
    rowStart = rowCurent - 1;
  }

  if (rowCurent + 1 >= configData.valueRows) {
    rowFinish = rowCurent;
  } else {
    rowFinish = rowCurent + 1;
  }

  if (colCurent - 1 < 0) {
    colStart = 0;
  } else {
    colStart = colCurent - 1;
  }

  if (colCurent + 1 >= configData.valueCols) {
    colFinish = colCurent;
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

export function getInterval(value: number): number {
  const intervalArray = [2500, 2000, 1500, 1000, 500];
  return intervalArray[value - 1];
}