
import { auth, signInWithEmailAndPassword } from "./firebase.js";

const form = document.getElementById("form");

function loginHandler(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`${user.email} login sucess`);
      window.location = "./PitchCraft/home.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      window.location.href = "./signup/signup.html"

    });
}

form.addEventListener("submit", loginHandler);