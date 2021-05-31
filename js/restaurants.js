const picArr = ['promo-candy.jpg', 'promo-summer.jpg', 'promo-sushi.jpg'];
const restaurants = [
    {
        name: 'Best Burgers',
        food: 'burger',
        img: 'burger.jfif',
        foodInfo: 'Burgers, Breakfast',
        time: '20 minutes',
        rating: '4,3 rating',
        menu: [
            {
                name: 'Bacon Burger',
                img: 'https://static.takeaway.com/images/restaurants/bg/N371P3Q/products/bacon-burger.png?timestamp=1620644645',
                products: 'homemade bread, 100%, beef meatball, fried cheddar, bacon, home-made barbecue sauce, caramelized onions, pickles, coleslaw - 350 g',
                price: '9.70 lv'
            },
            {
                name: 'Big Bro Burger',
                img: 'https://static.takeaway.com/images/restaurants/bg/N371P3Q/products/big-bro-burger.png?timestamp=1620644645',
                products: 'homemade bread, 2x100% beef meatball, fried cheddar, Brothers sauce, caramelized onion, pickles, green salad - 360 g',
                price: '11.20 lv'
            }
        ]
    },
    {
        name: 'PizzaLab',
        food: 'pizza',
        img: 'pizza.jpg',
        foodInfo: 'Italian style pizza',
        time: '40 minutes',
        rating: '4,5 rating',
        menu: [
            {
                name: 'Flora',
                img: 'https://static.takeaway.com/images/restaurants/bg/O03QPRN1/products/flora.png?timestamp=1620486539',
                products: 'tomato sauce, pesto sauce, mozzarella, fresh tomatoes, green peppers and mushrooms',
                price: '8.90 lv'
            },
            {
                name: 'Explosion',
                img: 'https://static.takeaway.com/images/restaurants/bg/O03QPRN1/products/eksploziq.png?timestamp=1620486539',
                products: 'tomato sauce, mozzarella, ventricina and jalapeno',
                price: '8.90 lv'
            }
        ]
    },
    {
        name: 'Balkan Grill',
        food: 'bbq',
        img: 'bbq.jpg',
        foodInfo: 'Bulgarian, Serbian',
        time: '45 minutes',
        rating: '3,9 rating',
        menu: [
            {
                name: 'Butcher appetizer',
                img: '',
                products: 'brittle pig breasts from a young piglet',
                price: '9.69 lv'
            },
            {
                name: 'Mixed grill',
                img: '',
                products: 'meatball, kebabche, pork skewer, carnation, mushroom sauce (500g)',
                price: '11.89 lv'
            }
        ]
    },
    {
        name: 'Art Sushi',
        food: 'sushi',
        img: 'sushi.jpg',
        foodInfo: 'Japanese, Sushi',
        time: '45 minutes',
        rating: '4,5 rating',
        menu: [
            {
                name: 'Zuma San',
                img: '',
                products: 'Rice, Nori, Philadelphia, Cucumber, Pacific Shrimp tempura, Marinated Japanese salmon with truffle-mango dressing',
                price: '13.28 lv'
            },
            {
                name: 'Sake San',
                img: '',
                products: 'Rice, Philadelphia, Avocado, Crispy Tempura, Wild Salmon',
                price: '9.38 lv'
            }
        ]
    },
    {
        name: 'Donuts Club',
        food: 'sweets',
        img: 'dessert.jpg',
        foodInfo: 'Sweets, Cake',
        time: '30 minutes',
        rating: '4,0 rating',
        menu: [
            {
                name: 'Strawberry cream',
                img: 'https://static.takeaway.com/images/restaurants/bg/OPRN1O01/products/strawberry_cream.png?timestamp=1620334389',
                products: 'A donut with a filling made by GSK technology (USA). The base is an oil dough. Polenta is a boiled cream with a strawberry flavor. The donut is covered with a tender sugar-coated glaze with a strawberry flavor.',
                price: '2.49 lv'
            },
            {
                name: 'Don limon',
                img: 'https://static.takeaway.com/images/restaurants/bg/OPRN1O01/products/don_limon.png?timestamp=1620334389',
                products: 'A donut with a filling made by GSK technology (USA). The base is dough. The pudding is a creamy lime-flavored cream with candied fruit. The donut is covered with a delicious, banana-flavored sugar-coated glaze.',
                price: '2.49 lv'
            }
        ]
    },
    {
        name: 'Fresh Zone',
        food: 'salad',
        img: 'salad.jpg',
        foodInfo: 'Salads, Sandwiches',
        time: '35 minutes',
        rating: '4,7 rating',
        menu: [
            {
                name: 'Salmon sandwich',
                img: 'https://static.takeaway.com/images/restaurants/bg/007OOQ5N/products/sandwich.png?timestamp=1620025518',
                products: 'milk dressing, lemon, parsley, dried tomato, Philadelphia, cucumber / 130g',
                price: '2.99 lv'
            },
            {
                name: 'Apple, Pineapple, Spinach and Parsley',
                img: 'https://static.takeaway.com/images/restaurants/bg/007OOQ5N/products/4.png?timestamp=1620025518',
                products: 'Apple, Pineapple, Spinach and Parsley',
                price: '3.99 lv'
            }
        ]
    }
]

const promoBanner = document.getElementsByClassName('promo');
const promoPointPrev = document.getElementsByClassName('point')[0];
const promoPointNext = document.getElementsByClassName('point')[2];
const menu = document.getElementsByClassName('menu')[0];
const footerYear=document.getElementById('year');
const searchButton=document.getElementById('search-btn');
const searchInput=document.getElementById('search-input');
footerYear.innerText=new Date().getFullYear();

let numOfChange = 0;


window.addEventListener('load', () => {
    renderRestaurants(restaurants, 'all');

    if (localStorage.city) {
        document.getElementById('city').innerText = localStorage.city;
    }

});

window.setInterval(changePic, 4000);

promoPointPrev.addEventListener('click', () => {
    if (numOfChange == 0) numOfChange = 1;
    else if (numOfChange == 1) numOfChange = 2;
    else numOfChange -= 2;
    changePic();
});

promoPointNext.addEventListener('click', () => {
    changePic();
});

menu.addEventListener('click', (e) => {
    const sort = e.target.id;
    clearAllRestaurants();
    renderRestaurants(restaurants, sort);
});

searchButton.addEventListener('click',()=>{
    search(searchInput.value);
})

function changePic() {

    const url = '../img/'

    promoBanner[0].children[0].src = url + picArr[numOfChange];

    numOfChange = numOfChange < 2 ? numOfChange + 1 : 0;

}

function clearAllRestaurants() {
    const restaurantsSection = document.getElementsByClassName('restaurants')[0];
    const restaurantArr = document.getElementsByClassName('restaurant');

    restaurantsSection.innerHTML='';
}

function renderRestaurants(arr, sort) {
    const restaurantsSection = document.getElementsByTagName('article')[0].children[1];
    if (sort === 'all') {
        for (let i = 0, length = arr.length; i < length; i++) {
            renderRestaurant(restaurantsSection, arr[i]);
        }
    } else {
        for (let i = 0, length = arr.length; i < length; i++) {
            const element = arr[i];
            if (element.food === sort) {
                renderRestaurant(restaurantsSection, element);
            } else { continue; }
        }
    }


}

function renderRestaurant(parent, child) {

    const section = document.createElement('section');
    section.className = 'restaurant';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'image';
    section.appendChild(imgDiv);

    const img = document.createElement('img');
    img.src = `../img/${child.img}`;
    imgDiv.appendChild(img);

    const verticleLine = document.createElement('div');
    verticleLine.className = 'verticle-line';
    section.appendChild(verticleLine);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    section.appendChild(infoDiv);

    const h1 = document.createElement('h1');
    h1.innerText = child.name;
    infoDiv.appendChild(h1);

    const p1 = document.createElement('p');
    p1.innerHTML = `
    <img src="../icons/plate.png" alt="">
    <span>
        ${child.foodInfo}
    </span>`;
    infoDiv.appendChild(p1);

    const p2 = document.createElement('p');
    p2.innerHTML = `
    <img src="../icons/clock.png" alt="">
    <span>
        ${child.time}
    </span>`;
    infoDiv.appendChild(p2);

    const p3 = document.createElement('p');
    p3.innerHTML = `
    <img src="../icons/rating.png" alt="">
    <span>
        ${child.rating}
    </span>`;
    infoDiv.appendChild(p3);

    section.addEventListener('click', () => {
        localStorage.chosenRest = JSON.stringify(child);
        window.location.href = './restaurant.html';
    })

    parent.appendChild(section);
}

function search(name){
    const resultArr=[];
    
    restaurants.forEach(element => {
        if(element.name.toUpperCase().includes(name.toUpperCase()))resultArr.push(element);
    });
    clearAllRestaurants();
    if(resultArr.length!=0){
        renderRestaurants(resultArr,'all');
    } else {
        const section=document.getElementsByClassName('restaurants')[0];
        const h2=document.createElement('h2');
        h2.innerText="No restaurants found"
        section.appendChild(h2);
    }
}

