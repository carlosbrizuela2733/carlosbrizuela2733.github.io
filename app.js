// Inicialización de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBO34l9EWBNGcGU8ehs6ivcSM2MY2WdFFQ",
  authDomain: "turnos-3cb49.firebaseapp.com",
  projectId: "turnos-3cb49",
});
// Escuchar el evento 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function() {
  var db = firebase.firestore();
  var listaEspera = document.getElementById("turnos");
  var botonAtender = document.getElementById("atender");

  // Función para mostrar la lista de espera en la interfaz de usuario
  function mostrarListaEspera() {
  // Limpiar la lista de espera antes de actualizarla
  listaEspera.innerHTML = "";

  // Obtener los turnos en espera de Firestore y mostrarlos en la lista
  db.collection("turnos").where("estado", "==", "en_espera").onSnapshot(function(snapshot) {
    snapshot.forEach(function(doc) {
      var turno = doc.data();
      var turnoElemento = document.createElement("li");
      turnoElemento.textContent = turno.nombre;
      listaEspera.appendChild(turnoElemento);
    });
    // Habilitar el botón "Atender siguiente" si hay al menos un turno en espera
    botonAtender.disabled = snapshot.empty;
  });
}

  // Escuchar el evento de envío del formulario
  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    var nombre = document.getElementById("nombre").value; // Obtener el nombre ingresado

    // Agregar un nuevo turno a la colección "turnos" con estado "en_espera"
    db.collection("turnos").add({
      nombre: nombre,
      estado: "en_espera",
      fecha_hora: new Date().toISOString() // Usar la fecha y hora actual
    })
    .then(function() {
      mostrarListaEspera(); // Mostrar la lista de espera actualizada
      document.getElementById("nombre").value = ""; // Limpiar el campo de nombre
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });

  // Función para atender al siguiente cliente
  botonAtender.addEventListener("click", function() {
    // Obtener el primer turno en espera de Firestore
    db.collection("turnos").where("estado", "==", "en_espera").limit(1).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // Eliminar el turno de la colección
        db.collection("turnos").doc(doc.id).delete();
        mostrarListaEspera(); // Actualizar la lista de espera después de eliminar el turno
      });
    });
  });

  // Mostrar la lista de espera inicial
  mostrarListaEspera();
});
