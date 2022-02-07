import "./styles/styles.scss";
import markup from "./ts/markup";
import App from "./ts/handlers";

export function startApp() {
    const app = document.getElementById("app") as HTMLDivElement;
    markup(app);
    App();
}

document.addEventListener("DOMContentLoaded", startApp);
