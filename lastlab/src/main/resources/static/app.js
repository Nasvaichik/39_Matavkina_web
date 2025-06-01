const API_URL = "http://localhost:8080/api/products";

// Загружаем продукты при загрузке страницы
document.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProductPrompt(${product.id}, '${product.name}', ${product.price})">✏️</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️</button>
            </div>
        `;
        container.appendChild(productElement);
    });
}

async function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    
    if (!name || isNaN(price)) {
        alert("Пожалуйста, заполните все поля корректно");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price })
        });
        
        if (response.ok) {
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            loadProducts();
        }
    } catch (error) {
        console.error("Ошибка при добавлении продукта:", error);
    }
}

async function deleteProduct(id) {
    if (!confirm("Вы уверены, что хотите удалить этот продукт?")) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProducts();
        } else {
            alert("Ошибка при удалении продукта");
        }
    } catch (error) {
        console.error("Ошибка при удалении продукта:", error);
        alert("Ошибка при удалении продукта");
    }
}

function editProductPrompt(id, currentName, currentPrice) {
    const newName = prompt("Введите новое название:", currentName);
    if (newName === null) return;
    
    const newPrice = parseFloat(prompt("Введите новую цену:", currentPrice));
    if (isNaN(newPrice)) return;
    
    updateProduct(id, newName, newPrice);
}

async function updateProduct(id, name, price) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price })
        });
        
        if (response.ok) {
            loadProducts();
        } else {
            alert("Ошибка при обновлении продукта");
        }
    } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
        alert("Ошибка при обновлении продукта");
    }
}