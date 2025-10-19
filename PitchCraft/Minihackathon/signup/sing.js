import { auth, createUserWithEmailAndPassword } from "../firebase.js";

// Function to register user

 let form = document.getElementById("form")
form.addEventListener("submit",(event)=>{
  event.preventDefault();  

let email = document.querySelector("#email");
let password = document.querySelector("#pass");


  createUserWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user.email);
      window.location.href = "../index.html";  
    })
    .catch((error) => {
      console.log("Error:", error.code, error.message);
    });
})

// ✅ Add event listener to button