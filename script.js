const inputForm = document.querySelector('#inputForm');
const successMsg = document.querySelector('#successMsg');
const displayCardBtn = document.querySelector('#displayCardBtn');
const generatedCard = document.querySelector('#generatedCard');
const apiUrl = 'https://zomato-express-student-neog.replit.app/restaurants'

inputForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // successMsg.textContent = ''

    const nameInput = document.querySelector('#nameInput');
    const cuisineInput = document.querySelector('#cuisineInput');
    const addressInput = document.querySelector('#addressInput');
    const cityInput = document.querySelector('#cityInput');
    const ratingInput = document.querySelector('#ratingInput');
    const pictureInput = document.querySelector('#pictureInput');

    const newRestaurantObj = {
        name: nameInput.value,
        cuisine: cuisineInput.value,
        address: addressInput.value,
        city: cityInput.value,
        rating: ratingInput.value,
        restaurantPicture: pictureInput.value
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newRestaurantObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                successMsg.textContent = 'Restaurant Added Successfully.'
                inputForm.reset()
            }
        }).catch(function (error) {
            console.log("Error", error);
            successMsg.textContent = "Oops....An error occured."
        })
})

displayCardBtn.addEventListener('click', function () {

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data) {
                // console.log(data);
                createCards(data)
            }
        })
        .catch(function (error) {
            console.log("Error", error);
            generatedCard.innerHTML = 'Oops unable to request data'
        })
})

function createCards(data) {
    successMsg.textContent = '';
    generatedCard.innerHTML = '';
    for (let i = 0; i < data.length; i++) {

        const card = document.createElement('div')
        card.className = 'card col-lg-3 p-0 m-5';

        const cardImg = document.createElement('img');
        cardImg.className = 'card-img-top img-fluid';
        cardImg.src = data[i].restaurantPicture;

        card.appendChild(cardImg);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h4');
        cardTitle.className = 'card-title';
        cardTitle.textContent = data[i].name;

        const cuisine = document.createElement('p');
        cuisine.className = 'card-title';
        cuisine.innerHTML = `<strong>Cuisine:</strong> ${data[i].cuisine}`;

        const address = document.createElement('p');
        address.className = 'card-text';
        address.innerHTML = `<strong>Address:</strong> ${data[i].address} ${data[i].city}`;

        const rating = document.createElement('p');
        rating.className = 'card-text';
        rating.innerHTML = `<strong>Rating:</strong> ${data[i].rating}`;


        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cuisine);
        cardBody.appendChild(address);
        cardBody.appendChild(rating);

        card.appendChild(cardBody);

        generatedCard.appendChild(card)

    }

}