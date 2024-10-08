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
});


function Register(){
    login_reg.classList.remove("hide");
    regform.classList.remove("reg-form-hide");
    logform.classList.add("login-form-hide");
};

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

        p.style.display = "block";
        div.title = "Click to Close"

        rotation += 225;

        cross.style.transform = `rotate(${rotation}deg)`;
    });
});



regconfirmpassword.style.pointerEvents = "none";
regform.addEventListener("input", ()=>{

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

    }
    else {
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
logform.addEventListener("input",  ()=>{
    if(logemail.value.trim() === "" || logpassword.value.trim() === ""){
        loginBtn.style.pointerEvents = "none";
        loginBtn.style.opacity = ".5";
    }
    else{
        loginBtn.style.pointerEvents = "all";
        loginBtn.style.opacity = "1";
    }
});

sara.addEventListener("click", ()=>{
    const inputs = login_reg.querySelectorAll("input");
    inputs.forEach(input =>{
        input.value = "";
    });

    lakas.textContent = "";
    wehhhhh.textContent = "";

    login_reg.classList.add("hide");
});

const templates = document.querySelector(".templates");
const carousel = templates.querySelector(".carousel");
const imgs = carousel.querySelectorAll("img");
imgs.forEach(img =>{
    img.title = "Want to use this template?";
    
    img.addEventListener("click", ()=>{
        login_reg.classList.remove("hide");
    });
});


const homeSection = document.getElementById("home");
var items = homeSection.querySelectorAll('h1');
for (var i = 0, len = items.length; i < len; i++) {
(function(){
    var e = this
    , t = JSON.parse('["Create Seamlessly","Design Effortlessly","Build with SiteHustle"]')
    , r = function(e) {
    return parseInt(e, 10) || 0
    }
    , n = function(e) {
    return !!e
    }
    , o = function() {
    var o = e;
    o.innerHTML = '<span></span>';
    var c = parseInt('Infinity', 10)
    , s = {
        typeSpeed: r('60'),
        startDelay: r(''),
        backDelay: r('700'),
        backSpeed: r('50'),
        smartBackspace: n('true'),
        fadeOut: n(''),
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: r('900'),
        shuffle: n(''),
        loop: n('true'),
        loopCount: isNaN(c) ? 1 / 0 : c,
        showCursor: n('true'),
        cursorChar: '|',
        autoInsertCss: n('true'),
        bindInputFocusEvents: n(''),
        attr: '',
        contentType: 'html'
    };
    t && t.length && (s.strings = t),
        new Typed(o.children[0],s)
    };
    if (window.Typed)
    o();
    else {
    var c = document.createElement('script');
    c.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.11',
        c.onload = o,
        document.head.appendChild(c)
    }
}
    .bind(items[i]))();
}

let lastScrollTop = 0; // Track the last scroll position
const header = document.querySelector('header');
const body = document.body; // Select the body element
const scrollThreshold = 5; // Scroll threshold to avoid small movements

// Listen for scroll event on the document body
body.addEventListener('scroll', function() {
    let scrollTop = body.scrollTop || document.documentElement.scrollTop; // Get current scroll position

    // Check if the scroll movement is significant
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
        // Scrolling down: hide the header
        header.style.top = "-200px";
    } else {
        // Scrolling up: show the header
        header.style.top = "30px";
    }
    }

    lastScrollTop = scrollTop; // Update the last scroll position
});

const tutorialSection = document.querySelector(".tutorials");
const steps = tutorialSection.querySelectorAll("span");
const vid = tutorialSection.querySelector(".placement");
steps.forEach(span =>{
    
    span.addEventListener("click", ()=>{

        steps.forEach(span =>{
            span.style.border = "transparent solid 1px";
            span.style.backgroundColor = "transparent";
        });

        span.style.border = "#DB9D47 solid 1px";
        span.style.backgroundColor = "#222222";
        span.classList.add("selected");

        
        if(span.classList.contains("one")){
            vid.textContent = "Choosing a Template";
        }
        else if(span.classList.contains("two")){
            vid.textContent = "Add Blocks";

        }
        else if(span.classList.contains("three")){
            vid.textContent = "Customize it";

        }
        else if(span.classList.contains("four")){
            vid.textContent = "View and copy the Code";

        }
    });
});