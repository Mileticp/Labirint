document.addEventListener('DOMContentLoaded', () => {
    const labyrinth = document.getElementById('labyrinth');
    const showPathButton = document.getElementById('showPath');
    const easyButton = document.getElementById('easy');
    const mediumButton = document.getElementById('medium');
    const hardButton = document.getElementById('hard');
    const gridSize = 20; // Larger grid
    let playerPosition = { x: 1, y: 1 }; // Starting position
    let layout = []; // Maze layout

    // Define maze layouts for different difficulties
    const layouts = {
        easy: [
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
        ],
        medium: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        hard: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    };


    swal("Welcome to the Labyrinth Game!", "Use the arrow keys to navigate through the labyrinth. Reach the green finish area to win!");

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
                        swal("Credits", "Patrik Miletić, 4. Ra \n Mentor: Boštjan Vouk  \n ERŠ Nova Gorica", "info");
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
                    clearInterval(timerInterval); // Stop the timer
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
                { dx: 1, dy: 0 }, // Desno
                { dx: -1, dy: 0 }, // Levo
                { dx: 0, dy: 1 }, // Dol
                { dx: 0, dy: -1 } // Gor
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

    
    let timerInterval;
    let timeLeft;

    function startTimer(duration) {
        clearInterval(timerInterval); // Clear any existing timer
        timeLeft = duration;
        updateTimerDisplay();

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                swal("Time's up!", "You didn't reach the finish in time. Try again!", "error")
                    .then(() => {
                        window.location.reload();
                    });
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const timer = document.getElementById('timer');
        timer.textContent = timeLeft;
    }

    function decreaseTimerBy10Seconds() {
        timeLeft = Math.max(timeLeft - 10, 0); // Ensure timer doesn't go below 0
        updateTimerDisplay();
    }

    
    easyButton.addEventListener('click', () => {
        layout = layouts.easy;
        playerPosition = { x: 1, y: 1 };
        renderMaze();
        startTimer(40); 
    });

    mediumButton.addEventListener('click', () => {
        layout = layouts.medium;
        playerPosition = { x: 1, y: 1 };
        renderMaze();
        startTimer(30); 
    });

    hardButton.addEventListener('click', () => {
        layout = layouts.hard;
        playerPosition = { x: 1, y: 1 };
        renderMaze();
        startTimer(20); 
    });

    
    showPathButton.addEventListener('click', () => {
        showSolution();
        decreaseTimerBy10Seconds(); 
    });

    
    layout = layouts.easy;
    renderMaze();
    startTimer(40); 

    
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
});