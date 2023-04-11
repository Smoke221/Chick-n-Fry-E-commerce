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
    fetch("https://shy-pear-springbok-yoke.cyclic.app/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if(data.result){
            // localStorage.setItem("result",res.result)
            window.location.assign("login.html")
        }
    })
    .catch(err => console.log(err))
}