// Import stylesheets
import './style.css';

interface ShoppingItem {
  name: string;
  price: number;
}

const shoppingList: ShoppingItem[] = [];

function addItem(item: ShoppingItem): void {
  shoppingList.push(item);
  displayShoppingList();
  showPrintReceiptButton(); // Show the "Print Receipt" button after adding an item
}

function displayShoppingList(): void {
  const shoppingListContainer = document.getElementById('shoppingList');
  if (shoppingListContainer) {
    shoppingListContainer.innerHTML = '';

    shoppingList.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `<span style="color: blue">${index + 1}.</span> ${
        item.name
      } - <span style="color: blue">$${item.price.toFixed(2)}</span>`;
      shoppingListContainer.appendChild(itemDiv);
    });
  }

  const totalCostElement = document.getElementById('totalCost');
  if (totalCostElement) {
    totalCostElement.innerHTML = `<span style="color: brown; font-weight: bold">Total cost: $${calculateTotalCost().toFixed(
      2
    )}</span>`;
  }
}

function calculateTotalCost(): number {
  return shoppingList.reduce((total, item) => total + item.price, 0);
}

function showPrintReceiptButton(): void {
  const printReceiptButton = document.getElementById('printReceiptButton');
  if (printReceiptButton) {
    printReceiptButton.style.display = 'block'; // Show the "Print Receipt" button
  }
}

const addItemButton = document.getElementById('addItemButton');
if (addItemButton) {
  addItemButton.addEventListener('click', () => {
    const itemNameInput = document.getElementById(
      'itemName'
    ) as HTMLInputElement;
    const itemPriceInput = document.getElementById(
      'itemPrice'
    ) as HTMLInputElement;
    const itemName = itemNameInput.value;
    const itemPrice = parseFloat(itemPriceInput.value);

    if (itemName && !isNaN(itemPrice)) {
      const newItem: ShoppingItem = { name: itemName, price: itemPrice };
      addItem(newItem);

      // Clear the input fields after adding the item.
      itemNameInput.value = '';
      itemPriceInput.value = '';
    }
  });
}

const printReceiptButton = document.getElementById('printReceiptButton');
if (printReceiptButton) {
  printReceiptButton.addEventListener('click', () => {
    printReceipt();
  });
}

function printReceipt(): void {
  // Create a string to hold the shopping list content and total price
  let receiptContent = 'Shopping List:\n';
  shoppingList.forEach((item, index) => {
    receiptContent += `${index + 1}. ${item.name} - $${item.price.toFixed(
      2
    )}\n`;
  });
  receiptContent += `\nTotal cost: $${calculateTotalCost().toFixed(2)}`;

  // Create a new window to display the receipt content and print it
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`<pre>${receiptContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  }
}
