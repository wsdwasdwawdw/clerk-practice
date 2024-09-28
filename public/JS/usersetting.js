import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, getDocs, collection, query, where, orderBy, Timestamp, deleteDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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
        const Profile = document.getElementById("profile");
        const email = Profile.querySelector(".email");
        const img = Profile.querySelector(".profile");
        
        email.textContent = user.email;
        const source = user.photoURL === null ? "./IMG/blank photo.png" :user.photoURL;

        img.src = source;

        const main = document.querySelector(".main");
        const content = main.querySelector(".content");
        const trashBin = content.querySelector("#trashbin");
        const fileList = trashBin.querySelector("#filelist");
        const targetuser = user.email;
    
        loadProjects(trashBin, fileList, targetuser);
        
    } else {
        // No user is signed in.
        console.log("No user signed in.");
        window.location.href = "../index.html"; // Redirect to login if not signed in
    }
});

const logo = document.querySelector(".logo");
logo.addEventListener("click", ()=>{
    window.location.href = "./dashboard.html";
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
                
                location.reload();
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



function loadProjects(ProjectsElement, fileList, targetuser) {
    // Access the 'htmlFiles' collection and query for the documents
    const htmlFilesRef = collection(db, 'htmlFiles');
    const q = query(htmlFilesRef, where("isTrashed", "==", true), orderBy("removedAt", "asc"));

    getDocs(q).then(querySnapshot => {
        fileList.innerHTML = ""; // Clear fileList before adding new items
        querySnapshot.forEach(doc => {
            const fileData = doc.data();
            const removedAt = fileData.removedAt;
            console.log("Project exists");
            const listItem = document.createElement('div');
            const img = document.createElement('img');
            const info = document.createElement("div");
            const project = document.createElement("p");

            if (fileData.email === targetuser  && fileData.isTrashed === true) {
                // Create new list item element
                
                listItem.className = "listItem";

                
                img.className = "img";
                img.src = fileData.screenshot;
                listItem.appendChild(img);

                
                info.className = "info";
                listItem.appendChild(info);

                
                project.className = "project";
                project.textContent = fileData.project;
                info.appendChild(project);

                /* const date = document.createElement("p");
                project.className = "date";
                project.textContent = fileData.removedAt;
                listItem.appendChild(date); */
                console.log(fileData.createdAt);

                fileList.appendChild(listItem);

                // Add delete and rename functionality
                
                RestoreButton(listItem, project, fileList, fileData, doc, info);
                DeleteButton(listItem, fileList, fileData, doc, info);

                // Attach list item-specific functionality
                // ListItem(listItem, fileData); 

            }
            if (removedAt instanceof Timestamp) {
                // Convert Firestore Timestamp to JavaScript Date
                const date = removedAt.toDate();
                // Format date to a readable string using `toLocaleString()`
                const formattedDate = date.toLocaleString();

                console.log("Removed At:", formattedDate); // Log the formatted date

                // Example: you can append the date to the DOM or display it in your UI
                const dateElement = document.createElement("p");
                dateElement.className = "date";
                dateElement.textContent = "Date removed: " + formattedDate;
                info.appendChild(dateElement);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching file metadata:', error);
    });
}

function RestoreButton(listItem, project, fileList, fileData, docs, info){
    // Create a rename button
    const restoreButton = document.createElement('img');
    restoreButton.className = "icon"
    restoreButton.src = './IMG/restore.svg';
    restoreButton.title = "Restore Project";
    restoreButton.style.position = "absolute";
    restoreButton.style.bottom = "15px";
    restoreButton.style.right = "90px";
    restoreButton.style.padding = "5px";
    info.appendChild(restoreButton);
 
    // Hover effect to change background color to red
    /* restoreButton.addEventListener('mouseover', function() {
        restoreButton.style.cursor = "pointer";
        restoreButton.style.opacity = ".5";
    });
    restoreButton.addEventListener('mouseout', function() {
        restoreButton.style.opacity = "1";
    }); */
    restoreButton.addEventListener('click', function(event) {
        event.stopPropagation();
        const restore = document.querySelector(".restore");
        const projectName = restore.querySelector(".project-name");

        projectName.textContent = `Are you sure you want to restore project: ${fileData.project}`;
        restore.classList.remove("tago");

        // Remove any previous event listener for confirm-rename
        const confirmRestoreButton = document.querySelector(".confirm-restore");
        const newConfirmRestoreButton = confirmRestoreButton.cloneNode(true);
        confirmRestoreButton.parentNode.replaceChild(newConfirmRestoreButton, confirmRestoreButton);
 
        // Add event listener for confirm-restore
        newConfirmRestoreButton.addEventListener("click", () => {
            

            const docRef = doc(db, 'htmlFiles', docs.id);

            // Update the document in Firestore using updateDoc
            updateDoc(docRef, {
                isTrashed: false,  // Assuming 'isTrashed' is the field for trashing
                createdAt: serverTimestamp()  // Add the server timestamp for 'removedAt'
            })
            .then(() => {
                console.log("Document successfully moved to trash!");

                // Remove the item from the UI
                if (listItem) {
                    fileList.removeChild(listItem);
                }

                // Hide the alert dialog
                if (restore) {
                    restore.classList.add("tago");
                }

                // You can uncomment and modify the following code if you need to update other elements like project name
                // project.textContent = newShit;
                // document.querySelector(".newName").value = "";

            })
            .catch(error => {
                console.error("Error updating document: ", error);
            });
        });
 
        document.querySelector(".cancel-restore").addEventListener("click", () => {
            restore.classList.add("tago");
        });
 
    });
 }
function DeleteButton(listItem, fileList, fileData, docs, info){
    // Create a delete button
    const deleteButton = document.createElement('img');
    deleteButton.classList = "icon";
    deleteButton.src = './IMG/remove forever.svg';
    deleteButton.title = "Delete Project";
    deleteButton.style.position = "absolute";
    deleteButton.style.bottom = "15px";
    deleteButton.style.right = "30px";
    deleteButton.style.padding = "5px";
    info.appendChild(deleteButton);

   // Hover effect to change background color to red
   /* deleteButton.addEventListener('mouseover', function() {
       deleteButton.style.cursor = "pointer";
       deleteButton.style.opacity = ".5";
   });
   deleteButton.addEventListener('mouseout', function() {
       deleteButton.style.opacity = "1";
   }); */
   deleteButton.addEventListener('click', function(event) {
       event.stopPropagation();
       const deleteShit = document.querySelector(".delete");
       const projectName = deleteShit.querySelector(".project-name");

       projectName.textContent = `"${fileData.project}" will be deleted forever and you won't be able to restore it.`;
       deleteShit.classList.remove("tago");

       // Remove any previous event listener for confirm-delete
       const confirmDeleteButton = document.querySelector(".confirm-delete");
       const newConfirmDeleteButton = confirmDeleteButton.cloneNode(true);
       confirmDeleteButton.parentNode.replaceChild(newConfirmDeleteButton, confirmDeleteButton);

       // Add event listener for confirm-delete
        newConfirmDeleteButton.addEventListener("click", async () => {
            try {
                const docId = docs.id; // Ensure you have the doc reference correctly defined
                console.log(docId);
                // Delete the document from Firestore using the correct method for Firebase 9+
                const docRef = doc(db, 'htmlFiles', docId);
                await deleteDoc(docRef);
        
                console.log("Document successfully deleted!");
        
                // Remove the item from the UI
                if (listItem) {
                    fileList.removeChild(listItem);
                }
        
                // Hide the alert after successful deletion
                if (deleteShit) {
                    deleteShit.classList.add("tago");
                }
        
            } catch (error) {
                console.error("Error removing document: ", error);
            }
        });
        
        // Event listener for cancel button
        document.querySelector(".cancel-delete").addEventListener("click", () => {
            if (deleteShit) {
                deleteShit.classList.add("tago");
            }
        });
   });
}

lipatlipat();
function lipatlipat(){
    const main = document.querySelector(".main");
    const side = main.querySelector(".side");
    const buttons = side.querySelectorAll("button");

    const content = main.querySelector(".content")
    const sections = content.querySelectorAll("section");
    const profileSection = content.querySelector("#profile");
    const trashbinSection = content.querySelector("#trashbin");
    const deleteSection = content.querySelector("#deleteaccount");
    const editProfilePicture = document.querySelector(".editProfilePicture");
    
    buttons.forEach(button =>{
    
        button.addEventListener("click", ()=>{
            buttons.forEach(button =>{
                button.classList.remove("selected");
            }); 

            sections.forEach(section =>{
                section.style.height = "0";
                section.style.visibility = "hidden";
            });

            button.classList.add("selected");

            const sectionToDisplay = content.querySelector(`#${button.classList[0]}`);
            sectionToDisplay.style.height = "100%";
            sectionToDisplay.style.visibility = "visible";

            //renderInfo();
        })
    })
}
deleteAccount();
function deleteAccount(){
    const deleteBtn = document.querySelector(".deleteBtn");
    const deleteAccountPopUp = document.querySelector(".deleteaccount-popup");
    const b1 = deleteAccountPopUp.querySelector(".b-1");
    const b2 = deleteAccountPopUp.querySelector(".b-2");

    deleteBtn.addEventListener("click", ()=>{
        deleteAccountPopUp.classList.remove("tago");
    });

    b1.addEventListener("click", ()=>{
        deleteAccountPopUp.classList.add("tago");
    });

    deleteAccountPopUp.addEventListener("input", ()=>{
        const i = deleteAccountPopUp.querySelector(".i");
        const c1 = deleteAccountPopUp.querySelector(".c-1");
        const c2 = deleteAccountPopUp.querySelector(".c-2");

        if(i.value === "DELETE" && c1.checked && c2.checked){
            b2.style.opacity = "1";
            b2.style.pointerEvents = "";
        }
        else{
            b2.style.opacity = ".5";
            b2.style.pointerEvents = "none";
        }
    });
}