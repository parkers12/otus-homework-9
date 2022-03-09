export function errorMessage(message: string): void {
  const body = document.getElementsByTagName("body")[0];
  const messageIdNotFound: HTMLElement = document.createElement("div");
  body.appendChild(messageIdNotFound).setAttribute("class", "Error");
  messageIdNotFound.setAttribute("id", "Error");
  messageIdNotFound.innerHTML = message;
}
