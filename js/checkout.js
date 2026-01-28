const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, it) => sum + it.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

function formatEUR(n) {
  return "€" + Number(n).toFixed(2);
}

function calcTotals(cart) {
  const items = Object.values(cart);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  return { subtotal, total: subtotal };
}

function renderCheckout() {
  const cart = getCart();
  const items = Object.values(cart);

  const cartEmpty = document.getElementById("cartEmpty");
  const cartWrap = document.getElementById("cartWrap");
  const cartItems = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!items.length) {
    cartEmpty.hidden = false;
    cartWrap.hidden = true;
    if (cartItems) cartItems.innerHTML = "";
    if (subtotalEl) subtotalEl.textContent = formatEUR(0);
    if (totalEl) totalEl.textContent = formatEUR(0);
    updateCartCount();
    return;
  }

  cartEmpty.hidden = true;
  cartWrap.hidden = false;

  cartItems.innerHTML = items
    .map(
      (it) => `
      <div class="cart-item" data-id="${it.id}">
        <img src="${it.img}" alt="${it.name}" />
        <div>
          <div class="cart-item-title">${it.name}</div>
          <div class="cart-item-sub">${formatEUR(it.price)} each</div>
        </div>
        <div class="cart-actions">
          <label class="qty">
            Qty
            <input type="number" min="0" value="${it.qty}" data-qty="${it.id}" />
          </label>
          <button class="small-btn" type="button" data-del="${it.id}">
            <span class="trash">🗑</span>
            <span class="remove-text">Remove</span>
          </button>
        </div>
      </div>
    `,
    )
    .join("");

  const { subtotal, total } = calcTotals(cart);
  subtotalEl.textContent = formatEUR(subtotal);
  totalEl.textContent = formatEUR(total);

  updateCartCount();
}

// Events: update qty + delete
document.addEventListener("input", (e) => {
  const input = e.target.closest("[data-qty]");
  if (!input) return;

  const id = input.getAttribute("data-qty");
  const cart = getCart();
  if (!cart[id]) return;

  cart[id].qty = Math.max(0, parseInt(input.value, 10) || 0);
  saveCart(cart);
  renderCheckout();
});

document.addEventListener("click", (e) => {
  // delete
  const delBtn = e.target.closest("[data-del]");
  if (delBtn) {
    const id = delBtn.getAttribute("data-del");
    const cart = getCart();
    delete cart[id];
    saveCart(cart);
    renderCheckout();
    return;
  }

  // clear cart
  const clearBtn = e.target.closest("#clearCart");
  if (clearBtn) {
    saveCart({});
    renderCheckout();
    return;
  }

  // pay
  const payBtn = e.target.closest("#payBtn");
  if (payBtn) {
    const msg = document.getElementById("payMsg");
    const cart = getCart();
    if (!Object.keys(cart).length) return;

    // show thanks
    alert("Thanks for payment!");

    // clear cart + update UI to zero
    saveCart({});
    renderCheckout();

    // optional: clear message after 2.5 seconds
    setTimeout(() => {
      if (msg) msg.textContent = "";
    }, 2500);
  }
});

renderCheckout();
updateCartCount();
