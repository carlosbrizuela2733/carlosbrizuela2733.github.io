// Inicialización de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBO34l9EWBNGcGU8ehs6ivcSM2MY2WdFFQ",
  authDomain: "turnos-3cb49.firebaseapp.com",
  projectId: "turnos-3cb49",
});

var db = firebase.firestore();

// Obtener el formulario y el campo de entrada de nombre
var formulario = document.getElementById("formulario");
var campoNombre = document.getElementById("nombre");

// Escuchar el evento de envío del formulario
formulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  var nombre = campoNombre.value; // Obtener el valor del campo de nombre

  // Agregar un documento a la colección "turnos" con el nombre ingresado
  db.collection("turnos").add({
    nombre: nombre,
    estado: "en_espera",
    fecha_hora: new Date().toISOString() // Usar la fecha y hora actual
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    campoNombre.value = ""; // Limpiar el campo de nombre después de agregar el registro
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
});
