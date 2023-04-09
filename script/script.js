const matches = document.querySelector('.matches_score');
const attemps = document.querySelector('.attemps_score');
const tableContainer = document.querySelector('.table-container');
const endGame = document.querySelector('span');
let openCards = [];
let matchedCards = [];
let cardsArray = [];

function generateTable(n, k) {
  const table = document.createElement('table');
  for (let i = 0; i < n; i++) {
    const row = document.createElement('tr');
    table.append(row);
    for (let j = 0; j < k; j++) {
      const cell = document.createElement('td');
      row.append(cell);
    }
  }
  return table;
}

function onClick(event) {
  let target = event.target;
  if (target.tagName !== 'IMG') {
    return;
  }
  if (openCards.length < 2) {
    target.classList.remove('hidden');
    openCards.push(target);
    if (openCards.length === 2) {
      if (openCards[0].dataset.id === openCards[1].dataset.id) {
        matchedCards.push(...openCards);
        openCards = [];
        const matchesCount = matchedCards.length / 2;
        matches.value = matchesCount;
        if (matchesCount === cardsArray.length / 2) {
          endGame.textContent =
            'END GAME. Select the difficulty level for the new game.';
        }
      } else {
        setTimeout(hideCards, 0.3);
      }
    }
  }
  // console.log(target);
}

function insertTable(table) {
  const wrapper = document.querySelector('.table-container');
  if (wrapper.firstElementChild) {
    wrapper.replaceChild(table, wrapper.firstElementChild);
  } else {
    wrapper.append(table);
  }
  resetGame();
  table.addEventListener('click', onClick);
}

function hideCards() {
  openCards.forEach((card) => card.classList.add('hidden'));
  openCards.length = 0;
}

function fillCellsEasy() {
  let easy = cards.slice(0, 8);
  cardsArray = [...easy, ...easy];
  return cardsArray;
}

function fillCellsMedium() {
  let medium = cards.slice(0, 10);
  cardsArray = [...medium, ...medium];
  return cardsArray;
}

function fillCellsHard() {
  let hardcore = cards.slice(0, 12);
  cardsArray = [...hardcore, ...hardcore];
  return cardsArray;
}

function fillCells() {
  const tableTd = document.querySelectorAll('td');
  let i = 0;
  cardsArray.sort(() => Math.random() - 0.5);
  tableTd.forEach(
    (item) => (
      (item.innerHTML = `<img class="hidden" src="${cardsArray[i].src}" data-id="${cardsArray[i].id}">`),
      i++
    )
  );
  console.log(cardsArray);
}

function setDifficultyLevel(level) {
  switch (level) {
    case 'easy':
      insertTable(generateTable(4, 4));
      fillCells(fillCellsEasy());
      break;
    case 'medium':
      insertTable(generateTable(4, 5));
      fillCells(fillCellsMedium());
      break;
    case 'hardcore':
      insertTable(generateTable(4, 6));
      fillCells(fillCellsHard());
      break;
  }
}

function resetGame() {
  matchedCards = [];
  openCards = [];
  matches.value = 0;
  endGame.textContent = '';
}
