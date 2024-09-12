

setTimeout(function() {
    var loadingScreen = document.getElementById('loading');
    loadingScreen.style.opacity = '0';

    setTimeout(function() {
        loadingScreen.style.display = 'none';
    }, 2000);
}, 2000);


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
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
let contents;

const tao = sessionStorage.getItem("currentUser");
let picture = sessionStorage.getItem("picture");
document.querySelector(".email").textContent = tao;
console.log(tao);
localStorage.setItem("pangSave", tao);
//console.log(sessionStorage.getItem("pangSave"))

if(picture === 'null'){
    picture = "./IMG/blank photo.png";
}

const user = document.querySelector(".user");
const arrow = document.querySelector(".dropDown");
const PP = document.querySelectorAll(".profile");

PP.forEach(profile => {
    profile.src = picture;
});


const shitsPa = document.querySelector(".shitsPa");
user.addEventListener("click", function(){
    if(!shitsPa.classList.contains("tago")){
        shitsPa.classList.add("tago");
        arrow.src = "./IMG/Expand Arrow down.png";
    }else{
        shitsPa.classList.remove("tago");
        arrow.src = "./IMG/Expand Arrow up.png";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const fileList = document.getElementById('fileList');
    const targetuser = tao;

    

    firestore.collection('htmlFiles').orderBy('createdAt', 'asc').get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const fileData = doc.data();

            if(fileData.email === targetuser){

                const listItem = document.createElement('div');
                listItem.style.position = "relative";
                listItem.style.height = "300px";
                listItem.style.width = "550px";
                listItem.style.borderRadius = "10px";
                listItem.style.overflow = "hidden";

                const img = document.createElement('img');
                img.style.display = "block";
                img.style.height = "auto";
                img.style.width = "100%";
                img.style.objectFit = "cover";
                img.src = fileData.screenshot;
                listItem.appendChild(img);

                const info = document.createElement("div");
                info.style.width = "100%";
                info.style.height = "70px";
                info.style.position = "absolute";
                info.style.display = "flex";
                info.style.alignItems = "center";
                info.style.bottom = "0";
                info.style.background = "#37383E";
                listItem.appendChild(info);

                const project = document.createElement("p");
                project.textContent = fileData.project;
                project.style.fontSize = "32px";
                project.style.color = "#ffffff";
                project.style.margin = "0 0 0 10%";
                project.style.fontWeight = "500";
                info.appendChild(project);


                // Create a delete button
                const deleteButton = document.createElement('img');
                deleteButton.src = './IMG/trash.png';
                deleteButton.style.position = "absolute";
                deleteButton.style.bottom = "18px";
                deleteButton.style.right = "30px";
                deleteButton.style.borderRadius = "50px";
                deleteButton.style.padding = "5px";
                deleteButton.style.backgroundColor = "#e92929";
                deleteButton.style.border = "none";
                info.appendChild(deleteButton);

                
                

                // Hover effect to change background color to red
                deleteButton.addEventListener('mouseover', function() {
                    deleteButton.style.cursor = "pointer";
                    deleteButton.style.opacity = ".5";
                });

                deleteButton.addEventListener('mouseout', function() {
                    deleteButton.style.opacity = "1";
                });

                deleteButton.addEventListener('click', function() {
                // Confirm before deleting
                    /* if (confirm(`Are you sure you want to delete the project: ${fileData.project}?`)) {
                        // Delete the document from Firestore
                        firestore.collection('htmlFiles').doc(doc.id).delete()
                        .then(() => {
                            console.log("Document successfully deleted!");
                            // Remove the item from the UI
                            fileList.removeChild(listItem);
                        }).catch(error => {
                            console.error("Error removing document: ", error);
                        });
                    } */

                    const alert = document.querySelector(".delete");
                    const projectName = document.querySelector(".project-name");

                    projectName.textContent = `Are you sure you want to delete the project: ${fileData.project}?`;
                    alert.classList.remove("tago");

                    document.querySelector(".confirm-delete").addEventListener("click", ()=>{
                        // Delete the document from Firestore
                        firestore.collection('htmlFiles').doc(doc.id).delete()
                        .then(() => {
                            console.log("Document successfully deleted!");
                            // Remove the item from the UI
                            fileList.removeChild(listItem);
                            alert.classList.add("tago");
                        }).catch(error => {
                            console.error("Error removing document: ", error);
                        });
                    })

                    document.querySelector(".cancel-delete").addEventListener("click", ()=>{
                        alert.classList.add("tago");
                    })
                });

                //listItem.appendChild(deleteButton);

                // Create a delete button
                const renameButton = document.createElement('img');
                renameButton.src = './IMG/rename.png';
                renameButton.style.position = "absolute";
                renameButton.style.bottom = "18px";
                renameButton.style.right = "90px";
                renameButton.style.borderRadius = "50px";
                renameButton.style.padding = "5px";
                renameButton.style.backgroundColor = "#ffffff";
                renameButton.style.border = "none";
                info.appendChild(renameButton);

                // Hover effect to change background color to red
                renameButton.addEventListener('mouseover', function() {
                    renameButton.style.cursor = "pointer";
                    renameButton.style.opacity = ".5";
                });

                renameButton.addEventListener('mouseout', function() {
                    renameButton.style.opacity = "1";
                });

                renameButton.addEventListener('click', function() {
                    const newName = document.querySelector(".newName");
                    const alert = document.querySelector(".rename");
                    const projectName = document.querySelector(".project-name");

                    projectName.textContent = `Are you sure you want to delete the project: ${fileData.project}?`;
                    alert.classList.remove("tago");

                    // When "confirm-rename" is clicked
                    document.querySelector(".confirm-rename").addEventListener("click", () => {
                         const newShit = newName.value;

                        if (newShit) {
                            // Update the document in Firestore with the new project name
                            firestore.collection('htmlFiles').doc(doc.id).update({
                                project: newShit // Assuming 'project' is the field holding the project name
                            })
                            .then(() => {
                                console.log("Document successfully renamed!");
                                project.textContent = newShit;
                                // Hide the alert dialog
                                alert.classList.add("tago");
                            })
                            .catch(error => {
                                console.error("Error renaming document: ", error);
                            });
                        } else {
                            console.error("New project name is empty.");
                        }
                    });

                    document.querySelector(".cancel-rename").addEventListener("click", ()=>{
                        alert.classList.add("tago");
                    })

                });


                //listItem.textContent = fileData.name;
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    // Log the content associated with the clicked name
                    console.log(fileData.name);
                    console.log('Content:', fileData.content);
                    contents = fileData.content;
                    const pD = fileData.projectData;
                    console.log(pD);
                    sessionStorage.setItem("name", fileData.project);
                    sessionStorage.setItem("laman", fileData.content);
                    sessionStorage.setItem("css", fileData.css);
                    sessionStorage.setItem("projectData", JSON.stringify(pD));
                    console.log(sessionStorage.getItem("name"));
                    console.log(sessionStorage.getItem("laman"));
                    console.log(sessionStorage.getItem("css"));
                    //sessionStorage.setItem('content', fileData.content);
                    window.open("../includes/savedEdits.html", "_blank");
                });
                fileList.appendChild(listItem);
            }
             
        });
    }).catch(error => {
        console.error('Error fetching file metadata:', error);
    });

});




const viewMore = document.querySelector('.viewMore');
const container = document.querySelector(".container");
const last = document.querySelector(".last");
const lastlast = document.querySelector(".lastlast");
viewMore.addEventListener("click", function(){
    

    if(last.textContent === "See More"){
        container.style.height = "auto";
        last.textContent = "See Less";
        lastlast.src = "../includes/IMG/Expand Arrow up.png";
    }
    else{
        container.style.height = "300px";
        last.textContent = "See More";
        lastlast.src = "../includes/IMG/Expand Arrow down.png";
    }
});

