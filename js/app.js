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
        if (unique.indexOf(category.category_name) === -1) {
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
//* all news
const NewsCategoryId = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNewsInACategory(data.data))
}
const displayAllNewsInACategory = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3');
        newsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.length > 400 ? news.details.slice(0, 400) + '...' : news.details}</p>
                <div class="d-flex justify-content-between align-items-center mt-5">
                    <div class="d-flex">
                        <img src="${news.author.img}" style="width: 50px; height: 50px; border-radius: 50%">    
                        <div class="ms-2">
                            <h6>${news.author.name ? news.author.name : 'no author found'}</h4>
                            <p>${news.author.published_date}</p>
                        </div>
                    </div>
                    <div>
                        <h5><i class="fa-regular fa-eye me-2"></i> ${news.total_view ? news.total_view + 'K' : 'No viwes'}</h5>
                    </div>
                    <div>
                        <button onclick="loadNewsId('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}






loadCategory();