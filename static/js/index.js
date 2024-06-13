document.addEventListener('DOMContentLoaded', ()=>{
    //obtener el id de:
    //Mensaje a enviar.
    var mensaje = document.getElementById('chatBox');
    //boton para enviar el mensaje
    var botonPreguntar = document.getElementById('btnPreguntar');
    var imagen = document.getElementById('imgLogo');

    //Evento al presionar Enter
    mensaje.addEventListener('keydown',(event)=>{
        if(event.key=="Enter"){
        enviarMensaje();
        }
    });
    //Evento al dar click al botón.
    botonPreguntar.addEventListener('click', ()=>{
        enviarMensaje();
    });

    //Enviar mensaje al bot
    function enviarMensaje() {
        //Texto que tiene el valor del texto ingresado quitando los espacios en blanco con .trim()
        var textoMensaje = mensaje.value.trim();
        //Boton color transparente
        botonPreguntar.style.backgroundColor = "#00000000";
        //Si el mensaje no está vacio
        if (textoMensaje !== "") {
            //Borra el logo
            imagen.remove();
            //Agrega el mensaje
            agregarMensaje('Tu', textoMensaje);
            //Obten la respuesta del chatbot
            obtenerRespuesta(textoMensaje);
            //Limpia la caja de texto
            mensaje.value = "";
            //Ve hacia abajo
            deslizarAbajo();
        }
    }
});

//Funcion para ir siempre al último mensaje enviado
function deslizarAbajo() {
    var areaMensajes = document.getElementById('mensajes');
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

//Funcion para agregar un mensaje al contenedor de mensajes
function agregarMensaje(emisor, texto) {
    //creacion de un div
    var elementoMensaje = document.createElement('div');
    //Especificacion de estilos y estructura de mensaje
    elementoMensaje.innerHTML = `
        <div style="padding: 10px; border-radius: 15px; margin-bottom:20px;">
            <span class="fw-bold">${emisor}</span>
            <p>${texto}</p>
        </div>
    `;
    //añadir al contenedor mensajes
    document.getElementById('mensajes').appendChild(elementoMensaje);
}  

    //Mostrar la respuesta del bot
function mostrarRespuesta(respuesta) {
    agregarMensaje('ponceGPT', respuesta);
}

//Cambiar de color el boton cuando se escriba en la caja de texto
function colorBoton(){
    let mensaje = document.getElementById("chatBox");
    let boton = document.getElementById("btnPreguntar");
    if(mensaje.value!=="")
    boton.style.backgroundColor="#198754";
    else
    boton.style.backgroundColor="#00000000";
}  

//Obtener la respuesta referenciada a la api del backend que se encarga de eso
function obtenerRespuesta(pregunta) {
    //Fetch para usar la api con su link de referencia
    fetch('/api/respuesta', {
        //Metodo post para poner en pantalla
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //objeto recuperado
        body: JSON.stringify({ pregunta: pregunta }),
    })
    //Obtener la respuesta en json
        .then(response => response.json())
        //Si hay datos
        .then(data => {
            mostrarRespuesta(data.respuesta);
        })
        //Si hay un error
        .catch(error => {
            console.error('Error al obtener la respuesta:', error);
        });
}



