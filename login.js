document.querySelector(".signForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("user-password").value; 

    if (!userEmail || !userPassword) {
        alert("Please fill in all fields.");
        return; 
    }

    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name === userEmail && storedUser.password === userPassword) {
        alert("Login successful!");
        window.location.href = "./index.html"; 
    } else {
        alert("Invalid email or password");
    }
});
