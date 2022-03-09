import { errorMessage } from "./errorMessage";

describe("errorMessage", () => {
  it("Get message with error", () => {
    const bullitListBf = document.getElementById("Error") as HTMLElement;
    expect(bullitListBf).toBe(null);
    errorMessage("Test");
    const bullitListAf = document.getElementById("Error") as HTMLElement;
    const isTrue = bullitListAf.classList.contains("Error");
    expect(isTrue).toBe(true);
  });
});
