import { displayMessage } from "./components/displayMessage.js";
import { createMenu } from "./components/createMenu.js";
import { baseUrl } from "./settings/apiurl.js";
import { fetchToken } from "./components/storage.js";

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".formmessage_container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  console.log("pricevalue var", priceValue);

  if (nameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue === 0) {
    displayMessage("Error", "please supply a legit value", ".formmessage_container");
  }
  addNewProduct(nameValue, priceValue, descriptionValue);
}

async function addNewProduct(name, price, description) {
  const url = baseUrl + "products";

  console.log(url);
  const data = JSON.stringify({ name: name, price: price, description: description });

  const token = fetchToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const result = json.data;
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
