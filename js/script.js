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
                    <button onclick="AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', '${persona.email}', '${persona.edad}')">Editar</button>
                    <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
                </td>
        `
    });
}

obtenerPersonas();




//Agregar un nuevo registro//
const modal = document.getElementById("modal-agregar");//cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal");//+ para abrir
const btnCerrar = document.getElementById("btnCerrarModal");//x para cerrar

btnAgregar.addEventListener("click", () => {
    modal.showModal();//Abrir el modal al hacer clic
});

btnCerrar.addEventListener("click", () => {
    modal.close();//Cerrar modal
});


//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); // e representa a submit - evita que el formilario se envie de golpe

    //capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //validacion basica
    if(!nombre || !apellido || !email || !edad){
        alert("complete todos los campos");
        return;
    }

    //Llamamos a la API
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el model

        document.getElementById("frmAgregar").reset();

        modal.close();

        //Recargar la tabla
        obtenerPersonas();
    }
    else{
        alert("Ocurrio un error al agregar");
    }
});

//Funcion para borrar registros
async function EliminarPersona(id) {
    const confirmacion = confirm("¿Realmente quieres eliminar este registro?");

    //validamos si el usuario dijo que si
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});

        //recargamos la tabla para obtener informacion
        obtenerPersonas();
    }
}


//Proceso para editar un registro
const modalEditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close();//Cerrar modal de editar
});

function AbrirModalEditar(id, nombre, apellido, email, edad){
    //se agregan los valores al registro del imput
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;

    //modal se abre despues de agregar los valores a los inputs
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e=>{
    e.preventDefault(); //evita que el formulario se envie

    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value.trim();
    const apellido = document.getElementById("apellidoEditar").value.trim();
    const email = document.getElementById("emailEditar").value.trim();
    const edad = document.getElementById("edadEditar").value.trim();

    if(!id || !nombre || !apellido || !email || !edad){
        alert("complete los cambios pongamonos serios");
        return; //evita que el codigo se siga ejecutando
    }

    //llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({edad, email, nombre, apellido})
    });

    if(respuesta.ok){
        alert("Registro actualizado con exito"); //confirmacion
        modalEditar.close(); //cerramos el modal
        obtenerPersonas(); //actualizamos la lista
    }
    else{
        alert("Ocurrio un erro al actualizar");
    }
});