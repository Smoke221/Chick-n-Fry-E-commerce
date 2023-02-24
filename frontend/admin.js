let container = document.getElementById("container")

const xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.responseText)
        // displayCard(data)
        let totalProds = data.length
        document.getElementById("total").textContent = totalProds
        data.forEach(e => {
            let divs = document.createElement("div")

            let image = document.createElement("img")
            image.setAttribute("src", e.main_image)

            let name = document.createElement("h4")
            name.textContent = e.title
            let calories = document.createElement("p")
            calories.textContent = e.calories + "cal " + " " + "per meal"
            let price = document.createElement('p')
            price.textContent = e.price + "$"

            divs.append(image, name, calories, price)
            container.append(divs)
        })
    }
}
xhr.open("GET", 'http://localhost:1010/dashboard')
xhr.send()

let dash = document.querySelector("#dash")
let add = document.querySelector("#add")
let update = document.querySelector("#update")
let dlt = document.querySelector("#dlt")

let dashD = document.querySelector("#dashboard")
let addD = document.querySelector("#addProduct")
let updateD = document.querySelector("#updateProduct")
let dltD = document.querySelector("#deleteProduct")

add.addEventListener("click", () => {
    // console.log("ok");
    if (addD.style.display === "none") {
        addD.style.display = "block"
        dashD.style.display = "none"
        updateD.style.display = "none"
        dltD.style.display = "none"
    } else {
        addD.style.display = "none"
    }
})
update.addEventListener("click", () => {
    if (updateD.style.display === "none") {
        updateD.style.display = "block"
        addD.style.display = "none"
        updateD.style.display = "none"
        dltD.style.display = "none"
    } else {
        updateD.style.display = "none"
    }
})
dlt.addEventListener("click", () => {
    if (dltD.style.display === "none") {
        dltD.style.display = "block"
        dashD.style.display = "none"
        updateD.style.display = "none"
        addD.style.display = "none"
    } else {
        dltD.style.display = "none"
    }
})





// add new product

const addProd = () => {
    const payload = {
        id: document.getElementById("id").value,
        main_image: document.getElementById("main_image").value,
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        calories: document.getElementById("calories").value,
        carbs: document.getElementById("carbs").value,
        fat: document.getElementById("fat").value,
        protein: document.getElementById("protein").value
    }
    fetch("http://localhost:1010/admin/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}