import { baseUrl } from "./settings/apiurl.js";
import { createMenu } from "./components/createMenu.js";

const productsUrl = baseUrl + "products";

createMenu();

const productContainer = document.querySelector(".product_container");

async function apiAttempt() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    console.log(json);
    json.data.forEach(function (product) {
      productContainer.innerHTML += `<div><h4>${product.attributes.name}</h4>
      <p>${product.attributes.price}</p>
      <p>${product.attributes.description}</p>
      </div>`;
    });
  } catch (error) {
    console.log("lol");
  }
}
apiAttempt();
