// ===========================
// ElectroZone homepage logic (with REAL product images)
// ===========================

// REAL PRODUCT IMAGE URLs (from Unsplash, Pexels, official brands, etc.)
const MOCK_PRODUCTS = [
  {
    id: 1, name: "OnePlus Nord 4", price: 27999, category: "Mobiles",
    img: "oneplus-nord-4.png",
    desc: "Flagship killer with AMOLED display, 5G, and 120Hz refresh rate.",
  },
  {
    id: 2, name: "Realme Buds Air 5", price: 3999, category: "Audio Devices",
    img: "Realme buds air.jpg",
    desc: "True wireless earbuds with ANC and deep bass.",
  },
  {
    id: 3, name: "HP Pavilion i5 Laptop", price: 64999, category: "Laptops",
    img: "HP pavilion.png",
    desc: "11th Gen Intel, 16GB RAM, 512GB SSD, FHD display.",
  },
  {
    id: 4, name: "Apple Watch Series 9", price: 39999, category: "Smartwatches",
    img: "Apple-Watch-Series-9.png",
    desc: "Advanced health tracking with always-on display.",
  },
  {
    id: 5, name: "Canon EOS 90D Camera", price: 89999, category: "Cameras",
    img: "Cannon Camera.jpg",
    desc: "32.5MP APS-C DSLR, 4K video, fast autofocus.",
  },
  {
    id: 6, name: "Samsung Galaxy Tab S9", price: 74999, category: "Smart Devices",
    img: "Galaxy tab.jpg",
    desc: "12.4” AMOLED, Snapdragon 8 Gen 2, S Pen included.",
  },
  {
    id: 7, name: "JBL Charge 5 Speaker", price: 12499, category: "Audio Devices",
    img: "JBL speaker-5.png",
    desc: "Waterproof portable Bluetooth speaker, 20h playtime.",
  },
  {
    id: 8, name: "PlayStation 5", price: 55999, category: "Smart Devices",
    img: "play station.jpg",
    desc: "Next-gen console, ultra-fast SSD, ray tracing.",
  },
  {
    id: 9, name: "Xiaomi Power Bank 20000mAh", price: 2499, category: "Accessories",
    img: "Power-bank.png",
    desc: "Ultra high-capacity, fast charging, dual USB output.",
  },
  {
    id: 10, name: "Logitech MX Master 3 Mouse", price: 9499, category: "Accessories",
    img: "mx-master-3-mouse.png",
    desc: "Ergonomic, wireless, advanced productivity mouse.",
  },
  {
    id: 11, name: "Dyson on Track Headphones", price: 20000, category: "Audio Devices",
    img: "Headset.jpg",
    desc: "Ergonomic, wireless, advanced productivity Headset.",
  },
  {
    id: 12, name: " iPhone 17 Pro Max", price: 155000, category: "Mobiles",
    img: "iPhone-17.png",
    desc: "Heat-Forged Aluminum Unibody, Pro Camera System, Runs iOS 26.",
  }
];

const DEALS = [
  {
    title: "iPhone 15 Pro",
    img: "Iphone-15.jpg",
    original: 149900,
    discount: 129999,
    link: "#"
  },
  {
    title: "MacBook Air M2",
    img: "Macbook-air.png",
    original: 129000,
    discount: 104999,
    link: "#"
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    img: "Sonyheadphones.jpg",
    original: 39990,
    discount: 27999,
    link: "#"
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    img: "Samasung S24.jpg",
    original: 149000,
    discount: 118999,
    link: "#"
  },
  {
    title: "Dell Inspiron i7 Laptop",
    img: "Dell lap.jpg",
    original: 89990,
    discount: 74999,
    link: "#"
  }
];

const CATEGORIES = [
  { name: "Mobiles", img: "Mobile.png" },
  { name: "Laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" },
  { name: "Audio Devices", img: "Audio Devices.jpg" },
  { name: "Smartwatches", img: "Smart watches.jpg" },
  { name: "Cameras", img: "Cameras-2.webp" },
  { name: "Accessories", img: "Accessories.png" }
];

// Carousel
function renderCarousel(deals) {
  const carousel = document.getElementById('dealCarousel');
  carousel.innerHTML = deals.map((deal, i) => `
    <div class="carousel-slide${i===0 ? ' active' : ''}" aria-hidden="${i!==0}">
      <img src="${deal.img}" alt="${deal.title} deal" loading="lazy">
      <div class="carousel-info">
        <h3>${deal.title}</h3>
        <div class="carousel-prices">
          <span class="original">₹${deal.original.toLocaleString()}</span>
          <span class="discount">₹${deal.discount.toLocaleString()}</span>
        </div>
        <button onclick="window.location='${deal.link}'">Shop Now</button>
      </div>
    </div>
  `).join('');
  let idx = 0;
  setInterval(() => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    slides[idx].classList.remove('active');
    slides[idx].setAttribute('aria-hidden', 'true');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
    slides[idx].setAttribute('aria-hidden', 'false');
  }, 3000);
}

// Category Cards
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" tabindex="0" data-category="${cat.name}">
      <img src="${cat.img}" alt="${cat.name}" loading="lazy">
      <span>${cat.name}</span>
    </div>
  `).join('');
  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => filterProducts(card.dataset.category));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') filterProducts(card.dataset.category); });
  });
}

// Products Grid
let allProducts = [];
let filteredProducts = [];

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!products.length) {
    grid.innerHTML = `<div style="padding:2em;text-align:center;">No products found.</div>`;
    return;
  }
  grid.innerHTML = products.map(prod => `
    <div class="product-card" tabindex="0" data-id="${prod.id}">
      <img src="${prod.img}" alt="${prod.name}" loading="lazy">
      <div class="product-name">${prod.name}</div>
      <div class="product-price">₹${prod.price.toLocaleString()}</div>
      <div class="card-buttons">
        <button class="add-cart-btn" data-id="${prod.id}">Add to Cart</button>
        <button class="buy-now-btn" data-id="${prod.id}">Buy Now</button>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => showProductModal(card.dataset.id));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') showProductModal(card.dataset.id); });
  });
  grid.querySelectorAll('.add-cart-btn').forEach(btn =>
    btn.addEventListener('click', (e) => { e.stopPropagation(); addToCart(btn.dataset.id, 1); })
  );
  grid.querySelectorAll('.buy-now-btn').forEach(btn =>
    btn.addEventListener('click', (e) => { e.stopPropagation(); buyNow(btn.dataset.id); })
  );
}

// Product Modal
function showProductModal(id) {
  const prod = allProducts.find(p => p.id == id);
  const modal = document.getElementById('productModal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <img src="${prod.img}" alt="${prod.name}" style="width:120px;height:120px;object-fit:contain;margin-bottom:1.2em;">
    <div style="font-size:1.35rem;font-weight:700;margin-bottom:0.5em;">${prod.name}</div>
    <div style="color:#1976d2;font-size:1.2rem;font-weight:600;margin-bottom:0.7em;">₹${prod.price.toLocaleString()}</div>
    <div style="margin-bottom:1.1em;line-height:1.5;">${prod.desc || ''}</div>
    <div style="display:flex;gap:0.7em;">
      <button onclick="addToCart(${prod.id},1)">Add to Cart</button>
      <button onclick="buyNow(${prod.id})">Buy Now</button>
    </div>
  `;
  modal.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  document.getElementById('closeModal').focus();
}
document.getElementById('closeModal').onclick = closeProductModal;
document.getElementById('overlay').onclick = () => { closeProductModal(); closeCartDrawer(); };
function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

// Cart Drawer (localStorage persisted)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(id, qty = 1) {
  id = parseInt(id);
  const prod = allProducts.find(p => p.id === id);
  if (!prod) return;
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) cart[idx].qty += qty;
  else cart.push({ id, qty });
  saveCart();
  openCartDrawer();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartQty(id, delta) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) removeFromCart(id);
    else saveCart();
  }
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const badge = document.getElementById('cartCount');
  let total = 0, count = 0;
  if (!cart.length) {
    cartItemsDiv.innerHTML = `<div style="padding:2em;text-align:center;">Cart is empty.</div>`;
    badge.innerText = "0";
    document.getElementById('cartTotal').innerText = "0";
    return;
  }
  cartItemsDiv.innerHTML = cart.map(item => {
    const prod = allProducts.find(p => p.id === item.id);
    if (!prod) return '';
    total += prod.price * item.qty;
    count += item.qty;
    return `
      <div class="cart-item">
        <img src="${prod.img}" alt="${prod.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${prod.name}</div>
          <div class="cart-item-price">₹${prod.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button onclick="updateCartQty(${prod.id},-1)" aria-label="Decrease quantity">-</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty(${prod.id},1)" aria-label="Increase quantity">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${prod.id})" aria-label="Remove">&times;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  badge.innerText = count;
  document.getElementById('cartTotal').innerText = total.toLocaleString();
}
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  document.getElementById('closeCart').focus();
}
function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}
document.getElementById('cartBtn').onclick = openCartDrawer;
document.getElementById('closeCart').onclick = closeCartDrawer;

function buyNow(id) {
  addToCart(id, 1);
  openCartDrawer();
}

// Search Bar
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', () => {
  const q = searchBar.value.trim().toLowerCase();
  if (!q) { renderProducts(allProducts); filteredProducts = allProducts; return; }
  filteredProducts = allProducts.filter(
    p => p.name.toLowerCase().includes(q) ||
         (p.desc && p.desc.toLowerCase().includes(q)) ||
         (p.category && p.category.toLowerCase().includes(q))
  );
  renderProducts(filteredProducts);
});

// Filter by Category
function filterProducts(category) {
  filteredProducts = allProducts.filter(p => p.category === category);
  renderProducts(filteredProducts);
}

// Navbar Categories Dropdown Accessibility
const catBtn = document.getElementById('categoriesBtn');
const catMenu = document.getElementById('categoriesMenu');
catBtn.onclick = () => {
  const isOpen = catBtn.getAttribute('aria-expanded') === "true";
  catBtn.setAttribute('aria-expanded', !isOpen);
  catMenu.style.display = !isOpen ? "block" : "none";
};
catBtn.onblur = () => setTimeout(() => { catBtn.setAttribute('aria-expanded', false); catMenu.style.display = "none"; }, 130);
catMenu.querySelectorAll('li').forEach(li => {
  li.onclick = () => filterProducts(li.textContent.trim());
});

// Dismiss modal/drawer on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeProductModal();
    closeCartDrawer();
  }
});

// ==== PROFILE MENU LOGIC ====

// Load logged-in user from localStorage
function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  } catch { return null; }
}

// Show profile name in navbar
function updateProfileNav() {
  const user = getLoggedInUser();
  const profileName = document.getElementById('profileName');
  if (user) {
    profileName.textContent = user.name || user.email.split('@')[0];
  } else {
    profileName.textContent = "Profile";
  }
}

// Profile dropdown logic
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', () => {
  if (profileDropdown.classList.contains('active')) {
    profileDropdown.classList.remove('active');
    return;
  }
  // Show logged-in user details
  const user = getLoggedInUser();
  if (user) {
    profileDropdown.innerHTML = `
      <div class="profile-detail-label">Name</div>
      <div class="profile-detail-value">${user.name || "-"}</div>
      <div class="profile-detail-label">Email</div>
      <div class="profile-detail-value">${user.email || "-"}</div>
      <button class="profile-logout" id="logoutBtn">Logout</button>
    `;
    profileDropdown.classList.add('active');
    document.getElementById('logoutBtn').onclick = function() {
      localStorage.removeItem('loggedInUser');
      window.location.href = "login.html";
    };
  }
});

// Hide dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
    profileDropdown.classList.remove('active');
  }
});

// ============== ORDER ZONE LOGIC ==============
function renderOrders() {
  const ordersZone = document.getElementById('ordersZone');
  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  orders = orders.filter(o => o.email === user.email);

  if (!orders.length) {
    ordersZone.innerHTML = "<div style='padding:1em;'>No orders placed yet.</div>";
    return;
  }

  ordersZone.innerHTML = orders.map((order, idx) => `
    <div class="order-card" data-idx="${idx}">
      <div class="order-header">
        Order #${idx + 1} - ${order.date ? new Date(order.date).toLocaleString() : ""}
        <button class="order-remove-btn" title="Remove order" aria-label="Remove order" data-idx="${idx}">✖</button>
      </div>
      <div class="order-details">
        <div><strong>Name:</strong> ${user.name || "-"}</div>
        <div><strong>Address:</strong> ${order.address}, ${order.city}, ${order.state}, ${order.zip}</div>
        <div><strong>Phone:</strong> ${order.phone}</div>
      </div>
      <div><strong>Products:</strong></div>
      <div class="order-products">
        ${(order.cart || []).map(item => {
          const prod = allProducts.find(p => p.id === item.id);
          if (!prod) return "";
          return `<div class="order-product-item">${prod.name} x${item.qty} - ₹${prod.price * item.qty}</div>`;
        }).join("")}
      </div>
      <div><strong>Total:</strong> ₹${order.cart ? order.cart.reduce((sum, item) => {
        const prod = allProducts.find(p => p.id === item.id);
        return sum + (prod ? prod.price * item.qty : 0);
      }, 0) : 0}</div>
    </div>
  `).join('');

  // Add event listeners for remove buttons
  document.querySelectorAll('.order-remove-btn').forEach(btn => {
    btn.onclick = function() {
      let ordersAll = JSON.parse(localStorage.getItem('orders') || '[]');
      // Find the index of the current user's orders
      const userOrders = ordersAll.filter(o => o.email === user.email);
      // Remove order by index within this user's orders
      const idxToRemove = parseInt(btn.getAttribute('data-idx'), 10);
      const orderToRemove = userOrders[idxToRemove];
      // Remove from the global orders array
      ordersAll = ordersAll.filter(o => !(o.email === user.email && o.date === orderToRemove.date));
      localStorage.setItem('orders', JSON.stringify(ordersAll));
      renderOrders();
    };
  });
}
// Call renderOrders in your init function
function init() {
  renderCarousel(DEALS);
  renderCategories();
  allProducts = MOCK_PRODUCTS;
  filteredProducts = allProducts;
  renderProducts(allProducts);
  renderCart();
  updateProfileNav();
  renderOrders();
}
init();