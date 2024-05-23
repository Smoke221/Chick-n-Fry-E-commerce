document.getElementById("nav").addEventListener("click", () => {
    window.location.href = "index.html"
})

document.getElementById("nav-qty").innerText = localStorage.getItem("total-quantity") || 0

document.querySelector("#order-btn").addEventListener("click", () => {
    window.location.assign("breakfast.html")
})
document.querySelector("#username").textContent = "Welcome," + " " + (localStorage.getItem("userName") || "Stranger")

let bag = []
let container = document.querySelector("#container")

fetch("https://chick-n-fry-e-commerce.onrender.com/user/breakfast", {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    },
})
    .then((fromResolve) => fromResolve.json())
    .then((data) => {
        // bag = data
        const Products = data.data
        container.innerHTML = null;
        Products.forEach(e => {
            let divs = document.createElement("div")

            let image = document.createElement("img")
            image.setAttribute("src", e.main_image)

            let name = document.createElement("h2")
            name.textContent = e.title
            let calories = document.createElement("p")
            calories.textContent = e.calories + " " + "per meal"
            let price = document.createElement('p')
            price.textContent = e.price + "$"

            let addToCart = document.createElement("button")
            addToCart.textContent = "Add to Meal"
            // addToCart.setAttribute("onclick","toCart()")
            addToCart.addEventListener("click", () => {

                addToCart.textContent = "In your meal"
                let added = JSON.parse(localStorage.getItem("in-cart")) || []
                added.push({ ...e, quantity: 1 })
                localStorage.setItem("in-cart", JSON.stringify(added))
                let qtydata = localStorage.getItem("total-quantity")
                qtydata++
                localStorage.setItem("total-quantity", qtydata)
                document.getElementById("nav-qty").innerText = localStorage.getItem("total-quantity")

            })

            divs.append(image, name, calories, price, addToCart)
            container.append(divs)
        })
    })

