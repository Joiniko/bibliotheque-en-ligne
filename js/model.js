let books = JSON.parse(localStorage.getItem('books')) || [];
let currentId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 0;

export function getBooks() {
    return books;
}

export function addBook(book) {
    book.id = currentId++;
    book.status = 'toRead';
    books.push(book);
    saveBooks();
}
