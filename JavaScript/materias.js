document.addEventListener("DOMContentLoaded", () => {
    const materiasTable = document.getElementById("materiasTable");
    const searchMateria = document.querySelector(".search-container input"); // Obtener el input de búsqueda correctamente
    const recordsInfo = document.querySelector(".pagination-info p");
    const searchContainer = searchMateria.parentElement;

    let notFoundMessage = document.createElement("p");
    notFoundMessage.classList.add("not-found-message");
    notFoundMessage.textContent = "Materia no encontrada";
    searchContainer.appendChild(notFoundMessage);

    let allMaterias = [
        { clave: "MAT111", modulo: 1, asignatura: "Cálculo Diferencial", prerrequisitos: "MAT110", equivalencias: "MIN012", plan: "01", estado: "No ofertada" },
        { clave: "TCD007", modulo: 3, asignatura: "Base de Datos", prerrequisitos: "TCD003", equivalencias: "LT1005", plan: "01", estado: "No ofertada" },
        { clave: "ISW226", modulo: 4, asignatura: "Ingeniería de Usabilidad", prerrequisitos: "TCD004", equivalencias: "ISW210", plan: "01", estado: "Ofertada" }
    ];

    function renderTable(filteredMaterias) {
        materiasTable.innerHTML = "";

        if (filteredMaterias.length === 0) {
            notFoundMessage.classList.add("show");
            recordsInfo.textContent = `Mostrando 0 de ${allMaterias.length} registros`;
        } else {
            notFoundMessage.classList.remove("show");
            filteredMaterias.forEach(materia => {
                let row = `<tr>
                    <td>${materia.clave}</td>
                    <td>${materia.modulo}</td>
                    <td>${materia.asignatura}</td>
                    <td>${materia.prerrequisitos}</td>
                    <td>${materia.equivalencias}</td>
                    <td>${materia.plan}</td>
                    <td class="estado ${materia.estado === 'Ofertada' ? 'ofertada' : 'no-ofertada'}">${materia.estado}</td>
                    <td><img src="Imagenes/editar.svg" class="edit-icon"></td>
                </tr>`;
                materiasTable.innerHTML += row;
            });
            recordsInfo.textContent = `Mostrando ${filteredMaterias.length} de ${allMaterias.length} registros`;
        }
    }

    searchMateria.addEventListener("input", function () {
        let searchTerm = searchMateria.value.toLowerCase();
        let filtered = allMaterias.filter(materia => 
            materia.clave.toLowerCase().includes(searchTerm) ||
            materia.asignatura.toLowerCase().includes(searchTerm) ||
            materia.equivalencias.toLowerCase().includes(searchTerm) ||
            materia.plan.toLowerCase().includes(searchTerm)
        );
        renderTable(filtered);
    });

    renderTable(allMaterias); // Render inicial para mostrar los datos correctamente
});
