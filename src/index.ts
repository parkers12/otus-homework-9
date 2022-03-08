import "./styles/styles.scss";
import { createStorage } from "./ts/main";
import markup from "./ts/markup";
import App from "./ts/handlers";

export function startApp() {
  const app = document.getElementById("app") as HTMLDivElement;
  createStorage();
  markup(app);
  App();
}

document.addEventListener("DOMContentLoaded", startApp);
