const API_URL = "https://retoolapi.dev/rZyLoM/data";

async function obtenerPersonas() {
    const res = await fetch(API_URL);
    
    const data = await res.json();

    mostrarDatos(data);

}

function mostrarDatos(datos){
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
        `
    });
}

obtenerPersonas();