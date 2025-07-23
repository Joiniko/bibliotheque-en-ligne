// View - Gestion de l'affichage
const View = {
    // Créer l'élément HTML d'un livre
    createBookElement(book) {
        const div = document.createElement('div');
        div.className = 'book';
        div.draggable = true;
        div.id = `book-${book.id}`;

        const truncatedComment = book.comment.length > 60
            ? book.comment.slice(0, 60) + '...'
            : book.comment;

        div.innerHTML = `
      <div class="book-content">
        <div class="book-info">
          <div class="book-title" onclick="Controller.showBookDetail(${book.id})">${this.escapeHtml(book.title)}</div>
          <div class="book-note">Note: ${book.note}/20</div>
          ${book.comment ? `<div class="book-comment">${this.escapeHtml(truncatedComment)}</div>` : ''}
        </div>
        <div class="book-actions">
          <svg class="action-icon" onclick="Controller.editBook(${book.id})" title="Modifier" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <svg class="action-icon" onclick="Controller.removeBook(${book.id})" title="Supprimer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
      </div>
    `;

        // Ajouter les événements drag
        div.addEventListener('dragstart', this.handleDragStart);
        div.addEventListener('dragend', this.handleDragEnd);

        return div;
    },

    // Afficher tous les livres
    displayBooks(books) {
        // Vider les colonnes
        document.querySelectorAll('.books-container').forEach(container => {
            container.innerHTML = '';
        });

        // Ajouter les livres dans leurs colonnes respectives
        books.forEach(book => {
            const bookElement = this.createBookElement(book);
            const container = document.querySelector(`#${book.status} .books-container`);
            if (container) {
                container.appendChild(bookElement);
            }
        });
    },

    // Mettre à jour l'affichage d'un livre
    updateBookDisplay(book) {
        const oldElement = document.getElementById(`book-${book.id}`);
        if (oldElement) {
            const newElement = this.createBookElement(book);
            const container = document.querySelector(`#${book.status} .books-container`);
            if (container) {
                oldElement.remove();
                container.appendChild(newElement);
            }
        }
    },

    // Supprimer un livre de l'affichage
    removeBookFromDisplay(bookId) {
        const element = document.getElementById(`book-${bookId}`);
        if (element) {
            element.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => element.remove(), 300);
        }
    },

    // Gérer le début du drag
    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.id);
    },

    // Gérer la fin du drag
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        document.querySelectorAll('.column').forEach(col => {
            col.classList.remove('drag-over');
        });
    },

    // Afficher une erreur
    showError(message) {
        const popup = document.getElementById('errorPopup');
        const errorText = document.getElementById('errorMessage');
        errorText.textContent = message;
        popup.classList.remove('hidden');

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 5000);
    },

    // Afficher un message de succès
    showSuccess(message) {
        const popup = document.getElementById('errorPopup');
        const errorText = document.getElementById('errorMessage');

        popup.style.backgroundColor = '#27ae60';
        errorText.textContent = message;
        popup.classList.remove('hidden');

        setTimeout(() => {
            popup.classList.add('hidden');
            popup.style.backgroundColor = '#e74c3c';
        }, 3000);
    },

    // Fermer le popup
    closePopup() {
        document.getElementById('errorPopup').classList.add('hidden');
    },

    // Afficher le détail d'un livre
    showBookDetail(book) {
        document.getElementById('detailTitle').textContent = book.title;
        document.getElementById('detailNote').textContent = book.note + '/20';
        document.getElementById('detailComment').textContent = book.comment || 'Aucun commentaire';
        document.getElementById('detailPopup').classList.remove('hidden');
    },

    // Fermer le popup de détail
    closeDetailPopup() {
        document.getElementById('detailPopup').classList.add('hidden');
    },

    // Afficher le popup de confirmation
    showConfirmDialog() {
        document.getElementById('confirmPopup').classList.remove('hidden');
    },

    // Cacher le popup de confirmation
    hideConfirmDialog() {
        document.getElementById('confirmPopup').classList.add('hidden');
    },

    // Activer le mode édition
    setEditMode(book) {
        document.getElementById('titleInput').value = book.title;
        document.getElementById('noteInput').value = book.note !== 'N/A' ? book.note : '';
        document.getElementById('commentInput').value = book.comment;

        document.querySelector('.cancel-button').classList.remove('hidden');
        document.getElementById('titleAdd').textContent = "Modifier un livre";
        document.getElementById('btnAdd').textContent = "Sauvegarder";

        // Scroll vers le formulaire
        document.querySelector('.form-group').scrollIntoView({ behavior: 'smooth' });
    },

    // Réinitialiser le formulaire
    resetForm() {
        document.getElementById('titleInput').value = '';
        document.getElementById('noteInput').value = '';
        document.getElementById('commentInput').value = '';

        document.querySelector('.cancel-button').classList.add('hidden');
        document.getElementById('titleAdd').textContent = "Ajouter un livre";
        document.getElementById('btnAdd').textContent = "Ajouter";
    },

    // Afficher/cacher le loader
    showLoader() {
        document.getElementById('loader').classList.remove('hidden');
    },

    hideLoader() {
        document.getElementById('loader').classList.add('hidden');
    },

    // Échapper le HTML pour éviter les injections
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Obtenir les valeurs du formulaire
    getFormValues() {
        return {
            title: document.getElementById('titleInput').value.trim(),
            note: document.getElementById('noteInput').value.trim(),
            comment: document.getElementById('commentInput').value.trim()
        };
    },

    // Valider le formulaire
    validateForm(values) {
        if (!values.title) {
            this.showError("Le titre du livre est obligatoire !");
            return false;
        }

        if (values.note && (isNaN(values.note) || values.note < 0 || values.note > 20)) {
            this.showError("La note doit être comprise entre 0 et 20 !");
            return false;
        }

        return true;
    },

    // Mettre à jour les statistiques (si nécessaire)
    updateStatistics(stats) {
        // Cette fonction peut être étendue pour afficher des statistiques
        console.log('Statistiques:', stats);
    }
};