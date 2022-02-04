import config from "./config";
import { errorMessage } from "./errorMessage";

describe("errorMessage", () => {
  it("Get message with error", () => {
    const bullitListBf = document.getElementById(config.message) as HTMLElement;
    expect(bullitListBf).toBe(null);
    errorMessage("Test");
    const bullitListAf = document.getElementById(config.message) as HTMLElement;
    const isTrue = bullitListAf.classList.contains(config.message);
    expect(isTrue).toBe(true);
  });
});
