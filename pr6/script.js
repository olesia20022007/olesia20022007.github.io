let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const cartCount = document.getElementById("cart-count");

cartCount.textContent = cart.length;

// Відкрити модальне
function showModal(html) {
    modalContent.innerHTML = html;
    modal.classList.remove("hidden");
}

// Закрити модальне
function closeModal() {
    modal.classList.add("hidden");
}

// Клік по корзині
document.getElementById("cart-icon").onclick = function () {
    if (cart.length === 0) {
        showModal(`<p>Корзина пуста</p>
                    <button onclick="closeModal()">Закрити</button>`);
    } else {
        window.location.href = "cart.html";
    }
};

// Додавання товарів
document.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        showModal(`
            <p>Вкажіть кількість:</p>
            <input type="number" id="qty" value="1" min="1">
            <br><br>
            <button onclick="addToCart('${name}', ${price})">Додати</button>
        `);
    };
});

// Додаємо товар
function addToCart(name, price) {
    const qty = Number(document.getElementById("qty").value);

    // Якщо товар вже є — не додаємо вдруге
    const exists = cart.find(item => item.name === name);
    if (!exists) {
        cart.push({ name, price, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.length;

    showModal(`
        <p>Товар додано</p>
        <button onclick="window.location.href='cart.html'">Перейти у корзину</button>
        <button onclick="closeModal()">Повернутись до покупок</button>
    `);
}
