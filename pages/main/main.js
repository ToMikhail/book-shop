const response = await fetch("../../assets/books/books.json");
const booksData = await response.json();

let total = 0;
const root = document.querySelector("#root");
const wrapper = document.createElement("div");
wrapper.className = "wrapper";

const moreInfo = document.createElement("div");
moreInfo.className = "popup-info";
moreInfo.innerHTML = `<div class="popup-wrapper">
<span class="btn-close">&times;</span>
<p class="popup-text"></p>
</div>`;

root.append(wrapper, moreInfo);

// header
const header = document.createElement("header");
header.className = "header";

const heading = document.createElement("h1");
heading.className = "heading";
heading.textContent = "You are welcome to our BookStore!";

// const imgHead = document.createElement("img");
// imgHead.className = "img img-header";

// header.append(imgHead, heading);
header.append(heading);

// main
const main = document.createElement("main");
main.className = "main";

const catalog = document.createElement("div");
catalog.className = "catalog";

const basket = document.createElement("div");
basket.className = "basket";

wrapper.append(header, main);
main.append(catalog, basket);

// section catalog

let catalogTitle = document.createElement("h2");
catalogTitle.className = "title catalog-title";
catalogTitle.textContent = "Book Catalog";

const booksList = document.createElement("div");
booksList.className = "books-list";

let bookItem = document.createElement("div");
bookItem.className = "book-item";

// add book item

function addBookItem(element) {
  let bookItem = document.createElement("div");
  bookItem.setAttribute('draggable', 'true')
  bookItem.className = "book-item";
  bookItem.innerHTML = `<img class="card-item-img" src="${element.imageLink}"/>
  <div class="card-item-content-wrapper">
  <h3 class="book-author">${element.author}</h3>
  <p class="book-title">${element.title}</p>
  <p class="book-price">Price: $${element.price}</p>
  <div class="btn-more-info">Show more</div>
  <button class="btn-add" role="button">Add to bag</button>
  </div>`;
  booksList.append(bookItem);
}

catalog.append(catalogTitle, booksList);

for (let i = 0; i < booksData.length; i++) {
  addBookItem(booksData[i]);
}

// section basket

const basketTitle = document.createElement("h2");
basketTitle.className = "title basket-title";
basketTitle.textContent = "Order books";
const orderList = document.createElement("div");
orderList.className = "order-list";

const confirmLink = document.createElement("a");
confirmLink.className = "confirm-link";
confirmLink.href = "../form/form.html";
confirmLink.setAttribute('href', "../form/form.html")
const confirmBtn = document.createElement("button");
confirmBtn.className = "btn-confirm";
confirmBtn.textContent = "Confirm order";
const totalDiv = document.createElement("p");
totalDiv.className = "total";
totalDiv.textContent = `Total: $${total}`;
const confirmation = document.createElement("div");
confirmation.className = "confirmation";

basket.append(basketTitle, confirmation, orderList);
confirmation.append(totalDiv, confirmLink);
confirmLink.append(confirmBtn);


// modal window
const closePopupBtn = document.querySelector(".btn-close");
const popupInfo = document.querySelector(".popup-info");

closePopupBtn.addEventListener("click", () => {
  popupInfo.classList.toggle("visible");
});

const showMoreInfo = document.querySelectorAll(".btn-more-info");

showMoreInfo.forEach((element) => {
  element.addEventListener("click", () => {
    popupInfo.classList.toggle("visible");
    let parent = element.parentElement;
    let author = parent.childNodes[1].textContent;
    let info = findBookInfo(author, booksData);
    let popupText = document.querySelector(".popup-text");
    popupText.innerHTML = `<h4>${author}</h4><div class="popup-description">${info}</div>`;
  });
});

function findBookInfo(author, arr) {
  let info;
  for (let i = 0; i < arr.length; i++) {
    if (author === arr[i].author) {
      info = arr[i].description;
      return info;
    }
  }
}

//add to the bag
const addBtns = document.querySelectorAll(".btn-add");

let orderBookCloseBtns;
//need to check
addBtns.forEach((element) => {
  element.addEventListener("click", () => {
    let parent = element.parentElement;
    let grandparent = parent.parentElement;
    let author = parent.childNodes[1].textContent;
    let title = parent.childNodes[3].textContent;
    let price = +parent.childNodes[5].textContent.split("$")[1];
    let imgNodeSrc = grandparent.childNodes[0].src;
    let orderItem = addOrderItem(author, title, imgNodeSrc, price);
    orderList.append(orderItem);
    total += price;
    totalDiv.textContent = `Total: $${total}`;

    // orderBookCloseBtns = document.querySelectorAll(".order-item-btn-close");

    orderItem
      .querySelector(".order-item-btn-close")
      .addEventListener("click", (e) => {
        let parent = e.target.parentElement;
        let price = parent.childNodes[5].textContent;
        total = total - price;
        totalDiv.textContent = `Total: $${total}`;
        e.target.closest(".order-item").remove();
      });
  });
});

function addOrderItem(author, title, imgSrc, price) {
  let orderItem = document.createElement("div");
  orderItem.className = "order-item";
  orderItem.innerHTML = `
  <img class="order-item-img" src="${imgSrc}">
  <div class="order-item-content">
   <h3 class="book-author">${author}</h3>
   <p class="book-title">${title}</p>
   <p class="book-price-invisible">${price}</p>
   <span class="btn-close order-item-btn-close">&times;</span>
   </div>`;

  return orderItem;
}


//drag and drop
const books = document.querySelectorAll(".book-item");


orderList.addEventListener('drop', drop)

orderList.addEventListener('dragover', dragOver);
orderList.addEventListener('dragenter', dragEnter);

for (const book of books) {
  book.addEventListener('dragstart', dragStart);

}

function dragStart(e) {
  // console.log('el', e.target);
  if(e.target.classList.contains("book-item")) {
    console.log('hell');
    e.dataTransfer.setData("text/plain", e.target.innerHTML);
  } else {
    console.log(e.target.closest(".book-item"));
    console.log('fuck');
    e.dataTransfer.setData("text/plain", e.target.closest(".book-item").innerHTML);
  }
  // e.dataTransfer.setData("text/plain", e.target.innerHTML);

}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function drop(ev) {
  let orderItem = document.createElement('div');
  orderItem.className = 'order-item';
  orderItem.innerHTML = ev.dataTransfer.getData("text/plain", ev.target.innerHTML)
  this.append(orderItem)
  orderItem.firstChild.classList = 'order-item-img';
  orderItem.lastChild.classList = 'order-item-content';
  let lastChild = orderItem.lastChild;
  let d_btn = this.querySelector('.btn-add');
  let d_btnInfo = this.querySelector('.btn-more-info');
  let priceElement = this.querySelector('.book-price');
  priceElement.className = "book-price-invisible";
  let price = +priceElement.textContent.slice(-2);
  lastChild.removeChild(d_btn);
  lastChild.removeChild(d_btnInfo);
  let add_span = document.createElement('span');
  add_span.className = 'btn-close order-item-btn-close';
  add_span.textContent = '×'
  lastChild.appendChild(add_span)

  orderItem
  .querySelector(".order-item-btn-close")
  .addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let priceElement = parent.querySelector('.book-price-invisible');
    let price = +priceElement.textContent.slice(-2);
    console.log('price: ', price);
    total = total - price;
    totalDiv.textContent = `Total: $${total}`;
    e.target.closest(".order-item").remove();
  });

  total += price;
  totalDiv.textContent = `Total: $${total}`;
}