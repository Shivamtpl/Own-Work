function SignUp () {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") 
    {
        alert("Login Successful!");
    }
        else {
            document.getElementById("message").innerText = "invalid username or password";
    }
}
