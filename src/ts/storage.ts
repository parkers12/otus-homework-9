export function storageArrayAliveSave(arrayAlive: number[][]): void {
  localStorage.setItem("arrayAlive", JSON.stringify(arrayAlive));
}

export function getStorageArrayAlive(): number[][] {
  return JSON.parse(localStorage.getItem("arrayAlive") as string);
}
