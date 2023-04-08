const matches = document.querySelector('input');
const tableContainer = document.querySelector('.table-container');
const endGame = document.querySelector('span');
const button = document.querySelector('button');
let openCards = [];
let matchedCards = [];

function generateTable(n) {
  const table = document.createElement('table');
  for (let i = 0; i < n; i++) {
    const row = document.createElement('tr');
    table.append(row);
    for (let j = 0; j < n; j++) {
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
    openCards.push(target);
    target.classList.remove('hidden');
  }

  if (openCards.length === 2) {
    if (openCards[0].dataset.id === openCards[1].dataset.id) {
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      matches.value = matchedCards.length / 2;
      if (matchedCards.length === 16) {
        endGame.textContent = 'END GAME!!!';
      }
      openCards = [];
      console.log(matchedCards);
    } else {
      setTimeout(hideCards, 0.3);
    }
  }

  console.log(target);
}

function insertTable(table) {
  const wrapper = document.querySelector('.table-container');
  if (wrapper.firstElementChild) {
    wrapper.replaceChild(table, wrapper.firstElementChild);
    resetGame();
  } else {
    wrapper.append(table);
  }
  fillCells();
  table.addEventListener('click', onClick);
}

function hideCards() {
  openCards.forEach((card) => card.classList.add('hidden'));
  openCards.length = 0;
}

function fillCells() {
  const tableTd = document.querySelectorAll('td');
  let cardArray = [...cards, ...cards];
  let i = 0;
  cardArray.sort(() => Math.random() - 0.5);
  tableTd.forEach(
    (item) => (
      (item.innerHTML = `<img class="hidden" src="${cardArray[i].src}" data-id="${cardArray[i].id}">`),
      i++
    )
  );
}

function resetGame() {
  matchedCards = [];
  openCards = [];
  matches.value = 0;
  endGame.textContent = '';

  // tableTd.forEach((card) => card.firstElementChild.classList.add('hidden'));
}
