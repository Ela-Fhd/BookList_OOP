let addBook = document.querySelector(".add-book");
let backdrop = document.querySelector(".backdrop");
let modal = document.querySelector(".modal");
let modalBody = document.querySelector(".modal-body");
let form = document.querySelector("form");
let bookList = document.querySelector(".bookList");
let bookListTable = document.querySelector("#book-list-table");
let closeModal = document.querySelector(".modal-close");
let modalFlag = false;
let errorFlag = false;
let counter = 1;
let inputs = document.getElementsByClassName("modal-input");
let submitBtn = document.querySelector(".submit-btn");

const modalOperation = () => {
  if (modalFlag) {
    modal.style.display = "block";
    backdrop.style.display = " block";
  } else {
    modal.style.display = "none";
    backdrop.style.display = " none";
  }
};

addBook.addEventListener("click", () => {
  modalFlag = true;
  modalOperation();
});

backdrop.addEventListener("click", () => {
  modalFlag = false;
  modalOperation();
});

closeModal.addEventListener("click", () => {
  modalFlag = false;
  modalOperation();
});

const toggleClass = function () {
  this.previousElementSibling.classList.toggle("active");
};

for (let i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  input.addEventListener("focus", toggleClass);
  input.addEventListener("blur", toggleClass);
}

class Book {
  constructor(title, author, bookPublishYear) {
    this.title = title;
    this.author = author;
    this.bookPublishYear = bookPublishYear;
  }
}
class Ui {
  addBookToList(book) {
    let bookList = document.getElementById("table-body");
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${bookList.rows.length + 1}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.bookPublishYear}</td>
    <td><i class="fa-regular fa-trash delete-book"></i></td>`;
    bookList.appendChild(row);
  }

  showAlert(massage, alertType) {
    let errorBox = document.createElement("div");
    errorBox.classList.add("alert", alertType);
    errorBox.innerHTML = massage;
    if (errorFlag) {
      modalBody.insertBefore(errorBox, form);
    } else {
      bookList.insertBefore(errorBox, addBook);
    }
    setTimeout(() => {
      errorBox.remove();
    }, 4000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  clearFields() {
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      input.value = "";
      modalFlag = false;
      modalOperation();
    }
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let title = document.getElementById("bookTitle").value;
  let author = document.getElementById("bookAuthor").value;
  let publishYear = document.getElementById("bookPublishYear").value;

  let book = new Book(title, author, publishYear);
  let ui = new Ui();

  if (title === "" || author === "" || publishYear === "") {
    errorFlag = true;
    ui.showAlert("Please fill in All fields", "alert-danger");
  } else {
    errorFlag = false;
    ui.showAlert("Book added successfully", "alert-success");
    ui.addBookToList(book);
    ui.clearFields();
  }
});

bookListTable.addEventListener("click", function (e) {
  e.preventDefault();
  const ui = new Ui();
  if (e.target.classList.contains("delete-book")) {
    ui.deleteBook(e.target);
    ui.showAlert("Book Removed Successfully", "alert-success");
  }
});
