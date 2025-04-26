import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://my-fave-recipes-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDb = ref(database, "leads");
// let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
// const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");
// const saveBtn = document.getElementById("save-btn");
onValue(referenceInDb, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});
// if (leadsFromLocalStorage) {
//   myLeads = leadsFromLocalStorage;
//   render(myLeads);
// }

// saveBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
//   });
// });

inputBtn.addEventListener("click", function () {
  push(referenceInDb, inputEl.value);
  inputEl.value = "";
});
deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDb);
  ulEl.innerHTML = "";
});
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
        <a href="https://${leads[i]}" target="_blank">
        ${leads[i]}
      </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}
