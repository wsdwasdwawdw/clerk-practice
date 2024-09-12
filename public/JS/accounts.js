
const Email = document.getElementById("log-email");
const Password = document.getElementById("log-password");
const newEmail = document.getElementById("reg-email");
const newPassword = document.getElementById("reg-password");

//const usernameArray = JSON.parse(sessionStorage.getItem("username"));

let account = JSON.parse(sessionStorage.getItem("account")) || [];
console.log(account);

function register(){
    account.push({
        username: newEmail.value,
        password: newPassword.value
    });


    newEmail.value = "";
    newPassword.value = "";

    sessionStorage.setItem("account", JSON.stringify(account));

    console.log(account);
}

function pasok(){
    
    account.forEach((value) => {
        console.log(value);
        if((value.username === Email.value) && (value.password === Password.value)){
            alert("Account found!!");
            window.open("grapes.html");
        }
    });

    if(Email.value === "admin" && Password.value === "admin"){
        window.location.replace("includes/admin.html");
    }
}
