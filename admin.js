function getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function getAllOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }
  
  // Render user list with order count and remove button
  function renderUsers() {
    const usersList = document.getElementById('usersList');
    const users = getAllUsers();
    const orders = getAllOrders();
    document.getElementById('totalUsers').textContent = `(${users.length})`;
    if (!users.length) {
      usersList.innerHTML = "<div style='padding:1em;'>No users registered.</div>";
      return;
    }
    usersList.innerHTML = users.map((user, idx) => {
      const userOrderCount = orders.filter(o => o.email === user.email).length;
      return `
        <div class="user-card">
          <div class="user-header">
            ${user.name || "-"} 
            <button class="user-remove-btn" title="Remove user" aria-label="Remove user" data-email="${user.email}">✖</button>
          </div>
          <div class="user-email">Email: ${user.email}</div>
          <div class="user-orders-count">Orders placed: ${userOrderCount}</div>
        </div>
      `;
    }).join('');
    // Add remove event listeners
    document.querySelectorAll('.user-remove-btn').forEach(btn => {
      btn.onclick = function() {
        const email = btn.getAttribute('data-email');
        if (!confirm(`Remove user ${email} and all their orders?`)) return;
        // Remove user
        let users = getAllUsers().filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        // Remove orders by user
        let orders = getAllOrders().filter(o => o.email !== email);
        localStorage.setItem('orders', JSON.stringify(orders));
        renderUsers();
        renderOrders();
      };
    });
  }
  
  // Render all orders
  function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const orders = getAllOrders();
    document.getElementById('totalOrders').textContent = `(${orders.length})`;
    if (!orders.length) {
      ordersList.innerHTML = "<div style='padding:1em;'>No orders placed yet.</div>";
      return;
    }
    ordersList.innerHTML = orders.map((order, idx) => `
      <div class="order-card">
        <div class="order-header">
          Order #${idx + 1} - ${order.date ? new Date(order.date).toLocaleString() : ""}
        </div>
        <div class="order-user"><strong>User:</strong> ${order.name || "-"} (${order.email})</div>
        <div class="order-details">
          <div><strong>Address:</strong> ${order.address}, ${order.city}, ${order.state}, ${order.zip}</div>
          <div><strong>Phone:</strong> ${order.phone}</div>
        </div>
        <div><strong>Products:</strong></div>
        <div class="order-products">
          ${(order.cart || []).map(item => {
            // Show product name and qty, fallback if deleted
            return `<div class="order-product-item">${item.id ? "Product #" + item.id : ""} x${item.qty}</div>`;
          }).join("")}
        </div>
      </div>
    `).join('');
  }
  
  // Render everything on load
  renderUsers();
  renderOrders();