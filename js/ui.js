// Render the inventory table
export function renderInventoryTable(items, onUpdateQty, onDeleteItem) {
  const tableBody = document.getElementById('inventory-body');
  tableBody.innerHTML = '';

  if (items.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color: #94a3b8;">
          No items in inventory. Add one above!
        </td>
      </tr>`;
    return;
  }

  items.forEach((item) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${escapeHtml(item.name)}</td>
      <td>₱${Number(item.price).toFixed(2)}</td>
      <td>
        <button class="qty-btn" data-id="${item.id}" data-action="dec">-</button>
        <span style="margin: 0 0.5rem;">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="inc">+</button>
      </td>
      <td>₱${(item.price * item.qty).toFixed(2)}</td>
      <td>
        <button class="btn-danger delete-btn" data-id="${item.id}">Delete</button>
      </td>
    `;

    // Quantity buttons listeners
    const qtyButtons = row.querySelectorAll('.qty-btn');
    qtyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        onUpdateQty(item.id, action);
      });
    });

    // Delete button listener
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDeleteItem(item.id));

    tableBody.appendChild(row);
  });
}

// Helper function to handle XSS prevention
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}