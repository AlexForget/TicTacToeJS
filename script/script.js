/* ---- Déclaration des constantes ----*/

const combinaisonGagnante = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/* ---- Déclaration des variables ----*/

let plateau = [];
let tour = 'X';
let gagner;

/* ---- Élément références ---- */

const cellules = Array.from(document.querySelectorAll('.plateau li'));
const message = document.querySelector('h2');

/* ---- Event Listener ----*/


document.querySelector('button').addEventListener('click', initiation);


/* ---- Functions ----*/

function initiation() {
  plateau = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]
  tour = 'X';
  document.querySelector('.plateau').addEventListener('click', gestionTours);
  message.textContent = `C\'est au tour des ${tour} de jouer`;
  rendu();
};

function rendu() {
  plateau.forEach(function(symbol, index) {
    cellules[index].textContent = symbol;
  })
};

function gestionTours(event) {
  let index = cellules.findIndex(function(cellule) {
    return cellule === event.target;
  });
  if(plateau[index] === '') {
    plateau[index] = tour;
    tour = tour === 'X' ? 'O' : 'X';
  } 
  rendu(); 
  gagner = getGagnant();

  if ( gagner === 'T' ) {
    message.textContent = `C'est une partie nulle!`
  } else if (gagner) { 
    message.textContent = `Les ${gagner} ont gagné la partie!`;
    document.querySelector('.plateau').removeEventListener('click', gestionTours);
  } else {
    message.textContent = `C\'est au tour des ${tour} de jouer`
  }
  
}

function getGagnant() {
  let gagnant = null;
  combinaisonGagnante.forEach(function(combo, index) {
    if(plateau[combo[0]] && 
      plateau[combo[0]] === plateau[combo[1]] 
      && plateau[combo[0]] === plateau[combo[2]]) {
        gagnant = plateau[combo[0]];
      }
  });
  if (gagnant) {
    return gagnant 
  }
  if (plateau.includes('')) {
    return null 
  }
  return 'T' 
  
};



initiation();






