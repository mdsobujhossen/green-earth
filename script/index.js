const categoriesBtnContainer = document.getElementById("categories-btn-container")
const treesContainer = document.getElementById("trees-container")
const loadingSpinner = document.getElementById("loading-spinner")
const allTreesButtons = document.getElementById("all-trees-btn")
const treeDetailsModal = document.getElementById("tree_details_modal")
const modalImage = document.getElementById("modal-image")
const modalTitle = document.getElementById("modal-title")
const modalDescription = document.getElementById("modal-description")
const modalPrice = document.getElementById("modal-price")
const cartContainer = document.getElementById("cartContainer")
const cart = []





// categories button
// load categories button
const loadCategoriesButton = async () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url)
    const data = await res.json()
    displayCategoriesButton(data.categories);

}

// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }


// display categories button
const displayCategoriesButton = (categoriesList) => {

    categoriesList.forEach(categories => {
        const button = document.createElement("button")
        button.className = "btn btn-outline btn-success"
        button.textContent = categories.category_name
        button.onclick = () => selectCategory(categories.id, button)
        categoriesBtnContainer.append(button)
    });
    console.log(categoriesList);

}


// select categories 
const selectCategory = async (categoriesId, button) => {
    showLoading()
    const allButtons = document.querySelectorAll("#all-trees-btn,#categories-btn-container button")
    // console.log(allButtons);

    allButtons.forEach(button => {
        button.classList.add("btn-outline")
    });
    button.classList.remove("btn-outline")

    const url = `https://openapi.programming-hero.com/api/category/${categoriesId}`
    const res = await fetch(url)
    const data = await res.json()
    hideLoading()
    displayTrees(data.plants);

}



// "id": 7,
// "image": "https://i.ibb.co.com/FkH6MRhR/banyan-min.jpg",
// "name": "Banyan Tree",
// "description": "A majestic shade tree with a vast canopy and iconic aerial roots. Revered in many cultures, it offers shelter to countless birds and animals.",
// "category": "Shade Tree",
// "price": 1200
const showLoading = () => {
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.classList.add("flex")
    treesContainer.innerHTML = ""
}
const hideLoading = () => {
    loadingSpinner.classList.add("hidden")
}


// load trees 
const loadingTrees = async () => {
    showLoading()
    const url = "https://openapi.programming-hero.com/api/plants"
    const res = await fetch(url)
    const data = await res.json()
    hideLoading()
    // console.log(data);

    displayTrees(data.plants);

}

// display trees


// {
//     "id": 26,
//     "image": "https://i.ibb.co.com/Ngzp0tkJ/Bougainvillea-min.jpg",
//     "name": "Bougainvillea",
//     "description": "A vibrant flowering climber with pink, purple, or red blooms. Perfect for covering fences and garden walls.",
//     "category": "Climber",
//     "price": 400
// }

const displayTrees = async (trees) => {

    trees.forEach(tree => {
        const div = document.createElement("div")
        div.className = "card bg-base-100 shadow-lg p-3"


        div.innerHTML = `
                        <figure class="">
                            <img class="h-38 object-cover rounded-sm" src=${tree.image}
                                alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="space-y-2 mt-5 items-center text-center">
                            <h2 class="card-title cursor-pointer" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
                            <p class="line-clamp-2 text-left">${tree.description}</p>
                            <div class="flex justify-between items-center">
                                <div class="badge badge-soft badge-success">${tree.category}</div>
                                <p class="text-xl font-semibold">$<span>${tree.price}</span></p>
                            </div>
                            <div class="card-actions w-full">
                                <button onclick="addToCart(${tree.id},' ${tree.name}', ${tree.price})" class="btn btn-success w-12/12 ">Add to cart</button>
                            </div>
                        </div>
        `
        treesContainer.append(div)
    });
    console.log(trees);

}

// update active btn
allTreesButtons.addEventListener("click", () => {
    const allButtons = document.querySelectorAll("#all-trees-btn,#categories-btn-container button")
    // console.log(allButtons);

    allButtons.forEach(button => {
        button.classList.add("btn-outline")
    });
    allTreesButtons.classList.remove("btn-outline")
    allTreesButtons.classList.add("btn-primary")
    loadingTrees()
})



// "id": 3,
// "image": "https://i.ibb.co.com/xt98PwZq/jackfruit-min.jpg",
// "name": "Jackfruit Tree",
// "description": "A large tropical tree that bears the world’s biggest fruit, the jackfruit. Its sweet and aromatic flesh is both nutritious and filling, and the tree itself provides generous shade.",
// "category": "Fruit Tree",
// "price": 800



// show modal
const openTreeModal = async (treeId) => {
    console.log(treeId, "treeid");
    const url = `https://openapi.programming-hero.com/api/plant/${treeId}`
    // console.log(url);

    const res = await fetch(url)
    const data = await res.json()
    const plantDetails = data.plants
    console.log(plantDetails);

    modalImage.src = plantDetails.image
    modalTitle.textContent = plantDetails.name
    modalDescription.textContent = plantDetails.description
    modalPrice.textContent = plantDetails.price


    treeDetailsModal.showModal()

}

// show cart details 
const addToCart = (id, name, price) => {
    cart.push({
        id,
        name,
        price
    })
    updateCart()
}
function updateCart() {
    cartContainer.innerHTML = ""
    cart.forEach((item) => {
        const cartItem = document.createElement("div")
        cartItem.className = "card card-body bg-slate-100"
        cartItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h2>${item.name}</h2>
                    <p> $${item.price} × 10</p>
                </div>
                <button class="btn btn-ghost">X</button>
             </div>
             <p class="text-right font-semibold text-xl">$500</p>
        `
        cartContainer.append(cartItem)

    })

}



loadingTrees()
loadCategoriesButton()