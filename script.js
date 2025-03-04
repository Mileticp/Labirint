const velikost = 15;
const labirint = document.getElementById('labirint');
let kocka, cilj, mazeGrid;

//sweetalert
function showInstructions() {
    swal("Welcome to the Labyrinth Game!", "Use the arrow keys to navigate the maze. Reach the green square to win!", "info");
}

function generateMaze() {
    let grid = Array.from({ length: velikost }, () => Array(velikost).fill('zid'));
    let stack = [];
    let x = 0, y = 0;
    grid[y][x] = 'pot';
    stack.push([x, y]);

    //mozne strani
    let directions = [
        [0, -2], [0, 2], [-2, 0], [2, 0]
    ];

    //preverja zide
    while (stack.length > 0) {
        let [cx, cy] = stack[stack.length - 1];
        let possibleMoves = directions.map(([dx, dy]) => [cx + dx, cy + dy])
            .filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < velikost && ny < velikost && grid[ny][nx] === 'zid');

        //path do cilja
        if (possibleMoves.length > 0) {
            let [nx, ny] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            grid[(cy + ny) / 2][(cx + nx) / 2] = 'pot';
            grid[ny][nx] = 'pot';
            stack.push([nx, ny]);
        } else {
            stack.pop();
        }
    }

    //player in cilj
    grid[0][0] = 'kocka';
    grid[velikost - 1][velikost - 1] = 'cilj';
    return grid;
}

//prikaz (
function generirajLabirint() {
    labirint.innerHTML = '';
    labirint.style.gridTemplateColumns = `repeat(${velikost}, 30px)`;
    mazeGrid = generateMaze();

    //divi z usako celico
    for (let i = 0; i < velikost; i++) {
        for (let j = 0; j < velikost; j++) {
            const celica = document.createElement('div');
            celica.classList.add('celica');
            if (mazeGrid[i][j] === 'kocka') {
                celica.classList.add('kocka');
                kocka = celica;
            } else if (mazeGrid[i][j] === 'cilj') {
                celica.classList.add('cilj');
                cilj = celica;
            } else if (mazeGrid[i][j] === 'zid') {
                celica.classList.add('zid');
            }
            labirint.appendChild(celica); //appenda celice u labirint
        }
    }
}

generirajLabirint();
showInstructions();

document.getElementById('gumb').addEventListener('click', generirajLabirint);
document.addEventListener('keydown', premakniKocko);

//pozicija kocke
function premakniKocko(event) {
    let currentIndex = Array.from(labirint.children).indexOf(kocka);
    let row = Math.floor(currentIndex / velikost);
    let col = currentIndex % velikost;
    let newRow = row, newCol = col;

    //updatea glede na pritisnjeno tipko
    switch (event.key) {
        case 'ArrowUp': newRow--; break;
        case 'ArrowDown': newRow++; break;
        case 'ArrowLeft': newCol--; break;
        case 'ArrowRight': newCol++; break;
        default: return; 
    }
//cekira da ni zid
    if (newRow >= 0 && newRow < velikost && newCol >= 0 && newCol < velikost) {
        let newCell = labirint.children[newRow * velikost + newCol];
        if (!newCell.classList.contains('zid')) {
           //premakne kocko na novo pozicijo
            kocka.classList.remove('kocka');
            kocka = newCell;
            //gleda ce je kocka na cilju
            kocka.classList.add('kocka');
            if (kocka === cilj) {
                swal("CONGRATS!", "You reached the finish line!", "success").then(() => {
                    generirajLabirint();
                });
            }
        }
    }
}
