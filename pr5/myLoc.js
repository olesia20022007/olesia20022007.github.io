// Координати Коледжу
const collegeLat = 48.9225;
const collegeLon = 24.7103;

// Запуск геолокації
function getMyLocation() {
    if (!navigator.geolocation) {
        document.getElementById("error").textContent =
            "Ваш браузер не підтримує Geolocation.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        displayLocation,
        errorHandler
    );
}

// Обробка успіху
function displayLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("coords").textContent =
        "Ваші координати: " + lat.toFixed(5) + ", " + lon.toFixed(5);

    // Розрахунок відстані до Коледжу
    const dist = computeDistance(lat, lon, collegeLat, collegeLon);

    document.getElementById("distance").textContent =
        "Відстань до Коледжу: " + dist.toFixed(2) + " км";
}

// Обробка помилок
function errorHandler(error) {
    if (error.code === 1)
        document.getElementById("error").textContent = "Доступ заборонено.";
    else if (error.code === 2)
        document.getElementById("error").textContent = "Неможливо визначити місцезнаходження.";
    else if (error.code === 3)
        document.getElementById("error").textContent = "Перевищено час очікування.";
    else
        document.getElementById("error").textContent = "Невідома помилка.";
}

// Формула гаверсинуса
function computeDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // радіус Землі у км
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// Переведення у радіани
function toRad(value) {
    return value * Math.PI / 180;
}
