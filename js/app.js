import { loadInventory, saveInventory } from './storage.js';
import { renderInventoryTable } from './ui.js';

// Central State
let inventory = [];

// Initialize Application
function init() {
  inventory = loadInventory();
  render();

  const form = document.getElementById('inventory-form');
  form.addEventListener('submit', handleAddItem);
}

// Handle Form Submission
function handleAddItem(e) {
  e.preventDefault();

  const nameInput = document.getElementById('item-name');
  const priceInput = document.getElementById('item-price');
  const qtyInput = document.getElementById('item-qty');

  const newItem = {
    id: Date.now().toString(),
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    qty: parseInt(qtyInput.value, 10)
  };

  inventory.push(newItem);
  saveInventory(inventory);
  render();

  form.reset();
  nameInput.focus();
}

// Adjust Item Quantity (+ / -)
function updateQuantity(id, action) {
  inventory = inventory.map((item) => {
    if (item.id === id) {
      const newQty = action === 'inc' ? item.qty + 1 : item.qty - 1;
      return { ...item, qty: Math.max(0, newQty) };
    }
    return item;
  });

  saveInventory(inventory);
  render();
}

// Delete Item
function deleteItem(id) {
  inventory = inventory.filter((item) => item.id !== id);
  saveInventory(inventory);
  render();
}

// Re-render UI
function render() {
  renderInventoryTable(inventory, updateQuantity, deleteItem);
}

document.addEventListener('DOMContentLoaded', init);