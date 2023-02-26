// fetch('http://127.0.0.1:5500/tangible-voyage-4988/frontend/index.html', {
//     headers: {
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       // Update the navbar to display the user's first name
//       document.querySelector('#username').textContent = data.firstname;
//     })
//     .catch(error => console.error(error));
document.querySelector("#username").textContent = "Welcome," + " " + (localStorage.getItem("userName") || "Stranger")
document.querySelector("#order-btn").addEventListener("click", () => {
    window.location.assign("breakfast.html")
})
document.getElementById("logo-name").addEventListener("click", () => {
    window.location.href = "index.html"
})
document.getElementById("nav-qty").innerText = localStorage.getItem("total-quantity") || 0