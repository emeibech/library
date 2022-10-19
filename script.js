const myLibrary = [];

class Book {

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    static getBook() {
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
            UI.displayBooks(book);
        
            //clear previous input
            UI.clearField();
        });
    }

    static deleteBook(e) {
        if(e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            const data = e.target.parentElement.getAttribute('data-index');
            myLibrary.splice(data, 1);
        }
    }
}

class UI {

    static displayBooks(book) {
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

    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#status').value = 'Finished';
    }

    static editStatus(e) {
        if(e.target.classList.contains('status')) {
            const target = e.target;
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
            target.parentElement.classList.add('container-relative');
            container.classList.add('selection');
            target.parentElement.appendChild(container);
            target.parentElement.removeChild(target);
            UI.prototype.replaceStatus();
        }
    }

    replaceStatus() {
        document.querySelector('.selection').addEventListener('click', (e) => {
            const options = document.querySelector('.selection');
            const data = options.parentElement.getAttribute('data-index');
            const book = document.querySelector(`.book[data-index="${data}"]`);
            const newStatus = document.createElement('p');
            newStatus.textContent = `${e.target.textContent}`;
            myLibrary[data].status = `${e.target.textContent}`;
            newStatus.classList.add('status');
            book.appendChild(newStatus);
            book.removeChild(options);
        });
    }
}

Book.getBook();
document.querySelector('.lib').addEventListener('click', Book.deleteBook);
document.querySelector('.lib').addEventListener('click', UI.editStatus);