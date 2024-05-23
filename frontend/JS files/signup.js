document.getElementById("nav").addEventListener("click", () => {
  window.location.href = "index.html";
});
const form = document.querySelector("#form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  onSignUp();
});

const showMessage = (message, destination) => {
  const messageCard = document.getElementById("message-card");
  const messageText = document.getElementById("message-text");

  messageText.textContent = message;
  messageCard.style.display = "block";

  setTimeout(() => {
    messageCard.style.display = "none";
    window.location.href = destination;
  }, 2000);
};

const onSignUp = () => {
  const payload = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch("https://chick-n-fry-e-commerce.onrender.com/user/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        showMessage("Registartion successful", "login.html");
      } else {
        showMessage("Registartion failed. Please try again.", "signup.html");
      }
    })
    .catch((err) => console.log(err));
};
