// categories button
// load categories button
const loadCategoriesButton = async () =>{
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
const displayCategoriesButton = (categoriesList) =>{
    const categoriesBtnContainer = document.getElementById("categories-btn-container")
    categoriesList.forEach(categories => {
        const button = document.createElement("button")
        button.className = "btn btn-outline btn-success"
        button.textContent = categories.category_name
        categoriesBtnContainer.append(button)
    });
    console.log(categoriesList);
    
}
loadCategoriesButton()