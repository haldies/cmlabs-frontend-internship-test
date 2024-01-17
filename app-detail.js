// Mendapatkan nama kategori dari URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category-name');

// Endpoint API untuk penyaringan berdasarkan kategori
const filterCategoryEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

// Fungsi untuk membuat elemen daftar makanan
function createMealListItem(meal) {
    const judulMeal = document.getElementById('judulCategoryDetail');
    const listItem = document.createElement('a');
    listItem.href = `meal-detail.html?meal-id=${meal.idMeal}`;
    listItem.className = 'list-items-meal list-group-item-action';

    judulMeal.innerText = "Jelajahi Kategori : " + categoryName;

    // Terapkan lazy loading untuk gambar
    const image = document.createElement('img');
    image.src = meal.strMealThumb;
    image.alt = meal.strMeal;
    image.classList.add('meal-image');
    image.loading = 'lazy';

    listItem.appendChild(image);

    const mealName = document.createElement('h2');
    mealName.innerText = meal.strMeal;

    listItem.appendChild(mealName);

    return listItem;
}

// Ambil daftar makanan dalam kategori yang dipilih dan tampilkan di daftar
axios.get(filterCategoryEndpoint)
    .then(response => {
        const mealsList = document.getElementById('meals-list');

        // Buat fragmen dokumen untuk kinerja yang lebih baik
        const fragment = document.createDocumentFragment();

        response.data.meals.forEach(meal => {
            const listItem = createMealListItem(meal);
            fragment.appendChild(listItem);
        });

        // Tambahkan fragmen ke DOM sesungguhnya sekali
        mealsList.appendChild(fragment);

        // console.log(response);
    })
    .catch(error => console.error('Error mengambil daftar makanan:', error));


document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navList = document.querySelector('.nav__list');

    // Menambahkan event listener untuk menampilkan/menyembunyikan menu hamburger
    hamburgerMenu.addEventListener('click', function () {
        hamburgerMenu.classList.toggle('show');
        navList.classList.toggle('show');
    });
});
