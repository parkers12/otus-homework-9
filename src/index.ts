import "./styles/styles.scss";
import config from "./ts/config";
import markup from "./ts/markup";
import App from "./ts/handlers";

export function startApp() {
  const app = document.getElementById("app") as HTMLDivElement;
  markup(app, config);
  App();
}

document.addEventListener("DOMContentLoaded", startApp);
