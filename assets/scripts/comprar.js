
let cart = [];

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text">$${item.price}</p>
                            <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        // Integrar MercadoPago aquí
        alert('Procediendo al pago...');
    });

    const mp = new MercadoPago('TU_PUBLIC_KEY', {
        locale: 'es-AR'
    });

    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        const orderData = {
            items: cart.map(item => ({
                title: item.name,
                description: item.description,
                quantity: 1,
                unit_price: item.price,
                currency_id: 'ARS'
            })),
            payer: {
                email: 'test_user_12345678@testuser.com'  // Reemplaza con el email del comprador
            }
        };

        fetch('/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(preference => {
            mp.checkout({
                preference: {
                    id: preference.id
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar'
                }
            });
        });
    });



// Ejemplo con Node.js y Express
const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

mercadopago.configure({
    access_token: 'TU_ACCESS_TOKEN'
});

app.use(express.json());

app.post('/create_preference', (req, res) => {
    let preference = {
        items: req.body.items,
        payer: req.body.payer,
        back_urls: {
            success: 'https://tu_sitio/success',
            failure: 'https://tu_sitio/failure',
            pending: 'https://tu_sitio/pending'
        },
        auto_return: 'approved',
    };

    mercadopago.preferences.create(preference)
    .then(response => {
        res.json({ id: response.body.id });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

