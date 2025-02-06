const container = document.getElementById("container");
const newGridButton = document.getElementById("new-grid");

function createGrid(size) {
    container.innerHTML = ""; //Her yeni grid oluşturduğumuzda eski kareleri temizler.
    
    const squareSize = Math.floor(960 / size);

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
        square.dataset.opacity = "0";


        square.addEventListener("mouseover", () => {
            let opacity = parseFloat(square.dataset.opacity);

            if (opacity === 0) {
                square.dataset.red = randomRGB();
                square.dataset.green = randomRGB();
                square.dataset.blue = randomRGB();
            }

            
            if (opacity < 1) {
                opacity += 0.1;
                square.dataset.opacity = opacity.toString();
                square.style.backgroundColor = `rgba(${square.dataset.red}, ${square.dataset.green}, ${square.dataset.blue}, ${opacity})`;
            }
            
        });

        container.appendChild(square);
    }
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

    gridSize = parseInt(gridSize); //String olan girdiyi sayıya çevirir

    if (gridSize < 1 || gridSize > 100) {
        alert("Lütfen 1 ile 100 arasında bir sayı girin.");
        return;
    }

    createGrid(gridSize);
})
