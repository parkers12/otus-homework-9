import config from "./config";
import { getAliveList } from "./extraFunctions";
import { getMarkupTable } from "./control";

function markup(elem: HTMLElement): void {
    const wrapper: HTMLElement = document.createElement("div");
    elem.appendChild(wrapper).setAttribute("class", "wrapper");
    const content: HTMLElement|null = document.querySelector(".wrapper")!;

    const header: HTMLElement = document.createElement("header");
    content.appendChild(header).setAttribute("class", "header");

    const title: HTMLElement = document.createElement("h1");
    header.appendChild(title).setAttribute("class", "title");
    title.innerHTML = config.title;

    const main: HTMLElement = document.createElement("main");
    content.appendChild(main).setAttribute("class", "main");

    const footer: HTMLElement = document.createElement("footer");
    elem.appendChild(footer).setAttribute("class", "footer");

    const countFilds = config.fields.length;

    const form: HTMLElement = document.createElement("div");
    main.appendChild(form).setAttribute("class", "form");
    form.setAttribute("id", "form");

    if(countFilds > 0) {
        for(let i = 0; i < countFilds; i += 1) {           
            const formItem: HTMLElement = document.createElement("div");
            form.appendChild(formItem).setAttribute("class", "form-item");

            const colField: HTMLElement =
                document.createElement(config.fields[i].field);
            formItem.appendChild(colField)
                .setAttribute("id", config.fields[i].id);
            colField.setAttribute("class", config.fields[i].class);
            colField.setAttribute("type", config.fields[i].type);
            
            const label: HTMLElement = document.createElement("label");
            formItem.appendChild(label)
                .setAttribute("for", config.fields[i].id);
            label.setAttribute("class", "label");
            label.innerHTML = config.fields[i].label;

            const { min, max, step } = config.fields[i];
            formItem.appendChild(colField)
                .setAttribute("name", config.fields[i].name);
            colField.setAttribute("value", String(config.fields[i].value));
            colField.setAttribute("min", String(min));
            colField.setAttribute("max", String(max));
            colField.setAttribute("step", String(step));
        
            if(config.fields[i].type === "range") {
                formItem.appendChild(colField)
                    .setAttribute("list", config.fields[i].name);
                const datalist: HTMLElement =
                    document.createElement("datalist");
                formItem.appendChild(datalist).
                    setAttribute("id", config.fields[i].name);
                for(let j = min; j <= max; j += step) {
                    const option: HTMLElement =
                        document.createElement("option");
                    datalist.appendChild(option)
                        .setAttribute("value", String(j));
                    option.setAttribute("label", String(j));
                    option.innerHTML = String(j);
                }
            }
        }
    } else {
        console.log("Error: missing elements input");
    }

    if(config.fields[0].value > 2 || config.fields[1].value > 2) {
        const table: HTMLTableElement = document.createElement("table");
        main.appendChild(table).setAttribute("class", "table");
        table.setAttribute("id", "table");
        table.setAttribute("border", "0");
        table.setAttribute("cellpadding", "0");
        table.setAttribute("cellspacing", "0");
        const aliveList: number[][] = 
            getAliveList(config.fields[0].value, config.fields[1].value);
        getMarkupTable(aliveList, table);
    } else {
        console.log("Error: small input values");
    }

    if(countFilds > 0) {
        const control: HTMLElement = document.createElement("div");
        main.appendChild(control).setAttribute("class", "control");
        control.setAttribute("id", "control");
        for(let i = 0; i < countFilds; i += 1) { 
            const button: HTMLElement =
                document.createElement(config.button[i].field);
            control.appendChild(button)
                .setAttribute("type", config.button[i].field);
            button.setAttribute("id", config.button[i].id);
            button.setAttribute("class", config.button[i].class);
            if(config.button[i].disabled) {
                button.setAttribute("disabled", "disabled");
            }
            button.innerHTML = config.button[i].text;
        }
    } else {
        console.log("Error: small input values");
    }
}

export default markup;