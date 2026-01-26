// Created products data for filling container products

const PRODUCTS = [
  {
    id: "dragon",
    name: "Dragon",
    desc: "Handmade felt dragon.",
    price: 9.99,
    img: "images/dragon.jpg",
  },
  {
    id: "deer",
    name: "Deer",
    desc: "Handmade felt deer.",
    price: 12.99,
    img: "images/deer.jpg",
  },
  {
    id: "animal",
    name: "Animal",
    desc: "Cute animal figure.",
    price: 8.5,
    img: "images/animal.jpg",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    desc: "Mushroom decoration.",
    price: 10.0,
    img: "images/mushroom.jpg",
  },
  {
    id: "pot",
    name: "Pot",
    desc: "Plant pot buddy.",
    price: 11.0,
    img: "images/pot.jpg",
  },
  {
    id: "needle",
    name: "Needle",
    desc: "Needle felt set.",
    price: 7.99,
    img: "images/needle.jpg",
  },
  {
    id: "flower",
    name: "Flower",
    desc: "Flower patch decor.",
    price: 13.25,
    img: "images/flower.jpeg",
  },
  {
    id: "lamb",
    name: "Lamb",
    desc: "Blue lamb figure.",
    price: 14.0,
    img: "images/lamb.jpg",
  },
];

// Helpers
function formatEUR(n) {
  return "€" + Number(n).toFixed(2);
}

// localStorage cart
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
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// Render products using template
function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  const tpl = document.getElementById("productCardTpl");

  if (!grid || !tpl) return;

  grid.innerHTML = "";

  list.forEach((p) => {
    const node = tpl.content.cloneNode(true);

    const card = node.querySelector(".product-card");
    const img = node.querySelector(".product-img");
    const name = node.querySelector(".product-name");
    const desc = node.querySelector(".product-desc");
    const price = node.querySelector(".price");
    const qtyInput = node.querySelector(".qty input");
    const addBtn = node.querySelector(".add-btn");
    const msg = node.querySelector(".add-msg");

    img.src = p.img;
    img.alt = p.name;

    name.textContent = p.name;
    desc.textContent = p.desc;
    price.textContent = formatEUR(p.price);

    // Add to cart
    addBtn.addEventListener("click", () => {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);

      const cart = getCart();
      if (cart[p.id]) {
        cart[p.id].qty += qty;
      } else {
        cart[p.id] = {
          id: p.id,
          name: p.name,
          price: p.price,
          img: p.img,
          qty,
        };
      }

      saveCart(cart);

      msg.textContent = "Added!";
      setTimeout(() => (msg.textContent = ""), 900);
    });

    grid.appendChild(node);
  });

  updateCartCount();
}

const searchInput = document.getElementById("searchInput");

function getQ() {
  return (new URLSearchParams(location.search).get("q") || "").trim();
}

function applySearch(term) {
  const t = term.toLowerCase();
  const filtered = PRODUCTS.filter((p) =>
    (p.name + " " + p.desc).toLowerCase().includes(t),
  );
  renderProducts(filtered);
}

const initial = getQ();

if (searchInput) {
  if (initial) searchInput.value = initial;
  applySearch(searchInput.value);

  searchInput.addEventListener("input", () => {
    applySearch(searchInput.value);
  });
} else {
  applySearch(initial); // fallback
}

updateCartCount();
