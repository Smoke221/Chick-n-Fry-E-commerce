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

fetch("https://shy-pear-springbok-yoke.cyclic.app/user/breakfast", {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    },
})
    .then((fromResolve) => fromResolve.json())
    .then((data) => {
        // bag = data
        bag = data.prods
        container.innerHTML = null;
        bag.forEach(e => {
            let divs = document.createElement("div")
            divs.setAttribute("class", "card")
            divs.setAttribute("data-product-id", e._id)

            divs.addEventListener("click",(e) => {
                if(e.target.classList.contains('title') || e.target.classList.contains('image')){
                    const productID = e.target.closest(".card").getAttribute("data-product-id");
                    fetchProduct(productID)
                }
            })

            let image = document.createElement("img")
            image.setAttribute("class","image")
            image.setAttribute("src", e.main_image)

            let name = document.createElement("h2")
            name.setAttribute("class","title")
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

function fetchProduct(productID){
    const productURL = `product.html?id=${productID}`
    window.open(productURL, "_blank");
}