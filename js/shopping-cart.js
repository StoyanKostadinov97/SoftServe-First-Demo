const cart = document.getElementsByTagName('aside')[0];

const chosenFood = localStorage.chosenFood ? JSON.parse(localStorage.chosenFood) : [];

let cartClicked = false;
let total = 0;


renderNumCart();
updateFoodInCart();

document.querySelector('#shoppingCart').addEventListener('click', (e) => {
    e.preventDefault();
    cartClicked = cartClicked ? false : true;
    renderCart();
    if (cartClicked) cart.style.display = 'flex';
    else cart.style.display = 'none';
});


function renderNumCart() {
    document.querySelector('#shop-num').innerText = chosenFood.length;
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

    const parent=document.getElementById('cart');
   
    const section = document.createElement('section');
    section.className = 'cart-food';

    const img = document.createElement('img');
    img.src = food.obj.img;
    section.appendChild(img);

    const h1 = document.createElement('h1');
    h1.innerText = food.name;
    section.appendChild(h1);

    const div=document.createElement('div');
    const minus=document.createElement('button');
    minus.className='minus';
    minus.innerText='-';
    div.appendChild(minus);
    minus.addEventListener('click',(e)=>{
        decreasePrice(food.obj.price,1);
        e.target.parentElement.children[1].innerText=--food.num;
    })

    const number=document.createElement('h3');
    number.innerText=food.num;
    div.appendChild(number);

    const plus=document.createElement('button');
    plus.className='plus';
    plus.innerText='+';
    div.appendChild(plus);
    plus.addEventListener('click',(e)=>{
        increasePrice(food.obj.price);
        e.target.parentElement.children[1].innerText=++food.num;
    })
    section.appendChild(div);


    const price = document.createElement('p');
    price.innerText = food.obj.price;
    section.appendChild(price);

    const btn = document.createElement('button');
    btn.className = 'delete';
    btn.innerText = '-';
    btn.addEventListener('click', (e) => {
        cartRemoveHandler(e, food);
    })
    section.appendChild(btn);

    parent.appendChild(section);
    increasePrice(food.obj.price);
}

function updateFoodInCart(){
    if (chosenFood.length > 0) {
        chosenFood.forEach(element => {
            renderFoodInCart(element);
        });
    }
}

function cartRemoveHandler(event, element) {
    decreasePrice(element.obj.price,element.num);
    const target = event.target.parentElement;
    document.getElementById('cart').removeChild(target);
    const index = chosenFood.findIndex(x => x == element);
    chosenFood.splice(index, 1);
    renderNumCart();
    localStorage.chosenFood = JSON.stringify(chosenFood);
}

function increasePrice(priceString) {
    const arr = priceString.split(' ');
    price = +arr[0];
    total += price;
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function decreasePrice(priceString,num) {
    const arr = priceString.split(' ');
    price = +arr[0];
    total -= price*num;
    document.getElementById('total-price').innerText = total.toFixed(2);
}