/* Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati 
    - abbiamo calpestato una bomba 
    - la cella si colora di rosso e la partita termina
altrimenti 
    - la cella cliccata si colora di azzurro
    - l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta. */

// Creo una variabile per tenere traccia del punteggio dell'utente
let userScore = 0;
// Creo una variabile che mi servirà a sapere se la partita è finita
let gameOver = false;

// Prendo il bottone di input della difficoltà
const submitButton = document.getElementById("submitButton");

// Aggiungo un EventListener al bottone per resettare la partita e cambiare la difficoltà
submitButton.addEventListener("click", function() {
    // Resetto punteggio e progresso della partita
    userScore = 0;
    gameOver = false;
    // Prendo il valore del select
    const selectedDifficulty = document.getElementById("difficultySelector").value;
    switch (selectedDifficulty) {
        // Se è stata scelta la difficoltà facile, creo una griglia 10*10
        case "easy":
            createGrid(10, 10);
            break;
        // Se è stata scelta la difficoltà media, creo una griglia 9*9
        case "medium":
            createGrid(9, 9);
            break;
        // Se è stata scelta la difficoltà difficile, creo una griglia 7*7
        case "hard":
            createGrid(7, 7);
            break;
    }
});

function createGrid(rows, cols) {
    // Prendo il container dove inserirò le celle
    const gridContainer = document.querySelector(".grid-container");
    // Svuoto il container
    gridContainer.innerHTML = "";
    // Assegno al container una larghezza in base al numero di colonne
    gridContainer.style.width = `calc(var(--cell-size) * ${cols})`;
    // Calcolo il numero totale di celle
    const cellsTotal = rows * cols;
    // Creo la lista delle bombe
    const bombsList = createBombsList(cellsTotal);    
    // Creo ogni cella usando un ciclo
    for (let i = 1; i <= cellsTotal; i++) {
        // Aggiungo la cella al container
        gridContainer.append(createCell(i, bombsList, cellsTotal));
    }
}

function createBombsList (cellsTotal) {
    // Creo un array che conterrà la posizione delle bombe
    const bombsList = [];
    // L'array dovrà contenere 16 posizioni uniche
    while (bombsList.length < 16) {
        const randomBombNumber = Math.floor(Math.random() * cellsTotal + 1);
        // Se il numero generato non è presente nell'array, lo pusho
        if (!bombsList.includes(randomBombNumber)) {
            bombsList.push(randomBombNumber);
        }
    }
    // Ritorno la lista delle bombe
    return bombsList;
}

function createCell(counter, bombsList, cellsTotal) {
    // Creo la cella
    const cell = document.createElement("div");
    // Le fornisco una classe
    cell.classList.add("cell");
    // Aggiungo il numero che ne identifica la posizione e determina se è una bomba
    cell.innerHTML = `<span>${counter}</span>`;
    cell.dataset.index = counter;
    // Le aggiungo un EventListener che la colora al click
    addOnCellClick(cell, bombsList, cellsTotal);
    // Ritorno la cella
    return cell;
}

function addOnCellClick(cell, bombsList, cellsTotal) {
    // Aggiungo un EventListener per il left-click
    cell.addEventListener("click", function () {
        // Se la partita è finita, al click non deve succedere nulla
        if (gameOver) {
            return;
        }
        // Rimuovo l'eventuale classe che segnala il pericolo
        this.classList.remove("danger");
        if (bombsList.includes(+this.dataset.index)){
            // Se la cella è una bomba, la partita finisce e le bombe si colorano di rosso
            for (let i = 0; i < bombsList.length; i++) {
                document.querySelector(`[data-index="` + bombsList[i] + `"]`).classList.add("bomb");
            }
            gameOver = true;
            // Viene mostrato un messaggio di fine partita con il punteggio finale
            alert("Hai perso! Punteggio: " + userScore);
        } else {
            // Se la cella non è una bomba, si colora di azzurro e il punteggio aumenta
            this.classList.add("safe");
            userScore++;
            // Se il punteggio ha raggiunto il massimo, la partita finisce con una vittoria
            if (userScore === cellsTotal - bombsList.length) {
                gameOver = true;
                alert("Complimenti, hai vinto! Punteggio: " + userScore);
            }
        }
    });

    // Aggiungo un EventListener per il right-click
    cell.addEventListener("contextmenu", function (e) {
        // Prevengo il comportamento di base del right-click
        e.preventDefault();
        // Se la partita è finita, al click non deve succedere nulla
        if (gameOver) {
            return;
        }
        // Al right-addOnCellClick, coloro la cella per segnalarla come pericolosa
        this.classList.add("danger");
    });
}

