// Game Variables
let filament = 1000; // Start with 1kg of filament
let money = 500; // Start with $500
let printers = [];
let printerQueue = [];
let customerOrders = [];
let printerProgress = [0, 0]; // Progress for Printer 1 and Printer 2
let printerHealth = [100, 100]; // Health of printers (100 is full health)
let customerPatience = [100, 100]; // Customer patience (100 is maximum patience)

// Printer specs and upgrades
const printerSpecs = {
    'PrintMaster 300': {
        speed: 1, // Speed multiplier (higher means faster print)
        filamentEfficiency: 1, // Filament used per print job
        quality: 1, // Quality multiplier (higher means better quality)
        health: 100 // Health of the printer
    },
    'ProPrint 5000': {
        speed: 1.5,
        filamentEfficiency: 0.9,
        quality: 1.2,
        health: 100
    }
};

// Create a random customer order
function createOrder() {
    const order = {
        id: customerOrders.length + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        filamentRequired: Math.floor(Math.random() * 500) + 100,
        patience: Math.floor(Math.random() * 60) + 30,
        timeLeft: Math.floor(Math.random() * 60) + 30,
        printerType: ['PrintMaster 300', 'ProPrint 5000'][Math.floor(Math.random() * 2)],
        canceled: false
    };

    customerOrders.push(order);
    renderCustomerOrders();
}

// Render customer orders
function renderCustomerOrders() {
    const container = document.getElementById('order-container');
    container.innerHTML = '';
    customerOrders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        orderDiv.innerHTML = `
            Order #${order.id} - Quantity: ${order.quantity}, Filament: ${order.filamentRequired}g, Time Left: ${order.timeLeft}s
            <button onclick="acceptOrder(${order.id})">Accept</button>
        `;
        container.appendChild(orderDiv);
    });
}

// Accept customer order and add it to the printer queue
function acceptOrder(orderId) {
    const order = customerOrders.find(o => o.id === orderId);
    if (order && !order.canceled) {
        const printer = printers.find(p => p.name === order.printerType);
        if (printer) {
            printerQueue.push({
                orderId: order.id,
                printer: printer,
                filamentRequired: order.filamentRequired,
                timeLeft: order.timeLeft,
                printerType: order.printerType
            });
            alert(`Order accepted! Printing on ${printer.name}`);
            renderPrinterQueue();
            startPrinterJob();
        }
    }
}

// Render the printer queue
function renderPrinterQueue() {
    const container = document.getElementById('printer-queue');
    container.innerHTML = '';
    printerQueue.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'order-item';
        jobDiv.innerHTML = `
            Order #${job.orderId} - Filament: ${job.filamentRequired}g, Time Left: ${job.timeLeft}s
        `;
        container.appendChild(jobDiv);
    });
}

// Start printing on available printers
function startPrinterJob() {
    if (printerQueue.length > 0) {
        const job = printerQueue[0];
        const printer = job.printer;
        const progressId = printer.name === 'PrintMaster 300' ? 0 : 1;

        if (filament >= job.filamentRequired) {
            filament -= job.filamentRequired;
            printerProgress[progressId] = 0;
            const interval = setInterval(() => {
                if (printerProgress[progressId] < 100) {
                    printerProgress[progressId] += printer.speed;
                    updateProgressBar(progressId);
                } else {
                    clearInterval(interval);
                    finishJob(job);
                }
            }, 1000);
        } else {
            alert('Not enough filament to complete the job.');
        }
    }
}

// Update progress bar
function updateProgressBar(printerIndex) {
    const progressBar = document.getElementById(`printer${printerIndex + 1}-progress-bar`);
    progressBar.style.width = `${printerProgress[printerIndex]}%`;
}

// Finish the print job and complete the order
function finishJob(job) {
    printerQueue.shift();
    alert(`Order #${job.orderId} completed!`);
    renderPrinterQueue();
    createOrder(); // Generate a new order after finishing one
}

// Handle filament purchases
function buyFilament(price, amount) {
    if (money >= price) {
        money -= price;
        filament += amount;
        document.getElementById('filament-info').textContent = `Filament: ${filament}g`;
        document.getElementById('money-info').textContent = `Money: $${money}`;
        alert(`You bought ${amount}g of filament.`);
    } else {
        alert('Not enough money.');
    }
}

// Open the filament store
function openFilamentStore() {
    document.getElementById('filament-popup').style.display = 'block';
}

// Close the filament store
function closeFilamentStore() {
    document.getElementById('filament-popup').style.display = 'none';
}

// Open the printer store
function openPrinterStore() {
    document.getElementById('printer-store-popup').style.display = 'block';
}

// Close the printer store
function closePrinterStore() {
    document.getElementById('printer-store-popup').style.display = 'none';
}

// Open Printer Storage
function showPrinterStorage() {
    document.getElementById('printer-storage-popup').style.display = 'block';
    renderPrinterStorage();
}

// Close Printer Storage
function closePrinterStorage() {
    document.getElementById('printer-storage-popup').style.display = 'none';
}

// Render printer storage
function renderPrinterStorage() {
    const storageContainer = document.getElementById('printer-storage');
    storageContainer.innerHTML = '';
    printers.forEach(printer => {
        const printerDiv = document.createElement('div');
        printerDiv.className = 'printer-item';
        printerDiv.innerHTML = `
            ${printer.name} - Speed: ${printer.speed}, Quality: ${printer.quality} <button onclick="sellPrinter('${printer.name}')">Sell</button>
        `;
        storageContainer.appendChild(printerDiv);
    });
}

// Sell Printer
function sellPrinter(printerName) {
    printers = printers.filter(printer => printer.name !== printerName);
    money += 100; // Sell price
    alert(`${printerName} sold!`);
    renderPrinterStorage();
    document.getElementById('money-info').textContent = `Money: $${money}`;
}

// Buy Printer
function buyPrinter(name, price) {
    if (money >= price) {
        printers.push(printer
