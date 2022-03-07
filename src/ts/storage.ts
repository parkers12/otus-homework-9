import config from "./config";
import { getAliveList } from "./extraFunctions";

type TConfig = {
  valueRows: number,
  minRows: number,
  maxRows: number,
  stepRows: number,
  valueCols: number,
  minCols: number,
  maxCols: number,
  stepCols: number,
  valueRange: number,
  minRange: number,
  maxRange: number,
  stepRange: number,
  interval: number
}

export function storageArrayAliveSave(arrayAlive: number[][]): void {
  localStorage.setItem("arrayAlive", JSON.stringify(arrayAlive));
}

export function getStorageArrayAlive(): number[][] {
  return JSON.parse(localStorage.getItem("arrayAlive") as string);
}

// {"valueRows":5,"valueCols":5,"valueRange":1,"interval":1000}
export function storageConfig(configData: TConfig): void {
  localStorage.setItem("config", JSON.stringify(configData));
}

export function getStorageConfig(): TConfig  {
  let configData: TConfig =
    JSON.parse(localStorage.getItem("config") as string);
    
  if(configData === null) {
    configData = {
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
      interval: config.interval
    };
    storageConfig(configData);
  }
  return configData;
}

export function createStorage(): void {
  const configDataActual = getStorageConfig();
  if(configDataActual === null) {
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
      interval: config.interval
    };
    storageConfig(configDt);
  }

  let aliveStorage = getStorageArrayAlive();
  if(aliveStorage === null) {
    storageArrayAliveSave(getAliveList(config.valueRows, config.valueCols));
    aliveStorage = getStorageArrayAlive();
  }

  const rows = Number(aliveStorage.length);
  const cols = Number(aliveStorage[0].length);

  if(
    rows !== Number(configDataActual.valueRows) ||
    cols !== Number(configDataActual.valueCols)
  ) {
    console.log("222");
    localStorage.removeItem('arrayAlive');
    const arrayAlive = 
      getAliveList(configDataActual.valueRows, configDataActual.valueCols);
    storageArrayAliveSave(arrayAlive);
  }
}