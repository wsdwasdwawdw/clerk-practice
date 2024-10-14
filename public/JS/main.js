

const logshowhide = document.querySelector(".log-showhide");
const logemail = document.getElementById("log-email");
const logpassword = document.getElementById("log-password");
const regshowhide = document.querySelector(".reg-showhidepassword");
const regpassword = document.getElementById("reg-password");
const regshowhideconfirmpassword = document.querySelector(".reg-showhideconfirmpassword");
const regconfirmpassword = document.getElementById("reg-confirmpassword");
const loading = document.querySelector(".loading");

const regform = document.querySelector(".reg-form");
const logform = document.querySelector(".login-form");

const sara = document.querySelector(".close");
const login_reg = document.querySelector(".login-reg");
const span = document.querySelectorAll(".logreg");

const input = login_reg.querySelectorAll("input");

let logtoggle = true;
let regtoggle = true;
let logreg = true;



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
        logshowhide.src = " ./includes/IMG/eye_open.svg";
        logtoggle = false;
    }
    else{
        logpassword.type = "password";
        logshowhide.src = "./includes/IMG/eye_closed.svg";
        logtoggle = true;
    }
});

regshowhide.addEventListener("click", ()=>{

    if(regpassword.type === "password"){
        regpassword.type = "text";
        regshowhide.src = "./includes/IMG/eye_open.svg";
    }
    else{
        regpassword.type = "password";
        regshowhide.src = "./includes/IMG/eye_closed.svg";
    }
});

regshowhideconfirmpassword.addEventListener("click", ()=>{

    if(regconfirmpassword.type === "password"){
        regconfirmpassword.type = "text";
        regshowhideconfirmpassword.src = "./includes/IMG/eye_open.svg";
    }
    else{
        regconfirmpassword.type = "password";
        regshowhideconfirmpassword.src = "./includes/IMG/eye_closed.svg";
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
const allH4 = faqs.querySelectorAll("h4");
const allImg = faqs.querySelectorAll("img");

// Add an event listener to each div
divs.forEach((div, index) => {
    div.title = "Click to Expand";
    const p = div.querySelector("p");
    const h4 = div.querySelector("h4");
    const cross = div.querySelector("img");
    let rotation = 0;

    div.addEventListener('click', () => {
        
        allP.forEach(p =>{
            p.style.display = "none";
        });

        allH4.forEach(h4 =>{
            h4.style.color = "#858585";
        });

        allImg.forEach(img =>{  
            rotation = 0;
            img.style.transform = "rotate(0deg)"
            img.style.filter = "sepia(10%) saturate(10%) hue-rotate(180deg) brightness(0.5)";
        });

        divs.forEach(div =>{
            div.style.background = "#13171F";
            div.title = "Click to Expand";
        });

        cross.style.filter = "sepia(10%) saturate(10%) hue-rotate(180deg) brightness(0.9)";
        h4.style.color = "#ffffff";

        div.style.backgroundColor = "#1A1F29";

        p.style.color = "#ffffff";
        p.style.display = "block";
        p.style.backgroundColor = "transparent";

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
            loginBtn.style.cursor = "pointer";
            loginBtn.style.pointerEvents = "all";
            loginBtn.style.opacity = "1";
        }
    });

sara.textContent = "<-  Back to SiteHustle";
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
        header.style.top = "-1000px";
    } else {
        // Scrolling up: show the header
        header.style.top = "30px";
    }
    }
    //console.log(scrollTop);
    if(scrollTop > 1200){
        templates.style.opacity = "1";
    }
    else{
        templates.style.opacity = "0";
    }
    lastScrollTop = scrollTop; // Update the last scroll position
});

const tutorialSection = document.querySelector(".tutorials");
const steps = tutorialSection.querySelectorAll("span");
const vid = tutorialSection.querySelector(".placement");
steps.forEach(span =>{
    
    span.addEventListener("click", () => {

        // Reset styles for all spans in the 'steps' collection
        steps.forEach(s => {
            s.classList.remove("active"); 
        });

        span.classList.add("active");
        // Apply active styles to the clicked span
        /* span.style.border = "#DB9D47 solid 1px";
        span.style.backgroundColor = "#222222";
        span.style.color = "#ffffff";
        span.style.opacity = ".7"; */

        // Display a loading animation (or whatever l-ring is)
        vid.innerHTML = `<l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="white" class="loading"></l-ring>`;
        steps.forEach(span=>{
            span.style.pointerEvents = "none";
        });
        // Update vid content based on which span was clicked (using class checks)
        currentTimeout = setTimeout(() => {

            steps.forEach(span=>{
                span.style.pointerEvents = "all";
            });

            if (span.classList.contains("one")) {
                vid.textContent = "Choosing a Template";
            } 
            else if (span.classList.contains("two")) {
                vid.textContent = "Add Blocks";
            } 
            else if (span.classList.contains("three")) {
                vid.textContent = "Customize it";
            } 
            else if (span.classList.contains("four")) {
                vid.textContent = "View and copy the Code";
            }
        }, 1500);
    });
});

// Initialize ScrollReveal
ScrollReveal().reveal('.home .first', { 
    origin: 'left', 
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    delay: 200
  });

  ScrollReveal().reveal('.home .placement', { 
    origin: 'right', 
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    delay: 200
  });

  // You can add more reveal animations for other sections in the same way
  const spans = document.querySelectorAll('.spans span');
const bar = document.createElement('div'); // Create the sliding bar element
  
// Style the sliding bar element
bar.style.position = 'absolute';
bar.style.height = '100%';
bar.style.backgroundColor = 'transparent';
bar.style.border = "rgba(219, 157, 71, .8) solid 1px";
bar.style.borderRadius = "15px";
bar.style.overflow = "hidden";
bar.style.zIndex = "1";
bar.style.transition = 'left 0.5s ease, width 0.5s ease';
document.querySelector('.spans').appendChild(bar);

// Initialize bar's size and position to the first span
function updateBar(targetSpan) {
    const spanRect = targetSpan.getBoundingClientRect();
    const containerRect = document.querySelector('.spans').getBoundingClientRect();

    // Calculate the left position relative to the container
    const leftOffset = spanRect.left - containerRect.left;

    // Set the bar's position and width
    bar.style.left = `${leftOffset}px`;
    bar.style.width = `${spanRect.width}px`;
}

// Event listener for each span
spans.forEach((span) => {
    span.addEventListener('click', (e) => {
        // Remove active class from all spans
        spans.forEach((s) => {
            s.style.backgroundColor = "";
            s.classList.remove('active');
        });
            

        

        // Add active class to the clicked span
        e.target.style.backgroundColor = "#222222";
        e.target.classList.add('active');
        
        // Update the bar position to the clicked span
        updateBar(e.target);
    });
});

// Initialize the bar to the first span on page load
window.onload = () => updateBar(spans[0]);