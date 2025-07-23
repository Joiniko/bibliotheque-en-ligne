// Controller - Gestion des événements et logique
const Controller = {
    editMode: false,
    editId: null,
    bookToDeleteId: null,

    // Initialisation
    init() {
        // Initialiser le modèle
        Model.init();

        // Afficher les livres
        View.displayBooks(Model.getAllBooks());

        // Ajouter les écouteurs d'événements
        this.setupEventListeners();

        // Afficher un message de bienvenue
        if (Model.getAllBooks().length === 0) {
            View.showSuccess("Bienvenue dans votre bibliothèque ! Ajoutez votre premier livre ci-dessous.");
        }
    },

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.editMode) {
                    this.cancelEdit();
                }
                View.closeDetailPopup();
                View.hideConfirmDialog();
            }
        });

        // Validation du formulaire en temps réel
        document.getElementById('noteInput').addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && (isNaN(value) || value < 0 || value > 20)) {
                e.target.style.borderColor = '#e74c3c';
            } else {
                e.target.style.borderColor = '';
            }
        });

        // Configurer le drag and drop pour les colonnes
        document.querySelectorAll('.column').forEach(column => {
            column.addEventListener('dragover', this.handleDragOver.bind(this));
            column.addEventListener('drop', this.handleDrop.bind(this));
            column.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
    },

    // Ajouter ou modifier un livre
    addBook() {
        const values = View.getFormValues();

        if (!View.validateForm(values)) {
            return;
        }

        View.showLoader();

        setTimeout(() => {
            if (this.editMode && this.editId !== null) {
                // Mode édition
                const updated = Model.updateBook(this.editId, {
                    title: values.title,
                    note: values.note || 'N/A',
                    comment: values.comment
                });

                if (updated) {
                    View.updateBookDisplay(updated);
                    View.showSuccess("Livre modifié avec succès !");
                    this.cancelEdit();
                } else {
                    View.showError("Erreur lors de la modification du livre.");
                }
            } else {
                // Mode ajout
                const book = Model.addBook(values.title, values.note, values.comment);
                const bookElement = View.createBookElement(book);
                document.querySelector('#toRead .books-container').appendChild(bookElement);

                View.resetForm();
                View.showSuccess("Livre ajouté avec succès !");
            }

            View.hideLoader();
            View.updateStatistics(Model.getStatistics());
        }, 300);
    },

    // Supprimer un livre
    removeBook(id) {
        this.bookToDeleteId = id;
        View.showConfirmDialog();
    },

    // Confirmer la suppression
    confirmDeletion() {
        if (this.bookToDeleteId !== null) {
            View.showLoader();

            setTimeout(() => {
                if (Model.deleteBook(this.bookToDeleteId)) {
                    View.removeBookFromDisplay(this.bookToDeleteId);
                    View.showSuccess("Livre supprimé avec succès !");
                } else {
                    View.showError("Erreur lors de la suppression du livre.");
                }

                this.bookToDeleteId = null;
                View.hideConfirmDialog();
                View.hideLoader();
                View.updateStatistics(Model.getStatistics());
            }, 300);
        }
    },

    // Annuler la suppression
    cancelDeletion() {
        this.bookToDeleteId = null;
        View.hideConfirmDialog();
    },

    // Éditer un livre
    editBook(id) {
        const book = Model.getBookById(id);
        if (!book) return;

        this.editMode = true;
        this.editId = id;
        View.setEditMode(book);
    },

    // Annuler l'édition
    cancelEdit() {
        this.editMode = false;
        this.editId = null;
        View.resetForm();
    },

    // Afficher le détail d'un livre
    showBookDetail(id) {
        const book = Model.getBookById(id);
        if (book) {
            View.showBookDetail(book);
        }
    },

    // Gestion du drag & drop
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    },

    handleDragLeave(e) {
        if (e.target.classList.contains('column')) {
            e.target.classList.remove('drag-over');
        }
    },

    handleDrop(e) {
        e.preventDefault();
        const bookId = e.dataTransfer.getData("text/plain");
        const bookElement = document.getElementById(bookId);

        if (!bookElement) return;

        // Trouver la colonne cible
        const column = e.target.closest('.column');
        if (!column) return;

        const newStatus = column.id;
        const bookIdNum = parseInt(bookId.replace('book-', ''));

        // Mettre à jour le statut dans le modèle
        if (Model.changeBookStatus(bookIdNum, newStatus)) {
            // Déplacer l'élément visuellement
            column.querySelector('.books-container').appendChild(bookElement);
            View.showSuccess("Livre déplacé avec succès !");
            View.updateStatistics(Model.getStatistics());
        }

        // Nettoyer les classes
        document.querySelectorAll('.column').forEach(col => {
            col.classList.remove('drag-over');
        });
    },

    // Rechercher des livres
    searchBooks(query) {
        if (!query) {
            View.displayBooks(Model.getAllBooks());
            return;
        }

        const results = Model.searchBooks(query);
        View.displayBooks(results);

        if (results.length === 0) {
            View.showError("Aucun livre trouvé pour cette recherche.");
        }
    },

    // Exporter les données
    exportData() {
        const data = Model.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bibliotheque_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        View.showSuccess("Données exportées avec succès !");
    },

    // Importer des données
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (Model.importData(e.target.result)) {
                View.displayBooks(Model.getAllBooks());
                View.showSuccess("Données importées avec succès !");
            } else {
                View.showError("Erreur lors de l'import des données.");
            }
        };
        reader.readAsText(file);
    }
};

// Initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    Controller.init();
});