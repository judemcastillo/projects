const myLibrary = [];

function Book(title, author, pages, stats, isRead){
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();;
}

Book.prototype.toggleReadStatus = function(){
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayLibrary(); // Update display
}

function removeBookFromLibrary(bookId){
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if(bookIndex !== -1){
      myLibrary.splice(bookIndex, 1);
      displayLibrary();
    }
}

function toggleBookReadStatus(bookId){
    const book = myLibrary.find(book => book.id === bookId);
    if(book){
      book.toggleReadStatus();
      displayLibrary();
    }    
}



function displayLibrary() {
    const libraryContainer = document.getElementById("book-selection");
    libraryContainer.innerHTML = ""; // Clear previous display
  
    myLibrary.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("data-id", book.id);
      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> <span class="${book.isRead ? 'read-yes' : 'read-no'}">${book.isRead ? "✅ Yes" : "❌ No"}</span></p>
        <div><button class="remove-btn" onclick="removeBookFromLibrary('${book.id}')">Remove</button>
        <button class="toggle-read-status-btn" onclick="toggleBookReadStatus('${book.id}')">Read Status</button></div>
      `;
      libraryContainer.appendChild(bookCard);
    });
}

// Add some test books
data = [
    ["The Hobbit", "J.R.R. Tolkien", 310, true],
    ["1984", "George Orwell", 328, false],
    ["To Kill a Mockingbird", "Harper Lee", 281, true],   
  
];

data.forEach(book => addBookToLibrary(...book));

//Add new book dialog/forms
const addNewBook = document.querySelector("#addBook");
const addDialog = document.querySelector("#dialog");
const submitButton = document.querySelector("#submit");
const closeButton = document.querySelector("#close")

addNewBook.addEventListener("click", ()=>{
  addDialog.showModal();
})

closeButton.addEventListener("click", ()=> {
  addDialog.close();
})

// Add new books base on the user input details
submitButton.addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const readStatus = document.querySelector('input[name="read-status"]:checked');

    if (!title || !author || !pages || !readStatus) {
        alert("Please fill in all fields.");
        return;
    }

    const isRead = readStatus.value === "yes"; // Convert to boolean

    addBookToLibrary(title, author, pages, isRead);
    addDialog.close();
    document.getElementById("bookForm").reset();
});