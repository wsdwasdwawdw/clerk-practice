const firebaseConfig = {
  apiKey: "AIzaSyD6zhFT1FZyRnH8nybAT4ZPYBexHPqD5TM",
  authDomain: "capstone-8f915.firebaseapp.com",
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

auth.onAuthStateChanged((user) => {
  
  
});

loadContent();
function loadContent(){

  const userList = document.getElementById('users-table-body');

  let tracker = 1;
  db.collection("users").get()
  .then(querySnapshot =>{
     querySnapshot.forEach(doc => {

        const fileData = doc.data();
        const uid = doc.id;

        const date = fileData.createdAt;
        const dateFormat = date.toDate();
        const dateFinal = dateFormat.toLocaleString();

        const type = fileData.type;
        const status = fileData.status;
        // Create a new user item (similar to how you do it for projects)
        const listItem = document.createElement('tr');
        listItem.className = `listItem${tracker}`;  // Add a class for styling

        // User UID
        const uidElement = document.createElement('td');
        uidElement.className = `user-uid${tracker}`;
        uidElement.textContent = uid;  // Display UID
        listItem.appendChild(uidElement);
        
        // User Email
        const emailElement = document.createElement('td');
        emailElement.className = `user-email${tracker}`;
        emailElement.textContent = fileData.email;  // Display email
        listItem.appendChild(emailElement);

        const createdAt = document.createElement('td');
        createdAt.className = `createdAt${tracker}`;
        createdAt.textContent = dateFinal;  // Display UID
        listItem.appendChild(createdAt);

        const typeElement = document.createElement('td');
        typeElement.className = `type${tracker}`;
        typeElement.textContent = type;  // Display UID
        listItem.appendChild(typeElement);

        const statusElement = document.createElement('td');
        statusElement.className = `status${tracker}`;
        statusElement.textContent = status;  // Display UID
        listItem.appendChild(statusElement);

        const deleteBtn = document.createElement("td");
        deleteBtn.classList.add(`delete${tracker}`, "deleteBtn");
        deleteBtn.textContent = "Delete";
        listItem.appendChild(deleteBtn);

        
        // Append the list item to the user list container
        userList.appendChild(listItem);


        tracker++;

        deleteAccount(deleteBtn, emailElement, uidElement);
        
     });
  })
  .catch(error =>{
    console.error('Error fetching file metadata:', error);
  });
}

function deleteAccount(deleteBtn, emailElement, uidElement){
  const user = emailElement.textContent;

  if (user) {
      deleteBtn.addEventListener("click", ()=>{
          var userId = uidElement.textContent;
        
          //console.log(user);
          //console.log(userId);
          // First, delete the user's document from Firestore
          var userDocRef = db.collection("users").doc(userId);
          userDocRef.delete().then(function() {
            console.log('User document deleted from Firestore');
            location.reload();
            
            // Now delete the user from Authentication
            user.delete().then(function() {
              console.log('User deleted from Authentication');
              
            }).catch(function(error) {
              console.error('Error deleting user:', error);
            });
        
          }).catch(function(error) {
            console.error('Error deleting user document:', error);
          });
      });
    } else {
      console.log('No user is signed in.');
    }
}