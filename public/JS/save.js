
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
firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const storage = firebase.storage();

    
  // Function to save content to Firebase
function saveToFirebase() {
    //const contentToSave = document.querySelector('#gjs').innerHTML;


    // Get the content of the #gjs element
    const contentToSave = document.querySelector('.editor-canvas').innerHTML;
    //console.log("Content to save:", contentToSave);
    sessionStorage.setItem('savedContent', contentToSave);
    //console.log(sessionStorage.getItem("savedContent"));
    console.log("Content saved to sessionStorage.");


    const Name = document.getElementById("name").value;

    // Save content to Firestore
    db.collection("htmlFiles").add({
        content: contentToSave,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: Name
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log(contentToSave);
        document.getElementById("name").value = "";
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    html2canvas(document.querySelector(".editor-canvas")).then(canvas => {
        // Append the screenshot to the body or save it as an image
        document.body.appendChild(canvas);

        // Or save it as an image
        let link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}


/* firebase.initializeApp(firebaseConfig);

document.getElementById('save').addEventListener('click', function() {
    // Get the current HTML content
    const htmlContent = document.documentElement.outerHTML;
    const Name = document.getElementById("name").value;
    // Create a blob of the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a reference to 'html_files/file_name.html' in Firebase Storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child('html_files/grapes.html');

    // Upload the file to Firebase Storage
    fileRef.put(blob).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        // Save the file metadata in Firestore
        return firestore.collection('htmlFiles').add({
            name: Name,
            url: downloadURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }).then(() => {
        console.log('File saved successfully!');
    }).catch(error => {
        console.error('Error saving file:', error);
    });
});  */