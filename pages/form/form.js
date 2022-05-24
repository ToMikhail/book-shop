let now = new Date();

let year = now.getFullYear();
let month =
  now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
let day = now.getDate() + 1;

var dateControl = document.querySelector('input[type="date"]');
dateControl.min = `${year}-${month}-${day}`;

const checkboxItems = document.querySelectorAll("input[type=checkbox]");
let count = 0;

//checkbox
checkboxItems.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.getAttribute("checked") === null) {
      e.target.setAttribute("checked", true);
      count += 1;
    } else if (e.target.getAttribute("checked") === "true") {
      e.target.setAttribute("checked", false);
      count -= 1;
    } else if (e.target.getAttribute("checked") === "false") {
      e.target.setAttribute("checked", true);
      count += 1;
    }

    if (count === 2) {
      for (let i = 0; i < checkboxItems.length; i++) {
        if (checkboxItems[i].checked === false) {
          checkboxItems[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < checkboxItems.length; i++) {
        checkboxItems[i].disabled = false;
      }
    }
  });
});

const requiredElements = document
  .querySelector(".form")
  .querySelectorAll("[required]");
// console.log(requiredElements[0].value.length === 0);
const FORM = document.querySelector(".form");
const submitBtn = document.querySelector(".btn-confirm");

FORM.addEventListener("keydown", () => {
  for (let i = 0; i < requiredElements.length; i++) {
    console.log(requiredElements[i].classList.contains('valid'));
    if (requiredElements[i].value.length == 0) {
      // submitBtn.disabled = true;
      console.log("fuck");
      return;
    }
  }
  console.log("hr");
  submitBtn.disabled = false;
});

//poup
const popup = document.querySelector(".popup");
submitBtn.addEventListener("click", () => {
  let popupText = document.querySelector(".popup-text");
  let street = document.querySelector("[data-adress='street']").value;
  let house = document.querySelector("[data-adress='house']").value;
  let flat = document.querySelector("[data-adress='flat']").value;
  let firstName = document.querySelector("[data-name='first']").value;
  let lastName = document.querySelector("[data-name='last']").value;
  popupText.textContent = `The delivery address is ${street} street house ${house} flat ${flat}. Customer ${firstName} ${lastName}.`;
  popup.classList.add('visible')
});

console.log("popup: ", popup);

function submitForm(event){
  event.preventDefault();
}

const popUpBtn =document.querySelector("#btn-popup")

popUpBtn.addEventListener("click", () => {
  popup.classList.remove('visible')
})