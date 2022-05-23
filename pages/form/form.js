let now= new Date();
console.log('now: ', now);

let year = now.getFullYear();
let month = ((now.getMonth() + 1) > 9) ? (now.getMonth() + 1) : `0${now.getMonth() + 1}`;
console.log('month: ', month);
let day = now.getDate() + 1;


var dateControl = document.querySelector('input[type="date"]');
console.log('dateControl: ', dateControl);
dateControl.min = `${year}-${month}-${day}`;