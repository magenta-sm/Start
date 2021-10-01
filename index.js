document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    $(".modal").modal("show");
    let db = firebase.firestore();
    let uid = user.uid;

    const snapshot = await db.collection("users").doc(uid).get();
    const data = snapshot.data();
    location.replace(`pages/${data["userType"]}.html`);
  }
  else{
    document.getElementById("loginBody").style.display = "block";
  }
});

function forgotPass() {
  const email = document.getElementById("email").value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent to your email id");
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message;
    });
}
