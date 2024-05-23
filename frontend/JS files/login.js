document.getElementById("nav").addEventListener("click", () => {
  window.location.href = "index.html";
});

const form = document.querySelector("#myform");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  onLogin();
});

const showMessage = (message, destination) => {
  const messageCard = document.getElementById("message-card");
  const messageText = document.getElementById("message-text");

  messageText.textContent = message;
  messageCard.style.display = "block";

  setTimeout(() => {
    messageCard.style.display = "none";
    if (destination) {
      window.location.href = destination;
    }
  }, 2000);
};

const onLogin = () => {
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage("Please fill in all fields.");
    return;
  }

  const payload = {
    email,
    password,
  };

  fetch("https://chick-n-fry-e-commerce.onrender.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((res) => {
      if (res.token) {
        localStorage.removeItem("userName");
        localStorage.setItem("userName", res.name);
        localStorage.setItem("token", res.token);

        // Show a success message for login and redirect
        showMessage("Login successful!", "index.html");
      } else if (res.msg === "Wrong Password") {
        showMessage("Incorrect password. Please try again.");
      } else if (res.msg === "Wrong Credentials") {
        showMessage("Incorrect email or credentials. Please try again.");
      } else {
        console.log("Error: Response does not include token");
        showMessage("An error occurred. Please try again later.");
      }
    })
    .catch((err) => {
      console.log(err);
      showMessage("An error occurred. Please try again later.");
    });
};

const main = document.getElementById("main");
const userName = document.getElementById("name");
const userinfo = document.getElementById("user-info");

window.onload = () => {
  if (localStorage.getItem("userName") !== null) {
    userinfo.style.display = "block";
    main.style.display = "none";
    userName.textContent = localStorage.getItem("userName");
  } else {
    userinfo.style.display = "none";
  }
};

// Logout functionality
const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", () => {
  localStorage.clear();
  showMessage("Logout successful!", "index.html");
});
