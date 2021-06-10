const restaurant = localStorage.chosenRest ? JSON.parse(localStorage.chosenRest) : undefined;

const footerYear = document.getElementById('year');
footerYear.innerText = new Date().getFullYear();

let isGivedRating = false;

window.addEventListener('load', () => {
    checkFavouritesRestourant(restaurant.name);
    renderMenu();
});

document.getElementById('restaurantName').innerText = restaurant ? restaurant.name : '';
document.getElementById('restaurantName-in-nav').innerText = restaurant ? restaurant.name : '';

function renderMenu() {
    const parent = document.getElementsByTagName('article')[0];
    const menu = restaurant ? restaurant.menu : [];
    menu.forEach(element => {
        renderFood(parent, element);
    });
}

function renderFood(parent, child) {

    const section = document.createElement('section');
    section.className = 'restaurant';

    if (child.img != '') {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'image';
        section.appendChild(imgDiv);

        const img = document.createElement('img');
        img.src = child.img;
        imgDiv.appendChild(img);

        const verticleLine = document.createElement('div');
        verticleLine.className = 'verticle-line';
        section.appendChild(verticleLine);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    section.appendChild(infoDiv);

    const h1 = document.createElement('h1');
    h1.innerText = child.name;
    infoDiv.appendChild(h1);

    const p1 = document.createElement('p');
    p1.innerText = child.products;
    infoDiv.appendChild(p1);

    const p2 = document.createElement('p');
    p2.innerText = child.price;
    infoDiv.appendChild(p2);

    const btn = document.createElement('button');
    btn.className = 'buy';
    btn.innerText = 'Buy';
    infoDiv.appendChild(btn);

    btn.addEventListener('click', () => {
        const obj = chosenFood.find(x => x.name === child.name);
        if (!obj) {
            chosenFood.push({ name: child.name, num: 1, obj: child });
            renderFoodInCart({ name: child.name, num: 1, obj: child });
            renderNumCart();
        }
        else {
            obj.num++;
            document.getElementById('cart').innerHTML = '';
            updateFoodInCart();
        }

        localStorage.chosenFood = JSON.stringify(chosenFood);
    })

    parent.appendChild(section);
}

function checkFavouritesRestourant(name) {
    if (!user || !user.favourite) return;
    if (user.favourite.findIndex(x => x.name == name) > -1) {
        $('#favourite-star').prop('src', '../icons/full-star.png');
    }
}

$('.stars').hover(
    function () {
        if (isGivedRating) return;
        let id = this.id.split('-')[0];

        for (let i = 1; i <= id; i++) {
            $(`#${i}-star`).prop('src', '../icons/full-star-big.png');
        }

    },
    function () {
        if (isGivedRating) return;
        let id = this.id.split('-')[0];

        for (let i = 1; i <= id; i++) {
            $(`#${i}-star`).prop('src', '../icons/empty-star-big.png');
        }

});

$('.stars').click(function () {
    isGivedRating = true;
    let id = this.id.split('-')[0];

    for (let i = 1; i <= id; i++) {
        $(`#${i}-star`).prop('src', '../icons/full-star-big.png');
    }
})

$('#favourite-star').click(function () {
    const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
    if (!user) {
        alert(' You need to be logged in to add favourites!');
        return;
    }
    
    const index = user.favourite ? user.favourite.findIndex(x => x === restaurant.name) : -1;
    if (index >= 0) {

        $(this).prop('src', '../icons/empty-star.png');
        user.favourite.splice(index, 1);

        localStorage.user = JSON.stringify(user);
    } else {

        $(this).prop('src', '../icons/full-star.png');
        if (user.favourite) {
            user.favourite.push(restaurant.name);
        } else {
            user.favourite = [];
            user.favourite.push(restaurant.name);
        }

        localStorage.user = JSON.stringify(user);
    }
})
