
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
let tracker = "grid";

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
    const ProjectsElement = document.querySelector(".projects");
    const fileList = ProjectsElement.querySelector('#fileList');
    const sort = ProjectsElement.querySelector(".sort");
    const targetuser = tao;
    let first = "createdAt", second = "asc";

    
    
    sort.addEventListener("change", ()=>{
        
        if(sort.value === "A-Z"){
            console.log("Alphabetical");
            first = "project";
            second = "asc";
            loadProjects(ProjectsElement, fileList, targetuser, first, second);
        }
        else if(sort.value === "Z-A"){
            console.log("Reverse Alphabetical");
            first = "project";
            second = "desc";
            loadProjects(ProjectsElement, fileList, targetuser, first, second);
            
        }
        else if(sort.value === "Newest"){
            console.log("Newest");
            first = "createdAt";
            second = "desc";
            loadProjects(ProjectsElement, fileList, targetuser, first, second);
            
        }
        else {
            console.log("Oldest");
            first = "createdAt";
            second = "asc";
            loadProjects(ProjectsElement, fileList, targetuser, first, second);
            
        }

        
    })
    
    sort.dispatchEvent(new Event('change'));

    GridList();
});


ViewMore();

function loadProjects(ProjectsElement, fileList, targetuser, first, second) {
    // Firestore query with dynamic ordering
    firestore.collection('htmlFiles').orderBy(first, second).get()
        .then(querySnapshot => {
            fileList.innerHTML = ""; // Clear fileList before adding new items
            querySnapshot.forEach(doc => {
                const fileData = doc.data();

                // Check if the document's email matches the target user
                if (fileData.email === targetuser) {

                    // Create new list item element
                    const listItem = document.createElement('div');
                    listItem.className = tracker === "grid" ? "listItem" : "listItem listItem-List";

                    const img = document.createElement('img');
                    img.className = tracker === "grid" ? "img" : "img img-List"
                    img.src = fileData.screenshot;
                    listItem.appendChild(img);

                    const info = document.createElement("div");
                    info.className = tracker === "grid" ? "info" : "info info-List"
                    listItem.appendChild(info);

                    const project = document.createElement("p");
                    project.className = tracker === "grid" ? "project" : "project project-List"
                    project.textContent = fileData.project;
                    listItem.appendChild(project);

                    const icon = document.createElement("img");
                    icon.className = tracker === "grid" ? "icon" : "icon icon-List"
                    icon.src = "./IMG/s.png";
                    listItem.appendChild(icon);

                    fileList.appendChild(listItem);

                    // Add delete and rename functionality
                    DeleteButton(listItem, fileList, fileData, doc);
                    RenameButton(listItem, project, fileList, fileData, doc);

                    // Attach list item-specific functionality
                    ListItem(listItem, fileData);

                    
                }
            });
        })
        .catch(error => {
            console.error('Error fetching file metadata:', error);
        });
}

function ViewMore(){
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

}

function GridList(){
    document.querySelector(".main").addEventListener("click", ()=>{
        const main = document.querySelector(".main");
        const bg = main.querySelector(".bg");
        const grid = main.querySelector(".grids");
        const list = main.querySelector(".lists");

        const listItem = fileList.querySelectorAll(".listItem");
        const img = fileList.querySelectorAll(".img");
        const project = fileList.querySelectorAll('.project');
        const icon = fileList.querySelectorAll(".icon");
        const info = fileList.querySelectorAll(".info");

        if (main.classList.contains("grids")) {
            bg.style.left = "50px"; // Move to the right
            bg.style.borderRadius = "0 5px 5px 0";
            grid.style.fill = "black";  // Change grid icon fill to black
            list.style.fill = "white"; // Change list icon fill to yellow
            main.classList.remove("grids");

            fileList.classList.add("list");
            fileList.classList.remove("grid");
            console.log("is list");

            
            listItem.forEach(item => {
                //item.style.height = "70px";
                //item.style.width = "100%";
                item.classList.add("listItem-List");
            })
            
            img.forEach(item => {
                //item.style.visibility = "hidden";
                item.classList.add("img-List");
            })

            info.forEach(item =>{
                //item.style.opacity = "0.3";
                item.classList.add("info-List");
            })

            project.forEach(item => {
                //item.style.left = "100px";
                item.classList.add("project-List");
            })

            icon.forEach(item => {
                //item.style.display = "block";
                item.classList.add("icon-List");
            })

            console.log(tracker = "list");
        } 
        else {
            bg.style.left = "1px";     // Move to the left
            bg.style.borderRadius = "5px 0 0 5px";
            grid.style.fill = "white"; // Change grid icon fill to yellow
            list.style.fill = "black";  // Change list icon fill to black
            main.classList.add("grids");

            fileList.classList.add("grid");
            fileList.classList.remove("list");
            console.log("is grid");

            listItem.forEach(item => {
                /* item.style.height = "340px";
                item.style.width = "550px"; */
                item.classList.remove("listItem-List");
            })
            
            
            img.forEach(item => {
                /* item.style.visibility = "visible"; */
                item.classList.remove("img-List");
            })

            info.forEach(item =>{
                //item.style.opacity = "1";
                item.classList.remove("info-List");
            })

            project.forEach(item => {
                //item.style.left = "15px";
                item.classList.remove("project-List");
            })

            icon.forEach(item => {
                //item.style.display = "none";
                item.classList.remove("icon-List");
            })
            console.log(tracker = "grid");
        }
        //console.log(listItem);
    });
}

function DeleteButton(listItem, fileList, fileData, doc){
     // Create a delete button
     const deleteButton = document.createElement('img');
     deleteButton.src = './IMG/trash.png';
     deleteButton.style.position = "absolute";
     deleteButton.style.bottom = "15px";
     deleteButton.style.right = "30px";
     deleteButton.style.padding = "5px";
     listItem.appendChild(deleteButton);

    // Hover effect to change background color to red
    deleteButton.addEventListener('mouseover', function() {
        deleteButton.style.cursor = "pointer";
        deleteButton.style.opacity = ".5";
    });
    deleteButton.addEventListener('mouseout', function() {
        deleteButton.style.opacity = "1";
    });
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        const alert = document.querySelector(".delete");
        const projectName = document.querySelector(".project-name");

        projectName.textContent = `Are you sure you want to delete the project: ${fileData.project}?`;
        alert.classList.remove("tago");

        // Remove any previous event listener for confirm-delete
        const confirmDeleteButton = document.querySelector(".confirm-delete");
        const newConfirmDeleteButton = confirmDeleteButton.cloneNode(true);
        confirmDeleteButton.parentNode.replaceChild(newConfirmDeleteButton, confirmDeleteButton);

        // Add event listener for confirm-delete
        newConfirmDeleteButton.addEventListener("click", () => {
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
        });

        // Add event listener for cancel-delete
        document.querySelector(".cancel-delete").addEventListener("click", () => {
            alert.classList.add("tago");
        });
    });
}

function RenameButton(listItem, project, fileList, fileData, doc){
    // Create a rename button
    const renameButton = document.createElement('img');
    renameButton.src = './IMG/rename.png';
    renameButton.style.position = "absolute";
    renameButton.style.bottom = "15px";
    renameButton.style.right = "90px";
    renameButton.style.padding = "5px";
    listItem.appendChild(renameButton);

    // Hover effect to change background color to red
    renameButton.addEventListener('mouseover', function() {
        renameButton.style.cursor = "pointer";
        renameButton.style.opacity = ".5";
    });
    renameButton.addEventListener('mouseout', function() {
        renameButton.style.opacity = "1";
    });
    renameButton.addEventListener('click', function(event) {
        event.stopPropagation();
        const newNameInput = document.querySelector(".newName");
        const alert = document.querySelector(".rename");
        alert.classList.remove("tago");

        // Remove any previous event listener for confirm-rename
        const confirmRenameButton = document.querySelector(".confirm-rename");
        const newConfirmRenameButton = confirmRenameButton.cloneNode(true);
        confirmRenameButton.parentNode.replaceChild(newConfirmRenameButton, confirmRenameButton);

        // Add event listener for confirm-rename
        newConfirmRenameButton.addEventListener("click", () => {
            const newShit = newNameInput.value;

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
                    document.querySelector(".newName").value = "";
                })
                .catch(error => {
                    console.error("Error renaming document: ", error);
                });
            } else {
                console.error("New project name is empty.");
            }
        });

        document.querySelector(".cancel-rename").addEventListener("click", () => {
            alert.classList.add("tago");
            document.querySelector(".newName").value = "";
        });

    });
}

function ListItem(listItem, fileData){
    listItem.addEventListener("mouseover", ()=>{
        listItem.style.border = "green solid 2px";
    })
    listItem.addEventListener("mouseout", ()=>{
        listItem.style.border = "grey solid 2px";
    })
    listItem.addEventListener('click', function() {
        // Log the content associated with the clicked name
        console.log(fileData.name);
        //console.log('Content:', fileData.content);
        contents = fileData.content;
        const pD = fileData.projectData;
        console.log(pD);
        sessionStorage.setItem("name", fileData.project);
        //sessionStorage.setItem("laman", fileData.content);
        //sessionStorage.setItem("css", fileData.css);
        sessionStorage.setItem("projectData", JSON.stringify(pD));
        console.log(sessionStorage.getItem("name"));
        //console.log(sessionStorage.getItem("laman"));
        //console.log(sessionStorage.getItem("css"));
        //sessionStorage.setItem('content', fileData.content);
        window.open("../includes/savedEdits.html", "_blank");
    });
}

