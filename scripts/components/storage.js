//
const token = "token";
const userinfoStorage = "user";
//savetoken lagrer det som er lagt til i localstorage
export function saveTokenjwc(tokenSave) {
  saveToLocalStorage(token, tokenSave);
}
//fetchToken henter tokenkey, som i dette tilfellet er jwc nummeret/idn i storage.
export function fetchToken() {
  return fetchFromLocalstorage(token);
}
//saveUser lagrer userobjectet
export function saveUserToStorage(user) {
  saveToLocalStorage(userinfoStorage, user);
}
//getUser henter brukernavnet fra userobjectet i localstorage. If statement sjekker om det er en bruker i localstorage så returner man user.username, username er propertyn
//Hvis det ikke er en userkey/userInfostorage så returnerer den 0
export function getUsername() {
  const user = fetchFromLocalstorage(userinfoStorage);
  if (user) {
    return user.username;
  }
  return null;
}

function saveToLocalStorage(listkey, valueAdd) {
  localStorage.setItem(listkey, JSON.stringify(valueAdd));
}
//Fetchfromlocalstorage sjekker verdien som blir lagt til i localstorage, if statement sjekker om verdien er der, hvis det ikke er noe der så returner det en tom array.
//Hvis verdien/keyn er i localstorage så returner det en parset versjon av det som er i localstorage.
function fetchFromLocalstorage(key) {
  const valueKey = localStorage.getItem(key);
  if (!valueKey) {
    return [];
  }

  return JSON.parse(valueKey);
}
