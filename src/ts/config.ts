// settings

const config = {
  title: "Game of Life",
  fields: [
    {
      field: "input",
      id: "rowField",
      class: "input",
      type: "number",
      name: "rowField",
      label: "Rows",
      value: 5,
      min: 3,
      max: 30,
      step: 1,
    },
    {
      field: "input",
      id: "colField",
      class: "input",
      type: "number",
      name: "colField",
      label: "Cols",
      value: 5,
      min: 3,
      max: 30,
      step: 1,
    },
    {
      field: "input",
      id: "range",
      class: "range",
      type: "range",
      name: "tickmarks",
      label: "Speed",
      value: 1,
      min: 1,
      max: 5,
      step: 1,
    },
  ],
  button: [
    {
      field: "button",
      id: "buttonStart",
      class: "button",
      text: "Start",
      disabled: true,
    },
    {
      field: "button",
      id: "buttonStop",
      class: "button",
      text: "Stop",
      disabled: true,
    },
    {
      field: "button",
      id: "buttonClear",
      class: "button",
      text: "Clear",
      disabled: true,
    },
  ],
  classTable: "table",
  classForm: "form",
  classCell: "cell",
  classCellActive: "cell_alive",
  interval: 1000,
  message: "message",
};

export default config;
