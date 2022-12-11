const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", ()=>{ //este evento se llama cuando el documento este cargado en la totalidad 
        tweets = JSON.parse( localStorage.getItem("tweets")) || []; //esto se lee: en el arreglo tweets incorporo lo que hay en el 
                                                                    //localStorage tweets o dejo el arreglo vacio (eso es para que no me de null, porque si me da null entonces al 
        console.log(tweets);                                        //momento de crear el HTML el forEach no va a recorrer nada y dara error.

        crearHTML(); //esta funcion se ejectura solamente si se cumple el condicional de esa misma funcion que 
    });              // dice que si se escribe algun tweet se ejecuta la funcion
}


//Funciones
function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value; //con esto accedo al valor que se ingresa en el textarea 

    // Validacion...
    if(tweet === ""){
        mostrarError("un mensaje no puede ir vacio")

        return; //este return evita que se ejecuten mas linea de codigo, solo funciona si se aplica si el condicional esta dentro de una funcion
    }

    const tweetObj = {     //luego de almacenar el value ingresado en la variable tweet creo un objeto con los datos que se van almacenando en tweet
        id: Date.now(),
        tweet
    } 

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]; //en el arreglo se incorpora un objeto que almacena a su vez todos los valores ingresados en el text area que fueron almacenados en la variable tweet

    // Una vez agregado mostrar en el html
    crearHTML()

    //Reinicia el formulario

    formulario.reset();  //esto va despues de crar el html para que luego de escribir algo no lo repita
}
//Mosstrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error; //este error es el parametro que tiene la funcion la primera vez que es llamada
    mensajeError.classList.add("error"); //esta clase esta en el custom css

    // Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}
//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML()    //esto va adelante de que se ejecute la funcion para que el appendChild no acumule valores en el arreglo

    if(tweets.length > 0) {
        tweets.forEach(tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet") //esta funcion ya esta en el custom de css
            btnEliminar.textContent = "X";

            //Añadir la funcion elmininar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); // ese id es del elemento de cada objeto creado en tweetObj, 
            }                          // cada tweet esta identificado con id y a su vez  
                                       // cada tweet es lo que se incorpora en el arreglo tweets, es decir todo lo que se va twitiando
            // Crear el HTML
            const li= document.createElement("li");

            //Añadir texto
            li.innerText = tweet.tweet; // el segundo tweet es el valor ingresado en el text area que se incorpora al objeto creado tweetObj.

            //Añadir el boton en el HTML
            li.appendChild(btnEliminar);

            //Insetarlo en el HTML
            listaTweets.appendChild(li); // mientras haya un appendChild no se va a eliminar
                                         // la palabra anterior que se escribio: hola, chau, aparece hola, hola chau. Se repite en el arreglo   
        });
    }
    sicronizarStorage();
}

// Agregar los tweets actuales a Localstorage

function sicronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets)); //como es un arreglo y no se puede almacenar directamente se utiliza un JSON y se le pasa el tweets (que es el arreglo) 
}

//Elimina los tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id); // filter va a crear un nuevo arreglo habiendo filtrado los tweets al que se le dio click, cre un nuevo arreglo con los id a los que no se les dio clik 
                                                      // LO QUE NO ME QUEDA CLARO ES el parametro de la funcion antes que la llamen (tweet.id) y el que se le pasa cuando se ejectuta (id)  
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML(){
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}