// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const cart = getCart();
    const checkoutContainer = document.getElementById('checkout-container');
    const cartItemsCheckout = document.getElementById('cart-items-checkout');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    // Check if cart is empty
    if (cart.length === 0) {
        checkoutContainer.innerHTML = `
            <div class="empty-cart" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart before proceeding to checkout.</p>
                <a href="products.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    // Render cart items
    renderCheckoutItems();
    
    // Calculate and display totals
    updateTotals();
    
    // Setup event listeners
    setupCheckoutEvents();
    setupFormValidation();
    setupPaymentSelection();
});

function renderCheckoutItems() {
    const cart = getCart();
    const cartItemsCheckout = document.getElementById('cart-items-checkout');
    
    cartItemsCheckout.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        
        const price = parseFloat(item.price.replace('$', ''));
        const quantity = item.quantity || 1;
        const total = price * quantity;
        
        itemDiv.innerHTML = `
            <img src="${item.image}" class="checkout-item-img" alt="${item.name}">
            <div class="checkout-item-info">
                <div class="checkout-item-title">${item.name}</div>
                <div class="checkout-item-price">${item.price}</div>
                <div class="checkout-item-qty">
                    <button class="qty-btn-checkout qty-decrease-checkout" data-index="${index}" title="Decrease">-</button>
                    <span class="qty-value-checkout">${quantity}</span>
                    <button class="qty-btn-checkout qty-increase-checkout" data-index="${index}" title="Increase">+</button>
                </div>
            </div>
            <div class="checkout-item-total">$${total.toFixed(2)}</div>
        `;
        
        cartItemsCheckout.appendChild(itemDiv);
    });
}

function updateTotals() {
    const cart = getCart();
    const subtotalElement = document.getElementById('subtotal');
    const deliveryChargesElement = document.getElementById('delivery-charges');
    const totalAmountElement = document.getElementById('total-amount');
    
    let subtotal = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        const quantity = item.quantity || 1;
        subtotal += price * quantity;
    });
    
    const deliveryCharges = 5.99;
    const total = subtotal + deliveryCharges;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    deliveryChargesElement.textContent = `$${deliveryCharges.toFixed(2)}`;
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutEvents() {
    // Quantity increase/decrease buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('qty-increase-checkout')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const cart = getCart();
            cart[index].quantity = (cart[index].quantity || 1) + 1;
            setCart(cart);
            renderCheckoutItems();
            updateTotals();
            updateCartCount();
        }
        
        if (e.target.classList.contains('qty-decrease-checkout')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const cart = getCart();
            
            if ((cart[index].quantity || 1) > 1) {
                cart[index].quantity -= 1;
                setCart(cart);
                renderCheckoutItems();
                updateTotals();
                updateCartCount();
            } else {
                // Remove item if quantity would be 0
                Swal.fire({
                    title: 'Remove item?',
                    text: `${cart[index].name} will be removed from your cart.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d4af37',
                    cancelButtonColor: '#888',
                    confirmButtonText: 'Yes, remove it',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        cart.splice(index, 1);
                        setCart(cart);
                        renderCheckoutItems();
                        updateTotals();
                        updateCartCount();
                        
                        // If cart becomes empty, redirect to products
                        if (cart.length === 0) {
                            window.location.href = 'products.html';
                        }
                    }
                });
            }
        }
    });
}

function setupFormValidation() {
    const formInputs = document.querySelectorAll('#full-name, #phone, #email, #address, #city, #postal-code, #country');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    function validateForm() {
        let isValid = true;
        
        // Check all required fields
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        
        // Check email format
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            isValid = false;
        }
        
        // Check phone format (basic validation)
        const phone = document.getElementById('phone').value;
        if (phone && phone.length < 10) {
            isValid = false;
        }
        
        // Check if payment method is selected
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            isValid = false;
        }
        
        // Enable/disable place order button
        placeOrderBtn.disabled = !isValid;
        
        return isValid;
    }
    
    // Add event listeners to all form inputs
    formInputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('blur', validateForm);
    });
    
    // Initial validation
    validateForm();
}

function setupPaymentSelection() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Trigger form validation
            setupFormValidation();
        });
    });
}

// Place Order Function
document.getElementById('place-order-btn').addEventListener('click', function() {
    if (!validateForm()) {
        Swal.fire({
            title: 'Please complete all required fields',
            text: 'Make sure all fields are filled and payment method is selected.',
            icon: 'warning',
            confirmButtonColor: '#d4af37'
        });
        return;
    }
    
    // Collect form data
    const orderData = {
        customer: {
            name: document.getElementById('full-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postal-code').value,
            country: document.getElementById('country').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        items: getCart(),
        subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('$', '')),
        deliveryCharges: parseFloat(document.getElementById('delivery-charges').textContent.replace('$', '')),
        total: parseFloat(document.getElementById('total-amount').textContent.replace('$', '')),
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
    
    // Show order confirmation
    Swal.fire({
        title: 'Confirm Your Order',
        html: `
            <div style="text-align: left; margin: 1rem 0;">
                <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Order Summary</h4>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Total Items:</strong> ${orderData.items.length}</p>
                <p><strong>Subtotal:</strong> $${orderData.subtotal.toFixed(2)}</p>
                <p><strong>Delivery:</strong> $${orderData.deliveryCharges.toFixed(2)}</p>
                <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
                <p><strong>Payment:</strong> ${orderData.payment === 'online' ? 'Online Payment' : 'Cash on Delivery'}</p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#888',
        confirmButtonText: 'Place Order',
        cancelButtonText: 'Review Order'
    }).then((result) => {
        if (result.isConfirmed) {
            // Process the order
            processOrder(orderData);
        }
    });
});

function processOrder(orderData) {
    // Show loading state
    Swal.fire({
        title: 'Processing Order...',
        text: 'Please wait while we process your order.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        setCart([]);
        updateCartCount();
        
        // Show success message
        Swal.fire({
            title: 'Order Placed Successfully!',
            html: `
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #28a745; margin-bottom: 1rem;"></i>
                    <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Thank you for your order!</h4>
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p>We'll send you an email confirmation shortly.</p>
                    ${orderData.payment === 'online' ? 
                        '<p style="color: #d4af37; font-weight: 600;">You will be redirected to payment gateway.</p>' : 
                        '<p style="color: #d4af37; font-weight: 600;">Pay when you receive your order.</p>'
                    }
                </div>
            `,
            icon: 'success',
            confirmButtonColor: '#d4af37',
            confirmButtonText: 'Continue Shopping'
        }).then(() => {
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }, 2000);
}

function generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `ZTH-${timestamp.slice(-6)}-${random}`;
}

function validateForm() {
    const formInputs = document.querySelectorAll('#full-name, #phone, #email, #address, #city, #postal-code, #country');
    let isValid = true;
    
    // Check all required fields
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });
    
    // Check email format
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        isValid = false;
    }
    
    // Check phone format (basic validation)
    const phone = document.getElementById('phone').value;
    if (phone && phone.length < 10) {
        isValid = false;
    }
    
    // Check if payment method is selected
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        isValid = false;
    }
    
    return isValid;
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

// Cart functions (from script.js)
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
} 