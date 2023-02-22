let bag = []
let container = document.querySelector("#container")

fetch("https://63f5f65859c944921f6a1d7e.mockapi.io/breakfast")
.then((fromResolve) => fromResolve.json())
.then((data) => {
    bag = data
    displayCard(data)
})

function displayCard(data){
    container.innerHTML = null;
    data.forEach(e => {
        let divs = document.createElement("div")
        let image = document.createElement("img")
        image.setAttribute("src",e.main_image)

        let name = document.createElement("h2")
        name.textContent = e.title
        let calories = document.createElement("p")
        calories.textContent = e.calories + " " + "per meal"
        let price = document.createElement('p')
        price.textContent = e.price + "$"

        let addToCart = document.createElement("button")
        addToCart.textContent = "Add to Meal"
        addToCart.addEventListener("click", () => {
            addToCart.textContent = "In your meal"
            let added = JSON.parse(localStorage.getItem("in-cart")) || []
            added.push({...e})
            localStorage.setItem("in-cart",JSON.stringify(added))
        })

        divs.append(image,name,calories,price,addToCart)
        container.append(divs)
    })
}