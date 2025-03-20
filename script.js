let money = 500;
let storage = 50;
let currentLevel = 1;  // The player's business level, starts small
let maxLevel = 5;  // Max level of the business

// Printer information (different printers to buy)
const printers = [
    {name: 'CrealEnder 100', price: 200, bedSize: '220x220x250mm'},
    {name: 'Pruso Mini-K', price: 350, bedSize: '180x180x200mm'},
    {name: 'BumbleLab P1 Lite', price: 500, bedSize: '256x256x256mm'}
    // More printers will be added dynamically as the business grows
];

// Update the UI elements
function updateStats() {
    document.getElementById('money').textContent = money;
    document.getElementById('storage').textContent = storage;

    // Update the business level status
    document.getElementById('businessLevel').textContent = `You are currently in a ${getBusinessLevel()} setup.`;
}

// Get the current business level as a string
function getBusinessLevel() {
    if (currentLevel === 1) {
        return 'small 3D print setup';
    } else if (currentLevel === 2) {
        return 'medium 3D print workshop';
    } else if (currentLevel === 3) {
        return 'large 3D print factory';
    } else if (currentLevel === 4) {
        return 'full-scale printing business';
    } else {
        return 'massive international printing empire';
    }
}

// Buy a printer
function buyPrinter(printerIndex) {
    const printer = printers[printerIndex - 1]; // Printer index starts from 1
    if (money >= printer.price) {
        money -= printer.price;
        storage += 10; // Increase storage space as you buy printers
        alert(`You bought a ${printer.name}!`);
    } else {
        alert('Not enough money to buy this printer!');
    }
    updateStats();
}

// Upgrade to a bigger business setup
function nextUpgrade() {
    if (currentLevel < maxLevel) {
        currentLevel++;
        alert(`Your business has expanded to a new level! You are now at: ${getBusinessLevel()}`);
    } else {
        alert('You have reached the maximum business level!');
    }
    updateStats();
}

// Initialize game
updateStats();
