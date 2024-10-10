// Import the functions you need from the SDKs you need
/* import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth , signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"; */

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

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
    

// Initialize Firebase Authentication
const auth = firebase.auth(app);
const provider = new firebase.auth.GoogleAuthProvider();
auth.languageCode = 'en';

// Initialize Firestore
const db = firebase.firestore(app);

// Initialize Firebase Storage
const storage = firebase.storage(app);

auth.languageCode = 'en';

auth.onAuthStateChanged((user) =>{
  console.log(user);
});
const google = document.getElementById("google");
google.addEventListener("click", () => {
  // Ensure you're using the initialized `auth` and `provider`
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      
      const credential = result.credential;
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      const name = user.email;
      const picture = user.photoURL;

      // Redirect to the dashboard
      window.location.href = "./includes/dashboard.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      // Optional: Display error message to the user
      console.error("Error during sign-in: ", errorCode, errorMessage, email);
    });
});


const Guest = document.getElementById("guest");
Guest.addEventListener("click", ()=>{
  window.location.href = "./includes/guest.html";
});

/* REGISTRATION SHITS */
function register() {

  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirmpassword').value;

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }
  try {
  
    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;

    // Send email verification
    user.sendEmailVerification().then(() => {
      console.log("Verification email sent!");

      // Save additional user data in Firestore
      return firebase.firestore().collection("users").doc(user.uid).set({
        emailVerified: user.emailVerified, // Track if the email is verified
        email: user.email,
        createdAt: new Date(),
      });
      }).then(() => {
        console.log("User data saved in Firestore!");

        const message = "User Registration Successful! Please check you email for the verification link.";
        Alert(message);

        // Clear input fields
        document.getElementById('reg-email').value = "";
        document.getElementById('reg-password').value = "";
        document.getElementById('reg-confirmpassword').value = "";
        document.querySelector(".lakas").textContent = "";
        document.querySelector(".wehhhhh").textContent = "";
        
      }).catch((error) => {
        console.error(error);
        const message = "Error saving user data or sending verification email.";
        Alert(message);
      });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    const message = "Email address is badly formatted";
    Alert(message);
  });
  
  
  

  } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
  }
}

function pasok(){
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;

    // Sign in the user with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed in successfully
      var user = userCredential.user;

      // Ensure email is verified before redirecting to dashboard
      if (user.emailVerified) {
        // Redirect or perform other actions upon successful login
        window.location.href = './includes/dashboard.html'; // Example of redirection
      } else {
        const message = "Please verify your email before logging in.";
        Alert(message);
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error during login:", errorMessage);
      
      const message = "No account found or login failed.";
      Alert(message);
    });

    
}


function Alert(message){
  const login_reg = document.querySelector(".login-reg");


  const div = document.createElement("div");
  div.style.width = "500px";
  div.style.height = "100px";
  div.style.position = "absolute";
  div.style.padding = "20px";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.backgroundColor = "#10151D";
  div.style.border = "#F1E7CF solid 1px";
  div.style.borderRadius = "15px";
  div.style.fontSize = "24px";
  div.style.textAlign = "center";
  div.style.zIndex = "1";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.overflow = "hidden";
  div.style.opacity = "0";
  div.style.transition = ".5s ease";
  div.textContent = message;
  login_reg.appendChild(div);

  const glow = document.createElement("img");
  glow.style.position = "absolute";
  glow.style.top = "0";
  glow.style.left = "0";
  glow.src = "./includes/IMG/alert glow.png";
  div.appendChild(glow);

  setTimeout(() => {
    div.style.opacity = '1';
  }, 500);
  
  // After 5 seconds, fade out the element
  setTimeout(() => {
    div.style.opacity = '0';
    
    // Once opacity is 0 (i.e., faded out), remove the element after transition
    setTimeout(() => {
      if (login_reg.contains(div)) {
        login_reg.removeChild(div);
      }
    }, 1000);  // Wait for the fade-out transition (1 second)
  }, 3000);
}