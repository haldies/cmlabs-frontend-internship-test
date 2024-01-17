// Endpoint untuk mendapatkan daftar kategori makanan
const categoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// Endpoint untuk mendapatkan daftar makanan berdasarkan kategori tertentu
const filterCategoryEndpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
// Fungsi untuk mengambil daftar kategori makanan secara asynchronous
async function fetchCategories() {
    try {
        const response = await axios.get(categoriesEndpoint);
        handleCategoriesResponse(response);
    } catch (error) {
        handleCategoriesError(error);
    }
}
fetchCategories();

// Fungsi untuk menangani respons berhasil dari permintaan kategori
function handleCategoriesResponse(response) {
    if (response.data && response.data.categories) {
        const categoriesList = document.getElementById('categories-list');
        response.data.categories.map(category => {
            const listItem = createCategoryListItem(category);
            if (listItem) {
                categoriesList.appendChild(listItem);
            }
        });
    } else {
        console.error('Format respons tidak valid:', response);
    }
}


// Fungsi untuk menangani kesalahan saat mengambil daftar kategori makanan
function handleCategoriesError(error) {
    console.error('Error mengambil kategori:', error.message);
}

// Fungsi untuk membuat elemen daftar kategori makanan
function createCategoryListItem(category) {
    try {
        const listItem = document.createElement('a');
        listItem.href = `category-detail.html?category-name=${category.strCategory}`;
        listItem.className = 'list-group-item list-group-item-action';

        listItem.innerHTML = `<img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="category-image">
             <p class="judul-meal">${category.strCategory}</p>`;

        return listItem;
    } catch (error) {
        console.error('Error membuat elemen daftar kategori:', error);
        return null;
    }
}

// Menunggu hingga halaman sepenuhnya dimuat sebelum mengeksekusi beberapa kode tertentu
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navList = document.querySelector('.nav__list');

    // Menambahkan event listener untuk menampilkan/menyembunyikan menu hamburger
    hamburgerMenu.addEventListener('click', function () {
        hamburgerMenu.classList.toggle('show');
        navList.classList.toggle('show');
    });
});
