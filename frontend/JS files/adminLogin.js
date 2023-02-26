const form = document.querySelector('#myform');
let logout = document.querySelector("#admin-menu")

form.addEventListener('click', function (event) {
    if (event.target.type === 'submit') {
        event.preventDefault()
        const onLogin = () => {
            const payload = {
                // name : document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value
            }
            fetch("http://localhost:1010/admin/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.token) {
                        // document.querySelector("#admin_name").textContent = res.name
                        localStorage.setItem('name',res.name)
                        localStorage.setItem('token', res.token);
                        window.location.href = "admin.html"
                    } else {
                        console.log("Error: Response does not include token");
                    }
                })
                .catch(err => console.log(err))
        }
        onLogin()
    }
});

document.querySelector("#login").textContent = localStorage.getItem("name")
