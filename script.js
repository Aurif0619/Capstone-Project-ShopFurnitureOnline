document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    function updateCart() {
        const cartContainer = document.querySelector('#offcanvasCart .offcanvas-body');
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="text-center">
                    <i class="bi bi-cart3 fs-1"></i>
                    <p class="mt-3">Your shopping cart is currently empty!</p>
                    <button class="btn btn-primary">Continue shopping</button>
                </div>
            `;
            return;
        }

        cart.forEach(item => {
            cartContainer.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>${item.name} - $${item.price.toFixed(2)} (Quantity: ${item.quantity})</span>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-secondary btn-sm me-2" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <input type="number" class="form-control form-control-sm me-2" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value - ${item.quantity})">
                        <button class="btn btn-secondary btn-sm" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart('${item.id}')">Remove</button>
                    </div>
                </div>
            `;
        });
    }

    function addToCart(id, name, price) {
        const itemIndex = cart.findIndex(item => item.id === id);
        const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g,""));

        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ id, name, price: parsedPrice, quantity: 1 });
        }
        updateCart();
    }

    // Update quantity
    window.updateQuantity = function(id, delta) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            const newQuantity = cart[itemIndex].quantity + delta;
            cart[itemIndex].quantity = Math.max(1, newQuantity);
            updateCart();
        }
    };

    document.querySelectorAll('.row .col-md-3 button[id^="add-to-cart-"]').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.id.split('-').pop();
            const gridItem = event.target.closest('.col-md-3');
            const name = gridItem.querySelector('p').textContent;
            const price = gridItem.querySelector('h5').textContent;

            addToCart(id, name, price);
            console.log(`Added ${name} to cart`);
        });
    });

    window.removeFromCart = function(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }
    };

    updateCart();
});
