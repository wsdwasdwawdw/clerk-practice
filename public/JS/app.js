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
  if(user){
    localStorage.setItem("loggedIn", true);
    console.log("true");
  }
  else{
    localStorage.setItem("loggedIn", false);
    console.log("false");
  }
  
  console.log(localStorage.getItem("loggedIn"));
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
      const uid = user.uid;
      const email = user.email;
      const picture = user.photoURL;
      const createdAt = new Date();
      
      // Reference to the Firestore users collection
      const userRef = firebase.firestore().collection("users").doc(uid);

      // Check if the user exists in Firestore and if not, add their details
      userRef.get()
        .then((docSnapshot) => {
          if (!docSnapshot.exists) {
            // User is new, save their data to Firestore
            return userRef.set({
              email: email,
              uid: uid,
              createdAt: createdAt,
              type: "Google",  // Sign-in type is "google"
              status: "Approved",
              photoURL: picture
            }).then(() => {
              console.log("User data saved to Firestore");
              // Redirect to the dashboard after saving data
              window.location.href = "./includes/dashboard.html";
            });
          } else {
            // User already exists, just redirect to the dashboard
            window.location.href = "./includes/dashboard.html";
          }
        })
        .catch((error) => {
          console.error("Error checking user existence or saving data: ", error);
        });
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
  
        // Save additional user data in Firestore including the UID
        return firebase.firestore().collection("users").doc(user.uid).set({
          uid: user.uid,
          emailVerified: user.emailVerified, 
          email: user.email,
          createdAt: new Date(),
          type: "Registered",
          status: "Pending",
        });
      }).then(() => {
        console.log("User data saved in Firestore!");
  
        const message = "User Registration Successful! Please check your email for the verification link.";
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
      
      // Custom message for badly formatted email or other errors
      const message = errorCode === 'auth/invalid-email' ? 
          "Email address is badly formatted" : errorMessage;
      Alert(message);
    });
  
  
  
  

  } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
  }
}

const login = document.querySelectorAll(".login");
login.forEach(login =>{
  login.addEventListener("click", ()=>{
    const hasUser = JSON.parse(localStorage.getItem("loggedIn"));  

    const user = firebase.auth().currentUser;

    if (user) {
      // The user is logged in. Now fetch custom fields from Firestore
      const userId = user.uid;

      // Fetch user data from Firestore
      db.collection("users").doc(userId).get()
        .then(doc => {
          if (doc.exists) {
            const userData = doc.data();

            // Now you have access to custom fields like status and type
            const status = userData.status;
            const type = userData.type;

            console.log("User data:", userData);

            // Do something with the status and type, e.g., redirect
            if (status === "Approved") {
              // Redirect to dashboard if approved
              setTimeout(() => {
                window.location.href = './includes/dashboard.html';
              }, 3000);
            } else {
              login_reg.classList.remove("hide");
              console.log("User is not approved yet.");
            }
          } else {
            console.error("No such document!");
          }
        })
        .catch(error => {
          console.error("Error fetching user document:", error);
        });
    } else {
      // If no user is logged in, show login/register modal
      login_reg.classList.remove("hide");
    }
  });
});


document.addEventListener('keydown', function(event) {

  const email = document.getElementById('log-email').value;
  const password = document.getElementById('log-password').value;

  if (event.key === 'Enter') {

    if(email.trim() != "" && password.trim() != ""){
      pasok();
    }
    else{
      console.log("walang laman");
    }

  }
});

function pasok(){
    
  const email = document.getElementById('log-email').value;
  const password = document.getElementById('log-password').value;

  if(email === "admin" && password === "admin") {
    window.location.href = "./includes/admin.html";
  } else {
    // Sign in the user with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        var user = userCredential.user;

        // Ensure the user is signed in and email is verified
        if (user && user.emailVerified) {
          // Fetch the custom user info from Firestore using the UID
          const uid = user.uid;
          db.collection("users").doc(uid).get()
            .then((doc) => {
              if (doc.exists) {
                const userData = doc.data();

                // Now check if the user is approved
                if (userData.status === "Approved") {
                  // Delay redirection by 5 seconds (or less than 10 seconds as you prefer)
                  console.log("User is approved. Redirecting to dashboard in 5 seconds...");
                  setTimeout(() => {
                    window.location.href = './includes/dashboard.html';
                  }, 3000);  // 5000 milliseconds = 5 seconds
                } else {
                  const message = "Admin is yet to approve your account.";
                  Alert(message);  // Replace with your custom alert function
                }
              } else {
                const message = "User document not found in Firestore.";
                Alert(message);  // Replace with your custom alert function
              }
            })
            .catch((error) => {
              console.error("Error fetching user data from Firestore:", error);
              const message = "Error fetching user data.";
              Alert(message);  // Replace with your custom alert function
            });
        } else {
          const message = "Email not verified. Please verify your email first.";
          Alert(message);  // Replace with your custom alert function
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error during login:", errorMessage);

        const message = "No account found or login failed.";
        Alert(message);  // Replace with your custom alert function
      });
  }

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