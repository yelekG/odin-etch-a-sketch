const container = document.getElementById("container");
const newGridButton = document.getElementById("new-grid");
const colorModeOn = document.getElementById("open");
const colorModeOff = document.getElementById("close");

let colorMode = false; // Başlangıçta renk modu kapalı

function createGrid(size) {
    container.innerHTML = ""; // Eski kareleri temizle
    
    const squareSize = Math.floor(600 / size);

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        resetSquare(square); // Başlangıç rengi beyaz yap

        square.dataset.opacity = "0"; // Opacity sıfırdan başlar

        square.addEventListener("mouseover", () => {
            let opacity = parseFloat(square.dataset.opacity);

            if (opacity === 0) {
                // Eğer kareye ilk kez dokunuluyorsa, renk atanır (sadece bir kere)
                if (!square.dataset.colorSet) {
                    square.dataset.red = randomRGB();
                    square.dataset.green = randomRGB();
                    square.dataset.blue = randomRGB();
                    square.dataset.colorSet = "true"; // Artık renk değişmeyecek
                }
            }

            if (colorMode) {             
                if (opacity < 1) {
                    opacity += 0.1;
                    square.dataset.opacity = opacity.toString();
                    // İlk belirlenen renk ile opacity artırılıyor, renk değişmiyor
                    square.style.backgroundColor = `rgba(${square.dataset.red}, ${square.dataset.green}, ${square.dataset.blue}, ${opacity})`;
                }
            } else {
                // Renk modu kapalıysa tam siyah yap
                square.style.backgroundColor = `rgba(0, 0, 0, 1)`;
            }
        });

        container.appendChild(square);
    }
}

function resetSquare(square) {
    square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    square.dataset.opacity = "0";
    delete square.dataset.colorSet; // Rengi sıfırla
}

function randomRGB() {
    return Math.floor(Math.random() * 256);
}

newGridButton.addEventListener("click", () => {
    let gridSize = prompt("Yeni grid boyutunu girin (max:100): ");

    if (gridSize === null || gridSize.trim() === "" || isNaN(gridSize)) {
        alert("Lütfen geçerli bir sayı girin.");
        return;
    }

    gridSize = parseInt(gridSize); // String olan girdiyi sayıya çevirir

    if (gridSize < 1 || gridSize > 100) {
        alert("Lütfen 1 ile 100 arasında bir sayı girin.");
        return;
    }

    createGrid(gridSize);
});

colorModeOn.addEventListener("click", () => {
    colorMode = true;
    resetAllSquares();
});

colorModeOff.addEventListener("click", () => {
    colorMode = false;
    resetAllSquares();
});


function resetAllSquares() {
    const squares = document.querySelectorAll(".grid-square");
    squares.forEach(square => {
        resetSquare(square);
    });
}

function resetSquare(square) {
    square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    square.dataset.opacity = "0";
    delete square.dataset.colorSet;
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetAllSquares);