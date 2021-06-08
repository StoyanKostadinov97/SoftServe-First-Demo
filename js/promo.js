const picArr = ['promo-candy.jpg', 'promo-summer.jpg', 'promo-sushi.jpg'];

const promoBanner = document.getElementsByClassName('promo');
const promoPointPrev = document.getElementsByClassName('point')[0];
const promoPointNext = document.getElementsByClassName('point')[2];

let numOfChange = 0;

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

function changePic() {

    const url = '../img/'

    promoBanner[0].children[0].src = url + picArr[numOfChange];

    numOfChange = numOfChange < 2 ? numOfChange + 1 : 0;
}