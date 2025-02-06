const container = document.getElementById("container");
const newGridButton = document.getElementById("new-grid");

function createGrid(size) {
    container.innerHTML = ""; //Her yeni grid oluşturduğumuzda eski kareleri temizler.
    
    const squareSize = 500 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square")

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
        });

        container.appendChild(square);
    }
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
