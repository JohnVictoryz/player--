document.getElementById("login-form").addEventListener("submit", function(event) {
event.preventDefault(); // prevent form submission
var xhr = new XMLHttpRequest();
xhr.open("POST", "login.php"); // replace with your server-side script URL
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function() {
   if (xhr.status === 200) {
         var response = JSON.parse(xhr.responseText);
         if (response.success) {
                 window.location.href = "index.html"; // replace with your home page URL
        } else {
                 document.getElementById("message").innerHTML = response.message;
        }
   }
};
var formData = new FormData(event.target);
var data = {};
formData.forEach(function(value, key) {
    data[key] = value;
});
    xhr.send(JSON.stringify(data));
});
