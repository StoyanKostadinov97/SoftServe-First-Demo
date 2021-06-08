const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

renderHeader();

function renderHeader() {
    const pathArr = window.location.href.split('/');
    const page = pathArr[pathArr.length - 1];

    if (page == 'home.html') {
        if (!user) {
            $('header>nav').html(
                `<a href="./home.html">LOGO</a>
                <a id="register" href="./register.html">Register</a>
                <a id="login" href="./login.html">Login</a>`
            )
        } else {
            $('header>nav').html(
                `<a href="./home.html">LOGO</a>
                <a id="user" href=""><img src="../icons/user.png"></a>
                <a id="logout" href="">Logout</a>`
            );
            $('#logout').click((e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.href = './home.html';
            })

        }
    } else if (!user) {
        $('header>nav').html(
            `<a href="./home.html">LOGO</a>
            <a id="register" href="./register.html">Register</a>
            <a id="login" href="./login.html">Login</a>
            <a href="" id="shoppingCart">
                <img src="../icons/cart.png">
                <div id="shop-num">0</div>
            </a>`
        )
    } else {
        $('header>nav').html(
            `<a href="./home.html">LOGO</a>
            <a id="user" href=""><img src="../icons/user.png"></a>
            <a id="logout" href="">Logout</a>
            <a href="" id="shoppingCart">
               <img src="../icons/cart.png">
               <div id="shop-num">0</div>
            </a>`
        );
        $('#logout').click((e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = './home.html';
        })

    }
}

