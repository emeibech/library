const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

const sapiens = new Book('Sapiens: A Brief History of Humankind', 'Yuval Harari', '443', 'Finished');
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '276', 'Finished');
const carrieSotoisBack = new Book ('Carrie Soto is Back', 'Taylor Jenkins Reid', '384', 'Not Read');

myLibrary.unshift(carrieSotoisBack, prideAndPrejudice, sapiens);

//display books
myLibrary.forEach(book => displayBooks(book));

function displayBooks(book) {
    const container = document.createElement('div');
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const del = document.createElement('button');
    container.classList.add('book');
    del.setAttribute('href', '#');
    del.setAttribute('type', 'button');
    del.classList.add('delete');
    del.textContent = 'x';
    para1.textContent = `${book.title}`;
    para1.classList.add('title');
    para2.textContent = `${book.author}`;
    para2.classList.add('author');
    para3.textContent = `${book.pages} pages`;
    para3.classList.add('pages');
    para4.textContent = `${book.status}`;
    para4.classList.add('status');
    container.append(para1, del, para2, para3, para4);
    document.querySelector('.lib').appendChild(container);
}