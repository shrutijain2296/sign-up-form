function submitBtn(){
    var fullName = document.getElementById("full-name").value;
    var emailId = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    var message = document.getElementById("message");
    if(fullName === "" || emailId === "" || password === "" || confirmPassword === ""){
        message.textContent = "Error : All the fields are mandatory";
        message.style.color = "red";
    }
    else if(confirmPassword !== password){
        message.textContent = "Error : passwords do not match";
        message.style.color = "red";
    }

    else{
        var accessToken = generateAccessToken();

        var user = {
          fullName: fullName,
          emailId: emailId,
          password: password,
          accessToken: accessToken
        };
    
        localStorage.setItem("user", JSON.stringify(user));

        message.textContent = "Successfully Signed Up!";
        message.style.color = "green";

         // Redirect to profile page
        window.location.href = "profile.html";
    }

}
// Generate random access token
function generateAccessToken() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var length = 16;
    var accessToken = "";
    for (var i = 0; i < length; i++) {
      accessToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return accessToken;
  }

  // Check if user is authenticated
function isAuthenticated() {
    var user = localStorage.getItem('user');
    return user !== null;
  }
  
  // Redirect user to appropriate page based on authentication status
  function redirectToPage() {
    var currentPath = window.location.pathname;
    var authenticated = isAuthenticated();
  
    if (authenticated && currentPath === '/index.html') {
      // Redirect to profile page if authenticated and trying to access signup page
      window.location.href = '/profile.html';
    } else if (!authenticated && currentPath === '/profile.html') {
      // Redirect to signup page if not authenticated and trying to access profile page
      window.location.href = '/index.html';
    }
  }
  
function displayProfile() {
    console.log("Displaying profile...");
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user); // Log the retrieved user object
    if (user) {
        console.log("Setting profile-fullname...");
        document.querySelector('#profile-fullname').textContent = 'Full Name: ' + user.fullName;
        console.log("Setting profile-email...");
        document.querySelector('#profile-email').textContent = 'Email: ' + user.emailId;
        console.log("Setting profile-password...");
        document.querySelector('#profile-password').textContent = 'Password: ' + user.password;
        document.querySelector('#profile-page').style.display = 'block'; // Show the profile page
    }
}
  // Logout function
  function logout() {
    // Clear user state and access token from local storage
    localStorage.removeItem('user');
  
    // Redirect to signup page
    window.location.href = 'index.html';
  }
  

// Initial setup
redirectToPage();
displayProfile();


  
  
  