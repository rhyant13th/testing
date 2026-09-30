const STORAGE_KEY = 'modular_inventory_data';

// Load inventory items from storage
export function loadInventory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save inventory items to storage
export function saveInventory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}