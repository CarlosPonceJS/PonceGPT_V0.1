//Tomar por id mi input y mi boton
const pregunta = document.getElementById('txtPregunta');
const btnGuardar = document.getElementById('btnGuardar');

//Evento al presionar enter
pregunta.addEventListener('keydown', (event) => {
    if(event.key=="Enter" && pregunta.value!=""){
        guardarPregunta();
    }
});

//Evento al hacer click al botón
btnGuardar.addEventListener('click', () =>{
    if(pregunta.value!="")
    guardarPregunta();
    else
    notificacion("color:white; background-color: rgba(212, 171, 49, 0.703); width: 800px; padding: 10px; border: none;","El cuadro de texto de pregunta no puede quedar vacio");
});

function guardarPregunta(){
        //Obtener el valor de la pregunta.
        const preguntaValor = pregunta.value;

        //Objeto a enviar tipo como se mandan en la api
        const datos = {
            pregunta: preguntaValor
        };
    
        //Solicitud post usando fetch.
        fetch('/api/insertarPregunta',{ 
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        })
    
        .then(response => response.json())
        .then(data => {
            //Manejar la respuesta de la api
            console.log("Respuesta de la API",data);
            notificacion("color:white; background-color: #1987547d !important; width: 800px; padding: 10px; border: none;","Pregunta guardada con éxito!");
        })
        .catch(error => {
            console.log("Error: " + error);
            notificacion("color:white; background-color: #c226368b !important; width: 800px; padding: 10px; border: none;","Error al conectarse a la base de datos");


        })
        //Limpiar la caja de texto al final
        pregunta.value="";

}

//funcion para crear alertas de eventos, con los parámetros del estilo css y el texto que se desea mostrar
function notificacion(estilo, texto){
    var mensaje = document.createElement("div");
    mensaje.innerHTML = `
    <div class="container d-flex justify-content-center">
    <div class="alert alert-success" style="${estilo}" role="alert">
        <p>${texto}</p>
    </div>
</div>
`;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        document.body.removeChild(mensaje);
    }, 4000);
}


