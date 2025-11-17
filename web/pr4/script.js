// Елементи сторінки
const input = document.getElementById("taskInput");
const list = document.getElementById("tasks");

// Завантаження збережених завдань
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Показуємо завдання
function render() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Стиль виконаних
        if (task.done) li.classList.add("done");

        li.textContent = task.text + " (" + task.date + ")";

        // Чекбокс
        if (!task.done) {
            const check = document.createElement("input");
            check.type = "checkbox";
            check.onclick = () => {
                task.done = true;
                save();
            };
            li.prepend(check);
        }

        // Видалення
        const del = document.createElement("span");
        del.textContent = "✖";
        del.className = "delete";
        del.onclick = () => {
            tasks.splice(index, 1);
            save();
        };
        li.appendChild(del);

        // Редагування
        li.ondblclick = () => {
            const newText = prompt("Редагувати:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText;
                save();
            }
        };

        list.appendChild(li);
    });
}

// Збереження
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

// Додавання нового завдання при Enter
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {

        const date = new Date();
        const formatted =
            date.toLocaleDateString("uk-UA") + ", " +
            date.toLocaleTimeString("uk-UA").slice(0, 5);

        tasks.push({
            text: input.value.trim(),
            done: false,
            date: formatted
        });

        input.value = "";
        save();
    }
});

// Сортування
document.getElementById("sortAll").onclick = () => render();

document.getElementById("sortActive").onclick = () => {
    const active = tasks.filter(t => !t.done);
    list.innerHTML = "";
    active.forEach(t => list.innerHTML += `<li>${t.text}</li>`);
};

document.getElementById("sortDone").onclick = () => {
    const done = tasks.filter(t => t.done);
    list.innerHTML = "";
    done.forEach(t => list.innerHTML += `<li class="done">${t.text}</li>`);
};

// Початковий показ
render();
