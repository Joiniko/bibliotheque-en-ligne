export function createBookElement(book, onEdit, onDelete, onDetail) {
    const div = document.createElement('div');
    div.className = 'book';
    div.id = `book-${book.id}`;

    div.innerHTML = `
    <div class="book-content">
      <div>
        <strong class="book-title" style="cursor:pointer; color:#007bff;">${book.title}</strong><br/>
        Note: ${book.note}<br/>
        <em>${book.comment}</em>
      </div>
    </div>
  `;

    document.getElementById(book.status).appendChild(div);
}
