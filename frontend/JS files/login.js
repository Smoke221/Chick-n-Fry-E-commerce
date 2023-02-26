document.getElementById("nav").addEventListener("click", () => {
    window.location.href = "index.html"
})

const form = document.querySelector('#myform');

form.addEventListener('click', function (event) {
    if (event.target.type === 'submit') {
        event.preventDefault()
        const onLogin = () => {
            const payload = {
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value
            }
            fetch("http://localhost:1010/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                        // console.log(res.token);
                        localStorage.removeItem("userName");
                        // localStorage.removeItem("token");
                        localStorage.setItem('userName', res.name)
                        localStorage.setItem('token', res.token);
                        window.location.href = "index.html";
                    } else {
                        console.log("Error: Response does not include token");
                    }
                })
                .catch(err => console.log(err))
        }
        onLogin()
    }
});

let main = document.getElementById("main")
let userName = document.getElementById("name")
let nologin = document.getElementById("noLogin")
let userinfo = document.getElementById("user-info")

window.onload = () => {
    if (localStorage.getItem("userName") !== null) {
        userinfo.style.display = "block"
        main.style.display = "none"
        userName.textContent = localStorage.getItem("userName")
    } else {
        userinfo.style.display = "none"
    }
};

let messageCard = document.querySelector("#message-card");

document.querySelector("#login-btn").addEventListener("click",() => {
    localStorage.clear()
    messageCard.style.display = "block"
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
})