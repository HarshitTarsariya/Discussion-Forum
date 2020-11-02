var block1 = document.getElementById('id01');
var block2 = document.getElementById('id02');
var block3 = document.getElementById('id03');
var flag_for_error = false;
window.onclick = function(event) {
    if (event.target == block1) {
        block1.style.display = "none";
        document.getElementById("loading_login").style.display = "none";
    } else if (event.target == block2) {
        block2.style.display = "none";
        document.getElementById("loading_admin_login").style.display = "none";
    } else if (event.target == block3) {
        block3.style.display = "none";
        document.getElementById("loading_register").style.display = "none";
    }

}

function loginValidation() {
    var user = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;
    if (user.localeCompare("admin") == 0 && password.localeCompare("admin") == 0) {
        sessionStorage.setItem("user", "admin");
        window.location.href = "index.html";
    } else {
        sessionStorage.setItem("wrong", "true");
        window.location.href = "login.html";
    }
}
// Temporary username having alphanumeric character is Valid
var username, email, password, passCheck, confirmpassword;

function registrationValidation() {
    if (username == true && email == true && password == true && confirmpassword == true)
        window.location.href = "login.html";
    else {
        if (username == true)
            document.getElementById("usernameError").innerHTML = "&#9989<br/>";
        else
            document.getElementById("usernameError").innerHTML = "&#10060<br/>";

        if (email == true)
            document.getElementById("emailError").innerHTML = "&#9989<br/>";
        else
            document.getElementById("emailError").innerHTML = "&#10060<br/>";

        if (password == true)
            document.getElementById("passwordError").innerHTML = "&#9989<br/>";
        else
            document.getElementById("passwordError").innerHTML = "&#10060<br/>";

        if (confirmpassword == true)
            document.getElementById("confirmpasswordError").innerHTML = "&#9989<br/>";
        else
            document.getElementById("confirmpasswordError").innerHTML = "&#10060<br/>";
    }
}

function usernameChange() {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var usr = document.getElementById("uname_register").value.match(usernameRegex);
    if (usr == null) {
        username = false;
        document.getElementById("usernameError").innerHTML = "&#10060<br/>";
    } else {
        username = true;
        document.getElementById("usernameError").innerHTML = "&#9989<br/>";
    }
}

function emailChange() {
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var eml = document.getElementById("emailid_register").value.match(emailRegex);
    if (eml == null) {
        email = false;
        document.getElementById("emailError").innerHTML = "&#10060<br/>";
    } else {
        email = true;
        document.getElementById("emailError").innerHTML = "&#9989<br/>";
    }
}

function passwordChange() {
    var pass = document.getElementById("password_register").value;
    if (pass.length < 8) {
        password = false;
        document.getElementById("passwordError").innerHTML = "&#10060<br/>";
    } else {
        password = true;
        passCheck = pass;
        document.getElementById("passwordError").innerHTML = "&#9989<br/>";
    }
}

function confirmpasswordChange() {
    var pass = document.getElementById("confirmpassword_register").value;
    if (pass != passCheck || password == false) {
        confirmpassword = false;
        document.getElementById("confirmpasswordError").innerHTML = "&#10060<br/>";
    } else {
        confirmpassword = true;
        document.getElementById("confirmpasswordError").innerHTML = "&#9989<br/>";
    }
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.href = "index.html";
}
if (sessionStorage["user"] == "admin") {
    document.getElementById("change").innerHTML = "Logout";
    document.getElementById("change").onclick = function() { logout(); };
    document.getElementById("changeProfile").style.display = "block";
} else {
    if (sessionStorage["wrong"] == "true") {
        document.getElementById("invalid").style.display = "inline";
        sessionStorage["wrong"] = "false";
    }
}