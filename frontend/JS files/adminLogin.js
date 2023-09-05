const form = document.querySelector("#myform");
let logout = document.querySelector("#admin-menu");

document.getElementById("nav").addEventListener("click", () => {
  window.location.href = "index.html";
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

form.addEventListener("click", function (event) {
  if (event.target.type === "submit") {
    event.preventDefault();
    const onLogin = () => {
      const payload = {
        // name : document.querySelector('#name').value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };
      fetch("https://shy-pear-springbok-yoke.cyclic.app/admin/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            // document.querySelector("#admin_name").textContent = res.name
            localStorage.setItem("name", res.name);
            localStorage.setItem("token", res.token);
            showMessage(`Login successful, ${res.name}`,"admin.html")
          } else {
            console.log("Error: Response does not include token");
          }
        })
        .catch((err) => console.log(err));
    };
    onLogin();
  }
});

document.querySelector("#login").textContent = localStorage.getItem("name");
