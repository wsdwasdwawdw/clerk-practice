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

        const actionBtn = document.createElement("td");
        if(status === "Approved"){
          actionBtn.classList.add(`action${tracker}`, "actionBtn");
          actionBtn.textContent = "Delete";
        }
        else{
          actionBtn.classList.add(`action${tracker}`, "actionBtn");
          actionBtn.textContent = "Approve";
        }
        listItem.appendChild(actionBtn);

        
        // Append the list item to the user list container
        userList.appendChild(listItem);


        tracker++;

        deleteAccount(actionBtn, emailElement, uidElement);
        approveAccount(actionBtn, emailElement, uidElement);
        
     });
  })
  .catch(error =>{
    console.error('Error fetching file metadata:', error);
  });
}

function deleteAccount(actionBtn, emailElement, uidElement){
  const user = emailElement.textContent;

  if (actionBtn.textContent === "Delete") {
      actionBtn.addEventListener("click", ()=>{
          var userId = uidElement.textContent;
        
          //console.log(user);
          //console.log(userId);
          // First, delete the user's document from Firestore
          var userDocRef = db.collection("users").doc(userId);
          userDocRef.delete().then(function() {
            console.log('User document deleted from Firestore');
            location.reload();
          }).catch(function(error) {
            console.error('Error deleting user document:', error);
          });
      });
    } else {
      console.log('No user is signed in.');
    }
}

function approveAccount(actionBtn, emailElement, uidElement){
  actionBtn.addEventListener('click', function() {
    // Check if the action button text is "Approve"
    if (actionBtn.textContent === "Approve") {
      const uid = uidElement.textContent;  // Get the UID of the user
      
      // Update the status field in Firestore
      db.collection("users").doc(uid).update({
        status: "Approved",
      })
      .then(() => {
        console.log("Account approved successfully!");

        // Optionally, update the button text and style after approving
        //actionBtn.textContent = "Delete";
        location.reload();
      })
      .catch(error => {
        console.error("Error updating account status:", error);
      });
    }
  });
}

const back = document.querySelector(".back");
back.addEventListener("click", ()=>{
  window.location.href = "../index.html";
});