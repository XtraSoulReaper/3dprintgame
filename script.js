let money = 500;
let filament = 1000;
let ownedPrinters = [];
let activePrints = [];
let availablePrinters = [
    { name: "PrintMaster 100", speed: 30, price: 200 },
    { name: "ProtoPro X1", speed: 40, price: 400 },
    { name: "BuildMax Ultra", speed: 50, price: 800 },
    { name: "MakerElite 5000", speed: 60, price: 1500 },
    { name: "FabriCore 3D", speed: 70, price: 2500 }
];

let availablePrints = [
    { name: "Phone Stand", filament: 20, time: 5, price: 50 },
    { name: "Key Holder", filament: 10, time: 3, price: 30 },
    { name: "Desk Organizer", filament: 50, time: 10, price: 120 },
    { name: "Pen Holder", filament: 15, time: 4, price: 40 },
    { name: "Smartwatch Dock", filament: 25, time: 7, price: 70 }
];

function updateStats() {
    document.getElementById("money").textContent = `$${money}`;
    document.getElementById("filament").textContent = `${filament}g`;
    updatePrinterList();
    updatePrintQueue();
}

function buyFilament(amount) {
    let cost = amount * 0.1;
    if (money >= cost) {
        money -= cost;
        filament += amount;
        updateStats();
    } else {
        alert("Not enough money!");
    }
}

function openPrinterShop() {
    let popupBody = `<ul>`;
    availablePrinters.forEach(printer => {
        popupBody += `<li>${printer.name} - Speed: ${printer.speed}mm/s - $${printer.price} 
                      <button onclick="buyPrinter('${printer.name}')">Buy</button></li>`;
    });
    popupBody += `</ul>`;
    openPopup("Buy a Printer", popupBody);
}

function buyPrinter(printerName) {
    let printer = availablePrinters.find(p => p.name === printerName);
    if (money >= printer.price) {
        money -= printer.price;
        ownedPrinters.push(printer);
        updateStats();
        closePopup();
    } else {
        alert("Not enough money!");
    }
}

function openPrintMenu() {
    let popupBody = `<ul>`;
    availablePrints.forEach(print => {
        popupBody += `<li>${print.name} - Filament: ${print.filament}g - Time: ${print.time} min - Price: $${print.price} 
                      <button onclick="selectPrint('${print.name}')">Select</button></li>`;
    });
    popupBody += `</ul>`;
    openPopup("Select a Print", popupBody);
}

function selectPrint(printName) {
    let print = availablePrints.find(p => p.name === printName);
    let popupBody = `<p>Filament Needed: ${print.filament}g</p>
                     <p>Print Time: ${print.time} min</p>
                     <p>Price: $${print.price}</p>
                     <button onclick="startPrint('${print.name}')">Start Print</button>`;
    openPopup("Confirm Print", popupBody);
}

function startPrint(printName) {
    let print = availablePrints.find(p => p.name === printName);
    if (filament >= print.filament) {
        filament -= print.filament;
        activePrints.push(print);
        updateStats();
        closePopup();

        setTimeout(() => {
            money += print.price;
            activePrints = activePrints.filter(p => p.name !== print.name);
            updateStats();
            alert(`${print.name} completed!`);
        }, print.time * 1000);
    } else {
        alert("Not enough filament!");
    }
}

function openPopup(title, body) {
    document.getElementById("popup-title").innerHTML = title;
    document.getElementById("popup-body").innerHTML = body;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function updatePrinterList() {
    let printerList = document.getElementById("printerList");
    printerList.innerHTML = ownedPrinters.map(p => `<li>${p.name} - Speed: ${p.speed}mm/s</li>`).join('');
}

function updatePrintQueue() {
    let printQueue = document.getElementById("activePrints");
    printQueue.innerHTML = activePrints.map(p => `<li>${p.name} - Printing...</li>`).join('');
}

updateStats();