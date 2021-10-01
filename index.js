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


function login() {
  $(".modal").modal("show");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (success) => {
      let db = firebase.firestore();
      let user = firebase.auth().currentUser;
      let uid = user.uid;

      const snapshot = await db.collection("users").doc(uid).get();
      const data = snapshot.data();
      if (data["userType"] == "admin") {
        location.replace("/pages/admin.html");
      } else if (data["userType"] == "police") {
        location.replace("/pages/police.html");
      } else {
        location.replace("/pages/applicant.html");
      }
      $(".modal").modal("hide");
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message;
      $(".modal").modal("hide");
    });
}
