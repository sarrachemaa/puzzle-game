const puzzle = document.getElementById('puzzle');
const message = document.getElementById('message');
const checkButton = document.getElementById('checkButton');

let currentLevel = 0;

const images = [
    'images/level1.jpg',
    'images/level2.jpg',
    'images/level3.jpg',
    'images/level4.jpg',
    'images/level5.jpg'
];

let draggedTile = null;

function createPuzzle() {
    puzzle.innerHTML = '';
    message.textContent = '';
    checkButton.classList.remove('correct');

    const positions = [...Array(9).keys()]; // [0..8]
    positions.sort(() => Math.random() - 0.5);

    positions.forEach((pos, i) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.draggable = true;

        const row = Math.floor(pos / 3);
        const col = pos % 3;

        tile.style.backgroundImage = `url('${images[currentLevel]}')`;
        tile.style.backgroundSize = '300px 300px';
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

        tile.setAttribute('data-correct', pos); // Vraie position de la tuile

        tile.addEventListener('dragstart', handleDragStart);
        tile.addEventListener('dragover', handleDragOver);
        tile.addEventListener('drop', handleDrop);

        puzzle.appendChild(tile);
    });
}

function handleDragStart(e) {
    draggedTile = e.target;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    const targetTile = e.target;
    if (draggedTile && targetTile !== draggedTile) {
        const draggedIndex = [...puzzle.children].indexOf(draggedTile);
        const targetIndex = [...puzzle.children].indexOf(targetTile);

        puzzle.insertBefore(draggedTile, targetTile);
        if (draggedIndex < targetIndex) {
            puzzle.insertBefore(targetTile, puzzle.children[draggedIndex]);
        } else {
            puzzle.insertBefore(targetTile, puzzle.children[draggedIndex + 1]);
        }
    }
}

checkButton.addEventListener('click', () => {
    const tiles = [...puzzle.children];
    let isCorrect = true;

    tiles.forEach((tile, i) => {
        const correctIndex = parseInt(tile.getAttribute('data-correct'));
        if (correctIndex !== i) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        checkButton.classList.add('correct');
        message.textContent = 'Bravo ! Puzzle réussi 🎉';

        setTimeout(() => {
            if (currentLevel < images.length - 1) {
                currentLevel++;
                message.textContent = `Niveau ${currentLevel + 1} en cours...`;
                createPuzzle();
            } else {
                message.textContent = 'Félicitations, tu as terminé tous les niveaux ! 🎉';
                checkButton.style.display = "none";
            }
        }, 1000);
    } else {
        checkButton.classList.remove('correct');
        message.textContent = 'Ce n\'est pas encore ça 😅 Réessaie !';
    }
});

createPuzzle();
