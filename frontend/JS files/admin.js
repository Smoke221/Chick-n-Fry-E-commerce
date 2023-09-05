let container = document.getElementById("container");
let token = localStorage.getItem("token");

document.getElementById("nav").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.querySelector("#login").textContent =
  "Hello," + " " + localStorage.getItem("name");

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText);
    // displayCard(data)
    let totalProds = data.length;
    document.getElementById("total").textContent = totalProds;
    data.forEach((e) => {
      let divs = document.createElement("div");

      let image = document.createElement("img");
      image.setAttribute("src", e.main_image);

      let name = document.createElement("h4");
      name.textContent = e.title;
      let calories = document.createElement("p");
      calories.textContent = e.calories + " " + "cal ";
      let price = document.createElement("p");
      price.textContent = e.price + "$";

      let id = document.createElement("p");
      id.textContent = e._id;
      // let deleteButton = document.createElement("button")
      // deleteButton.setAttribute("id","deleteBtn")
      // deleteButton.setAttribute("style","display: none;")
      // deleteButton.textContent = "Delete"

      divs.append(image, name, id, calories, price);
      container.append(divs);
    });
  }
};
xhr.open("GET", "https://shy-pear-springbok-yoke.cyclic.app/admin/dashboard");
xhr.setRequestHeader("Authorization", `${token}`);
xhr.send();

let dash = document.querySelector("#dash");
let add = document.querySelector("#add");
let update = document.querySelector("#update");
let dlt = document.querySelector("#dlt");

let dashD = document.querySelector("#dashboard");
let addD = document.querySelector("#addProduct");
let updateD = document.querySelector("#updateProduct");
let dltD = document.querySelector("#deleteProduct");

// let dltBtn = document.querySelector("#deleteBtn")

dash.addEventListener("click", () => {
  if (dashD.style.display === "none") {
    addD.style.display = "none";
    dashD.style.display = "block";
    updateD.style.display = "none";
    dltD.style.display = "none";
  } else {
    dashD.style.display === "none";
  }
});

add.addEventListener("click", () => {
  // console.log("ok");
  if (addD.style.display === "none") {
    addD.style.display = "block";
    dashD.style.display = "none";
    updateD.style.display = "none";
    dltD.style.display = "none";
  } else {
    addD.style.display === "none";
  }
});
update.addEventListener("click", () => {
  // console.log("w");
  if (updateD.style.display === "none") {
    updateD.style.display = "block";
    addD.style.display = "none";
    dashD.style.display = "none";
    dltD.style.display = "none";
  } else {
    updateD.style.display === "none";
  }
});
dlt.addEventListener("click", () => {
  // console.log("wo");
  if (dltD.style.display === "none") {
    dltD.style.display = "block";
    dashD.style.display = "none";
    updateD.style.display = "none";
    addD.style.display = "none";
  } else {
    dltD.style.display === "none";
  }
});
let id = document.getElementById("id").value;
let main_image = document.getElementById("main_image").value;
let title = document.getElementById("title").value;
let price = document.getElementById("price").value;
let calories = document.getElementById("calories").value;
let carbs = document.getElementById("carbs").value;
let fat = document.getElementById("fat").value;
let protein = document.getElementById("protein").value;

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
    protein: document.getElementById("protein").value,
  };
  fetch("https://shy-pear-springbok-yoke.cyclic.app/admin/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// update product
const updateProd = () => {
  const payload = {
    main_image: document.querySelector(".upImage").value,
    price: document.querySelector(".upPrice").value,
  };
  const inputID = document.querySelector(".upId").value;
  fetch(`https://shy-pear-springbok-yoke.cyclic.app/admin/update/${inputID}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const updateAllProd = () => {
  const inputID = document.querySelector("#allId").value;
  const payload = {
    main_image: document.getElementById("allImage").value,
    title: document.getElementById("allTitle").value,
    price: document.getElementById("allPrice").value,
    calories: document.getElementById("allCalories").value,
    carbs: document.getElementById("allCarbs").value,
    fat: document.getElementById("allFat").value,
    protein: document.getElementById("allProtein").value,
  };
  fetch(`https://shy-pear-springbok-yoke.cyclic.app/admin/update/${inputID}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// delete product
const deleteProd = () => {
  const inputID = document.querySelector(".id");

  // console.log(inputID);
  fetch(
    `https://shy-pear-springbok-yoke.cyclic.app/admin/delete/${inputID.value}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// window.addEventListener("scroll", function() {
//     var navbar2 = document.querySelector("#menuu");
//     if (window.pageYOffset >= 50) {
//       navbar2.style.display = "block";
//     } else {
//       navbar2.style.display = "none";
//     }
//   });
