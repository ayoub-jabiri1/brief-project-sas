const prompt = require("prompt-sync")();

// 1: Main Variables

let livres = [],
    abonnes = [],
    emprunts = [],
    choice;

// 2: Start Functions

function startProgram() {
    console.log(`
a : Gestion des livres:
b : Gestion des abonnés:
c : Gestion des emprunts:
0 : Quitter

        `);
    let option = prompt("Choisissez une option: ");

    if (option == "a") {
        console.log(`
    1  : Ajouter un livre
    2  : Afficher tous les livres
    3  : Trier les livres par titre 
    4  : Trier les livres par année de publication
    5  : Afficher les livres disponibles
    6  : Rechercher un livre par ISBN
    12 : retour
    0  : Quitter
            `);
    } else if (option == "b") {
        console.log(`
    7  : Ajouter un abonné
    8  : Afficher tous les abonnés 
    12 : retour
    0  : Quitter
            `);
    } else if (option == "c") {
        console.log(`
    9  : Enregistrer un emprunt
    10 : Enregistrer un retour
    11 : Afficher les livres empruntés par un abonné donné
    12 : retour
    0  : Quitter
            `);
    } else if (option == "0") {
        return;
    } else {
        console.log("Le choix n'existe pas, choisissez un autre");

        // Show The Main Menu again
        startProgram();
    }

    // Get input
    choice = prompt("    Choisissez une option: ");

    // Handle Choices
    handleOperations();
}

function handleOperations() {
    // End the Program if the Choice is "0"
    if (choice == 0) {
        return;
    }

    // Handle Choices
    handleChoices();
}

function handleChoices() {
    switch (choice) {
        case "1":
            addLivre();
            break;
        case "2":
            serviceTitle("Afficher tous les livres");
            showLivres(livres);
            break;
        case "3":
            sortLivresByTitle();
            break;
        case "4":
            sortLivresByDate();
            break;
        case "5":
            showAvailableLivres();
            break;
        case "6":
            searchByIsbn();
            break;
        case "7":
            addAbonne();
            break;
        case "8":
            showAbonnes(abonnes);
            break;
        case "9":
            borrowLivre();
            break;
        case "10":
            returnBook();
            break;
        case "11":
            showBorrowedLivres();
            break;
        case "12":
            startProgram();
            break;
        default:
            console.log("    Le choix n'existe pas, choisissez un autre");
            startProgram();
    }
}

function addLivre() {
    serviceTitle("Ajouter un livre");

    let livre = {
        isbn: prompt("    Entrer l'ISBN du livre: "),
        titre: prompt("    Entrer le titre livre: "),
        auteur: prompt("    Entrer l'auteur du livre: "),
        annee: prompt("    Entrer l'annee du livre: "),
        disponible: true,
    };

    livres.push(livre);

    console.log("    Livre ajouté avec succès!");

    // Keep the Program Running
    startProgram();
}

function showLivres(livresArray) {
    if (livresArray.length > 0) {
        // Toggle Livres Availability to Disponible / Non disponible
        livresArray.map((livre) =>
            livre.disponible
                ? (livre.disponible = "Disponible")
                : (livre.disponible = "Non disponible")
        );

        console.table(livres);

        // Toggle Livres Availability to Booleans
        livresArray.map((livre) =>
            livre.disponible == "Disponible"
                ? (livre.disponible = true)
                : (livre.disponible = false)
        );
    } else {
        console.log("    Il n'y a aucun livre pour afficher!");
    }

    // Keep the Program Running
    startProgram();
}

function sortLivresByTitle() {
    serviceTitle("Trier les livres par titre");

    let choice = prompt(
        '    Taper (1) pour trier les livres "ascendant" ou taper (2) pour trier les livres "descendant": '
    );

    let sortedLivres = livres.sort((a, b) => {
        if (a.titre < b.titre) {
            return -1;
        }
        if (a.titre > b.titre) {
            return 1;
        }
        return 0;
    });

    if (choice == "2") {
        sortedLivres.reverse();
    } else if (choice != "1" && choice != "2") {
        console.log("    Le choix n'existe pas, choisissez un autre!");
        sortLivresByTitle();
    }

    showLivres(sortedLivres);
}

function sortLivresByDate() {
    serviceTitle("Trier les livres par année de publication");

    let sortedLivres = livres.sort((a, b) => {
        if (a.annee < b.annee) {
            return -1;
        }
        if (a.annee > b.annee) {
            return 1;
        }
        return 0;
    });

    showLivres(sortedLivres);
}

function showAvailableLivres() {
    serviceTitle("Afficher les livres disponibles");

    let array = livres.filter((livre) => livre.disponible == true);

    showLivres(array);
}

function searchByIsbn() {
    serviceTitle("Rechercher un livre par ISBN");

    let isbn = prompt("    Rechercher un livre par ISBN: ");

    let array = livres.filter((livre) => livre.isbn == isbn);

    showLivres(array);
}

function addAbonne() {
    serviceTitle("Ajouter un abonné");

    let abonne = {
        id: abonnes.length + 1,
        nom: prompt("    Entrer le nom du abonne: "),
        prenom: prompt("    Entrer le prenom du abonne: "),
        email: prompt("    Entrer l'email du abonne: "),
    };

    abonnes.push(abonne);

    console.log("    Abonne ajouté avec succès!");

    // Keep the Program Running
    startProgram();
}

function showAbonnes(abonneArray) {
    showAbonnes("Afficher tous les abonnés");

    if (abonneArray.length > 0) {
        console.table(abonnes);
    } else {
        console.log("    Il n'y a aucun abonne pour afficher!");
    }

    // Keep the Program Running
    startProgram();
}

function abonneCheck() {
    let id = prompt("    Entrer l'ID du abonne: ");

    return abonnes.find((abonne) => abonne.id == id);
}

function borrowLivre() {
    showAbonnes("Enregistrer un emprunt");

    let abonne = abonneCheck();

    if (abonne != undefined) {
        let isbn = prompt("    Entrez l'ISBN du livre: ");

        let livreCheck = false;

        // Set Date Settings
        let currentDate = new Date(),
            fullDate = `${currentDate.getFullYear()}-${
                currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;

        for (let livre of livres) {
            if (livre.isbn == isbn) {
                // The Book is Found and Available
                if (livre.disponible) {
                    livre.disponible = false;

                    // Push Borrow Info
                    emprunts.push({
                        abonneId: abonne.id,
                        isbn: isbn,
                        dateEmprunt: fullDate,
                    });

                    console.log("    Livre emprunté avec succès!");
                } else {
                    // The Book is Found and but not Available
                    console.log("    Le livre n'est pas disponible!");
                }

                // Set the Book as Found
                livreCheck = true;
                break;
            }
        }

        // Check if the Book Exist
        if (!livreCheck) console.log("    le livre n'existe pas!");
    } else {
        console.log(
            "    Abonne n'est pas enregistré, inscrivez-vous avant d'emprunter un livre!"
        );
    }

    // Keep the Program Running
    startProgram();
}

function returnBook() {
    showAbonnes("Enregistrer un retour");

    let abonne = abonneCheck();

    if (abonne != undefined) {
        let isbn = prompt("    Entrez l'ISBN du livre: ");

        let borrowCheck = false;

        for (let [i, emprunt] of emprunts.entries()) {
            if (emprunt.isbn == isbn) {
                // Set the Book as Available Again
                for (let livre of livres) {
                    if (livre.isbn == emprunt.isbn) livre.disponible = true;
                }

                // Remove the Book from Borrowing Array
                emprunts.splice(i, 1);

                console.log("    Le livre est retourné avec succès!");

                borrowCheck = true;

                break;
            }
        }

        // If the Book is not Borrowed
        if (!borrowCheck) console.log("    Le livre n'est pas emprunté!");
    } else {
        console.log("    Abonne n'est pas enregistré!");
    }

    // Keep the Program Running
    startProgram();
}

function showBorrowedLivres() {
    serviceTitle("Afficher les livres empruntés par un abonné donné");

    let abonne = abonneCheck();

    if (abonne != undefined) {
        let borrowCheck = false;

        for (let emprunt of emprunts) {
            if (emprunt.abonneId == abonne.id) {
                for (let emprunt of emprunts) {
                    console.log(
                        `
    Abonne ID           : ${emprunt.abonneId}
    Livre emprunté ISBN : ${emprunt.isbn}
    Date d'emprunt      : ${emprunt.dateEmprunt}
                        `
                    );
                }

                borrowCheck = true;
                break;
            }
        }

        // If the Abonne has no Borrowed Books to Show
        if (!borrowCheck)
            console.log("    Abonne n'a aucun livre emprunté à afficher!");
    } else {
        console.log("    Abonne n'est pas enregistré!");
    }

    // Keep the Program Running
    startProgram();
}

function serviceTitle(title) {
    // Add Empty Space
    console.log("");

    // Add the Service Title
    console.log(`    ${title}:`);
}

// 3: Start The Program

console.log(`
========= Gestion d’une Bibliothèque =========
    `);

startProgram();
