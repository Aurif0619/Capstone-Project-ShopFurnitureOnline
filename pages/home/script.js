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
            const totalPrice = (item.price * item.quantity).toFixed(2);
            cartContainer.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>${item.name} - $${totalPrice} (Quantity: ${item.quantity})</span>
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
        const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));

        if (itemIndex > -1) {
            alert("You have already added this item to the cart.");
        } else {
            
            cart.push({ id, name, price: parsedPrice, quantity: 1 });
            console.log(`Added ${name} to cart`);
        }
        updateCart();
    }

    window.updateQuantity = function (id, delta) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            const newQuantity = cart[itemIndex].quantity + delta;
            cart[itemIndex].quantity = Math.max(1, newQuantity);
            updateCart();
        }
    };

    window.removeFromCart = function (id) {
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            updateCart();
        }
    };
    
    const newCartItemButton = document.querySelector('#add-to-cart-6');
    if (newCartItemButton) {
        newCartItemButton.addEventListener('click', () => {
            const id = '6';
            const name = 'Navy blue low sofa for relaxation';
            const price = '$1,250.00';

            addToCart(id, name, price);
        });
    }

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

    updateCart();
});
