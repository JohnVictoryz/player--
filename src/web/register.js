document.getElementById("registration-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var form = event.target;
  var data = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "register.php", true);
  xhr.onload = function() {
    var response = JSON.parse(xhr.responseText);
    if (response.success) {
      document.getElementById("message").textContent = "Registration successful!";
      form.reset();
    } else {
      document.getElementById("message").textContent = response.message;
    }
  };
  xhr.send(data);
});
