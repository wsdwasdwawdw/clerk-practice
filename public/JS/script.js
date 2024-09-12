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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
  
const img = document.querySelector("img");

function hel(){
    console.log(img);
    /* db.collection("htmlFiles").add({    // Save content
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      project: projectData
  })
  .then((docRef) => {
      console.log(docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  }); */
}
// Select file input and image display element
const imageInput = document.getElementById('imageInput');
const imageDisplay = document.getElementById('imageDisplay');

if(!imageDisplay){
    imageDisplay.src = "../includes/IMG/blank photo.png";
}

// Function to upload the selected image
function uploadImage() {
    const file = imageInput.files[0]; // Get the selected file

    if (!file) {
        alert("No file selected!");
        return;
    }

    // Create a storage reference
    const storageRef = firebase.storage().ref(`images/${file.name}`);

    // Upload the file to Firebase storage
    const uploadTask = storageRef.put(file);

    // Monitor upload progress
    uploadTask.on('state_changed', 
        (snapshot) => {
            // Track progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            console.error('Upload failed:', error);
        }, 
        () => {
            // Upload successful, get download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                
                // Show the uploaded image in the HTML (optional)
                imageDisplay.src = downloadURL;
            });
        }
    );
    
}