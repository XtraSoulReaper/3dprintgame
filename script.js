// Variables
let filament = 1000; // Start with 1kg of filament
let money = 500; // Start with $500
let printers = [];
let printerQueue = [];
let customerOrders = [];
let printerProgress = [0, 0]; // Progress for Printer 1 and Printer 2

// Update UI with filament and money info
function updateUI() {
    document.getElementById('filament-info').innerText = `Filament: ${filament}g`;
    document.getElementById('money-info').innerText = `Money: $${money}`;
}

// Customer Orders
function createOrder() {
    const order = {
        id: customerOrders.length + 1,
        quantity: Math.floor(Math.random() * 10) + 1, // Random quantity of prints
        filamentRequired: Math.floor(Math.random() * 500) + 100, // Random filament requirement
        patience: Math.floor(Math.random() * 60) + 30, // Random patience (time before they cancel)
        timeLeft: Math.floor(Math.random() * 60) + 30, // Random time for completion
        printerType: ['PrintMaster 300', 'ProPrint 5000'][Math.floor(Math.random() * 2)] // Random printer preference
    };
    
    customerOrders.push(order);
    renderCustomerOrders();
}

// Render Customer Orders
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

// Accept Order
function acceptOrder(orderId) {
    const order = customerOrders.find(o => o.id === orderId);
    if (order) {
        const printer = printers.find(p => p.name === order.printerType);
        if (printer) {
            printerQueue.push({
                orderId: order.id,
                printer: printer,
                filamentRequired: order.filamentRequired,
                timeLeft: order.timeLeft
            });
            alert(`Order accepted! Printing on ${printer.name}`);
            renderPrinterQueue();
            startPrinterJob();
        }
    }
}

// Printer Queue
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

// Start a Printer Job
function startPrinterJob() {
    if (printerQueue.length > 0) {
        const job = printerQueue[0];
        let interval = setInterval(() => {
            job.timeLeft--;
            if (job.timeLeft <= 0) {
                clearInterval(interval);
                printerQueue.shift();
                alert(`Order #${job.orderId} completed!`);
                renderPrinterQueue();
                updateUI();
            }
        }, 1000);
    }
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

// Show Printer Storage
function showPrinterStorage() {
    document.getElementById("printer-storage-popup").style.display = "block";
    updatePrinterStorage();
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

// Initial UI update
updateUI();
createOrder();