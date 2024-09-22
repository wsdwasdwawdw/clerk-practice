// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth , signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6zhFT1FZyRnH8nybAT4ZPYBexHPqD5TM",
  authDomain: "capstone-8f915.firebaseapp.com",
  databaseURL: "https://capstone-8f915-default-rtdb.firebaseio.com",
  projectId: "capstone-8f915",
  storageBucket: "capstone-8f915.appspot.com",
  messagingSenderId: "193487820156",
  appId: "1:193487820156:web:707358816c42fb25d4c0f9",
  measurementId: "G-NN9YWS88J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

auth.languageCode = 'en';

const google = document.getElementById("google");
google.addEventListener("click", ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    const name = user.email;
    const picture = user.photoURL;
    
    sessionStorage.setItem("currentUser", name)
    sessionStorage.setItem("picture", picture)
    console.log(sessionStorage.getItem("currentUser"));
    console.log(sessionStorage.getItem("picture"));

    window.location.href = "./includes/dashboard.html";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

const Guest = document.getElementById("guest");
Guest.addEventListener("click", ()=>{
  window.location.href = "./includes/guest.html";
});

/* REGISTRATION SHITS */
window.register = async function() {

  
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirmpassword').value;

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }


  try {// Ensure this path is correct relative to your HTML file

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user profile with the default profile picture
    

    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
        email: email,
        createdAt: serverTimestamp()
    });

      RegistrationAlert();
      
      console.log(user.photoURL);
      
      document.getElementById('reg-email').value = "";
      document.getElementById('reg-password').value = "";
      document.getElementById('reg-confirmpassword').value = "";
      document.querySelector(".lakas").textContent = "";

  } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
  }
}

window.pasok = async function(){
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;

    try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const name = user.email;
        const picture = user.photoURL;
        
        sessionStorage.setItem("currentUser", name)
        sessionStorage.setItem("picture", picture)
        console.log(sessionStorage.getItem("currentUser"));
        console.log(sessionStorage.getItem("picture"));



        // Redirect or perform other actions upon successful login
        window.location.href = './includes/dashboard.html'; // Example of redirection

    } catch (error) {
        console.error("Error during login:", error);
        alert("No account found!!");
    }
}

function RegistrationAlert(){
  const login_reg = document.querySelector(".login-reg");


  const div = document.createElement("div");
  div.style.width = "500px";
  div.style.height = "100px";
  div.style.position = "absolute";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.backgroundColor = "#0D1117";
  div.style.border = "#F1E7CF solid 1px";
  div.style.fontSize = "24px";
  div.style.zIndex = "1";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.overflow = "hidden";
  div.textContent = "User Registration Successful! Please Login.";
  login_reg.appendChild(div);

  const glow = document.createElement("img");
  glow.style.position = "absolute";
  glow.style.top = "0";
  glow.src = "./includes/IMG/yellow glow registrationAlert.png";
  div.appendChild(glow);

  setTimeout(() => {
    if (login_reg.contains(div)) {
      login_reg.removeChild(div);
    }
  }, 5000);
}