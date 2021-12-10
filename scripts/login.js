import { displayMessage } from "./components/displayMessage.js";
import { formUrl } from "./settings/apiurl.js";
import { saveTokenjwc, saveUserToStorage } from "./components/storage.js";
import { createMenu } from "./components/createMenu.js";
const form = document.querySelector("form");
const emailUsername = document.querySelector(".email");
const password = document.querySelector(".password");
const message = document.querySelector(".message");

createMenu();

form.addEventListener("submit", sendForm);

function sendForm(event) {
  //Sendform er sjekken som kjøres når man trykker på knappen.
  event.preventDefault();
  message.innerHTML = "";
  const emailUsernameValue = emailUsername.value.trim();
  const passwordValue = password.value.trim();

  if (emailUsernameValue.length === 0 || passwordValue === 0) {
    return displayMessage("Error", "Please fill out the email and password fields", ".message");
  }
  doingLogin(emailUsernameValue, passwordValue);
}

async function doingLogin(username, password) {
  //www.http/api/auth/local/ er v4 strapi
  const loginUrl = formUrl + "api/auth/local/";
  const data = JSON.stringify({ identifier: username, password: password });
  console.log(loginUrl);
  //const options er hvordan man skriver en post request.
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await fetch(loginUrl, options);
    const json = await response.json();
    console.log(json);
    if (json.user) {
      ///saveTok lagrer jwt taken to storage
      saveTokenjwc(json.jwt);
      //saveUser lagrer brukeren som er hentet i storage, i dette tilfellet gunther.
      saveUserToStorage(json.user);
      //Location redirecter til annen side hvis inputs er valid, i dette tilfellet home/index.html
      location.href = "/";
    }
    if (json.error) {
      //Json.error viser feilmelding hvis det som er lagt inn i inputs er feil info.
      displayMessage("Error", "please enter valid login information", ".message");
    }
  } catch (error) {
    console.log(error.message);
  }
}
