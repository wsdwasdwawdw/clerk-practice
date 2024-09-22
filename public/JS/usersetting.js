import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6zhFT1FZyRnH8nybAT4ZPYBexHPqD5TM",
  authDomain: "capstone-8f915.firebaseapp.com",
  projectId: "capstone-8f915",
  storageBucket: "capstone-8f915.appspot.com",
  messagingSenderId: "193487820156",
  appId: "1:193487820156:web:707358816c42fb25d4c0f9",
  measurementId: "G-NN9YWS88J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
auth.languageCode = 'en';

let current;
// Initialize Firebase
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        console.log("User is signed in:", user);
        const email = document.querySelector(".email");
        const img = document.querySelector(".profile");
        
        email.textContent = user.email;
        const source = user.photoURL === null ? "./IMG/blank photo.png" :user.photoURL;

        img.src = source;
    } else {
        // No user is signed in.
        console.log("No user signed in.");
        window.location.href = "../index.html"; // Redirect to login if not signed in
    }
});

const newProfileInput = document.getElementById("newProfile");
let selectedFile = null; // Store the selected file here

newProfileInput.addEventListener("change", (event) => {
    event.stopPropagation();
    selectedFile = event.target.files[0]; // Get the first file selected
    
    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgElement = document.getElementById('chosenPic');
            imgElement.src = e.target.result; // Set the image source to the file's data URL
            imgElement.style.display = 'block'; // Show the image
        };

        reader.readAsDataURL(selectedFile); // Read the file as a data URL
    } else {
        // Hide the image if no file is selected
        document.getElementById('chosenPic').style.display = 'none';
    }

    const newProfileDisplay = document.querySelector(".newProfileDisplay");
    newProfileDisplay.classList.remove("tago"); // Make the display visible
});

const newProfileDisplay = document.querySelector(".newProfileDisplay");
newProfileDisplay.addEventListener("click", ()=>{
    newProfileDisplay.classList.add("tago");
});

const displayedPic = newProfileDisplay.querySelector(".inner")
displayedPic.addEventListener('click', (event)=>{
    event.stopPropagation();
});

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", async () => {
    if (selectedFile) {
        const user = auth.currentUser; // Get the current user

        if (user) {
            // Create a storage reference
            const storageRef = ref(storage, 'profilePictures/' + user.uid + '/' + selectedFile.name);

            try {
                // Upload the selected image to Firebase Storage
                await uploadBytes(storageRef, selectedFile);
                console.log('Image uploaded successfully');

                // Get the image URL from Firebase Storage
                const downloadURL = await getDownloadURL(storageRef);

                // Update the user's profile with the new photo URL
                await updateProfile(user, {
                    photoURL: downloadURL
                });

                console.log('User profile updated with new photo URL');

                // Optionally, display the updated profile picture on the screen
                document.querySelector('.profile').src = downloadURL;

                newProfileDisplay.classList.add("tago");
                

            } catch (error) {
                console.error('Error updating profile picture:', error);
                alert('Failed to update profile picture. Please try again.');
            }
        } else {
            alert('No user is signed in.');
        }
    } else {
        alert('Please select an image to upload.');
    }
});