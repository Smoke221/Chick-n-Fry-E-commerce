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
                        // console.log(res.name);
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

