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

        const deleteBtn = document.createElement("td");
        deleteBtn.classList.add(`delete${tracker}`, "deleteBtn");
        deleteBtn.textContent = "Delete";
        listItem.appendChild(deleteBtn);

        
        // Append the list item to the user list container
        userList.appendChild(listItem);


        tracker++;


        deleteBtn.addEventListener("click", ()=>{
          console.log(emailElement.textContent);
        });

        

     });
  })
  .catch(error =>{
    console.error('Error fetching file metadata:', error);
  });
}

/* document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.getElementById("users-table-body");

  getAllUsers().then(users => {
      users.forEach(user => {
          const row = document.createElement("tr");

          const uidCell = document.createElement("td");
          uidCell.textContent = user.uid;
          row.appendChild(uidCell);

          const emailCell = document.createElement("td");
          emailCell.textContent = user.email;
          row.appendChild(emailCell);

          const createdAtCell = document.createElement("td");
          createdAtCell.textContent = user.createdAt;
          row.appendChild(createdAtCell);

          const deleteBtn = document.createElement("td");
          deleteBtn.textContent = "Delete";
          row.appendChild(deleteBtn);
      });
  });
}); */