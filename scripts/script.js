document.addEventListener('DOMContentLoaded', () => {
    const labyrinth = document.getElementById('labyrinth');
    const showPathButton = document.getElementById('showPath');
    const gridSize = 20; // Larger grid
    let playerPosition = { x: 1, y: 1 }; // Starting position

    // Show instructions using SweetAlert
    swal("Welcome to the Labyrinth Game!", "Use the arrow keys to navigate through the labyrinth. Reach the green finish area to win!");

    // Fixed maze layout (1 = wall, 0 = path)
    const layout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function renderMaze() {
        labyrinth.innerHTML = ''; 
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                if (layout[y][x] === 1) {
                    cell.classList.add('wall');
                }

                if (x === 1 && y === 1) {
                    cell.classList.add('start');
                }

                if (x === gridSize - 2 && y === gridSize - 2) {
                    cell.classList.add('finish');

                    cell.addEventListener('click', () => {
                        swal("Credits", "Patrik Miletić, 4. Ra \n Mentor: Boštjan Vouk  \n ERŠ Nova Gorica" , "info");
                    });
                }

                labyrinth.appendChild(cell);
            }
        }


        const player = document.createElement('div');
        player.classList.add('player');
        labyrinth.children[playerPosition.y * gridSize + playerPosition.x].appendChild(player);
    }


    function movePlayer(dx, dy) {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
            const cell = labyrinth.children[newY * gridSize + newX];
            if (!cell.classList.contains('wall')) {

                const currentCell = labyrinth.children[playerPosition.y * gridSize + playerPosition.x];
                currentCell.classList.remove('player');


                playerPosition.x = newX;
                playerPosition.y = newY;


                cell.classList.add('player');


                if (playerPosition.x === gridSize - 2 && playerPosition.y === gridSize - 2) {
                    swal("Congratulations!", "You've reached the finish!", "success")
                        .then(() => {

                            window.location.reload();
                        });
                }
            }
        }
    }

 
    function showSolution() {

        const pathCells = document.querySelectorAll('.path');
        pathCells.forEach(cell => cell.classList.remove('path'));
    

        const queue = [{ x: 1, y: 1, path: [] }];
        const visited = new Set();
        visited.add(`1,1`);
    
        while (queue.length > 0) {
            const { x, y, path } = queue.shift();
    
   
            if (x === gridSize - 2 && y === gridSize - 2) {
   
                path.forEach(({ x, y }) => {
                    const cell = labyrinth.children[y * gridSize + x];
                    if (!cell.classList.contains('start') && !cell.classList.contains('finish') && !cell.classList.contains('player')) {
                        cell.classList.add('path');
                    }
                });
    
        
                const playerCell = labyrinth.children[playerPosition.y * gridSize + playerPosition.x];
                playerCell.classList.add('player');
    
         
                setTimeout(() => {
                    path.forEach(({ x, y }) => {
                        const cell = labyrinth.children[y * gridSize + x];
                        cell.classList.remove('path');
                    });
                }, 800); 
    
                return;
            }
    

            const directions = [
                { dx: 1, dy: 0 }, // Right
                { dx: -1, dy: 0 }, // Left
                { dx: 0, dy: 1 }, // Down
                { dx: 0, dy: -1 } // Up
            ];
    
            for (const dir of directions) {
                const newX = x + dir.dx;
                const newY = y + dir.dy;
    
                if (
                    newX >= 0 && newX < gridSize &&
                    newY >= 0 && newY < gridSize &&
                    layout[newY][newX] === 0 &&
                    !visited.has(`${newX},${newY}`)
                ) {
                    visited.add(`${newX},${newY}`);
                    queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
                }
            }
        }
    }

    renderMaze();

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
    });

    showPathButton.addEventListener('click', showSolution);
});