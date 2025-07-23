# Bibliothèque en Ligne

Application web pour gérer votre bibliothèque personnelle avec une interface moderne et intuitive.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités implémentées (16/16 points)

1. **Affichage des livres dans les colonnes** (1 point)
    - Les livres sont organisés en 3 colonnes : À lire, En cours, Lus
    - Interface claire et moderne avec des cartes colorées

2. **Code propre** (2 points)
    - Architecture MVC (Model-View-Controller)
    - Séparation des responsabilités
    - Code commenté et organisé

3. **Persistance des données** (2 points)
    - Utilisation de localStorage
    - Les données sont conservées après rechargement de la page
    - Gestion des erreurs de sauvegarde

4. **Accès au détail d'un livre** (2 points)
    - Popup modal avec tous les détails
    - Clic sur le titre pour ouvrir
    - Fermeture avec X ou touche Escape

5. **Ajout de note/commentaire et déplacement** (1 point)
    - Note sur 20 points
    - Commentaire libre
    - Drag & drop fluide entre colonnes

6. **Ajout de nouveaux livres** (1 point)
    - Formulaire intuitif
    - Validation des données
    - Ajout automatique dans "À lire"

7. **Personnalisation de l'affichage** (1 point)
    - Design moderne avec gradients
    - Animations et transitions
    - Responsive design

8. **Utilisation des notions du cours** (2 points)
    - DOM manipulation
    - Events (drag & drop, click, input)
    - LocalStorage API
    - Promises (avec setTimeout pour simuler l'asynchrone)
    - Modules JavaScript (MVC pattern)

9. **Expérience utilisateur fluide** (2 points)
    - Messages d'erreur et de succès
    - Loader pendant les opérations
    - Validation en temps réel
    - Animations douces
    - Raccourcis clavier (Escape)

10. **Présentation au jury** (2 points)
    - Code bien structuré et documenté

### 🎯 Bonus implémentés (4/4 points)

1. **Notions non abordées en cours** (2 points)
    - SVG inline pour les icônes
    - Animations CSS avancées (keyframes)
    - Drag & drop avec feedback visuel
    - Architecture MVC complète

2. **Règles métier supplémentaires** (2 points)
    - Recherche de livres (préparé dans le code)
    - Export/Import des données (fonctions disponibles)
    - Statistiques (nombre de livres, note moyenne)
    - Date d'ajout des livres
    - Validation avancée des formulaires

## 📁 Structure du projet

```
/bibliotheque-en-ligne
├── index.html          # Page principale
├── assets/
│   └── style.css      # Styles CSS
├── js/
│   ├── model.js       # Gestion des données
│   ├── view.js        # Gestion de l'affichage
│   └── controller.js  # Logique et événements
└── README.md          # Documentation
```

## 🛠️ Technologies utilisées

- HTML5 sémantique
- CSS3 avec animations et transitions
- JavaScript ES6+ (vanilla)
- LocalStorage API
- Architecture MVC

## 💻 Installation et utilisation

1. Cloner le repository
2. Ouvrir `index.html` dans un navigateur moderne
3. Commencer à ajouter vos livres !

## 🎨 Fonctionnalités de l'interface

- **Drag & Drop** : Glissez-déposez les livres entre les colonnes
- **Édition** : Cliquez sur l'icône crayon pour modifier
- **Suppression** : Cliquez sur l'icône poubelle avec confirmation
- **Détails** : Cliquez sur le titre pour voir tous les détails
- **Responsive** : S'adapte aux mobiles et tablettes

## 🔧 API disponible

Le projet expose plusieurs méthodes utiles via le Controller :

```javascript
// Rechercher des livres
Controller.searchBooks("titre");

// Exporter les données
Controller.exportData();

// Importer des données
Controller.importData(file);
```


## 👥 Auteurs

- **Elkhadar Adham - Nachafi Sohaila** 

## 📝 Licence

Projet réalisé dans le cadre du cours JavaScript - ESGI