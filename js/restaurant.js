const picArr = ['promo-candy.jpg', 'promo-summer.jpg', 'promo-sushi.jpg'];

const promoBanner = document.getElementsByClassName('promo');
const promoPointPrev = document.getElementsByClassName('point')[0];
const promoPointNext = document.getElementsByClassName('point')[2];
const cart = document.getElementsByTagName('aside')[0];
const footerYear=document.getElementById('year');
footerYear.innerText=new Date().getFullYear();

let numOfChange = 0;
const restaurant = localStorage.chosenRest ? JSON.parse(localStorage.chosenRest) : undefined;
const chosenFood = localStorage.chosenFood ? JSON.parse(localStorage.chosenFood) : [];
let cartClicked = false;
let total = 0;

window.setInterval(changePic, 4000);

window.addEventListener('load', () => {
    document.getElementById('restaurantName').innerText = restaurant.name;
    renderNumCart();

    document.querySelector('#shoppingCart').addEventListener('click', (e) => {
        e.preventDefault();
        cartClicked = cartClicked ? false : true;
        renderCart();
        if (cartClicked) cart.style.display = 'flex';
        else cart.style.display = 'none';
    });

    renderMenu();

    if (chosenFood.length > 0) {
        chosenFood.forEach(element => {
            renderFoodInCart(element);
        });
    }
})

promoPointPrev.addEventListener('click', () => {
    if (numOfChange == 0) numOfChange = 1;
    else if (numOfChange == 1) numOfChange = 2;
    else numOfChange -= 2;
    changePic();
});

promoPointNext.addEventListener('click', () => {
    changePic();
});

function changePic() {

    const url = '../img/'

    promoBanner[0].children[0].src = url + picArr[numOfChange];

    numOfChange = numOfChange < 2 ? numOfChange + 1 : 0;

}

function renderMenu() {
    const parent = document.getElementsByTagName('article')[0];
    const menu = restaurant.menu;
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
        chosenFood.push(child);
        localStorage.chosenFood = JSON.stringify(chosenFood);
        renderNumCart();
        renderFoodInCart(child);
    })

    parent.appendChild(section);
}

function renderNumCart() {
    document.querySelector('header nav:last-child div').innerText = chosenFood.length;
}

function renderCart() {
    if (chosenFood.length > 0) {
        document.getElementById('no-items').style.display = 'none';
        document.getElementById('total').style.display = 'block';
        document.getElementById('total-price').innerText = total.toFixed(2);
    } else {
        document.getElementById('no-items').style.display = 'flex';
        document.getElementById('total').style.display = 'none';
    }
}

function renderFoodInCart(food) {
    const section = document.createElement('section');
    section.className = 'cart-food';

    const img = document.createElement('img');
    img.src = food.img;
    section.appendChild(img);

    const h1 = document.createElement('h1');
    h1.innerText = food.name;
    section.appendChild(h1);

    const price = document.createElement('p');
    price.innerText = food.price;
    section.appendChild(price);

    const btn = document.createElement('button');
    btn.className = 'delete';
    btn.innerText = '-';
    btn.addEventListener('click', (e) => {
        cartRemoveHandler(e,food);
    })
    section.appendChild(btn);

    cart.appendChild(section);
    increasePrice(food.price);
}

function cartRemoveHandler(event, element) {
    decreasePrice(element.price);
    const target = event.target.parentElement;
    cart.removeChild(target);
    const index=chosenFood.findIndex(x=>x==element);
    chosenFood.splice(index,1);
    renderNumCart();
    localStorage.chosenFood = JSON.stringify(chosenFood);
}

function increasePrice(priceString) {
    const arr = priceString.split(' ');
    price = +arr[0];
    total += price;
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function decreasePrice(priceString) {
    const arr = priceString.split(' ');
    price = +arr[0];
    total -= price;
    document.getElementById('total-price').innerText = total.toFixed(2);
}