document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99 },
        { id: 2, name: 'Product 2', price: 39.99 },
        { id: 3, name: 'Product 3', price: 49.99 }
    ];

    const cart = JSON.parse(localStorage.getItem("productlist")) || [];

    const prodcutlist = document.getElementById('product-list');
    const cartitems = document.getElementById('cart-items');
    const emptycartmessage = document.getElementById('empty-cart');
    const carttotalmessage = document.getElementById('cart-total');
    const cartprice = document.getElementById('total-price');
    const checkout = document.getElementById('checkout-btn');


    products.forEach(product => {
        const productdiv = document.createElement('div');
        productdiv.classList.add('product');
        productdiv.innerHTML = `
            <span>${product.name} - ${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        prodcutlist.appendChild(productdiv);
    });


    rendercart();

    prodcutlist.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productID = parseInt(e.target.getAttribute('data-id'));
            const purchasedproduct = products.find(p => p.id === productID);
            addtoCart(purchasedproduct);
        }
    });

    function addtoCart(purchasedproduct) {
        cart.push(purchasedproduct);
        saveproductstolocal();
        rendercart();
    }

    function rendercart() {
        let totalprice = 0;

        // Clear only old cart items
        const oldItems = cartitems.querySelectorAll('.cartproduct');
        oldItems.forEach(item => item.remove());

        if (cart.length === 0) {
            emptycartmessage.classList.remove('hidden');
            carttotalmessage.classList.add('hidden');
            return;
        }

        emptycartmessage.classList.add('hidden');
        carttotalmessage.classList.remove('hidden');

        cart.forEach((itemm) => {
            totalprice += itemm.price;
            const purchaseddiv = document.createElement('div');
            purchaseddiv.classList.add('cartproduct');
            purchaseddiv.innerHTML = `
                <span>${itemm.name} - $ ${itemm.price.toFixed(2)}</span>
                <button data-id="${itemm.id}">Remove</button>
            `;
            cartitems.appendChild(purchaseddiv);
        });

        cartprice.textContent = `$ ${totalprice.toFixed(2)}`;
    }

    checkout.addEventListener('click', () => {
        alert('Successfully purchased the items');
        derendercart();
    });

    cartitems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const idToRemove = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(idToRemove);
        }
    });
    
    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            saveproductstolocal();
            rendercart();
        }
    }
    

    function derendercart() {
        cart.length = 0;
        saveproductstolocal();
        rendercart();
    }

    function saveproductstolocal() {
        localStorage.setItem("productlist", JSON.stringify(cart));
    }

});
