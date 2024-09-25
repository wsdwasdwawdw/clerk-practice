const logshowhide = document.querySelector(".log-showhide");
const logpassword = document.getElementById("log-password");
const regshowhide = document.querySelector(".reg-showhidepassword");
const regpassword = document.getElementById("reg-password");
const regshowhideconfirmpassword = document.querySelector(".reg-showhideconfirmpassword");
const regconfirmpassword = document.getElementById("reg-confirmpassword");


const regform = document.querySelector(".reg-form");
const logform = document.querySelector(".login-form");

const sara = document.querySelector(".close");
const login_reg = document.querySelector(".login-reg");
const login = document.querySelector(".login");

const span = document.querySelectorAll(".logreg");

const input = login_reg.querySelectorAll("input");

let logtoggle = true;
let regtoggle = true;
let logreg = true;


login.addEventListener("click", ()=>{
    login_reg.classList.remove("hide");
});

function Login(){
    login_reg.classList.remove("hide");
    regform.classList.remove("reg-form-hide");
    logform.classList.add("login-form-hide");
}

logshowhide.addEventListener("click", ()=>{

    if(logtoggle){
        logpassword.type = "text";
        logshowhide.src = " ./includes/IMG/show.png";
        logtoggle = false;
    }
    else{
        logpassword.type = "password";
        logshowhide.src = "./includes/IMG/hide.png";
        logtoggle = true;
    }
});

regshowhide.addEventListener("click", ()=>{

    if(regpassword.type === "password"){
        regpassword.type = "text";
        regshowhide.src = "./includes/IMG/show.png";
    }
    else{
        regpassword.type = "password";
        regshowhide.src = "./includes/IMG/hide.png";
    }
});

regshowhideconfirmpassword.addEventListener("click", ()=>{

    if(regconfirmpassword.type === "password"){
        regconfirmpassword.type = "text";
        regshowhideconfirmpassword.src = "./includes/IMG/show.png";
    }
    else{
        regconfirmpassword.type = "password";
        regshowhideconfirmpassword.src = "./includes/IMG/hide.png";
    }
});

sara.addEventListener("click", ()=>{
    login_reg.classList.add("hide");
});

const lakas = document.querySelector(".lakas");
span.forEach(function(element) {
    element.addEventListener('click', function() {
        if(regform.classList.contains("reg-form-hide")){
            regform.classList.remove("reg-form-hide");
            logform.classList.add("login-form-hide");
            input.forEach(input => {
                input.value = '';
            });
            lakas.textContent = ""
        }
        else if(logform.classList.contains("login-form-hide")){
            regform.classList.add("reg-form-hide");
            logform.classList.remove("login-form-hide");
            input.forEach(input => {
                input.value = '';
            });
            lakas.textContent = "";
        }
    });
});




const faqs = document.querySelector('.FAQs');

// Select all div elements that are direct children of the section
const divs = faqs.querySelectorAll('.container');
const allP = faqs.querySelectorAll("p");

// Add an event listener to each div
divs.forEach((div, index) => {
    div.title = "Click to Expand";
    const p = div.querySelector("p");
    const cross = div.querySelector("img");
    let rotation = 0;

    div.addEventListener('click', () => {
        
        allP.forEach(p =>{
            p.style.display = "none";
        });

        if (p.style.display === 'block') {
            p.style.display = "none";
            div.title = "Click to Expand";
            
        } else {
            p.style.display = "block";
            div.title = "Click to Close"
            
        }
        rotation += 135;

        cross.style.transform = `rotate(${rotation}deg)`;
    });
});
const tutorial = faqs.querySelector(".Tutorial");
tutorial.addEventListener("click", (event)=>{
    event.stopPropagation();
    window.open("https://drive.google.com/file/d/1zKl_7WFkXRUqz1VBAXKPMM67Ao6Qpg51/view");
})



regconfirmpassword.style.pointerEvents = "none";
regpassword.addEventListener("input", ()=>{

    const laman = regpassword.value;
    const hasCapitalLetter = /[A-Z]/;
    const hasNumber = /[0-8]/;
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (laman === "") {
        // Handle the case when the input field is empty
        lakas.style.color = "";
        lakas.textContent = "";
        regconfirmpassword.style.pointerEvents = "none";
        regconfirmpassword.value = "";
    }else if (laman.length >= 8 && hasCapitalLetter.test(laman) && hasNumber.test(laman) && regex.test(laman)) {
        lakas.style.backgroundImage = "linear-gradient(to right, red, orange, yellow, green, aqua, #824bff, violet)";
        lakas.style.webkitBackgroundClip = 'text';
        lakas.style.backgroundClip = 'text';       // For future compatibility
        lakas.style.color = 'transparent';  
        lakas.textContent = "ULTRAINSTINCT";
        regconfirmpassword.style.pointerEvents = "";
    }else if (laman.length >= 8 && hasCapitalLetter.test(laman) && hasNumber.test(laman)) {
        lakas.style.color = "green";
        lakas.textContent = "SUPER STRONG";
        regconfirmpassword.style.pointerEvents = "";
    } else if (laman.length >= 8 && (hasCapitalLetter.test(laman) || hasNumber.test(laman))) {
        lakas.style.color = "yellow";
        lakas.textContent = "STRONG";
        regconfirmpassword.style.pointerEvents = "";
    } else if (laman.length >= 8) {
        lakas.style.color = "orange";
        lakas.textContent = "NORMAL";
        regconfirmpassword.style.pointerEvents = "";
    } else {
        lakas.style.color = "red";
        lakas.textContent = "WEAK";
        regconfirmpassword.style.pointerEvents = "none";
        regconfirmpassword.value = "";
    }

})

