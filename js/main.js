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
        link.innerText = category.category_name;

        link.setAttribute('id', `${category.category_id}`)
        //console.log(category);
        categoryNav.appendChild(link);
    });

}


const loadNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/category/08')
        .then(response => response.json())
        .then(data => {
            displayNews(data);
        })
        .catch(error => {
            console.error(error);
        });
}

loadNews();

const displayNews = data => {

    const newsSection = document.getElementById('news-section');

    const allNews = (data.data);
    //console.log(allNews);

    allNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-3');
        div.classList.add('border-0');
        let details = news.details;
        //console.log(news.author.rating);

        if (details.length >= 754) {
            details = details.slice(0, 754) + '...';
        } else {
            details = details
        }

        div.innerHTML = `<div class="row g-0 p-3">
                    <div class="col-md-3 col-12">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded w-100" alt="...">
                    </div>
                    <div class="col-md-9 col-12">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${details}</p>
                            <div class="row">
                                <div class="col-3">
                                    <div class="row">
                                        <div class="col-4">
                                            <img src="${news.author.img}" class="img-fluid rounded-circle" alt="...">
                                        </div>
                                        <div class="col-8">
                                            <p>${news.author.name}</p>
                                            <p>${news.author.published_date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <p>${news.total_view}</p>
                                </div>
                                <div class="col-3">
                                    <p>${news.rating.badge}</p>
                                    <p>${news.rating.number}</p>
                                </div>
                                <div class="col-3">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

        //link.setAttribute('id', `${category.category_id}`)
        //console.log(category);
        newsSection.appendChild(div);
    });

}



