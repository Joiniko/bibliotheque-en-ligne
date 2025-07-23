import { getBooks, addBook } from './model.js';
import { createBookElement } from './view.js';

window.onload = () => {
    getBooks().forEach(book => {
        createBookElement(book);
    });

    document.getElementById('btnAdd').onclick = handleAdd;
};

function handleAdd() {
    const title = document.getElementById('titleInput').value.trim();
    const note = document.getElementById('noteInput').value.trim();
    const comment = document.getElementById('commentInput').value.trim();

    if (!title) {
        alert("Le titre est requis.");
        return;
    }

    addBook({ title, note: note || 'N/A', comment });
    location.reload(); // recharge temporaire

}
