// JavaScript para cargar y mostrar los productos
fetch('./assets/db/productos.json')
.then(response => response.json())
.then(data => {
    const productList = document.getElementById('product-list');

    data.products.forEach(product => {
        // Crear un contenedor para cada producto
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        // Crear el título del producto
        const productName = document.createElement('h2');
        productName.textContent = product.name;

        // Crear la imagen del producto
        const productImage = document.createElement('img');
        productImage.src = product.images[0];
        productImage.alt = product.name;

        // Crear la descripción del producto
        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        // Crear el precio del producto
        const productPrice = document.createElement('p');
        productPrice.textContent = `Precio: ${product.currency} ${product.price}`;

        // Agregar todo al contenedor del producto
        productContainer.appendChild(productName);
        productContainer.appendChild(productImage);
        productContainer.appendChild(productDescription);
        productContainer.appendChild(productPrice);

        // Agregar el contenedor del producto a la lista de productos
        productList.appendChild(productContainer);
    });
})
.catch(error => console.error('Error al cargar los productos:', error));