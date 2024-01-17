// Mengambil ID makanan dari URL
const mealId = getMealIdFromURL();

// Endpoint API untuk mengambil detail makanan
const detailMealEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

// Mengambil detail makanan dan menampilkan di halaman
axios.get(detailMealEndpoint)
    .then(response => {
        const meals = response.data.meals;
        if (meals && meals.length > 0) {
            const meal = meals[0];
            displayMealDetails(meal);
        } else {
            console.error('Respon API tidak valid atau kosong:', response);
        }
        // console.log(response.data);
    })
    .catch(error => console.error('Error mengambil detail makanan:', error));


// Fungsi untuk mengambil ID makanan dari URL
function getMealIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('meal-id');
}

// Fungsi untuk menampilkan detail makanan di halaman
function displayMealDetails(meal) {
    document.getElementById('meal-title').innerText = meal.strMeal;
    
    // Lazy loading untuk gambar makanan
    const mealImage = document.getElementById('meal-image');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.loading = 'lazy';

    // Fungsi untuk memformat instruksi masak menjadi daftar
    function formatInstructions(instructions) {
        const steps = instructions.split('\r\n');
        let formattedInstructions = '<ul class="instructions-list">';
        
        for (let i = 0; i < steps.length; i++) {
            formattedInstructions += `<li class="text-instructions">${steps[i]}</li>`;
        }
    
        formattedInstructions += '</ul>';
        return formattedInstructions;
    }

    document.getElementById('meal-description').innerHTML = formatInstructions(meal.strInstructions);
    document.getElementById('meal-recipe').innerHTML= generateMealRecipeText(meal);

    // Lazy loading untuk video YouTube menggunakan Intersection Observer
    const youtubeEmbed = document.getElementById('youtube-embed');
    const youtubeObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            youtubeEmbed.innerHTML = generateYoutubeEmbed(meal.strYoutube);
            youtubeObserver.disconnect();
        }
    }, { threshold: 0.5 }); 

    youtubeObserver.observe(youtubeEmbed);
}

// Fungsi untuk menghasilkan teks resep makanan
function generateMealRecipeText(meal) {
    let ingredientsList = '';

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];

        if (ingredient) {
            ingredientsList += `<li class="text-resep">${measurement ? `${measurement},` : ''} ${ingredient}</li>`;
        }
    }

    return `<ul>${ingredientsList}</ul>`;
}

// Fungsi untuk menghasilkan HTML embed YouTube
function generateYoutubeEmbed(youtubeUrl) {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeUrl.slice(-11)}" frameborder="0" allowfullscreen></iframe>`;
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
