// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];


// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        // Busca los tweets en local storage y convertir en JSON, si es null asignarlo como arreglo vacio
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    })
}


// Funciones

function agregarTweet(e) {
    e.preventDefault();
    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;


    // validacion ...
    if (tweet === '') {
        mostrarError('No puede ir vacio');
        return; // evita que se ejeuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // añadir contenido al objeto twwet
    tweets = [...tweets, tweetObj];
    console.log(tweets)

    // mostrar el tweet en HTML
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elima la alerta despues de 3 segundos 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar boton eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Agregar la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet

            // Asignar el boton eliminar
            li.appendChild(btnEliminar);

            // agregar en el html
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
};


// Agrega tweets al local storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    // Crear arrelgo nuevo con todos los valores expecto el id seleccionado
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}

// Limpiar el HTML
function limpiarHTML () {
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
