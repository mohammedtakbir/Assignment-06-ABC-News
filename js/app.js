//* loading news category
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error));
};
//* display news category
const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    const unique = [];
    categories.forEach(category => {
        if (unique.indexOf(category.category_name) === -1) {
            unique.push(category.category_name);
            const li = document.createElement('li');
            li.innerHTML = `
                <span onclick="NewsCategoryId(${category.category_id})" class="p-1 mx-3 fs-5 text-muted">${category.category_name}</span>
            `;
            categoryContainer.appendChild(li);
        };
    });
};
//* all news
const NewsCategoryId = categoryId => {
    console.log(categoryId)
    //* spinner start
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNewsInACategory(data.data))
        .catch(error => console.log(error));
};
const displayAllNewsInACategory = allNews => {
    console.log(allNews)
    //* sort highest to lowest
    allNews.sort((a, b) => b.total_view - a.total_view);

    //* news count
    const newsCount = document.getElementById('news-count');
    if(allNews.length === 0){
        newsCount.innerText = `No News Available`;
    }else{
        newsCount.innerText = `${allNews.length} News Found in this category`;
    }

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3', 'border', 'border-0', 'shadow-sm');
        newsDiv.innerHTML = `
        <div class="row g-2 p-3">
            <div class="col-lg-2 col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start d-none d-lg-block h-100" alt="...">
                <img src="${news.image_url}" class="img-fluid rounded-start d-block d-lg-none" alt="...">
            </div>
            <div class="col-lg-10 col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 400 ? news.details.slice(0, 400) + '...' : news.details}</p>
                    <div class="d-flex flex-md-row flex-column justify-content-between align-items-center mt-5">
                        <div class="d-flex flex-sm-row flex-column justify-content-between align-items-center">
                            <div class="d-flex pe-sm-5 pe-0">
                                <img src="${news.author.img}" style="width: 50px; height: 50px; border-radius: 50%">    
                                <div class="ms-3">
                                    <h5>${news.author.name ? news.author.name : 'No Author Available'}</h5>
                                    <p>${news.author.published_date === null ? 'No Date Available' : news.author.published_date}</p>
                                </div>
                            </div>
                            <div class="ms-sm-5 ms-0">
                                <h5><i class="fa-regular fa-eye me-2"></i> ${news.total_view ? news.total_view + 'K' : 'No viwes'}</h5>
                            </div>
                        </div>
                        <div class="mt-sm-0 mt-2">
                            <h5>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star-half-stroke awesome-color"></i>
                                <i class="fa-regular fa-star awesome-color"></i>
                            </h5>
                        </div>
                        
                        <div class="mt-sm-0 mt-4">
                            <button onclick="loadNewsId('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    //* spinner end
    toggleSpinner(false);
};
//* togglrSpinner
const loadSpinner = document.getElementById('load-spinner');
const toggleSpinner = isLoading => {
    if(isLoading){
        loadSpinner.classList.remove('d-none');
    }else{
        loadSpinner.classList.add('d-none')
    };
};

//* news details open by modal
const loadNewsId = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error));
};
const displayNews = newsDtails => {
    newsDtails.forEach(news => {
        const newsTitle = document.getElementById('exampleModalLabel');
        newsTitle.innerText = news.title;

        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            <p class="card-text mt-3">${news.details}</p>
            <div class="d-flex justify-content-between align-items-center mt-5">
                <div class="d-flex">
                    <img src="${news.author.img}" style="width: 50px; height: 50px; border-radius: 50%">    
                    <div class="ms-3">
                        <h5>${news.author.name ? news.author.name : 'No Author Available'}</h5>
                        <p>${news.author.published_date === null ? 'No Date Available' : news.author.published_date}</p>
                    </div>
                </div>
                <div>
                    <p class="mb-0">
                    <i class="fa-solid fa-star awesome-color"></i>
                    <i class="fa-solid fa-star awesome-color"></i>
                    <i class="fa-solid fa-star awesome-color"></i>
                    <i class="fa-solid fa-star-half-stroke awesome-color"></i>
                    <i class="fa-regular fa-star awesome-color"></i>
                    <span class="fw-semibold ms-2">${news.rating.number}</span>
                    </p>
                    <p class="fw-semibold">${news.rating.badge}</p>
                </div>
            </div>
        `;
    });
};

loadCategory();

//* connecting to the blog page
document.getElementById('blog').addEventListener('click', () => {
    window.location.href = 'blog.html'
});

//* By Default All News
const loadAllNewsByDefault = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDefaultNews(data.data))
};
const displayDefaultNews = (defaultAllNews) => {
    //* sort highest to lowest
    defaultAllNews.sort((a, b) => b.total_view - a.total_view);

    //* news count
    const newsCount = document.getElementById('news-count');
    if(defaultAllNews.length === 0){
        newsCount.innerText = `No News Available`;
    }else{
        newsCount.innerText = `All News`;
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    defaultAllNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3', 'border', 'border-0', 'shadow-sm');
        newsDiv.innerHTML = `
        <div class="row g-2 p-3">
            <div class="col-lg-2 col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start d-none d-lg-block h-100" alt="...">
                <img src="${news.image_url}" class="img-fluid rounded-start d-block d-lg-none" alt="...">
            </div>
            <div class="col-lg-10 col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 400 ? news.details.slice(0, 400) + '...' : news.details}</p>
                    <div class="d-flex flex-md-row flex-column justify-content-between align-items-center mt-5">
                        <div class="d-flex flex-sm-row flex-column justify-content-between align-items-center">
                            <div class="d-flex pe-sm-5 pe-0">
                                <img src="${news.author.img}" style="width: 50px; height: 50px; border-radius: 50%">    
                                <div class="ms-3">
                                    <h5>${news.author.name ? news.author.name : 'No Author Available'}</h5>
                                    <p>${news.author.published_date === null ? 'No Date Available' : news.author.published_date}</p>
                                </div>
                            </div>
                            <div class="ms-sm-5 ms-0">
                                <h5><i class="fa-regular fa-eye me-2"></i> ${news.total_view ? news.total_view + 'K' : 'No viwes'}</h5>
                            </div>
                        </div>
                        <div class="mt-sm-0 mt-2">
                            <h5>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star awesome-color"></i>
                                <i class="fa-solid fa-star-half-stroke awesome-color"></i>
                                <i class="fa-regular fa-star awesome-color"></i>
                            </h5>
                        </div>
                        
                        <div class="mt-sm-0 mt-4">
                            <button onclick="loadNewsId('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}
loadAllNewsByDefault();