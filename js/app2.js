/* ++++++++++++ Initialize Firebase ++++++++++ */
function inicializarFirebase() {

  var config = {
    apiKey: "AIzaSyC0Mm77qD91FvT1x4YWY_3NEtSx3Hkbh4c",
    authDomain: "pruebas-3d15a.firebaseapp.com",
    databaseURL: "https://pruebas-3d15a.firebaseio.com",
    projectId: "pruebas-3d15a",
    storageBucket: "pruebas-3d15a.appspot.com",
    messagingSenderId: "437883428230"
  };
  firebase.initializeApp(config);
}

var provider = new firebase.auth.GoogleAuthProvider();

/* ++++++++++++ Ingresa el Usuario por medio de Cuenta GMAIL ++++++++++ */
$('#login').click(function() {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result.user);
      saveDate(result.user);
      $('#login').hide();

      /*-----  pinta los datos del usuario ----*/
      $('#photo').append("<img width='100px' src='" + result.user.photoURL + "''/>");
      $('#name').append(result.user.displayName);
      $('#email').append(result.user.email);

    })
});

/* ++++++++ Funcion guarda automaticamente al usuario en la BD en firebase (crea rama)+++++ */
function saveDate(user) {
  var usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL
  }
  firebase.database().ref("pruebas/" + user.uid)
    .set(usuario) //modifica la llave

}

/* ++++++++++++ Seccion donde el Usuario puede escribir un mensaje ++++++++++ */
window.onload = inicializar;
var formulario;
var refMensajes;
var fondosMensajes;

function inicializar() {
  formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", enviarDatos, false);
  fondosMensajes = document.getElementById('fondo-mensajes');
  inicializarFirebase();
  mostrarmensajes();
}

function mostrarmensajes() {
  refMensajes = firebase.database().ref().child("mensajes");

  refMensajes.on("value", function(snap) {
    var todosLosMensajes = "";
    datos = snap.val();
    for (var key in datos) {
      todosLosMensajes += "</br><strong>" + datos[key].mensaje;
    }
    fondosMensajes.innerHTML = todosLosMensajes;

  })
}

function enviarDatos(event) {
  event.preventDefault();
  refMensajes.push({
    mensaje: event.target.mensaje.value
  });
  formulario.reset();
}
