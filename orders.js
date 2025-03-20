let orders = [];

function createOrder() {
    const order = {
        orderId: orders.length + 1,
        filamentRequired: Math.floor(Math.random() * 300) + 50,
        patience: Math.floor(Math.random() * 30) + 30
    };
    orders.push(order);
    renderOrders();
}

// Render Orders
function renderOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    orders.forEach(order => {
        orderList.innerHTML += `<li>Order #${order.orderId} - Needs ${order.filamentRequired}g</li>`;
    });
}

// Print Job
function startPrint(orderId) {
    let order = orders.find(o => o.orderId === orderId);
    if (filament >= order.filamentRequired) {
        filament -= order.filamentRequired;
        orders = orders.filter(o => o.orderId !== orderId);
        renderOrders();
        updateStats();
    } else {
        alert("Not enough filament!");
    }
}

// Generate Orders Every 10 Sec
setInterval(createOrder, 10000);
