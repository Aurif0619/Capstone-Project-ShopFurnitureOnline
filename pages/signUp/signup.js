document.querySelector(".signUpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let userEmail = document.getElementById("userEmail").value; 
    let userPassword = document.getElementById("user-password").value;

    if (!userEmail || !userPassword) {
        alert("Please fill in all fields.");
        return; 
    }

    const userData = {
        name: userEmail,
        password: userPassword
    };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Sign up successful! You can now log in.");
    window.location.href = "./login.html";
});
