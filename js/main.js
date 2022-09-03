// const fetchData = (url) => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             return data;
//         })
//         .catch(error => {
//             console.error(error);
//         });

// }
// const fetchData = async (url) => {
//     try {
//         //const url = 'https://openapi.programming-hero.com/api/news/categories';
//         const res = await fetch(url);
//         const data = await res.json();
//         //console.log(data);
//         return data;
//     }
//     catch (error) {
//         console.log(error);
//     }

// }

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
        })
        .catch(error => {
            console.error(error);
        });
}

loadCategories();

const displayCategories = data => {

    const categoryNav = document.getElementById('category-nav');
    //console.log(categoryNav);
    const categories = (data.data.news_category);

    categories.forEach(category => {
        const link = document.createElement('a');
        link.classList.add('nav-link');
        //link.classList.add('active');
        link.innerText = category.category_name;

        link.setAttribute('onclick', `loadNews('${category.category_id}', '${category.category_name}')`);

        link.setAttribute('id', `${category.category_id}`);
        //console.log(category);
        categoryNav.appendChild(link);
    });

}


const loadNews = (category_id, category_name) => {
    toogleLoader(true);
    const allLinks = document.querySelectorAll('#category-nav a');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    //allLinks.classList.remove('active');
    const selectedLink = document.getElementById(category_id);
    selectedLink.classList.add('active');
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    //console.log(category_id)
    fetch(url)
        .then(response => response.json())
        .then(data => displayNews(data, category_name))
        .catch(error => {
            console.error(error);
        });
}

//loadNews();

const displayNews = (data, category_name) => {

    const newsSection = document.getElementById('news-section');
    newsSection.textContent = "";
    const allNews = (data.data);
    const newsLength = allNews.length;
    const countNews = document.getElementById('count-news');
    if (newsLength > 0) {
        countNews.innerText = `${newsLength} items found for category ${category_name}`;
    } else {
        countNews.innerText = `No items found for category ${category_name}`;
    }
    //console.log(newsLength);

    allNews.sort((a, b) => b.total_view - a.total_view);

    allNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.classList.add('border-0');
        let details = news.details;

        if (details.length >= 600) {
            details = details.slice(0, 600) + '...';
        } else {
            details = details
        }

        div.innerHTML = `<div class="row g-0 p-3">
                    <div class="col-md-3 col-12">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded w-100" alt="...">
                    </div>
                    <div class="col-md-9 col-12">
                        <div class="card-body">
                            <h3 class="card-title fw-bolder">${news.title}</h3>
                            <p class="card-text text-black-50">${details}</p>
                            <div class="row align-items-center justify-content-between g-3 mt-2 fw-semibold">
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="row align-items-center">
                                        <div class="col-lg-2 col-md-4 col-2">
                                            <img src="${news.author.img}" class="img-fluid rounded-circle w-100" alt="...">
                                        </div>
                                        <div class="col-lg-10 col-md-8 col-10">
                                            <p>${news.author.name ? news.author.name : 'No data found'}</p>
                                            <p class="text-black-50">${news.author.published_date ? news.author.published_date : 'No data found'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-6 col-4 text-center">
                                    <p class="text-black-50 fw-bolder"><i class="far fa-eye"></i> ${news.total_view ? news.total_view : 'No data found'}</p>
                                </div>
                                <div class="col-lg-2 col-md-6 col-4 text-center">
                                    <p class="text-black-50"><i class="fas fa-star-half-alt"></i> ${news.rating.number ? news.rating.number : 'No data found'}</p>
                                </div>
                                <div class="col-lg-2 col-md-6 col-4 text-center">
                                    
                                    <button type="button" onclick="newsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

        //link.setAttribute('id', `${category.category_id}`)
        //console.log(category);

        // <p class="text-primary"><i class="fas fa-arrow-right"></i></p>
        newsSection.appendChild(div);
    });

    toogleLoader(false);

}

const toogleLoader = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

const newsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNewsDetails(data);
        })
        .catch(error => {
            console.error(error);
        });
}

const displayNewsDetails = (data) => {
    const modalLabel = document.getElementById('newsModalLabel');
    //console.log(data.data[0]);
    modalLabel.innerText = data.data[0].title;

    const newsContent = document.getElementById('news-content');
    newsContent.textContent = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('mb-3');
    div.classList.add('border-0');

    div.innerHTML = `<img src="${data.data[0].image_url}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title fw-bold">${data.data[0].title}</h5>
        <p class="card-text">${data.data[0].details}</p>
        <div class="row align-items-center justify-content-between g-3 mt-2 fw-semibold">
            <div class="col-lg-6 col-md-6 col-12">
                <div class="row align-items-center">
                    <div class="col-lg-2 col-md-4 col-2">
                        <img src="${data.data[0].author.img}" class="img-fluid rounded-circle w-100" alt="...">
                    </div>
                    <div class="col-lg-10 col-md-8 col-10">
                        <p>${data.data[0].author.name ? data.data[0].author.name : 'No data found'}</p>
                        <p class="text-black-50">${data.data[0].author.published_date ? data.data[0].author.published_date : 'No data found'}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-4 text-center">
                <p class="text-black-50 fw-bolder"><i class="far fa-eye"></i> ${data.data[0].total_view ? data.data[0].total_view : 'No data found'}</p>
            </div>
            <div class="col-lg-2 col-md-6 col-4 text-center">
                <p class="text-black-50"><i class="fas fa-star-half-alt"></i> ${data.data[0].rating.number ? data.data[0].rating.number : 'No data found'}</p>
            </div>
            
        </div>
    </div>
  `;

    newsContent.appendChild(div);

}



