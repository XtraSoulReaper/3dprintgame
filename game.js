function updateStats() {
    document.getElementById('money-info').textContent = `Money: $${money}`;
    document.getElementById('filament-info').textContent = `Filament: ${filament}g`;
}

// Buy Filament
function buyFilament(price, amount) {
    if (money >= price) {
        money -= price;
        filament += amount;
        updateStats();
    } else {
        alert("Not enough money.");
    }
}

// Open & Close Filament Store
function openFilamentStore() {
    document.getElementById('filament-popup').style.display = 'block';
}

function closeFilamentStore() {
    document.getElementById('filament-popup').style.display = 'none';
}
