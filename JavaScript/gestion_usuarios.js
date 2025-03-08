document.addEventListener("DOMContentLoaded", function () {
    const userTable = document.querySelector("#userTable"); // ✅ Se asegura de seleccionar el tbody
    const searchUser = document.getElementById("searchUser");
    const recordsInfo = document.querySelector(".pagination-info p"); // ✅ Ajustado para actualizar correctamente la cantidad de registros
    const searchContainer = searchUser.parentElement;

    let notFoundMessage = document.createElement("p");
    notFoundMessage.classList.add("not-found-message");
    notFoundMessage.textContent = "Usuario no encontrado";
    searchContainer.appendChild(notFoundMessage);

    // ✅ Variables del modal
    const modal = document.getElementById("deleteUserModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    const modalMessage = document.getElementById("modalMessage");

    // ✅ Asegurar que el modal está oculto al cargar la página
    modal.style.display = "none";

    let allUsers = [
        { apellido: "Zanella Palacios", nombre: "Vittorio", id: "1488006", facultad: "Tecnologías de la Información" },
        { apellido: "Suárez Márquez", nombre: "Linda", id: "7592834", facultad: "Ciencias Creativas" }
    ];

    let userToDelete = null; // ✅ Para almacenar el usuario a eliminar

    function renderTable(filteredUsers) {
        if (!userTable) {
            console.error("No se encontró el tbody de la tabla.");
            return;
        }

        userTable.innerHTML = ""; // ✅ Limpiar solo el tbody

        if (filteredUsers.length === 0) {
            notFoundMessage.classList.add("show");
            recordsInfo.textContent = `Mostrando 0 de ${allUsers.length} registros`;
        } else {
            notFoundMessage.classList.remove("show");
            filteredUsers.forEach(user => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.apellido}</td>
                    <td>${user.nombre}</td>
                    <td>${user.id}</td>
                    <td>${user.facultad}</td>
                    <td><img src="Imagenes/restablecer_contraseña.svg" class="reset-icon" data-id="${user.id}" data-nombre="${user.nombre}" data-apellido="${user.apellido}"></td>
                    <td><img src="Imagenes/borrar_usuario.svg" class="delete-icon" data-id="${user.id}" data-nombre="${user.nombre}" data-apellido="${user.apellido}"></td>
                `;

                userTable.appendChild(row);
            });
            recordsInfo.textContent = `Mostrando ${filteredUsers.length} de ${allUsers.length} registros`;
        }
        attachDeleteEvent(); // ✅ Se asegura de asignar eventos a los botones de eliminar
        attachResetEvent(); // ✅ Asigna eventos a los botones de restablecimiento de contraseña
    }

    function attachDeleteEvent() {
        document.querySelectorAll(".delete-icon").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                const userName = this.getAttribute("data-nombre");
                const userApellido = this.getAttribute("data-apellido");

                userToDelete = userId; // ✅ Guardamos el usuario a eliminar
                modalMessage.textContent = `¿Está seguro que desea eliminar a ${userApellido} ${userName}?`;
                modal.style.display = "flex"; // ✅ Mostrar el modal solo cuando se haga clic en eliminar
            });
        });
    }

    function attachResetEvent() {
        document.querySelectorAll(".reset-icon").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                const userName = this.getAttribute("data-nombre");
                const userApellido = this.getAttribute("data-apellido");
                
                document.getElementById("modal-reset-text").textContent = `¿Está seguro que desea restablecer la contraseña para ${userApellido} ${userName}?`;
                document.getElementById("modal-reset").style.display = "flex";
                
                document.getElementById("confirm-reset").onclick = function () {
                    const newPassword = generateRandomPassword();
                    document.getElementById("new-password-text").textContent = `Nueva contraseña: ${newPassword}`;
                    document.getElementById("modal-reset").style.display = "none";
                    document.getElementById("modal-new-password").style.display = "flex";
                };
            });
        });
    }

    function generateRandomPassword() {
        return Math.random().toString(36).slice(-10).toUpperCase();
    }

    confirmDeleteBtn.addEventListener("click", function () {
        if (userToDelete) {
            allUsers = allUsers.filter(user => user.id !== userToDelete);
            userToDelete = null;
            renderTable(allUsers);
        }
        modal.style.display = "none"; // ✅ Cerrar modal después de eliminar
    });

    cancelDeleteBtn.addEventListener("click", function () {
        modal.style.display = "none"; // ✅ Cerrar modal sin eliminar usuario
        userToDelete = null;
    });

    searchUser.addEventListener("input", function () {
        let searchTerm = searchUser.value.toLowerCase();
        let filtered = allUsers.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm) ||
            user.apellido.toLowerCase().includes(searchTerm) ||
            user.id.includes(searchTerm)
        );
        renderTable(filtered);
    });

    renderTable(allUsers);
});
