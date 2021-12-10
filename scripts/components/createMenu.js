import { getUsername } from "./storage.js";

export function createMenu() {
  const menuContainer = document.querySelector(".menu_container");
  //pathname brukes for å sjekke hva som er den aktive lenken/hvilken side man er på.
  const { pathname } = document.location;
  console.log(pathname);
  //henter usernameinfo fra storage
  const username = getUsername();
  console.log(username);
  let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;
  if (username) {
    authLink = `
    <a href="addProduct.html" class="${pathname === "/addProduct.html" ? "active" : ""}">Add product</a>
    
    <span>Hi ${username}</span>`;
  }

  menuContainer.innerHTML += `<div class="menu">
    <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
    ${authLink}
    </div>
    `;
}
//kommet til creating a dynamic menu i assignment 3.3 første video
