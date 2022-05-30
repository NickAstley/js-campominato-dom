/* Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
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
    if (selectedDifficulty === "easy") {
        // Se è stata scelta la difficoltà facile, creo una griglia 10*10
        createGrid(10, 10);
    } else if (selectedDifficulty === "medium") {
        // Se è stata scelta la difficoltà media, creo una griglia 9*9
        createGrid(9, 9);
    } else if (selectedDifficulty === "hard") {
        // Se è stata scelta la difficoltà difficile, creo una griglia 7*7
        createGrid(7, 7);
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
        gridContainer.append(createCell(i, bombsList));
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

function createCell(counter, bombsList) {
    // Creo la cella
    const cell = document.createElement("div");
    // Le fornisco una classe
    cell.classList.add("cell");
    // Aggiungo il numero che ne identifica la posizione e determina se è una bomba
    cell.innerHTML = `<span>${counter}</span>`;
    cell.dataset.index = counter;
    // Le aggiungo un EventListener che la colora al click
    addOnCellClick(cell, bombsList);
    // Ritorno la cella
    return cell;
}

function addOnCellClick(cell, bombsList) {
    cell.addEventListener("click", function () {
        if (gameOver) {
            return;
        }
        if (bombsList.includes(+this.dataset.index)){
            this.classList.add("bomb");
            gameOver = true;
            alert("Hai perso! Punteggio:" + userScore);
        } else {
            this.classList.add("safe");
            userScore++;
        }
    });
}

