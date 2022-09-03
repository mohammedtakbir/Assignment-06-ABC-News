//* loading news category
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}

//* display news category
const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    const unique = [];
    categories.forEach(category => {
        // console.log(category)
        if(unique.indexOf(category.category_name) === -1){
            unique.push(category.category_name);

            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mx-3')
            li.innerHTML = `
                <span onclick="NewsCategoryId(${category.category_id})" class="p-1">${category.category_name}</span>
            `;
            categoryContainer.appendChild(li);
        }
    });
}







loadCategory();