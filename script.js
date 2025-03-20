const printers = [];
let money = 500;
let filament = 1000;

const printerModels = {
    "PrintMaster 300": { speed: 10, quality: "High", cost: 300 },
    "FastPrint X2": { speed: 20, quality: "Medium", cost: 500 },
    "UltraLayer Pro": { speed: 30, quality: "Ultra", cost: 800 }
};

// Buy Printer
function buyPrinter(name, price) {
    if (money >= price) {
        printers.push({ name, speed: printerModels[name].speed, quality: printerModels[name].quality });
        money -= price;
        updateStats();
        closePrinterStore();
    } else {
        alert("Not enough money.");
    }
}

// Open & Close Printer Store
function openPrinterStore() {
    let store = document.getElementById('printer-store');
    store.innerHTML = '';
    for (const name in printerModels) {
        let btn = `<button onclick="buyPrinter('${name}', ${printerModels[name].cost})">${name} - $${printerModels[name].cost}</button>`;
        store.innerHTML += btn + "<br>";
    }
    document.getElementById('printer-store-popup').style.display = 'block';
}

function closePrinterStore() {
    document.getElementById('printer-store-popup').style.display = 'none';
}

// Open & Close Printer Storage
function showPrinterStorage() {
    alert(JSON.stringify(printers, null, 2));
}
