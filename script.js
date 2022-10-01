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

myLibrary.push(sapiens, prideAndPrejudice, carrieSotoisBack);

//display books
myLibrary.forEach(book => displayBooks(book));

function displayBooks(book) {
    const prev = document.querySelector('.book');
    const container = document.createElement('div');
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const del = document.createElement('button');
    container.classList.add(`book`);
    container.setAttribute('data-index', `${myLibrary.indexOf(book)}`);
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
    document.querySelector('.lib').insertBefore(container, prev);
}

document.querySelector('.book-form').addEventListener('submit', e => {
    //prevent default submit behavior
    e.preventDefault();

    //get new book value from input
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;

    //instantiate new book
    const book = new Book(title, author, pages, status);

    //add new book to array
    myLibrary.push(book);

    //display new book
    displayBooks(book);

    //clear previous input
    clearField();

    //change status for new books
    changeStatus();
});

function clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#status').value = 'Finished';
}

//delete book when x is clicked
document.querySelector('.lib').addEventListener('click', deleteBook);

function deleteBook(e) {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        const data = e.target.parentElement.getAttribute('data-index');
        myLibrary.splice(data, 1);
    }
}

//change read status
function changeStatus() {
    document.querySelectorAll('.book :last-child').forEach(item => {
        item.addEventListener('click', editStatus);
    })

    function editStatus(e) {
        const target = e.target;
        const parent = e.target.parentElement;
        const container = document.createElement('div');
        const finished = document.createElement('p');
        const notRead = document.createElement('p');
        const started = document.createElement('p');
        const dnfed = document.createElement('p');
        finished.textContent = 'Finished';
        notRead.textContent = 'Not Read';
        started.textContent = 'Started';
        dnfed.textContent = 'DNFed';
        container.append(finished, notRead, started, dnfed);
        parent.classList.add('container-relative');
        container.classList.add('selection');
        parent.appendChild(container);
        target.classList.add('status-hide');

        document.querySelectorAll('.selection > p').forEach(item => {
            item.addEventListener('click', replaceStatus)
        })
        
        function replaceStatus(e) {
        target.textContent = `${e.target.textContent}`;
        target.classList.remove('status-hide');
        container.classList.add('selection-hide');
        const data = e.target.parentElement.parentElement.getAttribute('data-index');
        myLibrary[data].status = `${e.target.textContent}`;
        }
    }
}

changeStatus();
