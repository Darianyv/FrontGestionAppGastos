export function showNotification(message, type = "success", duration = 3000) {
    let notification = document.getElementById("notification");

    if (!notification) {
        console.error("El elemento de notificación no está definido en el HTML.");
        return;
    }

    notification.textContent = message;
    notification.className = `alert alert-${type}`;
    notification.classList.remove("d-none");

    setTimeout(() => {
        notification.classList.add("d-none");
    }, duration);
}

