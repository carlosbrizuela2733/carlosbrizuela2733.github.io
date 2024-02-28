// Inicialización de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBO34l9EWBNGcGU8ehs6ivcSM2MY2WdFFQ",
  authDomain: "turnos-3cb49.firebaseapp.com",
  projectId: "turnos-3cb49",
});

var db = firebase.firestore();

// Agregar un documento a la colección "turnos"
db.collection("turnos")
  .add({
    nombre: "Otro",
    estado: "pendiente",
    fecha_hora: "08:00",
  })
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });
