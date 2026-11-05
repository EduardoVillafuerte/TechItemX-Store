// Base de datos simulada de productos
const products = [
    { id: 1, name: "Teclado Mecánico", price: 120.50 },
    { id: 2, name: "Mouse Inalámbrico", price: 45.00 },
    { id: 3, name: "Monitor 144Hz", price: 299.99 },
    { id: 4, name: "Auriculares 7.1", price: 85.00 },
    { id: 5, name: "Mousepad XL", price: 20.00 },
    { id: 6, name: "Webcam 1080p", price: 60.00 }
];

let cart = [];

const productListElement = document.getElementById('product-list');
const cartListElement = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');

function renderProducts() {
    products.forEach(product => {
        const card = document.createElement('article');
        card.classList.add('product-card');

        card.innerHTML = `
            <h3 class="product-card__name">${product.name}</h3>
            <span class="product-card__price">$${product.price.toFixed(2)}</span>
            <button class="product-card__btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productListElement.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    cartListElement.innerHTML = '';

    if (cart.length === 0) {
        cartListElement.innerHTML = '<p class="cart__empty-msg">Tu carrito está vacío.</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item__info">
                <span class="cart-item__name">${item.name}</span>
                <span class="cart-item__price">$${item.price.toFixed(2)}</span>
            </div>
        `;
        cartListElement.appendChild(cartItem);
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});