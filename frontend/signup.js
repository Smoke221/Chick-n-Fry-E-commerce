document.getElementById("nav").addEventListener("click", () => {
    window.location.href = "index.html"
})

const onSignUp=() => {
    const payload = {
        firstname:document.getElementById('firstname').value,
        lastname:document.getElementById('lastname').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }
    fetch("http://localhost:1010/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}