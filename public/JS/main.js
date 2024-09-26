const logshowhide = document.querySelector(".log-showhide");
const logemail = document.getElementById("log-email");
const logpassword = document.getElementById("log-password");
const regshowhide = document.querySelector(".reg-showhidepassword");
const regpassword = document.getElementById("reg-password");
const regshowhideconfirmpassword = document.querySelector(".reg-showhideconfirmpassword");
const regconfirmpassword = document.getElementById("reg-confirmpassword");


const regform = document.querySelector(".reg-form");
const logform = document.querySelector(".login-form");

const sara = document.querySelector(".close");
const login_reg = document.querySelector(".login-reg");
const login = document.querySelectorAll(".login");

const span = document.querySelectorAll(".logreg");

const input = login_reg.querySelectorAll("input");

let logtoggle = true;
let regtoggle = true;
let logreg = true;


login.forEach(login =>{
    login.addEventListener("click", ()=>{
        login_reg.classList.remove("hide");
    });
})


function Register(){
    login_reg.classList.remove("hide");
    regform.classList.remove("reg-form-hide");
    logform.classList.add("login-form-hide");
}

const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burgerMenu");
burger.addEventListener("click", ()=>{
    
    
    burgerMenu.style.right = "0";
});
const burgerClose = document.querySelector(".burgerClose");
burgerClose.addEventListener("click", ()=>{
    burgerMenu.style.right = "-200px";
});

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
const wehhhhh = document.querySelector(".wehhhhh");
span.forEach(function(element) {
    element.addEventListener('click', function() {
        if(regform.classList.contains("reg-form-hide")){
            regform.classList.remove("reg-form-hide");
            logform.classList.add("login-form-hide");
            input.forEach(input => {
                input.value = '';
            });
            lakas.textContent = "";
            wehhhhh.textContent = "";
        }
        else if(logform.classList.contains("login-form-hide")){
            regform.classList.add("reg-form-hide");
            logform.classList.remove("login-form-hide");
            input.forEach(input => {
                input.value = '';
            });
            lakas.textContent = "";
            wehhhhh.textContent = "";
        }
    });
});

/* const rememberUser = document.getElementById("remember");
rememberUser.value = "off";
rememberUser.addEventListener("click", ()=>{
    if(rememberUser.value === "on"){
        
        const user ={
            username: logemail,
            password: logpassword
        }
        localStorage.setItem("remember", user);
        localStorage.setItem("toggled", "on")
        rememberUser.value = "off";
        console.log(rememberUser.value);
    }
    else{
        const user ={
            username: "",
            password: ''
        }
        localStorage.setItem("remember", user);
        rememberUser.value = "on"
        console.log(rememberUser.value);
    }
});
 */

const faqs = document.querySelector('.FAQs');

// Select all div elements that are direct children of the section
const divs = faqs.querySelectorAll('.container');
const allP = faqs.querySelectorAll("p");
const allImg = faqs.querySelectorAll("img");

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

        allImg.forEach(img =>{  
            rotation = 0;
            img.style.transform = "rotate(0deg)"
        });

        if (p.style.display === 'block') {
            p.style.display = "none";
            div.title = "Click to Expand";
            
        } else {
            p.style.display = "block";
            div.title = "Click to Close"
            
        }
        rotation += 225;

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
    const hasNumber = /[0-9]/;
    const regex = /[!@#$%^&*(),.?":{}|<>]/;

    if (laman === "") {
        // Handle the case when the input field is empty
        lakas.style.color = "";
        lakas.textContent = "";
        regconfirmpassword.value = "";
        regconfirmpassword.style.pointerEvents = "none";
    }else if (laman.length >= 8 && hasCapitalLetter.test(laman) && hasNumber.test(laman) && regex.test(laman)) {     // For future compatibility
        lakas.style.color = 'green';  
        lakas.textContent = "VERY STRONG";
        regconfirmpassword.style.pointerEvents = "";
    } else if (laman.length >= 8 && hasCapitalLetter.test(laman) && hasNumber.test(laman)) {
        lakas.style.color = "yellow";
        lakas.textContent = "STRONG";
        regconfirmpassword.style.pointerEvents = "";

    }/* else if (laman.length >= 8 && (hasCapitalLetter.test(laman) || hasNumber.test(laman))) {
        lakas.style.color = "yellow";
        lakas.textContent = "STRONG";
        regconfirmpassword.style.pointerEvents = "";
    } else if (laman.length >= 8) {
        lakas.style.color = "orange";
        lakas.textContent = "NORMAL";
        regconfirmpassword.style.pointerEvents = "";
    }  */else {
        lakas.style.color = "red";
        lakas.textContent = "WEAK";
        regconfirmpassword.style.pointerEvents = "none";
        regconfirmpassword.value = "";
    }

});


const regBtn = document.getElementById("register");
regconfirmpassword.addEventListener("input", ()=>{
    if(regconfirmpassword.value != regpassword.value){
        wehhhhh.textContent = "Passwords don't match";
        wehhhhh.style.color = "red";
        wehhhhh.style.fontSize = "13px";
        wehhhhh.style.position = "relative";
        wehhhhh.style.opacity = "1";
        wehhhhh.style.zIndex = "1";

        regBtn.style.pointerEvents = "none";
        regBtn.style.opacity = ".5";
    }else{
        wehhhhh.textContent = "Passwords matched";
        wehhhhh.style.color = "green";
        wehhhhh.style.fontSize = "13px";
        wehhhhh.style.position = "relative";
        wehhhhh.style.opacity = "1";
        wehhhhh.style.zIndex = "1";

        regBtn.style.pointerEvents = "all";
        regBtn.style.opacity = "1";

        regBtn.addEventListener("mouseenter", ()=>{
            regBtn.style.opacity = ".5";
        });
        regBtn.addEventListener("mouseout", ()=>{
            regBtn.style.opacity = "1";
        });
    }
});

const loginBtn = document.getElementById("login");
logpassword.addEventListener("input",  ()=>{
    if(logemail.value.trim() === "" || logpassword.value.trim() === ""){
        loginBtn.style.pointerEvents = "none";
        loginBtn.style.opacity = ".5";
    }
    else{
        loginBtn.style.pointerEvents = "all";
        loginBtn.style.opacity = "1";
    }
});