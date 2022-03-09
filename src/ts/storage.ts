import config from "./config";

type TConfig = {
  valueRows: number;
  minRows: number;
  maxRows: number;
  stepRows: number;
  valueCols: number;
  minCols: number;
  maxCols: number;
  stepCols: number;
  valueRange: number;
  minRange: number;
  maxRange: number;
  stepRange: number;
  interval: number;
};

export function storageArrayAliveSave(arrayAlive: number[][]): void {
  localStorage.setItem("arrayAlive", JSON.stringify(arrayAlive));
}

export function getStorageArrayAlive(): number[][] {
  return JSON.parse(localStorage.getItem("arrayAlive") as string);
}

export function storageConfig(configData: TConfig): void {
  localStorage.setItem("config", JSON.stringify(configData));
}

export function getStorageConfig(): TConfig {
  let configData: TConfig = JSON.parse(
    localStorage.getItem("config") as string
  );

  if (configData === null) {
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
      interval: config.interval,
    };

    storageConfig(configData);
  }
  return configData;
}
