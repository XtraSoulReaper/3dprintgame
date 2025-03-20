// Variables
let filament = 1000; // Start with 1kg of filament
let money = 500; // Start with $500
let printers = [];
let printerProgress = [0, 0]; // Progress for Printer 1 and Printer 2

// Update UI with filament and money info
function updateUI() {
    document.getElementById('filament-info').innerText = `Filament: ${filament}g`;
    document.getElementById('money-info').innerText = `Money: $${money}`;
}

// Filament purchase
function buyFilament(price, amount) {
    if (money >= price) {
        filament += amount;
        money -= price;
        alert(`Bought ${amount}g of filament for $${price}`);
        updateUI();
    } else {
        alert("Not enough money!");
    }
}

// Printer purchase
function buyPrinter(printerName, price) {
    if (money >= price) {
        printers.push({
            name: printerName,
            price: price,
            progress: 0
        });
        money -= price;
        alert(`Bought ${printerName}`);
        updatePrinterStorage();
        updateUI();
    } else {
        alert("Not enough money!");
    }
}

// Open Filament Store
function openFilamentStore() {
    document.getElementById("filament-popup").style.display = "block";
}

// Close Filament Store
function closeFilamentStore() {
    document.getElementById("filament-popup").style.display = "none";
}

// Open Printer Store
function openPrinterStore() {
    document.getElementById("printer-store-popup").style.display = "block";
}

// Close Printer Store
function closePrinterStore() {
    document.getElementById("printer-store-popup").style.display = "none";
}

// Show Printer Storage
function showPrinterStorage() {
    document.getElementById("printer-storage-popup").style.display = "block";
    updatePrinterStorage();
}

// Close Printer Storage
function closePrinterStorage() {
    document.getElementById("printer-storage-popup").style.display = "none";
}

// Update Printer Storage UI
function updatePrinterStorage() {
    const printerStorage = document.getElementById("printer-storage");
    printerStorage.innerHTML = '';
    printers.forEach((printer, index) => {
        const printerDiv = document.createElement('div');
        printerDiv.textContent = `${printer.name} - $${printer.price}`;
        const sellButton = document.createElement('button');
        sellButton.textContent = "Sell (90%)";
        sellButton.onclick = () => sellPrinter(index);
        printerDiv.appendChild(sellButton);
        printerStorage.appendChild(printerDiv);
    });
}

// Sell Printer
function sellPrinter(index) {
    const printer = printers[index];
    const sellPrice = printer.price * 0.9;
    printers.splice(index, 1);
    money += sellPrice;
    alert(`Sold ${printer.name} for $${sellPrice}`);
    updatePrinterStorage();
    updateUI();
}

// Printer Progress Simulation
function startPrintJob(printerIndex) {
    if (filament >= 50) {
        filament -= 50; // Use 50g filament
        alert(`Started printing on ${printers[printerIndex].name}`);
        printProgress(printerIndex);
    } else {
        alert("Not enough filament!");
    }
}

// Simulate printing progress
function printProgress(printerIndex) {
    let interval = setInterval(() => {
        if (printerProgress[printerIndex] < 100) {
            printerProgress[printerIndex]++;
            document.getElementById(`printer${printerIndex + 1}-progress-bar`).style.width = printerProgress[printerIndex] + '%';
        } else {
            clearInterval(interval);
            alert(`Printing on ${printers[printerIndex].name} is complete!`);
        }
    }, 100);
}

// Initial UI update
updateUI();