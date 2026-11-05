const products = [
    { id: 1, name: "Teclado Mecánico 60% RGB", price: 129.99, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Mouse Ultraligero Wireless", price: 89.50, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Monitor UltraWide 144Hz", price: 450.00, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Headset Pro Surround 7.1", price: 115.00, img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Micrófono Condensador RGB", price: 140.00, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Pad Mouse XL Deskmat", price: 35.00, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80" }
];

let cart = [];

const productList = document.getElementById('product-list');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const cartCounter = document.getElementById('cart-counter');
const checkoutBtn = document.getElementById('checkout-btn');
const modal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

function renderProducts() {
    products.forEach((product, index) => {
        const card = document.createElement('article');
        card.classList.add('product-card');
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-card__img" loading="lazy">
            <div class="product-card__content">
                <div class="product-card__header">
                    <h3 class="product-card__name">${product.name}</h3>
                </div>
                <span class="product-card__price">$${product.price.toFixed(2)}</span>
                <button class="product-card__btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    animateBadge();
    updateCartUI();
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

function updateCartUI() {
    cartList.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="cart-drawer__empty">Aún no hay componentes en tu carrito.</p>';
        cartTotal.textContent = '$0.00';
        cartCounter.textContent = '0';
        checkoutBtn.disabled = true;
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__details">
                <span class="cart-item__name">${item.name}</span>
                <span class="cart-item__qty">Cant: ${item.quantity}</span>
                <span class="cart-item__price">$${itemTotal.toFixed(2)}</span>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart(${item.id})">🗑️</button>
        `;
        cartList.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCounter.textContent = totalItems;
    checkoutBtn.disabled = false;
}

function animateBadge() {
    cartCounter.classList.remove('pop');
    void cartCounter.offsetWidth;
    cartCounter.classList.add('pop');
}

function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

checkoutBtn.addEventListener('click', () => {
    closeCart();
    modal.classList.add('active');
    cart = [];
    updateCartUI();
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', renderProducts);