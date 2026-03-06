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
    const categoriesBtnContainer = document.getElementById("categories-btn-container")
    categoriesList.forEach(categories => {
        const button = document.createElement("button")
        button.className = "btn btn-outline btn-success"
        button.textContent = categories.category_name
        button.onclick = () => selectCategory(categories.id)
        categoriesBtnContainer.append(button)
    });
    console.log(categoriesList);

}


// select categories 
const selectCategory = async (categoriesId) => {
    const url = `https://openapi.programming-hero.com/api/category/${categoriesId}`
    const res = await fetch(url)
    const data = await res.json()
    displayTrees(data.plants);

}



// "id": 7,
// "image": "https://i.ibb.co.com/FkH6MRhR/banyan-min.jpg",
// "name": "Banyan Tree",
// "description": "A majestic shade tree with a vast canopy and iconic aerial roots. Revered in many cultures, it offers shelter to countless birds and animals.",
// "category": "Shade Tree",
// "price": 1200


const displayTrees = async (trees) => {
    const treesContainer = document.getElementById("trees-container")
    trees.forEach(tree => {
        const div = document.createElement("div")
        div.className = "card bg-base-100 shadow-lg p-3"
        div.innerHTML = `
                        <figure class="">
                            <img class="h-38 object-fill rounded-sm" src=${tree.image}
                                alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="space-y-2 mt-5 items-center text-center">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="line-clamp-2 text-left">${tree.description}</p>
                            <div class="flex justify-between items-center">
                                <div class="badge badge-soft badge-success">${tree.category}</div>
                                <p class="text-xl font-semibold">$<span>${tree.price}</span></p>
                            </div>
                            <div class="card-actions w-full">
                                <button class="btn btn-success w-12/12 ">Buy Now</button>
                            </div>
                        </div>
        `
        treesContainer.append(div)
    });
    console.log(trees);

}
loadCategoriesButton()