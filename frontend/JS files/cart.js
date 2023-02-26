let getData = JSON.parse(localStorage.getItem("in-cart")) || []
let container = document.querySelector('#container')
// let quantityCart = localStorage.getItem("total-quantity")
// let subTotal = localStorage.getItem("sub-total")

window.onload = calculateQty(getData)
window.addEventListener("load", () => {
    calculateTotal(getData)
    document.getElementById("price").innerText = localStorage.getItem("sub-total")
    document.getElementById("nav-qty").innerText = localStorage.getItem("total-quantity") || 0
})

document.querySelector("#username").textContent = "Welcome," + " " + (localStorage.getItem("userName") || "Stranger")

document.querySelector("#order-btn").addEventListener("click", () => {
    window.location.assign("breakfast.html")
})
document.getElementById("logo-name").addEventListener("click", () => {
    window.location.href = "index.html"
})
function displayCard(data) {
    container.innerHTML = null;

    data.forEach((e, index) => {
        let divs = document.createElement("div")
        divs.setAttribute("id", "each")

        let image = document.createElement("img")
        image.setAttribute("src", e.main_image)

        let name = document.createElement("h3")
        name.textContent = e.title

        let description = document.createElement("p")
        description.textContent = e.description
        description.setAttribute("id", "description")

        let price = document.createElement("p")
        price.textContent = e.price + "$"

        let div = document.createElement("div")
        let quantity = document.createElement("p")

        let select = document.createElement("select")
        let option = document.createElement("option")
        option.textContent = "Qty."
        let option1 = document.createElement("option")
        option1.setAttribute("value", "1")
        option1.textContent = 1
        let option2 = document.createElement("option")
        option2.setAttribute("value", "2")
        option2.textContent = 2
        let option3 = document.createElement("option")
        option3.setAttribute("value", "3")
        option3.textContent = 3
        let option4 = document.createElement("option")
        option4.setAttribute("value", "4")
        option4.textContent = 4
        let option5 = document.createElement("option")
        option5.setAttribute("value", "5")
        option5.textContent = 5


        // Find the product in the cartProducts array
        let cartProduct = getData.find(p => p.id === e.id);
        if (cartProduct) {
            // If the product is in the cart, set the quantity value to its value in the cart
            select.value = cartProduct.quantity;
            quantity.textContent = "Quantity: " + cartProduct.quantity;
            price.textContent = cartProduct.quantity * e.price + "$";


        } else {
            // Otherwise, set the quantity value to 1
            select.value = 1;
            quantity.textContent = "Quantity:";
        }

        select.addEventListener("change", function () {
            let selectedValue = select.value;

            // Update the quantity value in the cartProducts array
            let cartProduct = getData.find(p => p.id === e.id);
            if (cartProduct) {
                cartProduct.quantity = (selectedValue);
                quantity.textContent = "Quantity: " + selectedValue;
            } else {
                getData.push({ ...e, quantity: (selectedValue) });
            }

            // Save the cartProducts array to localStorage
            localStorage.setItem('in-cart', JSON.stringify(getData));

            quantity.textContent = "Quantity: " + selectedValue;
            price.textContent = selectedValue * e.price + "$";

            total = calculateTotal(getData)
            localStorage.setItem("sub-total", total)
            document.getElementById("price").innerText = localStorage.getItem("sub-total")


        });

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Remove"
        deleteBtn.setAttribute("id","order-btn")
         
        let quantityCart = calculateQty(getData)
        let subTotal = calculateTotal(getData)

        deleteBtn.addEventListener("click", () => {
            quantityCart--
            localStorage.setItem("total-quantity", quantityCart)
            getData.splice(index, 1)
            subTotal -= e.price * e.quantity
            localStorage.setItem("sub-total", subTotal)
            document.getElementById("nav-qty").innerText = localStorage.getItem("total-quantity")
            document.getElementById("price").innerText = localStorage.getItem("sub-total")
            localStorage.setItem("in-cart", JSON.stringify(getData))
            displayCard(getData)
        })

        let nutrients = document.createElement("p")
        nutrients.setAttribute("id", "nutrients")
        let cal = document.createElement("p")
        cal.textContent = "Calories:" + e.calories
        let fat = document.createElement("p")
        fat.textContent = "Fat:" + e.fat
        let carbs = document.createElement("p")
        carbs.textContent = "Carbs:" + e.carbs
        let protein = document.createElement("p")
        protein.textContent = "Protein:" + e.protein

        nutrients.append(cal, fat, carbs, protein)
        div.append(name, quantity, nutrients)
        select.append(option, option1, option2, option3, option4, option5)
        divs.append(image, div, select, price, deleteBtn)
        container.append(divs)
    })
}
displayCard(getData)


function calculateTotal(data) {
    let total = 0
    data.forEach(item => {
        total += (item.price * item.quantity)
        localStorage.setItem("sub-total", total)
    })
    return total
}
document.getElementById("price").innerText = localStorage.getItem("sub-total")


function calculateQty(data) {
    let qty = 0
    data.forEach(item => {
        qty += parseInt(item.quantity)
        localStorage.setItem("total-quantity", qty)
    })
    return qty
}

let paymentCard = document.querySelector("#payment")
let method = document.querySelector("method")
const payment = () => {
    if (paymentCard.style.display === "none") {
        paymentCard.style.display = "block";
        document.querySelector("#cart-main").style.opacity = "20%"
        document.getElementById("amt-payable").innerText = "$" + " " + localStorage.getItem("sub-total")
        // document.getElementById("quantity").textContent = qty
    } else {
        paymentCard.style.display = "none";
    }
}

let qty = calculateQty(getData)
// document.getElementById("quantity").textContent = qty
let messageCard = document.querySelector("#message-card");

let payBtn = document.querySelector("#pay").addEventListener("click", () => {
    localStorage.removeItem("total-quantity");
    localStorage.removeItem("sub-total");
    localStorage.removeItem("in-cart")
    paymentCard.style.display = "none"
    messageCard.style.display = "block";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);

})

let main = document.getElementById("cart-main")
let nologin = document.getElementById("noLogin")
window.onload = () => {
    if (localStorage.getItem("userName") !== null) {
        main.style.display = "block"
        nologin.style.display = "none"
        // userName.textContent = localStorage.getItem("userName")
    } else {
        main.style.display = "none"
        nologin.style.display = "block"
    }
};