// Отримуємо елементи зі сторінки
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const itemsList = document.getElementById("items");

// Функція додавання нового елемента
addBtn.onclick = function () {
    const text = input.value.trim();

    // Якщо нічого не введено — нічого не робимо
    if (text === "") return;

    // Створюємо <li>
    const li = document.createElement("li");
    li.textContent = text;

    // Кнопка видалення
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";

    deleteBtn.onclick = function () {
        const confirmDelete = confirm("Видалити цей елемент?");
        if (confirmDelete) {
            itemsList.removeChild(li);
        }
    };

    // Кнопка редагування (складніше завдання)
    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";

    editBtn.onclick = function () {
        const newText = prompt("Нове значення:", li.firstChild.textContent);
        if (newText !== null) {
            li.firstChild.textContent = newText;
        }
    };

    // Додаємо кнопки до li
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // Додаємо li у список
    itemsList.appendChild(li);

    // Очищаємо поле та ставимо фокус назад
    input.value = "";
    input.focus();
};
