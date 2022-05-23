let now = new Date();

let year = now.getFullYear();
let month =
  now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
let day = now.getDate() + 1;

var dateControl = document.querySelector('input[type="date"]');
dateControl.min = `${year}-${month}-${day}`;

const checkboxItems = document.querySelectorAll("input[type=checkbox]");
let count = 0;

checkboxItems.forEach((element) => {
  
  element.addEventListener("click", (e) => {
    if(e.target.getAttribute("checked") === null) {
      e.target.setAttribute("checked", true);
      count += 1;
    } 
    else if((e.target.getAttribute("checked") === 'true')) {
      e.target.setAttribute("checked", false);
      count -= 1;
    }
    else if((e.target.getAttribute("checked") === 'false')) {
      e.target.setAttribute("checked", true);
      count += 1;
    }

    console.log(count);
    if(count === 2) {
      for (let i = 0; i < checkboxItems.length; i++) {
        if (checkboxItems[i].checked === false) {
          checkboxItems[i].disabled = 'true'
          console.log('hek');
        }
      }
      
    }
  });
});
