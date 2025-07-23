// Model - Gestion des données et localStorage
const Model = {
    books: [],
    currentId: 0,
    storageKey: 'library_books',

    // Initialisation du modèle
    init() {
        this.loadFromStorage();
    },

    // Charger les données depuis localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.books = JSON.parse(saved);
                this.currentId = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 0;
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.books = [];
            this.currentId = 0;
        }
    },

    // Sauvegarder dans localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.books));
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            return false;
        }
    },

    // Ajouter un livre
    addBook(title, note, comment) {
        const book = {
            id: this.currentId++,
            title: title.trim(),
            note: note || 'N/A',
            comment: comment || '',
            status: 'toRead',
            dateAdded: new Date().toISOString()
        };

        this.books.push(book);
        this.saveToStorage();
        return book;
    },

    // Mettre à jour un livre
    updateBook(id, updates) {
        const index = this.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updates };
            this.saveToStorage();
            return this.books[index];
        }
        return null;
    },

    // Supprimer un livre
    deleteBook(id) {
        const index = this.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Obtenir un livre par ID
    getBookById(id) {
        return this.books.find(b => b.id === id) || null;
    },

    // Obtenir tous les livres
    getAllBooks() {
        return [...this.books];
    },

    // Obtenir les livres par statut
    getBooksByStatus(status) {
        return this.books.filter(b => b.status === status);
    },

    // Changer le statut d'un livre
    changeBookStatus(id, newStatus) {
        const book = this.getBookById(id);
        if (book && ['toRead', 'reading', 'read'].includes(newStatus)) {
            book.status = newStatus;
            this.saveToStorage();
            return true;
        }
        return false;
    },

    // Rechercher des livres
    searchBooks(query) {
        const lowerQuery = query.toLowerCase();
        return this.books.filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.comment.toLowerCase().includes(lowerQuery)
        );
    },

    // Statistiques
    getStatistics() {
        return {
            total: this.books.length,
            toRead: this.books.filter(b => b.status === 'toRead').length,
            reading: this.books.filter(b => b.status === 'reading').length,
            read: this.books.filter(b => b.status === 'read').length,
            averageRating: this.calculateAverageRating()
        };
    },

    // Calculer la note moyenne
    calculateAverageRating() {
        const booksWithRating = this.books.filter(b => b.note !== 'N/A' && !isNaN(b.note));
        if (booksWithRating.length === 0) return 0;

        const sum = booksWithRating.reduce((acc, book) => acc + parseFloat(book.note), 0);
        return (sum / booksWithRating.length).toFixed(2);
    },

    // Exporter les données
    exportData() {
        return JSON.stringify(this.books, null, 2);
    },

    // Importer des données
    importData(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.books = imported;
                this.currentId = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 0;
                this.saveToStorage();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            return false;
        }
    }
};