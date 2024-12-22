document.addEventListener('DOMContentLoaded', function() {
    const tareas = [
        { id: 1, descripcion: 'Hacer mercado', completado: false },
        { id: 2, descripcion: 'Estudiar para la prueba', completado: false },
        { id: 3, descripcion: 'Sacar a pasear a Tobby', completado: false }
    ];

    let idCounter = tareas.length + 1;

    const formulario = document.getElementById('formulario');
    const listaTareas = document.getElementById('lista-tareas');
    const totalTareas = document.getElementById('total-tareas');
    const totalRealizadas = document.getElementById('total-realizadas');

    function actualizarLista() {
        listaTareas.innerHTML = '';
        tareas.forEach((tarea) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tarea.id}</td>
                <td style="text-decoration: ${tarea.completado ? 'line-through' : 'none'};">${tarea.descripcion}</td>
                <td>
                    <input type="checkbox" ${tarea.completado ? 'checked' : ''} data-id="${tarea.id}">
                </td>
                <td>
                    <button class="borrar-btn" data-id="${tarea.id}"><i class="fa-solid fa-xmark" style="color: #e11919;"></i></button>
                </td>
            `;
            listaTareas.appendChild(tr);
        });
        totalTareas.textContent = tareas.length;
        totalRealizadas.textContent = tareas.filter(t => t.completado).length;

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                cambiarEstado(parseInt(this.dataset.id));
            });
        });

        document.querySelectorAll('.borrar-btn').forEach(button => {
            button.addEventListener('click', function() {
                borrarTarea(parseInt(this.dataset.id));
            });
        });
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const descripcion = document.getElementById('tarea').value;
        if (descripcion) {
            const nuevaTarea = {
                id: idCounter++,
                descripcion,
                completado: false
            };
            tareas.push(nuevaTarea);
            document.getElementById('tarea').value = '';
            actualizarLista();
        }
    });

    function borrarTarea(id) {
        const index = tareas.findIndex(tarea => tarea.id === id);
        if (index !== -1) {
            tareas.splice(index, 1);
            actualizarLista();
        }
    }

    function cambiarEstado(id) {
        const tarea = tareas.find(tarea => tarea.id === id);
        if (tarea) {
            tarea.completado = !tarea.completado;
            actualizarLista();
        }
    }

    actualizarLista();
});